import { NextRequest, NextResponse } from 'next/server';
import { scoreTake } from '@/lib/service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { transcript, audioMetrics, eyeContactData } = body;

    const result = await scoreTake(id, transcript, audioMetrics, eyeContactData);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Scoring error:', error);
    return NextResponse.json({ error: 'Failed to score take' }, { status: 500 });
  }
}
