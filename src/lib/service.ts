import { createClient } from '@supabase/supabase-js';
import { scoreDelivery } from './agents';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export interface Take {
  id: string;
  sessionId: string;
  videoUrl: string;
  audioUrl: string;
  transcript: string;
  score: number | null;
  scoreData: any;
  isBest: boolean;
  createdAt: string;
}

export async function getTakes(sessionId: string): Promise<Take[]> {
  const { data, error } = await supabase
    .from('takes')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTake(
  sessionId: string,
  videoUrl: string,
  audioUrl: string,
  transcript: string
): Promise<Take> {
  const { data, error } = await supabase
    .from('takes')
    .insert({
      session_id: sessionId,
      video_url: videoUrl,
      audio_url: audioUrl,
      transcript,
      score: null,
      score_data: null,
      is_best: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function scoreTake(
  takeId: string,
  transcript: string,
  audioMetrics: { loudness: number; pitchVariation: number },
  eyeContactData: { contactPercentage: number }
): Promise<any> {
  const score = await scoreDelivery(transcript, audioMetrics, eyeContactData, process.env.ANTHROPIC_API_KEY);

  const { data, error } = await supabase
    .from('takes')
    .update({
      score: score.overallScore,
      score_data: score,
    })
    .eq('id', takeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markBestTake(sessionId: string, takeId: string): Promise<void> {
  const { error: clearError } = await supabase
    .from('takes')
    .update({ is_best: false })
    .eq('session_id', sessionId);

  if (clearError) throw clearError;

  const { error } = await supabase
    .from('takes')
    .update({ is_best: true })
    .eq('id', takeId);

  if (error) throw error;
}
