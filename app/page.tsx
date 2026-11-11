import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-5xl font-light tracking-tight mb-3">Frontman</h1>
        <p className="text-muted text-lg mb-12">
          Score every take. Find your best one.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link
            href="/shoot"
            className="py-3 px-6 bg-accent text-white text-center rounded-xl font-medium hover:bg-accent-hover transition"
          >
            Start Recording
          </Link>
          <Link
            href="/takes"
            className="py-3 px-6 bg-card border border-border text-center rounded-xl font-medium hover:border-muted transition"
          >
            View Takes
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-sm text-muted">
          <div>
            <div className="text-2xl mb-1">🎙</div>
            <div className="font-medium text-foreground">Pace</div>
            <div>Words per minute</div>
          </div>
          <div>
            <div className="text-2xl mb-1">👁</div>
            <div className="font-medium text-foreground">Eye Contact</div>
            <div>Camera connection</div>
          </div>
          <div>
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-medium text-foreground">Energy</div>
            <div>Loudness & pitch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
