'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Niečo sa pokazilo
        </h2>
        <p className="text-gray-600 mb-8">
          Ospravedlňujeme sa za nepríjemnosť. Skúste to znova neskôr.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Skúsiť znova
          </button>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Späť na hlavnú stránku
          </Link>
        </div>
      </div>
    </div>
  );
}


