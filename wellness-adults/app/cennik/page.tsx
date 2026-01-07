import Link from 'next/link';
import Image from 'next/image';

const pricing = [
  {
    service: 'Vstup na 1 hodinu pre 1 osobu',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-5.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 1 osobu',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-6.jpg',
  },
  {
    service: 'Vstup na 1 hodinu pre 2 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-7.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 2 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-8.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 3 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-1.jpg',
  },
  {
    service: 'Vstup na 2 hodiny pre 4 osoby',
    price: '€XX',
    description: 'Prístup do wellness priestorov',
    image: '/images/gallery-2.jpg',
  },
  {
    service: 'Privátny 2h romantický balíček pre dvoch',
    price: '€XX',
    description: 'so sektom a ovocnou misou',
    image: '/images/gallery-3.jpg',
  },
  {
    service: 'Privátny 2h vstup pre 1-4 osôb',
    price: '€XX',
    description: 'Každá ďalšia osoba 12€',
    image: '/images/gallery-4.jpg',
  },
];

export default function CennikPage() {
  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cenník
          </h1>
          <p className="text-xl text-gray-600">
            Ceny našich služieb
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-purple-50 rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-600">
            <p className="text-center text-gray-700">
              <strong>Pre všetky vstupy:</strong> zapožičanie plachty a uteráku v cene. 
              Osušku a župan vám radi zapožičiame za 1,5€, resp. za 2,5€.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.service}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.service}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-600">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rezervacia"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition mr-4"
            >
              Rezervovať teraz
            </Link>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-purple-600"
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

