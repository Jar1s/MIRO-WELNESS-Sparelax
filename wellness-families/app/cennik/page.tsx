import Link from 'next/link';
import Image from 'next/image';

const pricing = [
  {
    service: 'Vstup na 1 hodinu pre 1 osobu',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/new-photos/photo-04.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 1 osobu',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/new-photos/photo-05.jpg',
  },
  {
    service: 'Vstup na 1 hodinu pre 2 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov pre rodinu',
    image: '/images/new-photos/photo-06.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 2 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov pre rodinu',
    image: '/images/new-photos/photo-07.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 3 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov pre rodinu',
    image: '/images/new-photos/photo-12.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 4 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov pre rodinu',
    image: '/images/new-photos/photo-13.jpg',
  },
  {
    service: 'Privátny 2h romantický balíček pre dvoch',
    price: '€XX',
    description: 'so sektom a ovocnou misou',
    image: '/images/new-photos/photo-18.jpg',
  },
  {
    service: 'Privátny 2h vstup pre 1-4 osôb',
    price: '€XX',
    description: 'Každá ďalšia osoba 12€',
    image: '/images/new-photos/photo-19.jpg',
  },
];

export default function CennikPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#c97d60] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            Cenník
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Ceny našich služieb
          </h1>
          <div className="w-24 h-1 bg-[#c97d60] mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12 border border-[#e8e6e3]">
            <p className="text-center text-[#6b6b6b] text-base sm:text-lg leading-relaxed">
              <strong className="text-[#2c2c2c]">Pre všetky vstupy:</strong> zapožičanie plachty a uteráku v cene. 
              Osušku a župan vám radi zapožičiame za 1,5€, resp. za 2,5€.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#e8e6e3] group hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.service}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-[#2c2c2c] mb-2 sm:mb-3">
                    {item.service}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6b6b6b] mb-4 sm:mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#e8e6e3]">
                    <span className="text-xs sm:text-sm text-[#6b6b6b] uppercase tracking-wide">Cena</span>
                    <p className="text-3xl sm:text-4xl font-display font-bold text-[#c97d60]">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/rezervacia"
              className="inline-block bg-[#c97d60] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#b86a4d] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
            >
              Rezervovať teraz
            </Link>
            <Link
              href="/kontakt"
              className="inline-block bg-transparent text-[#2c2c2c] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#f5f3f0] transition-all border-2 border-[#2c2c2c] min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

