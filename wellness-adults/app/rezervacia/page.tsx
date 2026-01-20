import { Metadata } from 'next';
import BookiaWidget from "@/lib/bookia";

export const metadata: Metadata = {
  title: 'Rezervácia - Spa-Relax Bratislava | Online rezervácia',
  description: 'Rezervujte si návštevu v našom privátnom wellness centre. Online rezervácia cez Bookia.',
};

export default function RezervaciaPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rezervácia
          </h1>
          <p className="text-xl text-gray-600">
            Vyberte si dátum a čas pre vašu návštevu
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <BookiaWidget 
            bookiaId={process.env.NEXT_PUBLIC_BOOKIA_ID}
            embedUrl={process.env.NEXT_PUBLIC_BOOKIA_EMBED_URL}
            className="w-full"
          />
        </div>
        
        {/* Fallback: Direct link if widget doesn't work */}
        <div className="max-w-4xl mx-auto mt-4 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Alebo rezervujte priamo cez Bookia:
          </p>
          <a
            href={`https://bookia.sk/rezervacia/${process.env.NEXT_PUBLIC_BOOKIA_ID || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CD7F32] hover:underline"
          >
            Otvoriť rezerváciu v novom okne
          </a>
        </div>
      </div>
    </div>
  );
}
