import type { Source } from "./types";

/** Pages worth reading first: they hold the story, the offer, and the proof. */
const PRIORITY = /(about|story|team|founder|mission|values|services|menu|products?|shop|faq|press|news|blog|reviews|testimonials|case|work|process|pricing)/i;
const SKIP = /\.(png|jpe?g|gif|webp|svg|pdf|zip|mp4|mov|css|js|ico|xml)(\?|$)|(login|signin|cart|checkout|account|privacy|terms|cookie)/i;

const MAX_PAGES = 8;
const MAX_CHARS_PER_PAGE = 12000;
const TIMEOUT_MS = 12000;

export interface CrawlResult {
  sources: Source[];
  text: string;
}

function normalize(input: string): string {
  const s = input.trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

function htmlToText(html: string): { title: string; text: string } {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<(br|p|div|li|h[1-6]|section|article|tr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  return { title, text: (metaDesc ? metaDesc + "\n" : "") + body };
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "FrontmanBot/0.1 (+brand analysis on behalf of the business owner)" },
      redirect: "follow",
    });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.includes("text/html")) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function links(html: string, base: URL): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    try {
      const u = new URL(m[1], base);
      if (u.host !== base.host || SKIP.test(u.pathname)) continue;
      u.hash = "";
      u.search = "";
      out.add(u.toString());
    } catch {
      /* ignore bad hrefs */
    }
  }
  return [...out];
}

/** Read the owner's website: the homepage plus the pages most likely to hold story, offer, and proof. */
export async function crawlSite(website: string): Promise<CrawlResult> {
  const start = normalize(website);
  if (!start) return { sources: [], text: "" };
  const base = new URL(start);
  const homeHtml = await fetchPage(start);
  if (!homeHtml) return { sources: [], text: "" };

  const candidates = links(homeHtml, base)
    .filter((u) => u !== start && u !== start + "/")
    .sort((a, b) => Number(PRIORITY.test(b)) - Number(PRIORITY.test(a)))
    .slice(0, MAX_PAGES - 1);

  const pages = [{ url: start, html: homeHtml }];
  const rest = await Promise.all(candidates.map(async (url) => ({ url, html: await fetchPage(url) })));
  for (const p of rest) if (p.html) pages.push({ url: p.url, html: p.html });

  const sources: Source[] = [];
  const chunks: string[] = [];
  for (const p of pages) {
    const { title, text } = htmlToText(p.html);
    const clipped = text.slice(0, MAX_CHARS_PER_PAGE);
    if (clipped.length < 80) continue;
    sources.push({ url: p.url, title: title || p.url, chars: clipped.length });
    chunks.push(`<page url="${p.url}" title="${title.replace(/"/g, "'")}">\n${clipped}\n</page>`);
  }
  return { sources, text: chunks.join("\n\n") };
}
