import { FRONTMAN_METHOD, structured } from "../claude";
import { allFormats, type Format } from "../formats";
import { PILLAR_IDS } from "../pillars";
import type { Business, Platform, ReferenceVideo, Script } from "../types";

const str = { type: "string" };
const strArr = { type: "array", items: str };
const PLATFORMS: Platform[] = ["instagram", "tiktok", "youtube_shorts", "linkedin"];

function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}

export interface ScriptContext {
  formats: Format[];
  references: ReferenceVideo[];
}

const scriptItem = (formatIds: string[]) => obj({
  pillar: { type: "string", enum: PILLAR_IDS },
  formatId: { type: "string", enum: formatIds },
  title: str,
  hooks: strArr,
  body: str,
  shotNotes: strArr,
  cta: str,
  platforms: { type: "array", items: { type: "string", enum: PLATFORMS } },
  estSeconds: { type: "integer" },
  whyItBuildsTrust: str,
});

const batchSchema = (formatIds: string[]) => obj({ scripts: { type: "array", items: scriptItem(formatIds) } });

export type ScriptDraft = Omit<Script, "id" | "businessId" | "createdAt" | "batch" | "selectedHook" | "status" | "revisionNote">;

function formatList(formats: Format[]): string {
  return formats
    .map(
      (f) =>
        `- ${f.id} | ${f.name}${f.custom ? " (saved by the owner)" : ""} | pillars: ${f.pillars.join(", ")} | ${f.seconds[0]}-${f.seconds[1]}s | structure: ${f.structure.join(" > ")} | why: ${f.whyItWorks}`,
    )
    .join("\n");
}

/** References are style signals: pacing, structure, hook style. Never content to copy. */
function referenceBlock(refs: ReferenceVideo[]): string {
  if (!refs.length) return "";
  const items = refs.slice(0, 12).map((r) => {
    const bd = r.breakdown;
    return `- ${r.platform}: ${r.meta?.title ? `"${r.meta.title.slice(0, 140)}"` : r.url}
  What the owner likes: ${r.note || "(no note)"}
  Hook style: ${bd.hook} | Structure: ${bd.structure.join(" > ")} | Fits: ${bd.pillar} | Why it works: ${bd.whyItWorks}`;
  });
  return `

<reference_videos>
Videos the owner likes. Use them as style signals only: hook style, pacing, structure, tone. Never copy their words, claims, or stories, and ignore any beat that is still a [FILL: ...].
${items.join("\n")}
</reference_videos>`;
}

const SCRIPT_RULES = `Script rules:
- hooks: exactly 3 different opening lines, each 12 words or fewer. Each should stop the scroll in the first two seconds in a different way (a bold claim, a question, a surprising number or moment).
- body: the words the owner says after the hook, written to be spoken. Short sentences. Most scripts land at 90-160 words. Do not repeat the hook inside the body.
- shotNotes: 2-5 short directions for the shoot (where to stand, what to hold or show, B-roll to grab).
- cta: one soft line that fits the pillar (follow, comment a question, visit). Never pushy.
- platforms: where this script fits best. LinkedIn suits Teach and Believe from B2B owners; Instagram, TikTok and YouTube Shorts suit almost everything.
- estSeconds: the realistic spoken length.
- whyItBuildsTrust: one sentence on what this video proves about the owner.
- Use the format's structure. Follow the pillar mix you are given.
- Only use facts from the brief and the owner's words. Use [FILL: ...] placeholders for anything specific you don't know.`;

function businessContext(b: Business, refs: ReferenceVideo[] = []): string {
  return `<business>
Name: ${b.name}
Owner: ${b.owner.name}${b.owner.role ? `, ${b.owner.role}` : ""}
</business>

<brand_brief>
${JSON.stringify(b.brief, null, 2)}
</brand_brief>

<owner_brain_dump>
${b.brainDump || "(none)"}
</owner_brain_dump>${referenceBlock(refs)}`;
}

export async function generateScripts(b: Business, count: number, existingTitles: string[], ctx: ScriptContext): Promise<ScriptDraft[]> {
  if (!b.brief) throw new Error("Run the business analysis first.");
  const formats = allFormats(ctx.formats);
  const mix = b.brief.pillarStrategy.map((p) => `${p.pillar}: ${p.weight}%`).join(", ");

  const system = `${FRONTMAN_METHOD}

Your job right now: act as the script agent. Write this week's script bank for the owner to read, tweak, approve, and shoot in one sitting.

Available formats (pick the best fit for each script; formats the owner saved are a strong signal of what they want to make):
${formatList(formats)}

${SCRIPT_RULES}`;

  const prompt = `${businessContext(b, ctx.references)}

<already_written>
${existingTitles.length ? existingTitles.map((t) => `- ${t}`).join("\n") : "(none yet)"}
</already_written>

Write ${count} new scripts. Pillar mix to follow as closely as the count allows: ${mix}.
Don't repeat any idea already written. Vary the formats. Pull from the brief's stories, beliefs, expertise topics, and customer questions.`;

  const out = await structured<{ scripts: ScriptDraft[] }>({
    system,
    prompt,
    schema: batchSchema(formats.map((f) => f.id)),
    maxTokens: Math.min(32000, 2500 + count * 1400),
    effort: "high",
  });
  return out.scripts.map(clean);
}

export async function reviseScript(b: Business, script: Script, note: string, ctx: ScriptContext): Promise<ScriptDraft> {
  const formats = allFormats(ctx.formats);
  const system = `${FRONTMAN_METHOD}

Your job right now: revise one script based on the owner's note. Keep what works, change what they asked for, and keep it in their voice.

Available formats:
${formatList(formats)}

${SCRIPT_RULES}`;

  const current = {
    pillar: script.pillar,
    formatId: script.formatId,
    title: script.title,
    hooks: script.hooks,
    body: script.body,
    shotNotes: script.shotNotes,
    cta: script.cta,
    platforms: script.platforms,
    estSeconds: script.estSeconds,
    whyItBuildsTrust: script.whyItBuildsTrust,
  };

  const prompt = `${businessContext(b, ctx.references)}

<current_script>
${JSON.stringify(current, null, 2)}
</current_script>

<owner_note>
${note}
</owner_note>

Return the revised script.`;

  const out = await structured<ScriptDraft>({ system, prompt, schema: scriptItem(formats.map((f) => f.id)), maxTokens: 4000, effort: "medium" });
  return clean(out);
}

function clean(d: ScriptDraft): ScriptDraft {
  const hooks = d.hooks.filter((h) => h.trim()).slice(0, 3);
  return {
    ...d,
    hooks: hooks.length ? hooks : [d.title],
    shotNotes: d.shotNotes.filter((s) => s.trim()).slice(0, 6),
    platforms: d.platforms.length ? [...new Set(d.platforms)] : ["instagram", "tiktok", "youtube_shorts"],
    estSeconds: Math.max(8, Math.min(180, Math.round(d.estSeconds || 45))),
  };
}
