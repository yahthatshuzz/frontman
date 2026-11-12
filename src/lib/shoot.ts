/**
 * Shoot stage (roadmap step 2): QR links for the phone recorder, takes, and uploads.
 * Dashboard calls are already checked against the signed-in workspace (src/lib/session.ts);
 * phone calls carry a shoot link token, which only reaches its own business.
 */
import { randomBytes } from "node:crypto";
import { readingText, normalizeTeleprompter } from "./teleprompter";
import { newId, store } from "./store";
import { objectSize, playbackUrl, removeObject, uploadTarget, type UploadTarget } from "./storage";
import type { Business, Script, ShootLink, Take, TeleprompterSettings } from "./types";

export const LINK_HOURS = 24;
/** Supabase's free plan caps each file at 50 MB. The phone recorder's bitrate keeps a 60 second take well under it. */
export const MAX_UPLOAD_MB = Number(process.env.FRONTMAN_MAX_UPLOAD_MB ?? 50);
const MIMES = ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"];

export class ShootError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export function shootable(s: Script): boolean {
  return s.status === "approved" || s.status === "shot" || s.status === "posted";
}

/** A link the phone can open for this business, starting on `scriptId`. Reuses a fresh link so the QR stays the same. */
export async function shootLinkFor(b: Business, scriptId: string): Promise<ShootLink> {
  const sc = await store().getScript(scriptId);
  if (!sc || sc.businessId !== b.id) throw new ShootError("Script not found.", 404);
  if (!shootable(sc)) throw new ShootError("Approve this script first, then shoot it.");
  const latest = await store().latestShootLink(b.id);
  const now = Date.now();
  // Keep the same QR while it has at least 2 hours left; the phone can switch scripts itself.
  if (latest && Date.parse(latest.expiresAt) - now > 2 * 3600_000) {
    if (latest.scriptId === scriptId) return latest;
    return store().saveShootLink({ ...latest, scriptId });
  }
  return store().saveShootLink({
    token: randomBytes(24).toString("base64url"),
    businessId: b.id,
    workspaceId: b.workspaceId,
    scriptId,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + LINK_HOURS * 3600_000).toISOString(),
    openedAt: null,
  });
}

export async function linkFromToken(token: string): Promise<{ link: ShootLink; business: Business }> {
  const link = token && token.length < 100 ? await store().getShootLink(token) : null;
  if (!link) throw new ShootError("This shoot link doesn't exist. Scan the QR code on your Shoot page again.", 404);
  if (Date.parse(link.expiresAt) < Date.now()) throw new ShootError("This shoot link has expired. Open Shoot on your dashboard for a fresh QR code.", 410);
  const business = await store().getBusiness(link.businessId);
  if (!business) throw new ShootError("This business no longer exists.", 404);
  return { link, business };
}

export interface PhoneScript {
  id: string;
  title: string;
  pillar: Script["pillar"];
  text: string;
  hook: string;
  takes: number;
}
export interface PhoneSession {
  businessName: string;
  ownerName: string;
  scriptId: string;
  scripts: PhoneScript[];
  teleprompter: TeleprompterSettings;
  maxUploadMb: number;
  expiresAt: string;
}

/** What the phone recorder needs. Marks the link opened so the dashboard shows "Phone connected". */
export async function phoneSession(token: string): Promise<PhoneSession> {
  const { link, business } = await linkFromToken(token);
  if (!link.openedAt) await store().saveShootLink({ ...link, openedAt: new Date().toISOString() });
  const [scripts, takes] = await Promise.all([store().listScripts(business.id), store().listTakes(business.id)]);
  const ready = scripts.filter(shootable);
  return {
    businessName: business.name,
    ownerName: business.owner.name,
    scriptId: ready.some((s) => s.id === link.scriptId) ? link.scriptId : (ready[0]?.id ?? ""),
    scripts: ready.map((s) => ({
      id: s.id,
      title: s.title,
      pillar: s.pillar,
      text: readingText(s),
      hook: s.hooks[s.selectedHook] ?? s.hooks[0] ?? "",
      takes: takes.filter((t) => t.scriptId === s.id && t.status === "ready").length,
    })),
    teleprompter: normalizeTeleprompter(business.settings?.teleprompter),
    maxUploadMb: MAX_UPLOAD_MB,
    expiresAt: link.expiresAt,
  };
}

function extFor(mime: string): string {
  if (mime.includes("quicktime")) return "mov";
  if (mime.includes("webm")) return "webm";
  if (mime.includes("x-m4v")) return "m4v";
  return "mp4";
}

/** Start a take: makes the row and returns where the browser should PUT the file. */
export async function startTake(
  business: Business,
  input: { scriptId: string; mime: string; bytes: number; seconds?: number; source: Take["source"] },
): Promise<{ take: Take; upload: UploadTarget }> {
  const sc = await store().getScript(input.scriptId);
  if (!sc || sc.businessId !== business.id) throw new ShootError("Pick a script for this take.", 400);
  const mime = (input.mime || "video/mp4").split(";")[0].trim().toLowerCase();
  if (!MIMES.includes(mime)) throw new ShootError("That file isn't a video Frontman can use. Upload an MP4 or MOV.");
  if (input.bytes > MAX_UPLOAD_MB * 1024 * 1024)
    throw new ShootError(`That video is over ${MAX_UPLOAD_MB} MB. Record a shorter take, or export it at 1080p and upload again.`, 413);
  const id = newId();
  const take: Take = {
    id,
    businessId: business.id,
    scriptId: sc.id,
    createdAt: new Date().toISOString(),
    source: input.source,
    path: `${business.id}/${sc.id}/${id}.${extFor(mime)}`,
    mime,
    status: "uploading",
    bytes: input.bytes || undefined,
    seconds: input.seconds && input.seconds > 0 ? Math.round(input.seconds * 10) / 10 : undefined,
  };
  await store().saveTake(take);
  return { take, upload: await uploadTarget(take.path, mime) };
}

/** Called after the PUT finishes. Confirms the file landed, marks the take ready, and moves the script to "shot". */
export async function finishTake(business: Business, takeId: string): Promise<Take> {
  const take = await store().getTake(takeId);
  if (!take || take.businessId !== business.id) throw new ShootError("Take not found.", 404);
  if (take.status === "ready") return take;
  const size = await objectSize(take.path);
  if (size === null) throw new ShootError("The upload didn't finish. Try sending the take again.", 409);
  const ready: Take = { ...take, status: "ready", bytes: size || take.bytes };
  await store().saveTake(ready);
  const sc = await store().getScript(take.scriptId);
  if (sc && sc.status === "approved") await store().saveScripts([{ ...sc, status: "shot" }]);
  return ready;
}

export interface TakeView extends Take {
  url: string;
}

export async function takesWithUrls(businessId: string): Promise<TakeView[]> {
  const takes = (await store().listTakes(businessId)).filter((t) => t.status === "ready");
  return Promise.all(takes.map(async (t) => ({ ...t, url: await playbackUrl(t.path, t.id) })));
}

export async function deleteTake(business: Business, takeId: string): Promise<void> {
  const take = await store().getTake(takeId);
  if (!take || take.businessId !== business.id) throw new ShootError("Take not found.", 404);
  await removeObject(take.path).catch(() => undefined);
  await store().deleteTake(take.id);
}
