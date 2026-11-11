import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-2">Frontman</h1>
          <p className="text-gray-600">Video delivery coach</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/shoot"
            className="block w-full py-3 px-6 bg-red-500 text-white text-center rounded-lg font-medium hover:bg-red-600 transition"
          >
            Start Recording
          </Link>

          <Link
            href="/takes"
            className="block w-full py-3 px-6 bg-gray-100 text-center rounded-lg font-medium hover:bg-gray-200 transition"
          >
            View Takes
          </Link>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          <p>
            Frontman scores every take on pace, filler words, eye contact, and energy. Find your best take and get tips for the next one.
          </p>
        </div>
      </div>
    </div>
  );
}
