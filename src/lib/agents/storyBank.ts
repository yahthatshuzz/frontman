/**
 * Story bank for the Terminal's Studio. Each category is one story the owner can tell (origin, a belief, a how-to,
 * behind the scenes...), written as raw material the Studio composes into scripts: 3 angles (story-led, straight
 * answer, contrarian), a title and 3 hooks per angle, an opener per angle, 6 beats and 5 open loops.
 * Same shape as the prototype's CATS, so the Studio UI works unchanged.
 */
import { FRONTMAN_METHOD, modelFor, structured } from "../claude";
import { PILLAR_IDS } from "../pillars";
import type { Business, CompanyAnswers } from "../types";

export interface StoryCategory {
  id: string;
  name: string;
  pillar: (typeof PILLAR_IDS)[number];
  desc: string;
  titles: string[];
  hooks: string[][];
  open: string[];
  beats: string[];
  loops: string[];
  custom?: boolean;
}

const str = { type: "string" };
function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}
const CATEGORY = obj({
  name: str,
  pillar: { type: "string", enum: PILLAR_IDS },
  desc: str,
  titles: { type: "array", items: str },
  hooks: { type: "array", items: { type: "array", items: str } },
  open: { type: "array", items: str },
  beats: { type: "array", items: str },
  loops: { type: "array", items: str },
});
const SCHEMA = obj({ categories: { type: "array", items: CATEGORY } });

const RULES = `Write a story bank: raw material the owner's Studio turns into short-form scripts.

Each category is ONE story or idea the owner can tell on camera. Give it:
- name: 2-4 words ("Origin story", "Why we price this way").
- pillar: teach, show, believe or entertain.
- desc: one short line, what this story is about.
- titles: exactly 3, one per angle, in this order: story-led, straight answer, contrarian.
- hooks: exactly 3 lists (one per angle, same order), each with exactly 3 spoken hooks. A hook is the first line said to camera: under 15 words, specific, no clickbait the story can't pay off.
- open: exactly 3 optional openers (one per angle) placed before the first beat. Use "" when the angle needs none.
- beats: exactly 6 short spoken paragraphs (40-70 words each) in the owner's voice, first person, in story order. Beat 1 sets up, beats 2-5 build, beat 6 lands the lesson.
- loops: exactly 5 one-sentence open loops that keep people watching between beats ("And then hour six happened.").

Rules:
- Use only facts from the material below. Never invent names, numbers, dates, customers, results or events. When a beat needs a detail you don't have, write [FILL: what to add] in its place.
- Sound like the owner talking, not like marketing. Short sentences. Plain words.
- Cover all four pillars across the bank, weighted toward what builds trust for this business.`;

function material(b: Business, co: Partial<CompanyAnswers>, extra: string): string {
  const brief = b.brief
    ? `\nBrand Brief (from the analysis agent):\n${JSON.stringify({
        oneLiner: b.brief.oneLiner,
        coreAssociation: b.brief.coreAssociation,
        voice: b.brief.voice,
        originStory: b.brief.originStory,
        stories: b.brief.stories,
        beliefs: b.brief.beliefs,
        expertiseTopics: b.brief.expertiseTopics,
        proofPoints: b.brief.proofPoints,
        customerQuestions: b.brief.customerQuestions,
      })}`
    : "";
  return `Business: ${b.name}
Owner: ${b.owner.name || co.name || "[unknown]"}${b.owner.role ? `, ${b.owner.role}` : ""}
What they do (owner's words): ${co.one || b.brainDump || "[not given]"}
Industry: ${co.ind || "[not given]"}
Audience: ${(co.aud ?? []).join(", ") || b.audience || "[not given]"}
Offer: ${b.offer || "[not given]"}
Website: ${b.website || "[none]"}
Goal: ${co.goal || "trust"}${brief}${extra ? `\n\nMore from the owner:\n${extra}` : ""}`;
}

function slug(s: string, i: number): string {
  return (s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "story") + "-" + i;
}

/** Make the shape exact so the Studio never breaks on a short list. */
export function cleanCategory(c: Omit<StoryCategory, "id">, i: number): StoryCategory {
  const three = <T,>(a: T[] | undefined, fill: T): T[] => [...(a ?? []), fill, fill, fill].slice(0, 3);
  const beats = [...(c.beats ?? [])].filter(Boolean);
  while (beats.length < 6) beats.push("[FILL: add what happened next]");
  const loops = [...(c.loops ?? [])].filter(Boolean);
  while (loops.length < 5) loops.push("Stay with me, because this is where it turns.");
  return {
    id: slug(c.name, i),
    name: c.name || "Your story",
    pillar: PILLAR_IDS.includes(c.pillar) ? c.pillar : "believe",
    desc: c.desc || "",
    titles: three(c.titles, c.name || "Your story"),
    hooks: three(c.hooks, [] as string[]).map((h) => three(h.filter(Boolean), h[0] ?? "Here's something I've never said on camera.")),
    open: three(c.open, ""),
    beats: beats.slice(0, 6),
    loops: loops.slice(0, 5),
  };
}

export async function writeStoryBank(b: Business, co: Partial<CompanyAnswers>, extra = "", count = 6): Promise<StoryCategory[]> {
  const out = await structured<{ categories: Omit<StoryCategory, "id">[] }>({
    model: modelFor("story"),
    system: `${FRONTMAN_METHOD}\n\n${RULES}`,
    prompt: `${material(b, co, extra)}\n\nWrite ${count} categories.`,
    schema: SCHEMA,
    maxTokens: 16000,
  });
  return out.categories.slice(0, count).map(cleanCategory);
}

/** One category from a story the owner told in the "Tell my story" chat. */
export async function storyFromChat(b: Business, co: Partial<CompanyAnswers>, title: string, transcript: string): Promise<StoryCategory> {
  const out = await structured<{ categories: Omit<StoryCategory, "id">[] }>({
    model: modelFor("story"),
    system: `${FRONTMAN_METHOD}\n\n${RULES}`,
    prompt: `${material(b, co, "")}\n\nThe owner just told this story in their own words${title ? ` (they called it "${title}")` : ""}:\n"""\n${transcript.slice(0, 12000)}\n"""\n\nWrite exactly 1 category built only from this story.`,
    schema: SCHEMA,
    maxTokens: 6000,
  });
  const c = cleanCategory(out.categories[0] ?? { name: title || "Your story", pillar: "believe", desc: "", titles: [], hooks: [], open: [], beats: [], loops: [] }, Date.now() % 100000);
  return { ...c, custom: true };
}

/** Demo mode (no API key): a clearly labeled sample built only from what the owner typed. */
export function sampleBank(b: Business, co: Partial<CompanyAnswers>): StoryCategory[] {
  const name = b.name || "your business";
  const one = co.one || b.brainDump || `[FILL: what ${name} does]`;
  const mk = (n: string, pillar: StoryCategory["pillar"], desc: string, first: string): StoryCategory =>
    cleanCategory(
      {
        name: n,
        pillar,
        desc: `${desc} (sample: add an API key for real scripts)`,
        titles: [n, `${n}: the short version`, `${n}: what most people get wrong`],
        hooks: [[first, `Here's the real story behind ${name}.`, "I've never said this on camera."], [`The short answer: ${one.split(/[.!?]/)[0]}.`, "Here's how it works.", "Most people ask me this."], ["Unpopular opinion.", "Everyone gets this wrong.", "I disagree with the usual advice."]],
        open: ["", "", ""],
        beats: [`${one}`, "[FILL: the moment it started]", "[FILL: what was hard]", "[FILL: what you did about it]", "[FILL: what changed for customers]", "[FILL: the lesson you'd tell a friend]"],
        loops: [],
      },
      0,
    );
  return [
    { ...mk("Origin story", "believe", "How it started", `This is how ${name} started.`), id: "origin" },
    { ...mk("How it works", "teach", "Explain what you do", `Here's exactly what ${name} does.`), id: "how" },
    { ...mk("Behind the scenes", "show", "Show the work", "Come with me for a day."), id: "bts" },
  ];
}
