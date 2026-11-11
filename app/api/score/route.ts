import { NextRequest, NextResponse } from 'next/server';
import { scoreWithClaude } from '@/lib/agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, durationSec, audioMetrics, eyeContactPct } = body;

    const score = await scoreWithClaude(
      transcript || '',
      durationSec || 60,
      audioMetrics || { loudness: 70, pitchVariation: 60 },
      eyeContactPct ?? 80,
    );

    return NextResponse.json(score);
  } catch (error) {
    console.error('Score error:', error);
    return NextResponse.json({ error: 'Scoring failed' }, { status: 500 });
  }
}
