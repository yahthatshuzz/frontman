import { NextRequest, NextResponse } from 'next/server';
import { createTake } from '@/lib/service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sessionId = formData.get('sessionId') as string;
    const transcript = formData.get('transcript') as string;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // In production, upload to storage (S3, Supabase Storage, etc.)
    const videoUrl = `https://example.com/videos/${Date.now()}.webm`;
    const audioUrl = `https://example.com/audio/${Date.now()}.wav`;

    const take = await createTake(sessionId, videoUrl, audioUrl, transcript || '');

    return NextResponse.json(take);
  } catch (error) {
    console.error('Take creation error:', error);
    return NextResponse.json({ error: 'Failed to create take' }, { status: 500 });
  }
}
