import type { VideoMeta, VideoPlatform } from "./types";

/**
 * Reads public post metadata (title or caption, author) through each platform's oEmbed endpoint.
 * We never download or store the video. LinkedIn has no public oEmbed for posts; Instagram needs a Meta app token.
 */

const HOSTS: { platform: VideoPlatform; test: RegExp }[] = [
  { platform: "tiktok", test: /(^|\.)tiktok\.com$/ },
  { platform: "instagram", test: /(^|\.)instagram\.com$/ },
  { platform: "youtube", test: /(^|\.)(youtube\.com|youtu\.be)$/ },
  { platform: "linkedin", test: /(^|\.)linkedin\.com$/ },
];

export function parseVideoUrl(raw: string): { url: string; platform: VideoPlatform } {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    throw new Error("Paste the full link to a TikTok, Instagram, YouTube or LinkedIn post.");
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Paste a web link that starts with https://.");
  const host = u.hostname.toLowerCase();
  const hit = HOSTS.find((h) => h.test.test(host));
  if (!hit) throw new Error("That link isn't from TikTok, Instagram, YouTube or LinkedIn.");
  u.protocol = "https:";
  u.hash = "";
  return { url: u.toString(), platform: hit.platform };
}

function endpoint(platform: VideoPlatform, url: string): string | null {
  const q = encodeURIComponent(url);
  switch (platform) {
    case "youtube":
      return `https://www.youtube.com/oembed?format=json&url=${q}`;
    case "tiktok":
      return `https://www.tiktok.com/oembed?url=${q}`;
    case "instagram": {
      const token = process.env.META_OEMBED_TOKEN;
      return token ? `https://graph.facebook.com/v21.0/instagram_oembed?url=${q}&access_token=${encodeURIComponent(token)}` : null;
    }
    case "linkedin":
      return null;
  }
}

/** Best effort: returns null when the platform has no public endpoint, the post is private, or the request fails. */
export async function fetchMeta(platform: VideoPlatform, url: string): Promise<VideoMeta | null> {
  const ep = endpoint(platform, url);
  if (!ep) return null;
  try {
    const res = await fetch(ep, { signal: AbortSignal.timeout(6000), headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const j = (await res.json()) as Record<string, unknown>;
    const title = typeof j.title === "string" ? j.title.slice(0, 2000) : "";
    const author = typeof j.author_name === "string" ? j.author_name.slice(0, 200) : "";
    const provider = typeof j.provider_name === "string" ? j.provider_name : platform;
    return title || author ? { title, author, provider } : null;
  } catch {
    return null;
  }
}
