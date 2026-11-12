import { FRONTMAN_METHOD, structured } from "../claude";
import { PILLAR_IDS } from "../pillars";
import type { Business, VideoBreakdown, VideoMeta, VideoPlatform } from "../types";

const str = { type: "string" };

function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}

export const BREAKDOWN_SCHEMA = obj({
  name: str,
  hook: str,
  structure: { type: "array", items: str },
  pillar: { type: "string", enum: PILLAR_IDS },
  length: str,
  whyItWorks: str,
});

const SYSTEM = `${FRONTMAN_METHOD}

Your job right now: break down a short-form video the owner likes, so its structure can be reused as a format. You cannot watch the video. You only have the post's public metadata (title or caption, author) when the platform provides it, and the owner's note about what they like.

Rules:
- Base every field only on the metadata and the owner's note. Do not guess what happens in the video.
- Anything you can't see from those inputs becomes a placeholder like [FILL: the opening line] so the owner can fill it in after watching.
- name: a short, reusable format name describing the structure (not the creator's name).
- hook: how the video opens, if the caption or note says so; otherwise [FILL: how it opens].
- structure: 3-6 beats as a reusable template. Beats you can't confirm are [FILL: ...].
- pillar: the pillar this format fits best for this business (teach, show, believe, entertain).
- length: the length if stated in the metadata or note, otherwise [FILL: length].
- whyItWorks: one or two sentences on why this structure earns attention or trust, grounded in what the owner said they like.`;

export interface ReferenceInput {
  url: string;
  platform: VideoPlatform;
  meta: VideoMeta | null;
  note: string;
}

export async function breakdownReference(b: Business, ref: ReferenceInput): Promise<VideoBreakdown> {
  const prompt = `<business>
Name: ${b.name}
Core association: ${b.brief?.coreAssociation || "(not analyzed yet)"}
Who they serve: ${b.brief?.whoTheyServe || b.audience || "(not given)"}
</business>

<video>
Platform: ${ref.platform}
Link: ${ref.url}
Title or caption from the platform: ${ref.meta?.title || "(not available)"}
Author: ${ref.meta?.author || "(not available)"}
</video>

<owner_note>
${ref.note || "(no note)"}
</owner_note>

Break this video down.`;
  const out = await structured<VideoBreakdown>({ system: SYSTEM, prompt, schema: BREAKDOWN_SCHEMA, maxTokens: 2000, effort: "medium" });
  return cleanBreakdown(out);
}

export function cleanBreakdown(d: VideoBreakdown): VideoBreakdown {
  return {
    name: (d.name || "Saved format").slice(0, 80),
    hook: (d.hook || "[FILL: how it opens]").slice(0, 300),
    structure: (d.structure || []).map((x) => String(x).slice(0, 200)).filter(Boolean).slice(0, 8),
    pillar: PILLAR_IDS.includes(d.pillar) ? d.pillar : "entertain",
    length: (d.length || "[FILL: length]").slice(0, 40),
    whyItWorks: (d.whyItWorks || "").slice(0, 600),
  };
}
