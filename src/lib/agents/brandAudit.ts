/**
 * Brand deep dive: the master prompt behind the Terminal's Brand page. Reads everything the owner gave in onboarding
 * (plus the Brand Brief from the website analysis, when there is one) and grades it against the Frontman method:
 * what they're known for, the pillar mix, what each pillar needs, who they're talking to, voice, trust gaps,
 * a field-by-field review of their onboarding answers, and the three things to do first.
 */
import { FRONTMAN_METHOD, modelFor, structured } from "../claude";
import { PILLAR_IDS } from "../pillars";
import type { Business, CompanyAnswers, PillarId } from "../types";

export interface BrandAudit {
  score: number;
  summary: string;
  knownFor: string;
  mix: Record<PillarId, number>;
  pillars: { pillar: PillarId; angle: string; example: string; doingWell: string; missing: string; nextSteps: string[] }[];
  audiences: { name: string; who: string; mustBelieve: string; whereTheyWatch: string; pillar: PillarId }[];
  voice: { traits: string[]; soundsLike: string[]; never: string[] };
  beliefs: string[];
  proofPoints: string[];
  trustGaps: { gap: string; fix: string; pillar: PillarId }[];
  onboarding: { topic: string; youSaid: string; verdict: "strong" | "okay" | "weak" | "missing"; why: string; improve: string }[];
  priorities: { title: string; why: string; pillar: PillarId }[];
  createdAt: string;
}

const str = { type: "string" };
const strs = { type: "array", items: str };
const pillar = { type: "string", enum: PILLAR_IDS };
function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}
const SCHEMA = obj({
  score: { type: "integer" },
  summary: str,
  knownFor: str,
  mix: obj({ teach: { type: "integer" }, show: { type: "integer" }, believe: { type: "integer" }, entertain: { type: "integer" } }),
  pillars: { type: "array", items: obj({ pillar, angle: str, example: str, doingWell: str, missing: str, nextSteps: strs }) },
  audiences: { type: "array", items: obj({ name: str, who: str, mustBelieve: str, whereTheyWatch: str, pillar }) },
  voice: obj({ traits: strs, soundsLike: strs, never: strs }),
  beliefs: strs,
  proofPoints: strs,
  trustGaps: { type: "array", items: obj({ gap: str, fix: str, pillar }) },
  onboarding: { type: "array", items: obj({ topic: str, youSaid: str, verdict: { type: "string", enum: ["strong", "okay", "weak", "missing"] }, why: str, improve: str }) },
  priorities: { type: "array", items: obj({ title: str, why: str, pillar }) },
});

const MASTER = `You are Frontman's brand strategist. Do a deep dive on this owner and tell them exactly what to do to become the trusted face of their business.

The psychology you grade against:
- People decide to trust someone on four things, and each pillar of content builds one: Teach builds belief in their ability and goodwill; Show builds belief in their honesty (proof, the real work, the mess); Believe builds shared values and a vision people want to follow; Entertain builds likability and brings new people in.
- Trust comes from repetition and specificity: the same face, saying concrete things, again and again. Vague claims ("we care about quality") build nothing. Specific stories, numbers the owner actually gave, and visible work do.
- One core association per owner: the single thing people should think of when they see them. Everything else hangs off it.
- Different audiences need to believe different things before they act; name what each one must believe.

Write:
- score: 0-100, how ready this brand is to build trust on camera today, judged only from what's here. summary: two sentences, honest, specific.
- knownFor: one sentence, the core association, in the form "<first name>, the <who> who <what they stand for>".
- mix: target share of videos per pillar for this owner (integers adding to 100).
- pillars: exactly 4, one per pillar in the order teach, show, believe, entertain. angle: the angle that fits this owner. example: one video title they could film this week. doingWell: what in their material already supports this pillar (or "Nothing yet"). missing: what's missing. nextSteps: 2-3 concrete actions.
- audiences: 2-3 groups they're talking to, what each must believe, and where they watch.
- voice: 3-5 traits, 2-4 lines that sound like them (quote their own words when they gave any), 2-4 things they should never say.
- beliefs and proofPoints: only ones grounded in their material. If there are none, return an empty list.
- trustGaps: 3-5 reasons a stranger would hesitate, each with the content that fixes it.
- onboarding: review EVERY answer they gave in onboarding, one item per topic (who they are, what the business does, audience, socials, goal, time per week, camera comfort, where they shoot, look). youSaid: their answer in brief ("" if blank). verdict: strong, okay, weak or missing. why: what this answer does or doesn't give an audience to trust, in plain words. improve: exactly what to change or add, as an example they could copy.
- priorities: the 3 things to do first, most important first.

Rules: Use only the facts given. Never invent names, numbers, customers, awards or results. When something is unknown, say it's missing and what to add, or write [FILL: what to add]. Talk to the owner directly ("you"), in plain, warm, direct words. No jargon.`;

function material(b: Business, co: Partial<CompanyAnswers>): string {
  const brief = b.brief
    ? `\n\nBrand Brief from the website analysis:\n${JSON.stringify({
        oneLiner: b.brief.oneLiner,
        coreAssociation: b.brief.coreAssociation,
        whoTheyServe: b.brief.whoTheyServe,
        whatTheySell: b.brief.whatTheySell,
        voice: b.brief.voice,
        originStory: b.brief.originStory,
        stories: b.brief.stories,
        beliefs: b.brief.beliefs,
        proofPoints: b.brief.proofPoints,
        trustGaps: b.brief.trustGaps,
        customerQuestions: b.brief.customerQuestions,
      })}`
    : "\n\n(No website analysis yet.)";
  const soc = co.soc ?? { ig: "", tt: "", yt: "", li: "" };
  return `Onboarding answers:
- Name and role: ${co.name || ""}${co.role ? `, ${co.role}` : ""}
- Company: ${co.company || b.name}
- Website: ${co.site || b.website || ""}
- What the business does, in their words: ${co.one || ""}
- Industry: ${co.ind || ""}
- Audience: ${(co.aud ?? []).join(", ")}
- Socials: Instagram ${soc.ig || "-"}, TikTok ${soc.tt || "-"}, YouTube ${soc.yt || "-"}, LinkedIn ${soc.li || "-"}
- Goal: ${co.goal || ""}
- Time per week: ${co.mins ?? ""} minutes
- Camera comfort: ${co.cam || ""}
- Where they'll shoot: ${co.where || ""}
- Look they picked: ${co.look || ""}
- Offer: ${b.offer || ""}
- Extra notes: ${b.brainDump && b.brainDump !== co.one ? b.brainDump.slice(0, 6000) : ""}${brief}`;
}

function normalizeMix(m: Record<string, number>): Record<PillarId, number> {
  const raw = PILLAR_IDS.map((p) => Math.max(0, Math.round(Number(m?.[p]) || 0)));
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  const out = raw.map((v) => Math.round((v / sum) * 100));
  out[out.indexOf(Math.max(...out))] += 100 - out.reduce((a, b) => a + b, 0);
  return Object.fromEntries(PILLAR_IDS.map((p, i) => [p, out[i]])) as Record<PillarId, number>;
}

export async function brandAudit(b: Business, co: Partial<CompanyAnswers>): Promise<BrandAudit> {
  const a = await structured<Omit<BrandAudit, "createdAt">>({
    model: modelFor("brand"),
    system: `${FRONTMAN_METHOD}\n\n${MASTER}`,
    prompt: material(b, co),
    schema: SCHEMA,
    maxTokens: 12000,
  });
  const byPillar = new Map(a.pillars.map((p) => [p.pillar, p]));
  return {
    ...a,
    score: Math.max(0, Math.min(100, Math.round(a.score))),
    mix: normalizeMix(a.mix),
    pillars: PILLAR_IDS.map(
      (p) => byPillar.get(p) ?? { pillar: p, angle: "", example: "", doingWell: "Nothing yet", missing: "[FILL: run the deep dive again after adding more about your business]", nextSteps: [] },
    ),
    createdAt: new Date().toISOString(),
  };
}

/** Demo mode: a clearly labeled sample that only repeats what the owner typed. */
export function sampleAudit(b: Business, co: Partial<CompanyAnswers>): BrandAudit {
  const first = (co.name || "You").split(" ")[0];
  return {
    score: 0,
    summary: "Sample only: add ANTHROPIC_API_KEY to run the real deep dive.",
    knownFor: `${first}, [FILL: who you are] who [FILL: what you stand for]`,
    mix: { teach: 30, show: 30, believe: 25, entertain: 15 },
    pillars: PILLAR_IDS.map((p) => ({ pillar: p, angle: "[FILL]", example: "[FILL: a video you could film this week]", doingWell: "Nothing yet", missing: "Sample only", nextSteps: [] })),
    audiences: (co.aud ?? []).slice(0, 3).map((n) => ({ name: n, who: "", mustBelieve: "[FILL]", whereTheyWatch: "", pillar: "teach" as PillarId })),
    voice: { traits: [], soundsLike: [], never: [] },
    beliefs: [],
    proofPoints: [],
    trustGaps: [],
    onboarding: [{ topic: "What the business does", youSaid: co.one || "", verdict: co.one ? "okay" : "missing", why: "Sample only.", improve: "Run the real deep dive for a review of every answer." }],
    priorities: [],
    createdAt: new Date().toISOString(),
  };
}
