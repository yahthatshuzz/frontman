'use client';

import { useRef, useState, useEffect } from 'react';

export default function ShootPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [takes, setTakes] = useState<any[]>([]);

  useEffect(() => {
    startCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  }

  function startRecording() {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (!stream) return;

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setRecordedChunks([...recordedChunks, blob]);
      setVideoUrl(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }

  async function uploadTake() {
    if (!videoUrl) return;

    const formData = new FormData();
    recordedChunks.forEach((chunk, i) => {
      formData.append(`video_${i}`, chunk);
    });

    try {
      const response = await fetch('/api/takes', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setTakes([...takes, data]);
      setRecordedChunks([]);
      setVideoUrl('');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light mb-8">Shoot</h1>

        <div className="mb-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full bg-black rounded-lg mb-4"
          />
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex gap-4">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className="px-6 py-3 bg-red-500 text-white rounded-lg disabled:opacity-50"
            >
              {isRecording ? 'Recording...' : 'Start'}
            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Stop
            </button>
            <button
              onClick={uploadTake}
              disabled={!videoUrl}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              Upload
            </button>
          </div>
        </div>

        {videoUrl && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <video src={videoUrl} controls className="w-full rounded-lg" />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Takes</h2>
          {takes.length === 0 ? (
            <p className="text-gray-500">No takes yet</p>
          ) : (
            takes.map((take) => (
              <div key={take.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{take.createdAt}</span>
                  {take.score && (
                    <span className="text-lg font-bold">{take.score}/100</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
