import Anthropic from '@anthropic-ai/sdk';
import type { ScoreData } from './store';

export async function scoreWithClaude(
  transcript: string,
  durationSec: number,
  audioMetrics: { loudness: number; pitchVariation: number },
  eyeContactPct: number,
): Promise<ScoreData> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return getMockScore();

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Score this video take. Respond ONLY with JSON, no markdown.

Transcript: "${transcript}"
Duration: ${durationSec}s
Audio loudness (0-100): ${audioMetrics.loudness}
Pitch variation (0-100): ${audioMetrics.pitchVariation}
Eye contact: ${eyeContactPct}%

Return this exact JSON shape:
{
  "overall": <0-100>,
  "pace": { "wpm": <number>, "verdict": "<1 sentence>" },
  "fillers": { "count": <number>, "perMinute": <number> },
  "eyeContact": { "percentage": <0-100>, "verdict": "<1 sentence>" },
  "energy": { "loudness": <0-100>, "pitchVariation": <0-100>, "verdict": "<1 sentence>" },
  "tips": ["<tip1>", "<tip2>", "<tip3>"],
  "moments": [{ "timeMs": <ms>, "label": "<feedback>" }]
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return getMockScore();

  return JSON.parse(jsonMatch[0]) as ScoreData;
}

export function getMockScore(): ScoreData {
  return {
    overall: 78,
    pace: { wpm: 135, verdict: 'Natural rhythm, well-paced for presentation.' },
    fillers: { count: 2, perMinute: 0.8 },
    eyeContact: { percentage: 82, verdict: 'Strong connection with the lens.' },
    energy: {
      loudness: 72,
      pitchVariation: 65,
      verdict: 'Engaged delivery with consistent energy.',
    },
    tips: [
      'Vary your pitch more on key points for emphasis.',
      'Pause 2 seconds between topics to let ideas land.',
      'Lean slightly forward on the close for confidence.',
    ],
    moments: [
      { timeMs: 0, label: 'Strong opening energy' },
      { timeMs: 25000, label: 'Slight hesitation mid-sentence' },
      { timeMs: 48000, label: 'Confident, clean finish' },
    ],
  };
}
