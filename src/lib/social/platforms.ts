/**
 * Official platform APIs (never browser automation on user accounts).
 * Each platform: authorize URL, code exchange, token refresh, publish a vertical video, read metrics.
 * Endpoints follow each platform's public docs; versions that change often are env-configurable.
 */
export type PlatformId = "ig" | "tt" | "yt" | "li";

export interface Tokens {
  accountId: string;
  name: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface Published {
  externalId: string;
  permalink: string;
}

export interface Metrics {
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  saves: number | null;
}

export const PLATFORM_NAMES: Record<PlatformId, string> = { ig: "Instagram", tt: "TikTok", yt: "YouTube Shorts", li: "LinkedIn" };

const ENV: Record<PlatformId, [string, string]> = {
  ig: ["INSTAGRAM_APP_ID", "INSTAGRAM_APP_SECRET"],
  tt: ["TIKTOK_CLIENT_KEY", "TIKTOK_CLIENT_SECRET"],
  yt: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  li: ["LINKEDIN_CLIENT_ID", "LINKEDIN_CLIENT_SECRET"],
};

export function configured(p: PlatformId): boolean {
  return !!(process.env[ENV[p][0]] && process.env[ENV[p][1]]);
}
function id(p: PlatformId): string {
  return process.env[ENV[p][0]] ?? "";
}
function secret(p: PlatformId): string {
  return process.env[ENV[p][1]] ?? "";
}

async function j<T>(res: Response, what: string): Promise<T> {
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    const b = body as { error?: { message?: string } | string; error_description?: string; message?: string } | null;
    const msg = typeof b?.error === "object" ? b.error?.message : b?.error_description || b?.message || (typeof b?.error === "string" ? b.error : "");
    throw new Error(`${what} failed (${res.status})${msg ? `: ${msg}` : ""}.`);
  }
  return body as T;
}

const form = (o: Record<string, string>) => new URLSearchParams(o).toString();
const expires = (sec?: number) => (sec ? new Date(Date.now() + sec * 1000).toISOString() : undefined);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function authorizeUrl(p: PlatformId, state: string, redirect: string): string {
  switch (p) {
    case "ig":
      return `https://www.instagram.com/oauth/authorize?${form({ client_id: id(p), redirect_uri: redirect, response_type: "code", scope: "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_insights", state })}`;
    case "tt":
      return `https://www.tiktok.com/v2/auth/authorize/?${form({ client_key: id(p), redirect_uri: redirect, response_type: "code", scope: "user.info.basic,video.publish,video.list", state })}`;
    case "yt":
      return `https://accounts.google.com/o/oauth2/v2/auth?${form({ client_id: id(p), redirect_uri: redirect, response_type: "code", access_type: "offline", prompt: "consent", include_granted_scopes: "true", scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly", state })}`;
    case "li":
      return `https://www.linkedin.com/oauth/v2/authorization?${form({ client_id: id(p), redirect_uri: redirect, response_type: "code", scope: "openid profile w_member_social", state })}`;
  }
}

export async function exchange(p: PlatformId, code: string, redirect: string): Promise<Tokens> {
  if (p === "ig") {
    const short = await j<{ access_token: string; user_id: number | string }>(
      await fetch("https://api.instagram.com/oauth/access_token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form({ client_id: id(p), client_secret: secret(p), grant_type: "authorization_code", redirect_uri: redirect, code }) }),
      "Instagram sign-in",
    );
    const long = await j<{ access_token: string; expires_in: number }>(await fetch(`https://graph.instagram.com/access_token?${form({ grant_type: "ig_exchange_token", client_secret: secret(p), access_token: short.access_token })}`), "Instagram token");
    const me = await j<{ user_id?: string; id?: string; username?: string }>(await fetch(`https://graph.instagram.com/me?${form({ fields: "user_id,username", access_token: long.access_token })}`), "Instagram profile");
    return { accountId: String(me.user_id ?? me.id ?? short.user_id), name: me.username ? `@${me.username}` : "Instagram", accessToken: long.access_token, expiresAt: expires(long.expires_in) };
  }
  if (p === "tt") {
    const t = await j<{ access_token: string; refresh_token: string; open_id: string; expires_in: number }>(
      await fetch("https://open.tiktokapis.com/v2/oauth/token/", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form({ client_key: id(p), client_secret: secret(p), code, grant_type: "authorization_code", redirect_uri: redirect }) }),
      "TikTok sign-in",
    );
    const me = await j<{ data?: { user?: { display_name?: string } } }>(await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name", { headers: { authorization: `Bearer ${t.access_token}` } }), "TikTok profile").catch(() => null);
    return { accountId: t.open_id, name: me?.data?.user?.display_name ?? "TikTok", accessToken: t.access_token, refreshToken: t.refresh_token, expiresAt: expires(t.expires_in) };
  }
  if (p === "yt") {
    const t = await j<{ access_token: string; refresh_token?: string; expires_in: number }>(
      await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form({ client_id: id(p), client_secret: secret(p), code, grant_type: "authorization_code", redirect_uri: redirect }) }),
      "Google sign-in",
    );
    const ch = await j<{ items?: { id: string; snippet?: { title?: string } }[] }>(await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: { authorization: `Bearer ${t.access_token}` } }), "YouTube channel");
    const c = ch.items?.[0];
    if (!c) throw new Error("That Google account has no YouTube channel. Create one, then connect again.");
    return { accountId: c.id, name: c.snippet?.title ?? "YouTube", accessToken: t.access_token, refreshToken: t.refresh_token, expiresAt: expires(t.expires_in) };
  }
  const t = await j<{ access_token: string; expires_in: number; refresh_token?: string }>(
    await fetch("https://www.linkedin.com/oauth/v2/accessToken", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form({ grant_type: "authorization_code", code, redirect_uri: redirect, client_id: id(p), client_secret: secret(p) }) }),
    "LinkedIn sign-in",
  );
  const me = await j<{ sub: string; name?: string }>(await fetch("https://api.linkedin.com/v2/userinfo", { headers: { authorization: `Bearer ${t.access_token}` } }), "LinkedIn profile");
  return { accountId: me.sub, name: me.name ?? "LinkedIn", accessToken: t.access_token, refreshToken: t.refresh_token, expiresAt: expires(t.expires_in) };
}

/** Fresh tokens when the current ones are close to expiring. Returns null if nothing changed. */
export async function refresh(p: PlatformId, t: Tokens): Promise<Tokens | null> {
  const soon = t.expiresAt && Date.parse(t.expiresAt) - Date.now() < (p === "ig" ? 7 * 86400_000 : 5 * 60_000);
  if (!soon) return null;
  if (p === "ig") {
    const r = await j<{ access_token: string; expires_in: number }>(await fetch(`https://graph.instagram.com/refresh_access_token?${form({ grant_type: "ig_refresh_token", access_token: t.accessToken })}`), "Instagram refresh");
    return { ...t, accessToken: r.access_token, expiresAt: expires(r.expires_in) };
  }
  if (!t.refreshToken) return null;
  const url = p === "tt" ? "https://open.tiktokapis.com/v2/oauth/token/" : p === "yt" ? "https://oauth2.googleapis.com/token" : "https://www.linkedin.com/oauth/v2/accessToken";
  const body: Record<string, string> = p === "tt" ? { client_key: id(p), client_secret: secret(p), grant_type: "refresh_token", refresh_token: t.refreshToken } : { client_id: id(p), client_secret: secret(p), grant_type: "refresh_token", refresh_token: t.refreshToken };
  const r = await j<{ access_token: string; refresh_token?: string; expires_in: number }>(await fetch(url, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form(body) }), `${PLATFORM_NAMES[p]} refresh`);
  return { ...t, accessToken: r.access_token, refreshToken: r.refresh_token ?? t.refreshToken, expiresAt: expires(r.expires_in) };
}

/** Publish. `videoUrl` must be publicly fetchable for Instagram; the others upload the bytes we pass. */
export async function publish(p: PlatformId, t: Tokens, v: { videoUrl: string; bytes: ArrayBuffer; title: string; caption: string }): Promise<Published> {
  const auth = { authorization: `Bearer ${t.accessToken}` };
  if (p === "ig") {
    const c = await j<{ id: string }>(await fetch(`https://graph.instagram.com/${t.accountId}/media?${form({ media_type: "REELS", video_url: v.videoUrl, caption: v.caption, access_token: t.accessToken })}`, { method: "POST" }), "Instagram upload");
    for (let i = 0; i < 40; i++) {
      const s = await j<{ status_code?: string }>(await fetch(`https://graph.instagram.com/${c.id}?${form({ fields: "status_code", access_token: t.accessToken })}`), "Instagram processing");
      if (s.status_code === "FINISHED") break;
      if (s.status_code === "ERROR" || s.status_code === "EXPIRED") throw new Error("Instagram couldn't process the video.");
      await sleep(5000);
    }
    const pub = await j<{ id: string }>(await fetch(`https://graph.instagram.com/${t.accountId}/media_publish?${form({ creation_id: c.id, access_token: t.accessToken })}`, { method: "POST" }), "Instagram publish");
    const info = await j<{ permalink?: string }>(await fetch(`https://graph.instagram.com/${pub.id}?${form({ fields: "permalink", access_token: t.accessToken })}`), "Instagram link").catch(() => ({ permalink: "" }));
    return { externalId: pub.id, permalink: info.permalink ?? "" };
  }
  if (p === "tt") {
    const size = v.bytes.byteLength;
    const init = await j<{ data: { publish_id: string; upload_url: string } }>(
      await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
        method: "POST",
        headers: { ...auth, "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          // Unaudited apps can only post privately (SELF_ONLY). Set TIKTOK_PRIVACY=PUBLIC_TO_EVERYONE after the audit.
          post_info: { title: v.caption.slice(0, 2200), privacy_level: process.env.TIKTOK_PRIVACY ?? "SELF_ONLY", disable_comment: false, disable_duet: false, disable_stitch: false },
          source_info: { source: "FILE_UPLOAD", video_size: size, chunk_size: size, total_chunk_count: 1 },
        }),
      }),
      "TikTok upload",
    );
    await j(await fetch(init.data.upload_url, { method: "PUT", headers: { "content-type": "video/mp4", "content-range": `bytes 0-${size - 1}/${size}` }, body: v.bytes }), "TikTok video upload");
    return { externalId: init.data.publish_id, permalink: "" };
  }
  if (p === "yt") {
    const start = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
      method: "POST",
      headers: { ...auth, "content-type": "application/json; charset=UTF-8", "x-upload-content-type": "video/mp4", "x-upload-content-length": String(v.bytes.byteLength) },
      body: JSON.stringify({ snippet: { title: v.title.slice(0, 95), description: `${v.caption}\n\n#Shorts`.slice(0, 4900) }, status: { privacyStatus: "public", selfDeclaredMadeForKids: false } }),
    });
    if (!start.ok) await j(start, "YouTube upload");
    const loc = start.headers.get("location");
    if (!loc) throw new Error("YouTube didn't return an upload address.");
    const done = await j<{ id: string }>(await fetch(loc, { method: "PUT", headers: { "content-type": "video/mp4" }, body: v.bytes }), "YouTube video upload");
    return { externalId: done.id, permalink: `https://youtube.com/shorts/${done.id}` };
  }
  // LinkedIn: Videos API (initialize, upload parts, finalize), then a post.
  const ver = { "linkedin-version": process.env.LINKEDIN_API_VERSION ?? "202609", "x-restli-protocol-version": "2.0.0" };
  const owner = `urn:li:person:${t.accountId}`;
  const init = await j<{ value: { video: string; uploadToken?: string; uploadInstructions: { uploadUrl: string; firstByte: number; lastByte: number }[] } }>(
    await fetch("https://api.linkedin.com/rest/videos?action=initializeUpload", { method: "POST", headers: { ...auth, ...ver, "content-type": "application/json" }, body: JSON.stringify({ initializeUploadRequest: { owner, fileSizeBytes: v.bytes.byteLength, uploadCaptions: false, uploadThumbnail: false } }) }),
    "LinkedIn upload",
  );
  const etags: string[] = [];
  for (const part of init.value.uploadInstructions) {
    const r = await fetch(part.uploadUrl, { method: "PUT", headers: { "content-type": "application/octet-stream" }, body: v.bytes.slice(part.firstByte, part.lastByte + 1) });
    if (!r.ok) throw new Error(`LinkedIn video upload failed (${r.status}).`);
    etags.push(r.headers.get("etag") ?? "");
  }
  await j(await fetch("https://api.linkedin.com/rest/videos?action=finalizeUpload", { method: "POST", headers: { ...auth, ...ver, "content-type": "application/json" }, body: JSON.stringify({ finalizeUploadRequest: { video: init.value.video, uploadToken: init.value.uploadToken ?? "", uploadedPartIds: etags } }) }), "LinkedIn finalize");
  const post = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: { ...auth, ...ver, "content-type": "application/json" },
    body: JSON.stringify({ author: owner, commentary: v.caption.slice(0, 2900), visibility: "PUBLIC", distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] }, content: { media: { title: v.title.slice(0, 200), id: init.value.video } }, lifecycleState: "PUBLISHED", isReshareDisabledByAuthor: false }),
  });
  if (!post.ok) await j(post, "LinkedIn post");
  const urn = post.headers.get("x-restli-id") ?? "";
  return { externalId: urn, permalink: urn ? `https://www.linkedin.com/feed/update/${urn}` : "" };
}

/** Metrics for posts we published. Platforms that don't expose a number return null for it, never a guess. */
export async function metrics(p: PlatformId, t: Tokens, ids: string[]): Promise<Record<string, Metrics>> {
  const out: Record<string, Metrics> = {};
  const empty: Metrics = { views: null, likes: null, comments: null, shares: null, saves: null };
  if (!ids.length) return out;
  if (p === "ig") {
    for (const mid of ids.slice(0, 50)) {
      const r = await fetch(`https://graph.instagram.com/${mid}/insights?${form({ metric: "views,likes,comments,shares,saved", access_token: t.accessToken })}`);
      if (!r.ok) continue;
      const d = (await r.json()) as { data?: { name: string; values?: { value: number }[] }[] };
      const v = (n: string) => d.data?.find((x) => x.name === n)?.values?.[0]?.value ?? null;
      out[mid] = { views: v("views"), likes: v("likes"), comments: v("comments"), shares: v("shares"), saves: v("saved") };
    }
    return out;
  }
  if (p === "tt") {
    const r = await fetch("https://open.tiktokapis.com/v2/video/query/?fields=id,view_count,like_count,comment_count,share_count", { method: "POST", headers: { authorization: `Bearer ${t.accessToken}`, "content-type": "application/json" }, body: JSON.stringify({ filters: { video_ids: ids.slice(0, 20) } }) });
    if (!r.ok) return out;
    const d = (await r.json()) as { data?: { videos?: { id: string; view_count?: number; like_count?: number; comment_count?: number; share_count?: number }[] } };
    for (const v of d.data?.videos ?? []) out[v.id] = { views: v.view_count ?? null, likes: v.like_count ?? null, comments: v.comment_count ?? null, shares: v.share_count ?? null, saves: null };
    return out;
  }
  if (p === "yt") {
    const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?${form({ part: "statistics", id: ids.slice(0, 50).join(",") })}`, { headers: { authorization: `Bearer ${t.accessToken}` } });
    if (!r.ok) return out;
    const d = (await r.json()) as { items?: { id: string; statistics?: { viewCount?: string; likeCount?: string; commentCount?: string } }[] };
    for (const v of d.items ?? []) out[v.id] = { views: num(v.statistics?.viewCount), likes: num(v.statistics?.likeCount), comments: num(v.statistics?.commentCount), shares: null, saves: null };
    return out;
  }
  // LinkedIn member post analytics needs LinkedIn's separate approval; until then we report nothing rather than guess.
  for (const i of ids) out[i] = { ...empty };
  return out;
}

function num(s?: string): number | null {
  return s == null ? null : Number(s);
}
