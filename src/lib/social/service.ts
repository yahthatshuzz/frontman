/**
 * Post and Insights: connected accounts (tokens sealed), scheduled posts, the publisher the cron calls,
 * and metrics pulled from the platforms for the Insights page.
 */
import { randomUUID } from "node:crypto";
import { writeCaptions, type Captions } from "../agents/captions";
import type { Ctx } from "../session";
import { getObject, playbackUrl } from "../storage";
import { store, type StoredRecord } from "../store";
import type { RenderRecord } from "../terminal/edit";
import { ownBusiness } from "../terminal/state";
import { open, readState, seal, signState } from "./crypto";
import { authorizeUrl, configured, exchange, metrics, PLATFORM_NAMES, publish, refresh, type Metrics, type PlatformId, type Tokens } from "./platforms";

export const PLATFORMS: PlatformId[] = ["ig", "tt", "yt", "li"];

interface AccountRec extends StoredRecord {
  kind: "account";
  platform: PlatformId;
  name: string;
  sealed: string;
}

export interface PostRec extends StoredRecord {
  kind: "post";
  status: "scheduled" | "publishing" | "posted" | "failed";
  dueAt: string;
  platform: PlatformId;
  renderId: string;
  renderPath: string;
  title: string;
  pillar: string;
  caption: string;
  externalId?: string;
  permalink?: string;
  postedAt?: string;
  error?: string;
  metrics?: Metrics;
  metricsAt?: string;
}

class SocialError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export function isPlatform(p: string): p is PlatformId {
  return (PLATFORMS as string[]).includes(p);
}

const redirectFor = (origin: string, p: PlatformId) => `${origin}/api/connect/${p}/callback`;

export async function accounts(ctx: Ctx, businessId: string) {
  await ownBusiness(ctx, businessId);
  const recs = await store().listRecords<AccountRec>("account", businessId);
  return PLATFORMS.map((p) => {
    const a = recs.find((r) => r.platform === p);
    return { platform: p, label: PLATFORM_NAMES[p], available: configured(p), connected: !!a, name: a?.name ?? "", connectedAt: a?.createdAt ?? null };
  });
}

export async function connectUrl(ctx: Ctx, businessId: string, p: PlatformId, origin: string): Promise<string> {
  await ownBusiness(ctx, businessId);
  if (!configured(p)) throw new SocialError(`${PLATFORM_NAMES[p]} isn't set up yet. Its developer app keys need to be added in Vercel.`, 503);
  return authorizeUrl(p, signState({ b: businessId, p, u: ctx.userId ?? "local" }), redirectFor(origin, p));
}

export async function connectFinish(ctx: Ctx, p: PlatformId, code: string, state: string, origin: string): Promise<string> {
  const st = readState(state);
  if (!st || st.p !== p || st.u !== (ctx.userId ?? "local")) throw new SocialError("That sign-in link expired. Try connecting again.");
  await ownBusiness(ctx, st.b);
  const t = await exchange(p, code, redirectFor(origin, p));
  const rec: AccountRec = { id: `${st.b}:${p}`, kind: "account", businessId: st.b, createdAt: new Date().toISOString(), platform: p, name: t.name, sealed: seal(JSON.stringify(t)) };
  await store().saveRecord(rec);
  return st.b;
}

export async function disconnect(ctx: Ctx, businessId: string, p: PlatformId): Promise<void> {
  await ownBusiness(ctx, businessId);
  await store().deleteRecord(`${businessId}:${p}`);
}

async function tokensFor(businessId: string, p: PlatformId): Promise<Tokens> {
  const rec = await store().getRecord<AccountRec>(`${businessId}:${p}`);
  if (!rec) throw new SocialError(`${PLATFORM_NAMES[p]} isn't connected.`);
  const t = JSON.parse(open(rec.sealed)) as Tokens;
  const fresh = await refresh(p, t).catch(() => null);
  if (fresh) {
    await store().saveRecord({ ...rec, sealed: seal(JSON.stringify(fresh)) });
    return fresh;
  }
  return t;
}

export async function captionsFor(ctx: Ctx, businessId: string, input: { title: string; hook: string; said: string }): Promise<Captions> {
  const b = await ownBusiness(ctx, businessId);
  const audit = b.terminal?.audit as { voice?: { traits?: string[] } } | undefined;
  const voice = audit?.voice?.traits?.join(", ") || b.brief?.voice?.traits?.join(", ") || "";
  return writeCaptions({ ...input, business: b.name, voice, offer: b.offer });
}

export async function schedule(
  ctx: Ctx,
  businessId: string,
  input: { renderId: string; title: string; pillar: string; when: string; captions: Partial<Record<PlatformId, string>>; platforms: PlatformId[] },
): Promise<PostRec[]> {
  const b = await ownBusiness(ctx, businessId);
  const render = ((b.terminal?.renders as Record<string, RenderRecord>) ?? {})[input.renderId];
  if (!render || render.status !== "done" || !render.path) throw new SocialError("Make the final video in Edit first, then schedule it.");
  const due = new Date(input.when);
  if (Number.isNaN(due.getTime())) throw new SocialError("Pick a day and time.");
  const connected = new Set((await store().listRecords<AccountRec>("account", b.id)).map((a) => a.platform));
  const targets = input.platforms.filter((p) => connected.has(p));
  if (!targets.length) throw new SocialError("Connect at least one account in Post first.");
  const out: PostRec[] = [];
  for (const p of targets) {
    out.push(
      await store().saveRecord<PostRec>({
        id: randomUUID(),
        kind: "post",
        businessId: b.id,
        createdAt: new Date().toISOString(),
        status: "scheduled",
        dueAt: due.toISOString(),
        platform: p,
        renderId: render.id,
        renderPath: render.path,
        title: input.title.slice(0, 200),
        pillar: input.pillar,
        caption: (input.captions[p] ?? input.title).slice(0, 5000),
      }),
    );
  }
  return out;
}

export async function posts(ctx: Ctx, businessId: string): Promise<PostRec[]> {
  await ownBusiness(ctx, businessId);
  return store().listRecords<PostRec>("post", businessId);
}

export async function cancelPost(ctx: Ctx, businessId: string, id: string): Promise<void> {
  await ownBusiness(ctx, businessId);
  const p = await store().getRecord<PostRec>(id);
  if (!p || p.businessId !== businessId) throw new SocialError("Post not found.", 404);
  if (p.status !== "scheduled" && p.status !== "failed") throw new SocialError("That post already went out.");
  await store().deleteRecord(id);
}

/** Called by the scheduler every few minutes. Publishes everything that's due. */
export async function publishDue(now = new Date()): Promise<{ posted: number; failed: number }> {
  const due = await store().dueRecords<PostRec>("post", "scheduled", now.toISOString());
  let posted = 0;
  let failed = 0;
  for (const p of due.slice(0, 10)) {
    await store().saveRecord({ ...p, status: "publishing" });
    try {
      const t = await tokensFor(p.businessId, p.platform);
      const [bytes, url] = await Promise.all([p.platform === "ig" ? Promise.resolve(new ArrayBuffer(0)) : getObject(p.renderPath), playbackUrl(p.renderPath, p.renderId)]);
      const r = await publish(p.platform, t, { videoUrl: url, bytes, title: p.title, caption: p.caption });
      await store().saveRecord<PostRec>({ ...p, status: "posted", externalId: r.externalId, permalink: r.permalink, postedAt: new Date().toISOString(), error: undefined });
      posted++;
    } catch (e) {
      await store().saveRecord<PostRec>({ ...p, status: "failed", error: e instanceof Error ? e.message : "Publishing failed." });
      failed++;
    }
  }
  return { posted, failed };
}

/** Insights: real numbers from the platforms for posts Frontman published. Refreshed at most hourly. */
export async function insights(ctx: Ctx, businessId: string) {
  await ownBusiness(ctx, businessId);
  const all = (await store().listRecords<PostRec>("post", businessId)).filter((p) => p.status === "posted" && p.externalId);
  const stale = all.filter((p) => !p.metricsAt || Date.now() - Date.parse(p.metricsAt) > 3600_000);
  for (const plat of PLATFORMS) {
    const mine = stale.filter((p) => p.platform === plat);
    if (!mine.length) continue;
    try {
      const t = await tokensFor(businessId, plat);
      const m = await metrics(plat, t, mine.map((p) => p.externalId!));
      for (const p of mine) {
        if (m[p.externalId!]) {
          p.metrics = m[p.externalId!];
          p.metricsAt = new Date().toISOString();
          await store().saveRecord(p);
        }
      }
    } catch {
      // Keep the last numbers we had; the page says when they were updated.
    }
  }
  const sum = (k: keyof Metrics, list = all) => {
    const vals = list.map((p) => p.metrics?.[k]).filter((v): v is number => typeof v === "number");
    return vals.length ? vals.reduce((a, b) => a + b, 0) : null;
  };
  const totals = (list: PostRec[]) => ({ views: sum("views", list), likes: sum("likes", list), comments: sum("comments", list), shares: sum("shares", list), saves: sum("saves", list), posts: list.length });
  return {
    accounts: await accounts(ctx, businessId),
    totals: totals(all),
    byPlatform: Object.fromEntries(PLATFORMS.map((p) => [p, totals(all.filter((x) => x.platform === p))])),
    byPillar: Object.fromEntries(["teach", "show", "believe", "entertain"].map((k) => [k, totals(all.filter((x) => x.pillar === k))])),
    posts: all.map((p) => ({ id: p.id, title: p.title, platform: p.platform, pillar: p.pillar, postedAt: p.postedAt, permalink: p.permalink, metrics: p.metrics ?? null, metricsAt: p.metricsAt ?? null })),
  };
}
