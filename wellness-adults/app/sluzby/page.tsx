import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Služby - Spa-Relax Bratislava | Wellness Bratislava',
  description: 'Ponúkame privátny wellness č.1, privátny wellness č.2 a masáže v Bratislave.',
};

const services = [
  {
    title: 'Privátny wellness č.1',
    description: 'Súkromný wellness priestor pre nerušený oddych a regeneráciu.',
    image: '/images/image.png',
    features: [
      '60 min - 50 €',
      '90 min - 60 €',
      '120 min - 70 €',
      '180 min - 120 €',
    ],
  },
  {
    title: 'Privátny wellness č.2',
    description: 'Druhý privátny wellness priestor s rovnakými možnosťami dĺžky pobytu.',
    image: '/images/image 6.png',
    features: [
      '60 min - 50 €',
      '90 min - 60 €',
      '120 min - 70 €',
      '180 min - 120 €',
    ],
  },
  {
    title: 'Privátna sauna',
    description: 'Súkromná sauna pre nerušený oddych a regeneráciu.',
    image: '/images/image 2.png',
    features: [
      '60 min - 40 €',
      '90 min - 50 €',
      '120 min - 60 €',
      '180 min - 120 €',
    ],
  },
  {
    title: 'Relaxačná miestnosť',
    description: 'Tichý priestor na oddych po saune alebo náročnom dni.',
    image: '/images/image 5.png',
    features: [
      '60 min - 30 €',
      '90 min - 40 €',
      '120 min - 50 €',
      '180 min - 100 €',
    ],
  },
  {
    title: 'Masáž',
    description: 'Uvoľňujúca masáž pre regeneráciu a oddych.',
    image: '/images/image 7.png',
    features: [
      '50 min - 35 €',
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
                        <svg className="w-5 h-5 text-[#CD7F32] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            className="inline-block bg-[#CD7F32] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A0522D] transition mr-4"
          >
            Zobraziť cenník
          </Link>
          <Link
            href="/rezervacia"
            className="inline-block bg-white text-[#CD7F32] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-[#CD7F32]"
          >
            Rezervovať teraz
          </Link>
        </div>
      </div>
    </div>
  );
}
