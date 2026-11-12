import { FRONTMAN_METHOD, structured } from "../claude";
import { PILLAR_IDS } from "../pillars";
import type { BrandBrief, Business } from "../types";

const str = { type: "string" };
const strArr = { type: "array", items: str };
const pillar = { type: "string", enum: PILLAR_IDS };

function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}

export const BRIEF_SCHEMA = obj({
  oneLiner: str,
  whoTheyServe: str,
  whatTheySell: str,
  coreAssociation: str,
  voice: obj({ traits: strArr, phrases: strArr, avoid: strArr }),
  originStory: str,
  proofPoints: strArr,
  stories: { type: "array", items: obj({ title: str, summary: str, pillar }) },
  beliefs: strArr,
  expertiseTopics: strArr,
  customerQuestions: strArr,
  trustGaps: { type: "array", items: obj({ gap: str, fix: str }) },
  pillarStrategy: {
    type: "array",
    items: obj({ pillar, weight: { type: "integer" }, angle: str, examples: strArr }),
  },
  missingInfo: strArr,
});

const SYSTEM = `${FRONTMAN_METHOD}

Your job right now: act as the analysis agent. Study everything about this business and write its Brand Brief, the foundation every script is built on.

How to weigh the inputs:
- The owner's own words (the brain dump) are the most valuable source. That is where the stories, opinions, and voice live.
- The website is marketing copy. Use it for facts about the offer, the audience, and proof, not for voice.

Field guidance:
- oneLiner: what the business is, in one plain sentence.
- coreAssociation: the one thing the owner should become known for. Specific, not generic.
- voice.traits: how the owner comes across (3-6). voice.phrases: words or lines the owner actually uses, quoted from their words when possible. voice.avoid: tones or words that would sound fake for them.
- originStory: only if the sources contain it; otherwise an empty string and add it to missingInfo.
- proofPoints: verifiable facts that build credibility (years in business, customers served, results). Only from the sources.
- stories: every distinct story you can find (6-15), each tagged with the pillar it fits best.
- beliefs: opinions and values the owner holds, especially ones the industry would argue with.
- expertiseTopics: what the owner can teach better than most.
- customerQuestions: questions this business's customers ask or would ask (8-15).
- trustGaps: the reasons a stranger would hesitate to trust this business today, each with the content fix.
- pillarStrategy: exactly one entry per pillar (teach, show, believe, entertain). weight is the share of the weekly mix and the four weights add up to 100. angle says how this owner should play that pillar. examples are 3 specific video ideas each.
- missingInfo: what you would need from the owner to write stronger scripts. Phrase each as a question to ask them.`;

export async function analyzeBusiness(b: Business, siteText: string): Promise<BrandBrief> {
  const prompt = `<business>
Name: ${b.name}
Website: ${b.website || "(none)"}
Owner: ${b.owner.name}${b.owner.role ? `, ${b.owner.role}` : ""}
Social profiles: ${b.socials || "(none given)"}
Who they serve (owner's description): ${b.audience || "(not given)"}
What they sell (owner's description): ${b.offer || "(not given)"}
</business>

<owner_brain_dump>
${b.brainDump || "(none yet)"}
</owner_brain_dump>

<extra_notes>
${b.notes || "(none)"}
</extra_notes>

<website>
${siteText || "(website could not be read)"}
</website>

Write the Brand Brief.`;

  const brief = await structured<BrandBrief>({ system: SYSTEM, prompt, schema: BRIEF_SCHEMA, maxTokens: 12000, effort: "high" });
  return normalizeBrief(brief);
}

/** Make sure every pillar is present once and the weights add to 100. */
export function normalizeBrief(brief: BrandBrief): BrandBrief {
  const plans = PILLAR_IDS.map(
    (id) => brief.pillarStrategy.find((p) => p.pillar === id) ?? { pillar: id, weight: 25, angle: "", examples: [] },
  );
  const total = plans.reduce((n, p) => n + Math.max(0, p.weight), 0) || 1;
  let running = 0;
  plans.forEach((p, i) => {
    p.weight = i === plans.length - 1 ? 100 - running : Math.round((Math.max(0, p.weight) / total) * 100);
    running += p.weight;
  });
  return { ...brief, pillarStrategy: plans };
}
