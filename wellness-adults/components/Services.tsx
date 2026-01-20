import Link from 'next/link';
import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: 'Privátny wellness č.1',
    description: 'Súkromný wellness priestor. Dĺžka 60-180 min, od 50 €.',
    image: '/images/image.png',
  },
  {
    title: 'Privátny wellness č.2',
    description: 'Druhý privátny wellness priestor. Dĺžka 60-180 min, od 50 €.',
    image: '/images/image 2.png',
  },
  {
    title: 'Masáž',
    description: 'Uvoľňujúca masáž 50 min za 35 €.',
    image: '/images/image 5.png',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Naše služby
          </h2>
          <p className="text-xl text-gray-600">
            Služby, ktoré vám v našom wellness ponúkame:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Viac informácií a ceny nájdete tu:
          </p>
          <Link
            href="/cennik"
            className="inline-block bg-[#CD7F32] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A0522D] transition"
          >
            Cenník
          </Link>
        </div>
      </div>
    </section>
  );
}
