const FILLER_WORDS = new Set([
  'um', 'uh', 'like', 'you know', 'basically', 'actually',
  'literally', 'right', 'so', 'well', 'I mean', 'kind of', 'sort of',
]);

export interface TranscriptWord {
  word: string;
  startMs: number;
  endMs: number;
}

export interface PaceResult {
  wpm: number;
  verdict: 'slow' | 'good' | 'fast';
}

export interface FillerResult {
  count: number;
  words: { word: string; timeMs: number }[];
}

export interface PauseResult {
  longPauses: { startMs: number; endMs: number; durationMs: number }[];
}

export interface EnergyResult {
  loudness: number;
  pitchVariation: number;
}

export function calcPace(words: TranscriptWord[]): PaceResult {
  if (words.length < 2) return { wpm: 0, verdict: 'slow' };
  const durationMin = (words[words.length - 1].endMs - words[0].startMs) / 60000;
  if (durationMin === 0) return { wpm: 0, verdict: 'slow' };
  const wpm = Math.round(words.length / durationMin);
  const verdict = wpm < 110 ? 'slow' : wpm > 160 ? 'fast' : 'good';
  return { wpm, verdict };
}

export function countFillers(words: TranscriptWord[]): FillerResult {
  const found: { word: string; timeMs: number }[] = [];
  for (const w of words) {
    if (FILLER_WORDS.has(w.word.toLowerCase().replace(/[.,!?]/g, ''))) {
      found.push({ word: w.word, timeMs: w.startMs });
    }
  }
  return { count: found.length, words: found };
}

export function findLongPauses(words: TranscriptWord[], thresholdMs = 2000): PauseResult {
  const pauses: PauseResult['longPauses'] = [];
  for (let i = 1; i < words.length; i++) {
    const gap = words[i].startMs - words[i - 1].endMs;
    if (gap >= thresholdMs) {
      pauses.push({
        startMs: words[i - 1].endMs,
        endMs: words[i].startMs,
        durationMs: gap,
      });
    }
  }
  return { longPauses: pauses };
}

export function calcOverallScore(
  pace: PaceResult,
  fillers: FillerResult,
  eyeContactPct: number,
  energy: EnergyResult,
  durationSec: number
): number {
  let score = 50;

  // Pace: +20 for good, +10 for slightly off, +0 for way off
  if (pace.verdict === 'good') score += 20;
  else if (pace.wpm > 90 && pace.wpm < 180) score += 10;

  // Fillers: lose 2 points per filler per minute, max -15
  const fillersPerMin = durationSec > 0 ? (fillers.count / (durationSec / 60)) : 0;
  score -= Math.min(15, Math.round(fillersPerMin * 2));

  // Eye contact: up to +25
  score += Math.round((eyeContactPct / 100) * 25);

  // Energy: up to +20
  const energyScore = (energy.loudness + energy.pitchVariation) / 2;
  score += Math.round((energyScore / 100) * 20);

  return Math.max(0, Math.min(100, score));
}
