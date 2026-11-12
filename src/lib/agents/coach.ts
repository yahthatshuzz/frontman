/**
 * Delivery coach. Three signals, then one judgment:
 * - Words: Deepgram transcription with word timings and filler words -> pace, fillers, long pauses, clarity.
 * - Frames: sampled stills (about 1 per second, sent by the browser) -> Haiku 5.5 checks eye contact, framing and
 *   expression on each frame.
 * - Audio: loudness per half second (computed in the browser) -> how much the voice moves.
 * Opus 5.5 turns the numbers, transcript and frame notes into timestamped moments and tips for the next take.
 */
import type Anthropic from "@anthropic-ai/sdk";
import { demoMode, FRONTMAN_METHOD, modelFor, structured } from "../claude";
import type { TakeCoach } from "../types";

export interface CoachInput {
  videoUrl: string;
  duration: number;
  frames: { t: number; data: string }[];
  loudness: number[];
  script: string;
}

interface Word {
  w: string;
  s: number;
  e: number;
  c: number;
}

const FILLERS = new Set(["um", "uh", "erm", "er", "ah", "hmm", "mm", "uhm", "umm"]);

export function transcriptionReady(): boolean {
  return !!process.env.DEEPGRAM_API_KEY;
}

export async function transcribe(url: string): Promise<{ words: Word[]; transcript: string } | null> {
  const key = process.env.DEEPGRAM_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&punctuate=true&filler_words=true", {
    method: "POST",
    headers: { authorization: `Token ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(`Transcription failed (${res.status}). Check DEEPGRAM_API_KEY.`);
  const j = (await res.json()) as {
    results?: { channels?: { alternatives?: { transcript?: string; words?: { word: string; punctuated_word?: string; start: number; end: number; confidence: number }[] }[] }[] };
  };
  const alt = j.results?.channels?.[0]?.alternatives?.[0];
  return {
    transcript: alt?.transcript ?? "",
    words: (alt?.words ?? []).map((w) => ({ w: w.punctuated_word ?? w.word, s: w.start, e: w.end, c: w.confidence })),
  };
}

function wordMetrics(words: Word[]) {
  const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
  const fillerWords = words.filter((w) => FILLERS.has(clean(w.w)));
  const spoken = words.filter((w) => !FILLERS.has(clean(w.w)));
  const span = words.length ? Math.max(1, words[words.length - 1].e - words[0].s) : 0;
  const pauses: { at: number; len: number }[] = [];
  for (let i = 1; i < words.length; i++) {
    const gap = words[i].s - words[i - 1].e;
    if (gap > 1.2) pauses.push({ at: words[i - 1].e, len: gap });
  }
  const counts = new Map<string, number>();
  for (const f of fillerWords) counts.set(clean(f.w), (counts.get(clean(f.w)) ?? 0) + 1);
  return {
    wpm: span ? Math.round((spoken.length / span) * 60) : 0,
    fill: fillerWords.length,
    fillers: [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([w, n]) => `"${w}" ×${n}`),
    fillerAt: fillerWords.map((f) => f.s),
    pauses,
    clar: words.length ? Math.round((words.reduce((n, w) => n + w.c, 0) / words.length) * 100) : 0,
  };
}

/** Loudness variation, 0-100: a flat monotone scores low, a voice that rises and falls scores high. */
function vocalEnergy(loudness: number[]): number | null {
  const v = loudness.filter((x) => Number.isFinite(x) && x > 0.002);
  if (v.length < 4) return null;
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length);
  const cv = sd / mean;
  return Math.round(Math.max(0, Math.min(100, 40 + cv * 120)));
}

const FRAME_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["frames"],
  properties: {
    frames: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["t", "lookingAtLens", "framing", "expression", "note"],
        properties: {
          t: { type: "number" },
          lookingAtLens: { type: "boolean" },
          framing: { type: "string", enum: ["good", "too tight", "too loose", "off center", "no person"] },
          expression: { type: "string", enum: ["engaged", "neutral", "flat"] },
          note: { type: "string" },
        },
      },
    },
  },
};

type FrameNote = { t: number; lookingAtLens: boolean; framing: string; expression: string; note: string };

async function readFrames(frames: CoachInput["frames"]): Promise<FrameNote[]> {
  const out: FrameNote[] = [];
  for (let i = 0; i < frames.length; i += 30) {
    const batch = frames.slice(i, i + 30);
    const content: Anthropic.ContentBlockParam[] = [
      { type: "text", text: "Frames from one take of a short talking-to-camera video, in order. For each frame, say whether the speaker is looking into the lens, how they're framed, and their expression. note: under 10 words, only if something stands out." },
    ];
    for (const f of batch) {
      content.push({ type: "text", text: `t=${f.t.toFixed(1)}s` });
      content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: f.data } });
    }
    const r = await structured<{ frames: FrameNote[] }>({
      model: modelFor("frames"),
      system: "You check video frames for a delivery coach. Be literal and consistent. Judge eye contact by where the pupils point relative to the camera.",
      prompt: content,
      schema: FRAME_SCHEMA,
      maxTokens: 4000,
      effort: "low",
    });
    out.push(...r.frames);
  }
  return out;
}

const COACH_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "marks", "tips"],
  properties: {
    summary: { type: "string" },
    marks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["at", "kind", "t"],
        properties: { at: { type: "number" }, kind: { type: "string", enum: ["good", "warn"] }, t: { type: "string" } },
      },
    },
    tips: { type: "array", items: { type: "string" } },
  },
};

function scoreOf(m: { wpm: number | null; fill: number | null; eye: number | null; energy: number | null; pauses: number | null }): number {
  let s = 100;
  if (m.wpm != null) s -= Math.abs(m.wpm - 148) * 0.6;
  if (m.fill != null) s -= m.fill * 3;
  if (m.eye != null) s -= (100 - m.eye) * 0.6;
  if (m.energy != null) s -= (100 - m.energy) * 0.25;
  if (m.pauses != null) s -= m.pauses * 2;
  return Math.round(Math.max(20, Math.min(99, s)));
}

export async function coachTake(input: CoachInput): Promise<TakeCoach> {
  const len = Math.max(1, Math.round(input.duration || 0));
  const [tx, frameNotes] = await Promise.all([transcribe(input.videoUrl), !demoMode() && input.frames.length ? readFrames(input.frames.slice(0, 90)) : Promise.resolve([] as FrameNote[])]);
  const wm = tx ? wordMetrics(tx.words) : null;
  const withPerson = frameNotes.filter((f) => f.framing !== "no person");
  const eye = withPerson.length ? Math.round((withPerson.filter((f) => f.lookingAtLens).length / withPerson.length) * 100) : null;
  const vocal = vocalEnergy(input.loudness);
  const face = withPerson.length ? (withPerson.filter((f) => f.expression === "engaged").length / withPerson.length) * 100 : null;
  const energy = vocal != null && face != null ? Math.round(vocal * 0.6 + face * 0.4) : (vocal ?? (face != null ? Math.round(face) : null));
  const metrics = { wpm: wm?.wpm ?? null, fill: wm?.fill ?? null, eye, energy, pauses: wm ? wm.pauses.length : null };

  let summary = "";
  let marks: TakeCoach["marks"] = [];
  let tips: string[] = [];
  if (!demoMode()) {
    const timed = tx ? tx.words.map((w) => `${w.s.toFixed(1)} ${w.w}`).join(" ").slice(0, 20000) : "(no transcript: transcription isn't connected)";
    const r = await structured<{ summary: string; marks: TakeCoach["marks"]; tips: string[] }>({
      model: modelFor("coach"),
      system: `${FRONTMAN_METHOD}\n\nYou are the delivery coach. Coach the owner on how they came across on camera in this take, so the next take is better. Be warm, direct and specific. Only point to moments that are in the data.`,
      prompt: `Take length: ${len}s
Pace: ${metrics.wpm ?? "unknown"} words per minute (natural on-camera is 135-160)
Filler words: ${wm ? `${wm.fill} (${wm.fillers.join(", ") || "none"}) at ${wm.fillerAt.map((t) => t.toFixed(1)).join(", ")}s` : "unknown"}
Long pauses (over 1.2s): ${wm ? wm.pauses.map((p) => `${p.at.toFixed(1)}s for ${p.len.toFixed(1)}s`).join(", ") || "none" : "unknown"}
Eye contact with the lens: ${eye ?? "unknown"}% of frames
Vocal energy (loudness variation 0-100): ${vocal ?? "unknown"}
Frame notes: ${frameNotes.map((f) => `${f.t.toFixed(1)}s ${f.lookingAtLens ? "lens" : "away"} ${f.framing} ${f.expression}${f.note ? ` (${f.note})` : ""}`).join("; ").slice(0, 8000) || "none"}
Transcript with start times:
${timed}

The script they were reading:
${input.script.slice(0, 4000)}

Write:
- summary: one sentence on how this take landed.
- marks: 3-6 moments, each with the time in seconds (at), good or warn, and under 10 words.
- tips: exactly 3 things to do on the next take, each one sentence, most important first.`,
      schema: COACH_SCHEMA,
      maxTokens: 2000,
      effort: "medium",
    });
    summary = r.summary;
    marks = r.marks.filter((m) => m.at >= 0 && m.at <= len + 1).slice(0, 6);
    tips = r.tips.slice(0, 3);
  } else {
    summary = "Sample coaching: add ANTHROPIC_API_KEY for real feedback.";
  }
  return {
    score: scoreOf(metrics),
    ...metrics,
    fillers: wm?.fillers ?? [],
    clar: wm?.clar ?? null,
    len,
    marks,
    tips,
    summary,
    transcript: tx?.transcript ?? "",
    words: tx ? tx.words.map((w) => ({ w: w.w, s: w.s, e: w.e })) : [],
    createdAt: new Date().toISOString(),
  };
}
