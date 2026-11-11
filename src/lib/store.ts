export interface Take {
  id: string;
  title: string;
  videoUrl: string;
  transcript: string;
  durationSec: number;
  score: number | null;
  scoreData: ScoreData | null;
  isBest: boolean;
  createdAt: string;
}

export interface ScoreData {
  overall: number;
  pace: { wpm: number; verdict: string };
  fillers: { count: number; perMinute: number };
  eyeContact: { percentage: number; verdict: string };
  energy: { loudness: number; pitchVariation: number; verdict: string };
  tips: string[];
  moments: { timeMs: number; label: string }[];
}

const STORAGE_KEY = 'frontman_takes';

function readTakes(): Take[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTakes(takes: Take[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(takes));
}

export function getAllTakes(): Take[] {
  return readTakes().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addTake(take: Omit<Take, 'id' | 'createdAt' | 'isBest' | 'score' | 'scoreData'>): Take {
  const takes = readTakes();
  const newTake: Take = {
    ...take,
    id: crypto.randomUUID(),
    score: null,
    scoreData: null,
    isBest: false,
    createdAt: new Date().toISOString(),
  };
  takes.push(newTake);
  writeTakes(takes);
  return newTake;
}

export function updateTakeScore(id: string, scoreData: ScoreData): Take | null {
  const takes = readTakes();
  const take = takes.find((t) => t.id === id);
  if (!take) return null;
  take.score = scoreData.overall;
  take.scoreData = scoreData;

  // Auto-mark best take
  const bestScore = Math.max(...takes.map((t) => t.score ?? 0));
  for (const t of takes) {
    t.isBest = (t.score ?? 0) === bestScore && t.score !== null;
  }

  writeTakes(takes);
  return take;
}

export function getTake(id: string): Take | null {
  return readTakes().find((t) => t.id === id) ?? null;
}

export function deleteTake(id: string) {
  const takes = readTakes().filter((t) => t.id !== id);
  writeTakes(takes);
}
