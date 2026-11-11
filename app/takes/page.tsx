'use client';

import { useEffect, useState } from 'react';
import { getAllTakes, deleteTake, type Take } from '@/lib/store';
import Link from 'next/link';

export default function TakesPage() {
  const [takes, setTakes] = useState<Take[]>([]);
  const [selected, setSelected] = useState<Take | null>(null);

  useEffect(() => {
    setTakes(getAllTakes());
  }, []);

  function handleDelete(id: string) {
    deleteTake(id);
    setTakes(getAllTakes());
    if (selected?.id === id) setSelected(null);
  }

  function scoreClass(score: number) {
    if (score >= 75) return 'good';
    if (score >= 50) return 'ok';
    return 'low';
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light">Takes</h1>
        <Link
          href="/shoot"
          className="text-sm py-2 px-4 bg-accent text-white rounded-lg hover:bg-accent-hover transition"
        >
          New Take
        </Link>
      </div>

      {takes.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <div className="text-4xl mb-4">🎬</div>
          <p className="text-lg mb-2">No takes yet</p>
          <p className="text-sm">Record your first take to get scored.</p>
          <Link
            href="/shoot"
            className="inline-block mt-6 text-sm py-2 px-6 bg-accent text-white rounded-lg hover:bg-accent-hover transition"
          >
            Start Recording
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Take list */}
          <div className="md:col-span-1 space-y-2">
            {takes.map((take) => (
              <button
                key={take.id}
                onClick={() => setSelected(take)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selected?.id === take.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{take.title}</div>
                    <div className="text-xs text-muted">
                      {new Date(take.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {take.isBest && (
                      <span className="pill bg-best/10 text-best">Best</span>
                    )}
                    {take.score !== null && (
                      <div className={`score-ring ${scoreClass(take.score)}`} style={{ width: 40, height: 40, fontSize: 14 }}>
                        {take.score}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="md:col-span-2">
            {selected ? (
              <div className="border border-border rounded-2xl overflow-hidden">
                {selected.videoUrl && (
                  <video src={selected.videoUrl} controls className="w-full aspect-video" />
                )}

                {selected.scoreData ? (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-medium">{selected.title}</h2>
                      <div className={`score-ring ${scoreClass(selected.score!)}`}>
                        {selected.score}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-background rounded-xl">
                        <div className="text-xs text-muted mb-1">Pace</div>
                        <div className="font-medium">{selected.scoreData.pace.wpm} WPM</div>
                        <div className="text-xs text-muted">{selected.scoreData.pace.verdict}</div>
                      </div>
                      <div className="p-3 bg-background rounded-xl">
                        <div className="text-xs text-muted mb-1">Fillers</div>
                        <div className="font-medium">{selected.scoreData.fillers.count} found</div>
                        <div className="text-xs text-muted">{selected.scoreData.fillers.perMinute}/min</div>
                      </div>
                      <div className="p-3 bg-background rounded-xl">
                        <div className="text-xs text-muted mb-1">Eye Contact</div>
                        <div className="font-medium">{selected.scoreData.eyeContact.percentage}%</div>
                        <div className="text-xs text-muted">{selected.scoreData.eyeContact.verdict}</div>
                      </div>
                      <div className="p-3 bg-background rounded-xl">
                        <div className="text-xs text-muted mb-1">Energy</div>
                        <div className="font-medium">{selected.scoreData.energy.loudness}/100</div>
                        <div className="text-xs text-muted">{selected.scoreData.energy.verdict}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-muted mb-2">Tips</div>
                      <ul className="space-y-1">
                        {selected.scoreData.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-sm flex gap-2">
                            <span className="text-muted">→</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="text-xs text-muted hover:text-accent transition"
                    >
                      Delete take
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted">
                    Score pending...
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted text-sm">
                Select a take to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
