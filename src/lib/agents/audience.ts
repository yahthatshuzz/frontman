import { FRONTMAN_METHOD, structured, webResearch } from "../claude";
import { keepSourced } from "../sourcing";
import { PILLAR_IDS } from "../pillars";
import type { AudienceItem, AudienceResearch, Business } from "../types";
import { cleanBreakdown } from "./references";

const str = { type: "string" };

function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}

const ITEMS_SCHEMA = obj({
  summary: str,
  items: {
    type: "array",
    items: obj({
      title: str,
      url: str,
      sourceUrl: str,
      creator: str,
      platform: str,
      breakdown: obj({
        name: str,
        hook: str,
        structure: { type: "array", items: str },
        pillar: { type: "string", enum: PILLAR_IDS },
        length: str,
        whyItWorks: str,
      }),
    }),
  },
});

const RESEARCH_SYSTEM = `${FRONTMAN_METHOD}

Your job right now: find out what content this business's buyers are watching right now, so the owner (who doesn't scroll) can learn from it. Research the audience, not the owner or their industry's marketing.

How to research:
- Use web search. Look for recent coverage of creators, formats, series and specific posts that are popular with this audience: trend reports, creator roundups, news about viral posts, platform pages, and the posts themselves.
- Prefer the last 6 months. Prefer specific creators and posts over generic advice.
- For each find, note: what it is, who made it, which platform, the link to the post if a search returned it, and the URL of the page where you found it.
- Only report what the sources say. Never invent posts, creators, links, view counts or numbers. If a source gives a number, you may quote it with the source; otherwise leave numbers out.`;

const EXTRACT_SYSTEM = `${FRONTMAN_METHOD}

Your job right now: turn research notes into a list of content this business's audience watches, each with a reusable breakdown.

Rules:
- Only include items that appear in the notes with a source URL. sourceUrl must be copied exactly from the notes. url is the post's own link if the notes give one, otherwise repeat the sourceUrl.
- Never invent posts, creators, links, or numbers. If something isn't in the notes, leave it out or use [FILL: ...] in the breakdown.
- breakdown.whyItWorks explains why it works for THIS audience, in one or two sentences.
- breakdown.pillar is the pillar the owner would use it for. breakdown.name is a reusable format name (not the creator's name).
- breakdown.hook and breakdown.structure describe what the source says; anything not described is [FILL: ...].
- summary: two sentences on what this audience is watching right now.
- 4 to 10 items. Fewer is fine if the notes support fewer.`;

export async function researchAudience(b: Business): Promise<Omit<AudienceResearch, "ranAt">> {
  if (!b.brief) throw new Error("Run the business analysis first, so we know who your audience is.");
  const audience = b.brief.whoTheyServe || b.audience;
  const context = `<business>
Name: ${b.name}
What they sell: ${b.brief.whatTheySell}
Who they serve (the audience to research): ${audience}
Questions this audience asks: ${b.brief.customerQuestions.slice(0, 8).join(" | ")}
Topics the owner can teach: ${b.brief.expertiseTopics.slice(0, 8).join(" | ")}
</business>`;

  const research = await webResearch({
    system: RESEARCH_SYSTEM,
    prompt: `${context}

Research what short-form video and creator content this audience is watching and sharing right now. Aim for 6-10 distinct, specific finds with links.`,
    maxSearches: 10,
  });
  if (!research.sources.size) throw new Error("The search didn't return any sources. Try again in a minute.");

  const out = await structured<{ summary: string; items: Omit<AudienceItem, "id" | "sourceTitle">[] }>({
    system: EXTRACT_SYSTEM,
    prompt: `${context}

<research_notes>
${research.notes}
</research_notes>

<source_urls>
${[...research.sources.entries()].map(([u, t]) => `- ${t} :: ${u}`).join("\n")}
</source_urls>

Build the list.`,
    schema: ITEMS_SCHEMA,
    maxTokens: 8000,
    effort: "medium",
  });

  const items = keepSourced(out.items, research.sources, cleanBreakdown);
  return { audience, summary: out.summary, items, searches: research.searches, dropped: out.items.length - items.length };
}
