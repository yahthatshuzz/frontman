/**
 * Server side of the Terminal app (public/terminal/app.js): which business it shows, and its saved state.
 * The UI keeps its own state shape; the server stores it on the business and mirrors the onboarding answers
 * into the business fields the agents read (name, owner, website, socials, audience, offer).
 */
import { demoMode } from "../claude";
import { sampleBank, storyFromChat, writeStoryBank, type StoryCategory } from "../agents/storyBank";
import { createBusiness } from "../service";
import { newId, store } from "../store";
import { canSee, type Ctx } from "../session";
import type { Business, CompanyAnswers, Script, TerminalState } from "../types";

export const MAX_STATE_BYTES = 400_000;

/** The business this user's Terminal shows: ?b= if they can see it, else the first in their own workspace. */
export async function terminalBusiness(ctx: Ctx, requested?: string | null): Promise<Business | null> {
  const s = store();
  if (requested) {
    const b = await s.getBusiness(requested);
    if (b && canSee(ctx, b)) return b;
  }
  const own = (await s.listBusinesses()).filter((b) => b.workspaceId === ctx.workspaceId);
  return own.sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0] ?? null;
}

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Business fields the agents use, from the onboarding answers. */
function fieldsFrom(co: Partial<CompanyAnswers>) {
  const soc = co.soc ?? { ig: "", tt: "", yt: "", li: "" };
  const socials = [
    soc.ig && `Instagram: @${str(soc.ig, 100).replace(/^@/, "")}`,
    soc.tt && `TikTok: @${str(soc.tt, 100).replace(/^@/, "")}`,
    soc.yt && `YouTube: ${str(soc.yt, 200)}`,
    soc.li && `LinkedIn: ${str(soc.li, 200)}`,
  ]
    .filter(Boolean)
    .join("\n");
  return {
    name: str(co.company, 200) || "My business",
    website: str(co.site, 500),
    owner: { name: str(co.name, 200), role: str(co.role, 200) },
    socials,
    audience: Array.isArray(co.aud) ? co.aud.map((a) => str(a, 200)).filter(Boolean).join(", ") : "",
    offer: str(co.offer, 2000),
  };
}

/** Save the Terminal's state. Creates the business the first time the owner finishes the company questions. */
export async function saveTerminalState(ctx: Ctx, businessId: string | null, state: TerminalState): Promise<Business> {
  const size = JSON.stringify(state).length;
  if (size > MAX_STATE_BYTES) throw new Error("Too much to save at once. Remove some drafts and try again.");
  const next: TerminalState = { ...state, updatedAt: new Date().toISOString() };
  const co = (next.co ?? {}) as Partial<CompanyAnswers>;
  let b = businessId ? await store().getBusiness(businessId) : null;
  if (b && !canSee(ctx, b)) b = null;
  if (!b) {
    b = await terminalBusiness(ctx, null);
  }
  if (!b) {
    const f = fieldsFrom(co);
    b = await createBusiness({ ...f, brainDump: str(co.one, 4000), notes: "" }, ctx.workspaceId);
  }
  const f = fieldsFrom(co);
  const merged: Business = {
    ...b,
    ...(co.company ? { name: f.name } : {}),
    website: f.website || b.website,
    owner: { name: f.owner.name || b.owner.name, role: f.owner.role || b.owner.role },
    socials: f.socials || b.socials,
    audience: f.audience || b.audience,
    offer: f.offer || b.offer,
    terminal: next,
  };
  return store().saveBusiness(merged);
}


async function ownBusiness(ctx: Ctx, businessId: string): Promise<Business> {
  const b = await store().getBusiness(businessId);
  if (!b || !canSee(ctx, b)) throw Object.assign(new Error("Finish the company questions first."), { status: 404 });
  return b;
}

/** Write (or rewrite) the Studio's story bank and save it on the Terminal state. */
export async function buildStoryBank(ctx: Ctx, businessId: string, extra: string): Promise<StoryCategory[]> {
  const b = await ownBusiness(ctx, businessId);
  const co = (b.terminal?.co ?? {}) as Partial<CompanyAnswers>;
  const bank = demoMode() ? sampleBank(b, co) : await writeStoryBank(b, co, extra);
  const fresh = (await store().getBusiness(b.id)) ?? b;
  await store().saveBusiness({ ...fresh, terminal: { ...(fresh.terminal ?? {}), bank, updatedAt: new Date().toISOString() } });
  return bank;
}

/** Turn a story the owner told in "Tell my story" into a Studio category. */
export async function tellMyStory(ctx: Ctx, businessId: string, title: string, transcript: string): Promise<StoryCategory> {
  const b = await ownBusiness(ctx, businessId);
  const co = (b.terminal?.co ?? {}) as Partial<CompanyAnswers>;
  if (demoMode()) return { ...sampleBank(b, co)[0], id: `c${Date.now()}`, name: title || "Your story", custom: true, beats: [transcript.slice(0, 400) || "[FILL: your story]", ...sampleBank(b, co)[0].beats.slice(1)] };
  return storyFromChat(b, co, title, transcript);
}

/** A script the owner approved in the Studio becomes a real Script row, so Shoot, Edit and Post can use it. */
export async function approveFromStudio(
  ctx: Ctx,
  businessId: string,
  item: { title: string; pillar: string; hook: string; text: string; secs: number; sid?: string },
): Promise<string> {
  const b = await ownBusiness(ctx, businessId);
  const pillar = (["teach", "show", "believe", "entertain"].includes(item.pillar) ? item.pillar : "believe") as Script["pillar"];
  if (item.sid) {
    const existing = await store().getScript(item.sid);
    if (existing && existing.businessId === b.id) return existing.id;
  }
  const sc: Script = {
    id: newId(),
    businessId: b.id,
    createdAt: new Date().toISOString(),
    batch: `Studio · ${new Date().toISOString().slice(0, 10)}`,
    pillar,
    formatId: "studio",
    title: str(item.title, 200) || "Untitled",
    hooks: [str(item.hook, 300)],
    selectedHook: 0,
    body: str(item.text, 8000),
    shotNotes: [],
    cta: "",
    platforms: ["instagram", "tiktok", "youtube_shorts", "linkedin"],
    estSeconds: Math.max(5, Math.round(Number(item.secs) || 45)),
    whyItBuildsTrust: "",
    status: "approved",
  };
  await store().saveScripts([sc]);
  return sc.id;
}
