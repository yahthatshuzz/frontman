import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const DeliveryScoreSchema = z.object({
  overallScore: z.number().min(0).max(100),
  pace: z.object({
    wordsPerMinute: z.number(),
    verdict: z.string(),
  }),
  fillerWords: z.object({
    count: z.number(),
    verdict: z.string(),
  }),
  eyeContact: z.object({
    percentage: z.number().min(0).max(100),
    verdict: z.string(),
  }),
  energy: z.object({
    loudness: z.number(),
    pitchVariation: z.number(),
    verdict: z.string(),
  }),
  tips: z.array(z.string()).length(3),
  moments: z.array(z.object({
    timeMs: z.number(),
    feedback: z.string(),
  })),
});

export type DeliveryScore = z.infer<typeof DeliveryScoreSchema>;

export async function scoreDelivery(
  transcript: string,
  audioMetrics: { loudness: number; pitchVariation: number },
  eyeContactData: { contactPercentage: number },
  apiKey?: string
): Promise<DeliveryScore> {
  if (!apiKey) {
    return getMockScore();
  }

  const client = new Anthropic({ apiKey });

  const prompt = `Score this video take delivery based on the transcript, audio metrics, and eye contact data.

Transcript:
${transcript}

Audio Metrics:
- Loudness (0-100): ${audioMetrics.loudness}
- Pitch Variation (0-100): ${audioMetrics.pitchVariation}

Eye Contact: ${eyeContactData.contactPercentage}%

Analyze:
1. Pace: Calculate words per minute. Target is 120-150 WPM for presentation.
2. Filler Words: Count "um", "uh", "like", "you know" etc. Fewer is better.
3. Eye Contact: Percentage looking at camera. Target 70%+.
4. Energy: Combine loudness and pitch variation for engagement (0-100).
5. Tips: Give 3 specific, actionable tips for the next take.
6. Moments: Mark 2-3 specific timestamps with feedback.

Respond with valid JSON matching this exact structure:
{
  "overallScore": <0-100>,
  "pace": { "wordsPerMinute": <number>, "verdict": "<1 sentence>" },
  "fillerWords": { "count": <number>, "verdict": "<1 sentence>" },
  "eyeContact": { "percentage": <0-100>, "verdict": "<1 sentence>" },
  "energy": { "loudness": <0-100>, "pitchVariation": <0-100>, "verdict": "<1 sentence>" },
  "tips": ["<tip1>", "<tip2>", "<tip3>"],
  "moments": [
    { "timeMs": <milliseconds>, "feedback": "<feedback>" },
    { "timeMs": <milliseconds>, "feedback": "<feedback>" },
    { "timeMs": <milliseconds>, "feedback": "<feedback>" }
  ]
}`;

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');

  const parsed = JSON.parse(jsonMatch[0]);
  return DeliveryScoreSchema.parse(parsed);
}

export function getMockScore(): DeliveryScore {
  return {
    overallScore: 78,
    pace: { wordsPerMinute: 135, verdict: 'Good pace, natural rhythm.' },
    fillerWords: { count: 2, verdict: 'Minimal fillers, very clean.' },
    eyeContact: { percentage: 82, verdict: 'Strong eye contact with lens.' },
    energy: {
      loudness: 72,
      pitchVariation: 65,
      verdict: 'Engaged delivery, consistent energy.',
    },
    tips: [
      'Vary your pitch more—aim for 20% wider range to drive home key points.',
      'Pause 2 seconds between topics for emphasis and audience absorption.',
      'Lean slightly forward on the close—you drift back at the end.',
    ],
    moments: [
      { timeMs: 0, feedback: 'Strong intro, good energy.' },
      { timeMs: 25000, feedback: 'Slight stumble on "infrastructure"—take again.' },
      { timeMs: 48000, feedback: 'Perfect close, confident finish.' },
    ],
  };
}
