/**
 * Edit stage for the Terminal: plan with Claude, render with Creatomate, keep the result in our storage.
 * Render records live on business.terminal.renders (server-owned; autosave never overwrites them).
 */
import { analyzeReference, planEdit, type RefProfile } from "../agents/edit";
import { transcribe } from "../agents/coach";
import { editStyleBrief, effectiveEditStyle } from "../editStyles";
import { buildRenderScript, getCreatomate, renderReady, startCreatomate, type CaptionStyle } from "../render";
import type { Ctx } from "../session";
import { objectSize, playbackUrl, putObject, uploadTarget } from "../storage";
import { store } from "../store";
import type { Business, Take } from "../types";
import { ownBusiness } from "./state";

export interface RenderRecord {
  id: string;
  takeId: string;
  title: string;
  status: "rendering" | "done" | "failed";
  path?: string;
  error?: string;
  did: string[];
  seconds: number;
  createdAt: string;
}

class EditError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

async function saveRender(b: Business, r: RenderRecord): Promise<void> {
  const fresh = (await store().getBusiness(b.id)) ?? b;
  const renders = { ...((fresh.terminal?.renders as Record<string, RenderRecord>) ?? {}), [r.id]: r };
  await store().saveBusiness({ ...fresh, terminal: { ...(fresh.terminal ?? {}), renders } });
}

function bestTake(takes: Take[]): Take | null {
  const ready = takes.filter((t) => t.status === "ready");
  return ready.sort((a, b) => (b.coach?.score ?? -1) - (a.coach?.score ?? -1) || b.createdAt.localeCompare(a.createdAt))[0] ?? null;
}

export async function startEdit(
  ctx: Ctx,
  businessId: string,
  input: { takeIds: string[]; scriptId?: string; title: string; hook: string; text: string; style: CaptionStyle; note: string; reference: RefProfile | null },
): Promise<RenderRecord> {
  if (!renderReady()) throw new EditError("Rendering isn't connected yet. Add CREATOMATE_API_KEY in Vercel, then try again.", 503);
  const b = await ownBusiness(ctx, businessId);
  const takes = (await Promise.all(input.takeIds.slice(0, 20).map((id) => store().getTake(id)))).filter((t): t is Take => !!t && t.businessId === b.id);
  const take = bestTake(takes);
  if (!take) throw new EditError("There's no finished take for this video yet. Record or upload one in Shoot.");
  const url = await playbackUrl(take.path, take.id);
  let words = take.coach?.words ?? [];
  if (!words.length) {
    const tx = await transcribe(url);
    words = tx ? tx.words.map((w) => ({ w: w.w, s: w.s, e: w.e })) : [];
  }
  const script = input.scriptId ? await store().getScript(input.scriptId) : null;
  const plan = await planEdit({
    words,
    duration: take.seconds ?? take.coach?.len ?? (words.length ? words[words.length - 1].e + 0.5 : 60),
    script: input.text,
    hook: input.hook,
    styleBrief: editStyleBrief(effectiveEditStyle(b, script ?? undefined)),
    reference: input.reference,
    note: input.note,
  });
  const job = await startCreatomate(buildRenderScript({ videoUrl: url, plan, words, style: input.style }));
  const rec: RenderRecord = {
    id: job.id,
    takeId: take.id,
    title: input.title,
    status: "rendering",
    did: [`Used take with ${take.coach ? `a ${take.coach.score} delivery score` : "the latest upload"}.`, ...plan.did],
    seconds: Math.round(plan.keep.reduce((n, k) => n + (k.end - k.start), 0)),
    createdAt: new Date().toISOString(),
  };
  await saveRender(b, rec);
  return rec;
}

/** Poll a render. When it finishes, copy the MP4 into our storage and hand back a fresh playback URL. */
export async function renderStatus(ctx: Ctx, businessId: string, id: string): Promise<RenderRecord & { url: string | null }> {
  const b = await ownBusiness(ctx, businessId);
  const rec = ((b.terminal?.renders as Record<string, RenderRecord>) ?? {})[id];
  if (!rec) throw new EditError("Render not found.", 404);
  if (rec.status === "rendering") {
    const job = await getCreatomate(id);
    if (job.status === "succeeded" && job.url) {
      const res = await fetch(job.url);
      if (!res.ok) throw new EditError("The finished video couldn't be downloaded. Try again in a minute.", 502);
      const path = `${b.id}/renders/${id}.mp4`;
      await putObject(path, await res.arrayBuffer(), "video/mp4");
      rec.status = "done";
      rec.path = path;
      await saveRender(b, rec);
    } else if (job.status === "failed") {
      rec.status = "failed";
      rec.error = job.error_message || "The render failed.";
      await saveRender(b, rec);
    }
  }
  return { ...rec, url: rec.path ? await playbackUrl(rec.path, rec.id) : null };
}

export async function studyReference(
  ctx: Ctx,
  businessId: string,
  input: { name: string; note: string; frames: { t: number; data: string }[]; loudness: number[]; duration: number },
): Promise<RefProfile> {
  await ownBusiness(ctx, businessId);
  if (!input.frames.length && input.note.split(/\s+/).length < 3) throw new EditError("Upload a reference video, or describe the edit in a few words.");
  return analyzeReference(input);
}

/** "Upload a finished video": the owner's own edit, posted as-is. Registered as a render so Post treats it the same. */
export async function startFinishedUpload(ctx: Ctx, businessId: string, input: { title: string; mime: string; bytes: number }) {
  const b = await ownBusiness(ctx, businessId);
  const mime = (input.mime || "video/mp4").split(";")[0];
  if (!/^video\/(mp4|quicktime|x-m4v)$/.test(mime)) throw new EditError("Upload an MP4 or MOV.");
  const id = `up_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const path = `${b.id}/renders/${id}.${mime === "video/quicktime" ? "mov" : "mp4"}`;
  const rec: RenderRecord = { id, takeId: "", title: input.title || "Your video", status: "rendering", path, did: ["Your own edit, posted as-is."], seconds: 0, createdAt: new Date().toISOString() };
  await saveRender(b, rec);
  return { render: rec, upload: await uploadTarget(path, mime) };
}

export async function finishFinishedUpload(ctx: Ctx, businessId: string, id: string) {
  const b = await ownBusiness(ctx, businessId);
  const rec = ((b.terminal?.renders as Record<string, RenderRecord>) ?? {})[id];
  if (!rec || !rec.path) throw new EditError("Upload not found.", 404);
  if ((await objectSize(rec.path)) === null) throw new EditError("The upload didn't finish. Try again.", 409);
  rec.status = "done";
  await saveRender(b, rec);
  return { ...rec, url: await playbackUrl(rec.path, rec.id) };
}
