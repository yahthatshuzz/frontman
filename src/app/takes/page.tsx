'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Take {
  id: string;
  score: number | null;
  createdAt: string;
  isBest: boolean;
}

export default function TakesPage() {
  const [takes, setTakes] = useState<Take[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTakes() {
      try {
        // Mock data for now
        setTakes([
          {
            id: '1',
            score: 78,
            createdAt: new Date().toISOString(),
            isBest: true,
          },
          {
            id: '2',
            score: 65,
            createdAt: new Date(Date.now() - 60000).toISOString(),
            isBest: false,
          },
        ]);
      } catch (error) {
        console.error('Failed to load takes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTakes();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">Takes</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Back
          </Link>
        </div>

        <div className="space-y-4">
          {takes.length === 0 ? (
            <p className="text-gray-500">No takes yet. Start recording!</p>
          ) : (
            takes.map((take) => (
              <div
                key={take.id}
                className={`p-4 rounded-lg border transition ${
                  take.isBest
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {new Date(take.createdAt).toLocaleTimeString()}
                    </div>
                    {take.isBest && (
                      <div className="text-sm text-green-700">Best take</div>
                    )}
                  </div>
                  {take.score !== null && (
                    <div className="text-2xl font-bold text-center">
                      {take.score}
                      <span className="text-lg text-gray-500">/100</span>
                    </div>
                  )}
                </div>
                {take.score === null && (
                  <div className="mt-2 text-sm text-gray-500">Scoring...</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
