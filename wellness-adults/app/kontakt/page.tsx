import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Spa-Relax Bratislava | Kontaktné informácie',
  description: 'Kontaktujte nás na adrese Ivanská cesta 15, 821 04 Bratislava. Otváracie hodiny: Po-Pi 11:00-22:00, So-Ne 10:00-22:00.',
};

export default function KontaktPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kontaktné informácie
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Príďte nás navštíviť, radi vás privítame.
          </p>
          <p className="text-lg text-gray-500 italic">
            Lepšie raz vidieť ako sto krát počuť.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Kde nás nájdete
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#CD7F32] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Adresa</p>
                  <p className="text-gray-600">Ivanská cesta 15</p>
                  <p className="text-gray-600">821 04 Bratislava</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#CD7F32] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Email</p>
                  <a href="mailto:inforuzinov@wellmass.sk" className="text-[#CD7F32] hover:underline">
                    inforuzinov@wellmass.sk
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Otváracie hodiny
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 font-medium mb-2">Pondelok – Piatok</p>
                <p className="text-gray-600 text-lg">11:00 – 22:00</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium mb-2">Sobota – Nedeľa</p>
                <p className="text-gray-600 text-lg">10:00 – 22:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Sledujte nás
          </h2>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/sparelaxbratislava/"
              className="text-gray-600 hover:text-[#CD7F32] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/sparelaxbratislava/"
              className="text-gray-600 hover:text-[#CD7F32] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
