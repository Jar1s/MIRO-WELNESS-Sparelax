import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Stránka sa nenašla
        </h2>
        <p className="text-gray-600 mb-8">
          Ospravedlňujeme sa, ale stránka, ktorú hľadáte, neexistuje.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Späť na hlavnú stránku
        </Link>
      </div>
    </div>
  );
}


