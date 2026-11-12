/**
 * Edit agents.
 * - planEdit: Opus 5.5 reads the take's word timings and writes an edit decision list (what to keep, the on-screen hook,
 *   caption grouping) in the chosen style or reference.
 * - analyzeReference: Opus 5.5 looks at sampled frames of a reference video (or reads a description) and writes a
 *   reusable edit profile: cut pace, caption look, hook overlay, color, extras.
 */
import type Anthropic from "@anthropic-ai/sdk";
import { demoMode, FRONTMAN_METHOD, modelFor, structured } from "../claude";

export interface EditPlan {
  keep: { start: number; end: number }[];
  hookText: string;
  hookSeconds: number;
  wordsPerCaption: number;
  did: string[];
}

export interface RefProfile {
  name: string;
  cutEverySeconds: number;
  captions: { wordsPerLine: number; letterCase: "upper" | "lower" | "sentence"; font: "sans" | "grotesk" | "serif" | "mono" | "typewriter"; color: string; highlight: string; box: "none" | "glass" | "solid"; position: "top" | "middle" | "bottom" };
  hookOverlay: string;
  look: "none" | "warm" | "vhs" | "bw" | "grain";
  extras: string[];
  summary: string;
}

const str = { type: "string" };
const num = { type: "number" };
function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}

const PLAN_SCHEMA = obj({
  keep: { type: "array", items: obj({ start: num, end: num }) },
  hookText: str,
  hookSeconds: num,
  wordsPerCaption: { type: "integer" },
  did: { type: "array", items: str },
});

export async function planEdit(input: {
  words: { w: string; s: number; e: number }[];
  duration: number;
  script: string;
  hook: string;
  styleBrief: string;
  reference: RefProfile | null;
  note: string;
}): Promise<EditPlan> {
  const dur = Math.max(1, input.duration);
  if (demoMode() || !input.words.length) {
    const start = input.words.length ? Math.max(0, input.words[0].s - 0.15) : 0;
    const end = input.words.length ? Math.min(dur, input.words[input.words.length - 1].e + 0.3) : dur;
    return { keep: [{ start, end }], hookText: input.hook.slice(0, 60), hookSeconds: 2.5, wordsPerCaption: 3, did: ["Trimmed dead air at the start and end."] };
  }
  const timed = input.words.map((w) => `${w.s.toFixed(2)}-${w.e.toFixed(2)} ${w.w}`).join("\n").slice(0, 60000);
  const plan = await structured<EditPlan>({
    model: modelFor("edit"),
    system: `${FRONTMAN_METHOD}\n\nYou are the editor. You cut a talking-to-camera take into a short-form vertical video.`,
    prompt: `Take length: ${dur.toFixed(1)}s. Words with start-end times (seconds):
${timed}

The script they meant to say:
${input.script.slice(0, 4000)}

Edit style:
${input.styleBrief}
${input.reference ? `\nMatch this reference edit as closely as the footage allows:\n${JSON.stringify(input.reference)}` : ""}${input.note ? `\nThe owner's note: ${input.note}` : ""}

Write the edit decision list:
- keep: the time ranges to keep, in order, using the word times above. Cut false starts and repeated lines (keep the last clean attempt), filler words ("um", "uh"), and pauses longer than about 0.6s. Never cut mid-word: start a range 0.05s before its first word and end it 0.1s after its last word.
- hookText: the on-screen text for the first seconds, under 8 words, taken from what they actually say in the opening line.
- hookSeconds: how long the hook text stays up (1.5-3.5).
- wordsPerCaption: words shown at once (1-5) for this style.
- did: 2-4 short lines for the owner on what you did ("Cut 3 restarts and 5 ums").`,
    schema: PLAN_SCHEMA,
    maxTokens: 6000,
    effort: "medium",
  });
  const keep = plan.keep
    .map((k) => ({ start: Math.max(0, Math.min(dur, k.start)), end: Math.max(0, Math.min(dur, k.end)) }))
    .filter((k) => k.end - k.start >= 0.25)
    .sort((a, b) => a.start - b.start)
    .reduce<{ start: number; end: number }[]>((acc, k) => {
      const last = acc[acc.length - 1];
      if (last && k.start <= last.end) last.end = Math.max(last.end, k.end);
      else acc.push(k);
      return acc;
    }, []);
  return {
    keep: keep.length ? keep : [{ start: 0, end: dur }],
    hookText: plan.hookText.slice(0, 80),
    hookSeconds: Math.max(1, Math.min(4, plan.hookSeconds || 2.5)),
    wordsPerCaption: Math.max(1, Math.min(6, Math.round(plan.wordsPerCaption || 3))),
    did: plan.did.slice(0, 4),
  };
}

const REF_SCHEMA = obj({
  name: str,
  cutEverySeconds: num,
  captions: obj({
    wordsPerLine: { type: "integer" },
    letterCase: { type: "string", enum: ["upper", "lower", "sentence"] },
    font: { type: "string", enum: ["sans", "grotesk", "serif", "mono", "typewriter"] },
    color: str,
    highlight: str,
    box: { type: "string", enum: ["none", "glass", "solid"] },
    position: { type: "string", enum: ["top", "middle", "bottom"] },
  }),
  hookOverlay: str,
  look: { type: "string", enum: ["none", "warm", "vhs", "bw", "grain"] },
  extras: { type: "array", items: str },
  summary: str,
});

export async function analyzeReference(input: { name: string; note: string; frames: { t: number; data: string }[]; duration: number; loudness: number[] }): Promise<RefProfile> {
  if (demoMode()) {
    return { name: input.name, cutEverySeconds: 2, captions: { wordsPerLine: 3, letterCase: "upper", font: "grotesk", color: "#FFFFFF", highlight: "#FFD60A", box: "none", position: "middle" }, hookOverlay: "Big text, first 2 seconds", look: "none", extras: [], summary: "Sample profile: add ANTHROPIC_API_KEY to study the real video." };
  }
  // Cuts show up as big jumps between neighboring frames; count them for Claude as a hint.
  const content: Anthropic.ContentBlockParam[] = [
    {
      type: "text",
      text: `Study this reference ${input.frames.length ? `video (${input.duration.toFixed(1)}s; frames sampled in order)` : "edit, described in words"} and write an edit profile someone could apply to their own raw talking-head footage. Describe only what you can see${input.frames.length ? "" : " or what the description says"}. Colors as hex.${input.note ? `\nThe owner says: ${input.note}` : ""}`,
    },
  ];
  for (const f of input.frames.slice(0, 60)) {
    content.push({ type: "text", text: `t=${f.t.toFixed(1)}s` });
    content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: f.data } });
  }
  const p = await structured<RefProfile>({
    model: modelFor("edit"),
    system: "You are a short-form video editor who reverse-engineers edits: pacing, captions, on-screen hooks, color and effects.",
    prompt: content,
    schema: REF_SCHEMA,
    maxTokens: 3000,
    effort: "medium",
  });
  return { ...p, name: p.name || input.name, cutEverySeconds: Math.max(0.5, Math.min(10, p.cutEverySeconds || 2)) };
}
