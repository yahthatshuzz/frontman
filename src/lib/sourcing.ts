import type { AudienceItem, VideoBreakdown } from "./types";

/** Normalize a URL for comparing against search results (no hash, no trailing slash, no www, lowercase). */
export function urlKey(u: string): string {
  try {
    const x = new URL(u);
    x.hash = "";
    return (x.protocol + "//" + x.host.toLowerCase().replace(/^www\./, "") + x.pathname.replace(/\/+$/, "") + x.search).toLowerCase();
  } catch {
    return u.trim().toLowerCase();
  }
}

export type ProposedItem = Omit<AudienceItem, "id" | "sourceTitle">;

/**
 * Keep only items whose source URL really came back from a search, and keep a post link only if a search returned
 * it too (otherwise point at the source). Never trust a link the model typed.
 */
export function keepSourced(proposed: ProposedItem[], sources: Map<string, string>, clean: (b: VideoBreakdown) => VideoBreakdown = (b) => b): AudienceItem[] {
  const items: AudienceItem[] = [];
  for (const it of proposed) {
    const title = sources.get(urlKey(it.sourceUrl));
    if (!title) continue;
    const url = sources.has(urlKey(it.url)) ? it.url : it.sourceUrl;
    items.push({
      id: crypto.randomUUID(),
      title: it.title.slice(0, 200),
      url,
      sourceUrl: it.sourceUrl,
      sourceTitle: title,
      creator: it.creator.slice(0, 120),
      platform: it.platform.slice(0, 40),
      breakdown: clean(it.breakdown),
    });
  }
  return items;
}
