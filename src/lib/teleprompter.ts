/**
 * Teleprompter engine for the Shoot stage (roadmap step 2). No UI lives here; the phone recorder (/r/[token]) uses it.
 *
 * Three modes:
 * - voice:  follow the owner's speech with the Web Speech API and scroll to match (default when supported)
 * - timed:  scroll at the speed that makes the read land on a target length
 * - manual: the owner sets the speed
 *
 * Browser support for voice: Chrome and Edge on desktop are solid. iOS Safari exposes webkitSpeechRecognition, but it
 * stops after short pauses and ignores `continuous`, so the phone page must restart recognition on `end` and fall back
 * to timed mode if it keeps failing. Test on a real iPhone.
 */
import type { Script, TeleprompterMode, TeleprompterSettings } from "./types";

export const TARGET_PRESETS = [30, 45, 60] as const;

export const DEFAULT_TELEPROMPTER: TeleprompterSettings = {
  mode: "voice",
  targetSeconds: 45,
  narration: "full",
  textSize: 32,
  manualWpm: 140,
};

export const FALLBACK_NOTE = "Voice tracking isn't available in this browser, so the script scrolls on a timer.";

/** What the owner reads: the chosen hook, then the body. */
export function readingText(script: Pick<Script, "hooks" | "selectedHook" | "body">): string {
  const hook = script.hooks[script.selectedHook] ?? script.hooks[0] ?? "";
  return [hook, script.body].filter(Boolean).join("\n\n");
}

export interface Token {
  word: string; // normalized, for matching
  line: number; // index into lines
}

export interface PreparedScript {
  lines: string[];
  tokens: Token[];
}

/** Normalize a word for matching: lowercase, no punctuation, [FILL: ...] placeholders dropped. */
export function normalize(w: string): string {
  return w
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

/** Split into display lines (sentences and paragraphs) and matchable tokens. */
export function prepare(text: string): PreparedScript {
  const clean = text.replace(/\[FILL:[^\]]*\]/g, " ");
  const lines = clean
    .split(/\n+/)
    .flatMap((p) => p.split(/(?<=[.!?])\s+/))
    .map((l) => l.replace(/\s+([,.!?;:])/g, "$1").trim())
    // Lines that were only a [FILL: ...] placeholder have nothing left to read.
    .filter((l) => /[a-z0-9]/i.test(l));
  const tokens: Token[] = [];
  lines.forEach((l, line) => {
    for (const raw of l.split(/\s+/)) {
      const word = normalize(raw);
      if (word) tokens.push({ word, line });
    }
  });
  return { lines, tokens };
}

export function wordCount(text: string): number {
  return prepare(text).tokens.length;
}

/** Timed mode: the speed that makes `text` take `targetSeconds` to read. */
export function timedPace(text: string, targetSeconds: number): { words: number; wpm: number; wordsPerSecond: number } {
  const words = wordCount(text);
  const secs = Math.max(5, targetSeconds);
  const wordsPerSecond = words / secs;
  return { words, wpm: Math.round(wordsPerSecond * 60), wordsPerSecond };
}

/** Similarity of two normalized words, 0..1, tolerant of misheard words ("Sandlot" vs "sandlock"). */
export function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  const m = a.length,
    n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return 1 - prev[n] / Math.max(m, n);
}

export interface TrackerOptions {
  /** How many of the most recent heard words to match. */
  window?: number;
  /** How far ahead of the current position to search, in words. Allows skipped lines. */
  lookahead?: number;
  /** Per-word similarity that counts as a match. */
  minSimilarity?: number;
  /** Share of the window that must match before the position moves. */
  minScore?: number;
}

export interface TrackerState {
  /** Index of the next word the owner should say. */
  word: number;
  /** Line to highlight: the one the owner is saying now. */
  line: number;
}

/**
 * Follows speech through a prepared script. Feed it the recognizer's running transcript (final + interim).
 * It matches the last few heard words against a sliding window of the script, so skipped or misheard words
 * don't break tracking, and it never jumps back more than one line.
 */
export function createTracker(script: PreparedScript, opts: TrackerOptions = {}) {
  const win = opts.window ?? 5;
  const lookahead = opts.lookahead ?? 40;
  const minSim = opts.minSimilarity ?? 0.72;
  const minScore = opts.minScore ?? 0.6;
  const { tokens } = script;
  let state: TrackerState = { word: 0, line: 0 };

  function scoreAt(end: number, heard: string[]): number {
    // Align heard words backward from `end` (exclusive), allowing one skipped script word per heard word.
    let s = end - 1,
      hits = 0;
    for (let h = heard.length - 1; h >= 0 && s >= 0; h--) {
      if (similarity(heard[h], tokens[s].word) >= minSim) {
        hits++;
        s--;
      } else if (s - 1 >= 0 && similarity(heard[h], tokens[s - 1].word) >= minSim) {
        hits++;
        s -= 2; // script word skipped by the speaker
      }
      // otherwise the heard word is noise or misheard; skip it
    }
    return hits / heard.length;
  }

  return {
    get state(): TrackerState {
      return state;
    },
    reset() {
      state = { word: 0, line: 0 };
    },
    /** Jump to a line the owner tapped. */
    seekLine(line: number) {
      const i = tokens.findIndex((t) => t.line >= line);
      state = i < 0 ? state : { word: i, line: tokens[i].line };
    },
    update(transcript: string): TrackerState {
      const heard = transcript.split(/\s+/).map(normalize).filter(Boolean).slice(-win);
      if (!heard.length || !tokens.length) return state;
      // Never move back more than one line from the current position.
      const minLine = Math.max(0, state.line - 1);
      const floor = tokens.findIndex((t) => t.line >= minLine);
      const lo = Math.max(floor < 0 ? 0 : floor, 1);
      const hi = Math.min(tokens.length, state.word + lookahead);
      let best = -1,
        bestScore = 0;
      for (let end = lo; end <= hi; end++) {
        const sc = scoreAt(end, heard);
        // Prefer the closest match to the current position when scores tie.
        if (sc > bestScore + 1e-9 || (Math.abs(sc - bestScore) < 1e-9 && best >= 0 && Math.abs(end - state.word) < Math.abs(best - state.word))) {
          best = end;
          bestScore = sc;
        }
      }
      if (best >= 0 && bestScore >= minScore) {
        // Highlight the line of the last word spoken; it moves on once the owner starts the next line.
        state = { word: best, line: tokens[best - 1].line };
      }
      return state;
    },
  };
}

/** Pick the starting mode: the owner's choice, falling back to timed when speech recognition isn't available. */
export function effectiveMode(preferred: TeleprompterMode, speechSupported: boolean): { mode: TeleprompterMode; note?: string } {
  if (preferred === "voice" && !speechSupported) return { mode: "timed", note: FALLBACK_NOTE };
  return { mode: preferred };
}

/** Browser check, safe to call during server rendering. */
export function speechSupported(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as unknown as Record<string, unknown>;
  return typeof w.SpeechRecognition === "function" || typeof w.webkitSpeechRecognition === "function";
}

export function normalizeTeleprompter(t: Partial<TeleprompterSettings> | undefined): TeleprompterSettings {
  const d = DEFAULT_TELEPROMPTER;
  const modes: TeleprompterMode[] = ["voice", "timed", "manual"];
  const narr: TeleprompterSettings["narration"][] = ["full", "bullets", "hook", "off"];
  return {
    mode: t?.mode && modes.includes(t.mode) ? t.mode : d.mode,
    targetSeconds: clampInt(t?.targetSeconds, 10, 300, d.targetSeconds),
    narration: t?.narration && narr.includes(t.narration) ? t.narration : d.narration,
    textSize: clampInt(t?.textSize, 16, 72, d.textSize),
    manualWpm: clampInt(t?.manualWpm, 60, 260, d.manualWpm),
  };
}

function clampInt(v: unknown, lo: number, hi: number, fallback: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? Math.round(v) : fallback;
  return Math.max(lo, Math.min(hi, n));
}
