import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Služby - Wellness Heaven | Wellness Bratislava',
  description: 'Ponúkame privátny wellness, súkromnú saunu, relaxačnú miestnosť a masáže v Bratislave.',
};

const services = [
  {
    title: 'Privátny Wellness',
    description: 'Navštívte našu wellness časť, zrelaxujte telo, oddýchnite si od stresu a načerpajte novú energiu.',
    image: '/images/gallery-2.jpg',
    features: [
      'Súkromný priestor',
      'Vírivka',
      'Relaxačné zóny',
      'Privátne prostredie',
    ],
  },
  {
    title: 'Privátna sauna',
    description: 'Doprajte si nerušený relax v našej súkromnej fínskej saune, ktorá ponúka ideálne podmienky na regeneráciu tela aj mysle.',
    image: '/images/sauna-1.png',
    features: [
      'Fínska sauna',
      'Súkromný priestor',
      'Ideálna teplota',
      'Regeneračný efekt',
    ],
  },
  {
    title: 'Relaxačná miestnosť',
    description: 'Vstúpte do priestoru pokoja, kde sa zastavuje čas. Relaxačná miestnosť je ideálnym miestom na odpočinok po saune, masáži alebo náročnom dni.',
    image: '/images/relax-1.png',
    features: [
      'Pohodlné ležadlá',
      'Tichá zóna',
      'Relaxačná atmosféra',
      'Privátne prostredie',
    ],
  },
  {
    title: 'Uvoľnenie pri masáži',
    description: 'Nechajte si chvíľku iba pre seba a doprajte si masáž, uvoľnite stuhnuté svaly a zrelaxujte telo. Vyberte si niektorú z našich masáži, ktoré Vám ponúkame.',
    image: '/images/massage-1.png',
    features: [
      'Relaxačné masáže',
      'Terapeutické masáže',
      'Aromaterapia',
      'Skúsení maséri',
    ],
  },
];

export default function SluzbyPage() {
  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Naše služby
          </h1>
          <p className="text-xl text-gray-600">
            Služby, ktoré vám v našom wellness ponúkame:
          </p>
        </div>

        <div className="space-y-12 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cennik"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition mr-4"
          >
            Zobraziť cenník
          </Link>
          <Link
            href="/rezervacia"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-purple-600"
          >
            Rezervovať teraz
          </Link>
        </div>
      </div>
    </div>
  );
}
