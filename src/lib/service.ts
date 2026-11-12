import { analyzeBusiness } from "./agents/analyze";
import { researchAudience } from "./agents/audience";
import { breakdownReference } from "./agents/references";
import { generateScripts, reviseScript } from "./agents/scripts";
import { demoMode } from "./claude";
import { crawlSite } from "./crawl";
import { secondsRange, type Format } from "./formats";
import { mockBreakdown, mockBrief, mockScripts, sleep } from "./mock";
import { fetchMeta, parseVideoUrl } from "./oembed";
import { applySettingsPatch, DEFAULT_WORKSPACE, defaultSettings, type SettingsPatch } from "./settings";
import { newId, store } from "./store";
import { isEditStyle } from "./editStyles";
import type { AudienceResearch, Business, EditStyleStep, NewBusinessInput, ReferenceVideo, Script, ScriptStatus, VideoBreakdown } from "./types";

export async function createBusiness(input: NewBusinessInput, workspaceId = DEFAULT_WORKSPACE): Promise<Business> {
  const b: Business = {
    id: newId(),
    createdAt: new Date().toISOString(),
    workspaceId,
    ...input,
    sources: [],
    brief: null,
    status: "new",
    settings: defaultSettings(),
  };
  return store().saveBusiness(b);
}

/** Owner-level defaults for Shoot and Edit. Unknown or out-of-range values are clamped, never rejected. */
export async function updateBusinessSettings(id: string, patch: SettingsPatch): Promise<Business> {
  const s = store();
  const b = await s.getBusiness(id);
  if (!b) throw new Error("Business not found.");
  return s.saveBusiness({ ...b, settings: applySettingsPatch(b.settings, patch) });
}

/** Crawl the site and run the analysis agent. Writes the Brand Brief onto the business. */
export async function runAnalysis(id: string): Promise<Business> {
  const s = store();
  const b = await s.getBusiness(id);
  if (!b) throw new Error("Business not found.");
  await s.saveBusiness({ ...b, status: "analyzing", error: undefined });
  try {
    const site = await crawlSite(b.website);
    let brief;
    if (demoMode()) {
      await sleep(1500);
      brief = mockBrief(b);
    } else {
      brief = await analyzeBusiness(b, site.text);
    }
    return await s.saveBusiness({ ...b, sources: site.sources, brief, status: "ready", error: undefined });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analysis failed.";
    await s.saveBusiness({ ...b, status: "error", error: message });
    throw e;
  }
}

function batchLabel(d = new Date()): string {
  return "Week of " + d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export async function createScripts(businessId: string, count: number): Promise<Script[]> {
  const s = store();
  const b = await s.getBusiness(businessId);
  if (!b) throw new Error("Business not found.");
  const existing = await s.listScripts(businessId);
  const n = Math.max(1, Math.min(12, Math.round(count)));
  const drafts = demoMode()
    ? (await sleep(1200), mockScripts(b, n))
    : await generateScripts(b, n, existing.map((x) => x.title), await scriptContext(b.id));
  const now = Date.now();
  const batch = batchLabel();
  const scripts: Script[] = drafts.map((d, i) => ({
    ...d,
    id: newId(),
    businessId,
    createdAt: new Date(now + i).toISOString(),
    batch,
    selectedHook: 0,
    status: "draft",
  }));
  return s.saveScripts(scripts);
}

export interface ScriptPatch {
  status?: ScriptStatus;
  /** 1-5, or null to go back to the business default. */
  editStyle?: EditStyleStep | null;
  title?: string;
  body?: string;
  hooks?: string[];
  selectedHook?: number;
  cta?: string;
}

export async function updateScript(id: string, patch: ScriptPatch): Promise<Script> {
  const s = store();
  const cur = await s.getScript(id);
  if (!cur) throw new Error("Script not found.");
  const next: Script = { ...cur };
  if (patch.status) next.status = patch.status;
  if (patch.editStyle === null) delete next.editStyle;
  else if (isEditStyle(patch.editStyle)) next.editStyle = patch.editStyle;
  if (typeof patch.title === "string") next.title = patch.title.slice(0, 200);
  if (typeof patch.body === "string") next.body = patch.body.slice(0, 6000);
  if (typeof patch.cta === "string") next.cta = patch.cta.slice(0, 300);
  if (Array.isArray(patch.hooks)) next.hooks = patch.hooks.map((h) => String(h).slice(0, 200)).slice(0, 3);
  if (typeof patch.selectedHook === "number") next.selectedHook = Math.max(0, Math.min(next.hooks.length - 1, patch.selectedHook));
  const [saved] = await s.saveScripts([next]);
  return saved;
}

export async function reviseWithNote(id: string, note: string): Promise<Script> {
  const s = store();
  const cur = await s.getScript(id);
  if (!cur) throw new Error("Script not found.");
  const b = await s.getBusiness(cur.businessId);
  if (!b) throw new Error("Business not found.");
  let draft;
  if (demoMode()) {
    await sleep(900);
    draft = { ...cur, body: cur.body + `\n\n[Demo mode: with an API key, Claude would rewrite this using your note: "${note}"]` };
  } else {
    draft = await reviseScript(b, cur, note, await scriptContext(b.id));
  }
  const next: Script = { ...cur, ...draft, id: cur.id, businessId: cur.businessId, createdAt: cur.createdAt, batch: cur.batch, selectedHook: 0, status: "draft", revisionNote: note };
  const [saved] = await s.saveScripts([next]);
  return saved;
}

/** What the script agent gets besides the brief: saved formats and the owner's reference videos as style signals. */
async function scriptContext(businessId: string) {
  const s = store();
  const [formats, references] = await Promise.all([s.listFormats(businessId), s.listReferences(businessId)]);
  return { formats, references };
}

/** The owner pastes a link to a video they like. We read public metadata only and never fetch the video. */
export async function addReference(businessId: string, rawUrl: string, note: string): Promise<ReferenceVideo> {
  const s = store();
  const b = await s.getBusiness(businessId);
  if (!b) throw new Error("Business not found.");
  const { url, platform } = parseVideoUrl(rawUrl);
  const meta = await fetchMeta(platform, url);
  const breakdown = demoMode() ? (await sleep(600), mockBreakdown(meta, note)) : await breakdownReference(b, { url, platform, meta, note });
  const ref: ReferenceVideo = { id: newId(), businessId, createdAt: new Date().toISOString(), url, platform, note, meta, breakdown };
  return s.saveReference(ref);
}

export async function removeReference(id: string): Promise<void> {
  const s = store();
  if (!(await s.getReference(id))) throw new Error("Reference not found.");
  await s.deleteReference(id);
}

/** Turn any breakdown (a reference, or an audience research item) into a format in this business's library. */
export async function saveFormatFromBreakdown(businessId: string, breakdown: VideoBreakdown, sourceUrl: string): Promise<Format> {
  const f: Format = {
    id: `c-${newId()}`,
    name: breakdown.name,
    pillars: [breakdown.pillar],
    structure: breakdown.structure.length ? breakdown.structure : ["[FILL: beats]"],
    whyItWorks: breakdown.whyItWorks,
    seconds: secondsRange(breakdown.length),
    custom: true,
    businessId,
    sourceUrl,
    createdAt: new Date().toISOString(),
  };
  return store().saveFormat(f);
}

export async function saveReferenceAsFormat(referenceId: string): Promise<{ reference: ReferenceVideo; format: Format }> {
  const s = store();
  const ref = await s.getReference(referenceId);
  if (!ref) throw new Error("Reference not found.");
  if (ref.formatId) {
    const existing = (await s.listFormats(ref.businessId)).find((f) => f.id === ref.formatId);
    if (existing) return { reference: ref, format: existing };
  }
  const format = await saveFormatFromBreakdown(ref.businessId, ref.breakdown, ref.url);
  const reference = await s.saveReference({ ...ref, formatId: format.id });
  return { reference, format };
}

/** Research what this business's audience watches (web search). Demo mode returns nothing rather than made-up posts. */
export async function runAudienceResearch(businessId: string): Promise<Business> {
  const s = store();
  const b = await s.getBusiness(businessId);
  if (!b) throw new Error("Business not found.");
  if (!b.brief) throw new Error("Run the business analysis first, so we know who your audience is.");
  if (demoMode()) {
    throw new Error("Audience research needs a Claude API key, because it searches the web. Add ANTHROPIC_API_KEY and try again.");
  }
  const found = await researchAudience(b);
  const research: AudienceResearch = { ...found, ranAt: new Date().toISOString() };
  // Keep "saved as format" marks for items that came back again.
  const prev = new Map((b.audienceResearch?.items ?? []).filter((i) => i.formatId).map((i) => [i.sourceUrl, i.formatId!]));
  research.items = research.items.map((i) => (prev.has(i.sourceUrl) ? { ...i, formatId: prev.get(i.sourceUrl) } : i));
  return s.saveBusiness({ ...b, audienceResearch: research });
}

export async function saveAudienceItemAsFormat(businessId: string, itemId: string): Promise<{ business: Business; format: Format }> {
  const s = store();
  const b = await s.getBusiness(businessId);
  if (!b) throw new Error("Business not found.");
  const item = b.audienceResearch?.items.find((i) => i.id === itemId);
  if (!item) throw new Error("That item isn't in the latest research. Refresh and try again.");
  if (item.formatId) {
    const existing = (await s.listFormats(businessId)).find((f) => f.id === item.formatId);
    if (existing) return { business: b, format: existing };
  }
  const format = await saveFormatFromBreakdown(businessId, item.breakdown, item.url);
  const research = { ...b.audienceResearch!, items: b.audienceResearch!.items.map((i) => (i.id === itemId ? { ...i, formatId: format.id } : i)) };
  const business = await s.saveBusiness({ ...b, audienceResearch: research });
  return { business, format };
}

export interface ScriptFilter {
  status?: ScriptStatus;
  pillar?: Script["pillar"];
  limit?: number;
}

/**
 * Everything an API key can do, limited to its workspace (the same boundary row level security will enforce
 * once Accounts ships). A business or script outside the workspace looks exactly like one that doesn't exist.
 */
export function workspaceService(workspaceId: string) {
  const notFound = () => new Error("Business not found in this workspace.");
  async function business(id: string): Promise<Business> {
    const b = await store().getBusiness(id);
    if (!b || b.workspaceId !== workspaceId) throw notFound();
    return b;
  }
  async function script(id: string): Promise<Script> {
    const sc = await store().getScript(id);
    if (!sc) throw new Error("Script not found.");
    const b = await store().getBusiness(sc.businessId);
    if (!b || b.workspaceId !== workspaceId) throw new Error("Script not found.");
    return sc;
  }
  return {
    async listBusinesses(): Promise<Business[]> {
      return (await store().listBusinesses()).filter((b) => b.workspaceId === workspaceId);
    },
    business,
    async writeScripts(businessId: string, count: number): Promise<Script[]> {
      await business(businessId);
      return createScripts(businessId, count);
    },
    async listScripts(businessId: string, f: ScriptFilter = {}): Promise<Script[]> {
      await business(businessId);
      const all = await store().listScripts(businessId);
      return all
        .filter((x) => (!f.status || x.status === f.status) && (!f.pillar || x.pillar === f.pillar))
        .slice(0, Math.max(1, Math.min(100, f.limit ?? 50)));
    },
    async reviseScript(scriptId: string, note: string): Promise<Script> {
      await script(scriptId);
      return reviseWithNote(scriptId, note);
    },
    async approveScript(scriptId: string): Promise<Script> {
      await script(scriptId);
      return updateScript(scriptId, { status: "approved" });
    },
    async addReference(businessId: string, url: string, note: string): Promise<ReferenceVideo> {
      await business(businessId);
      return addReference(businessId, url, note);
    },
  };
}
