'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { addTake, updateTakeScore } from '@/lib/store';
import { getMockScore } from '@/lib/agents';
import Link from 'next/link';

export default function ShootPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [preview, setPreview] = useState<string>('');
  const [lastTakeId, setLastTakeId] = useState<string>('');
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [cameraReady, setCameraReady] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
      setStream(s);
      setCameraReady(true);
    } catch {
      setCameraReady(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startRecording() {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPreview(url);

      const take = addTake({
        title: `Take ${new Date().toLocaleTimeString()}`,
        videoUrl: url,
        transcript: '',
        durationSec: elapsed,
      });
      setLastTakeId(take.id);

      // Auto-score with mock data (API scoring would go through /api/score)
      setScoring(true);
      setTimeout(() => {
        const score = getMockScore();
        updateTakeScore(take.id, score);
        setScoreResult(score);
        setScoring(false);
      }, 1500);
    };

    mediaRecorderRef.current = recorder;
    recorder.start(1000);
    setIsRecording(true);
    setPreview('');
    setScoreResult(null);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function scoreClass(score: number) {
    if (score >= 75) return 'good';
    if (score >= 50) return 'ok';
    return 'low';
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light">Shoot</h1>
        {isRecording && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-sm">{formatTime(elapsed)}</span>
          </div>
        )}
      </div>

      {/* Camera viewfinder */}
      <div className="relative bg-black rounded-2xl overflow-hidden mb-6 aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            Allow camera access to start recording
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={!cameraReady}
            className="w-16 h-16 bg-accent rounded-full flex items-center justify-center hover:bg-accent-hover transition disabled:opacity-30"
          >
            <div className="w-6 h-6 bg-white rounded-sm" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-16 h-16 bg-accent rounded-full flex items-center justify-center hover:bg-accent-hover transition"
          >
            <div className="w-5 h-5 bg-white rounded-sm" />
          </button>
        )}
      </div>

      {/* Preview + Score */}
      {preview && (
        <div className="border border-border rounded-2xl overflow-hidden mb-6">
          <video src={preview} controls className="w-full aspect-video" />

          {scoring && (
            <div className="p-6 text-center text-muted">Scoring your take...</div>
          )}

          {scoreResult && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Delivery Score</h2>
                <div className={`score-ring ${scoreClass(scoreResult.overall)}`}>
                  {scoreResult.overall}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-background rounded-xl">
                  <div className="text-xs text-muted mb-1">Pace</div>
                  <div className="font-medium">{scoreResult.pace.wpm} WPM</div>
                  <div className="text-xs text-muted">{scoreResult.pace.verdict}</div>
                </div>
                <div className="p-3 bg-background rounded-xl">
                  <div className="text-xs text-muted mb-1">Fillers</div>
                  <div className="font-medium">{scoreResult.fillers.count} found</div>
                  <div className="text-xs text-muted">{scoreResult.fillers.perMinute}/min</div>
                </div>
                <div className="p-3 bg-background rounded-xl">
                  <div className="text-xs text-muted mb-1">Eye Contact</div>
                  <div className="font-medium">{scoreResult.eyeContact.percentage}%</div>
                  <div className="text-xs text-muted">{scoreResult.eyeContact.verdict}</div>
                </div>
                <div className="p-3 bg-background rounded-xl">
                  <div className="text-xs text-muted mb-1">Energy</div>
                  <div className="font-medium">{scoreResult.energy.loudness}/100</div>
                  <div className="text-xs text-muted">{scoreResult.energy.verdict}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-muted mb-2">Tips for next take</div>
                <ul className="space-y-1">
                  {scoreResult.tips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm flex gap-2">
                      <span className="text-muted">→</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/takes"
                  className="text-sm text-accent hover:underline"
                >
                  View all takes →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
