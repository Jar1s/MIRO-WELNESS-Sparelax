import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galéria - Spa-Relax Bratislava',
  description: 'Pozrite si naše wellness zariadenia a priestory',
};

const images = [
  '/images/Photo 1.png',
  '/images/Photo 2.png',
  '/images/Photo 3.png',
  '/images/Photo 4.png',
  '/images/Photo 5.png',
  '/images/Photo 6.png',
  '/images/Photo 7.png',
  '/images/Photo 8.png',
  '/images/Photo 9.jpg',
  '/images/Photo 10.jpg',
  '/images/Photo 11.png',
  '/images/Photo 12.png',
  '/images/Photo 13.png',
  '/images/sauna-1.png',
  '/images/sauna-2.png',
  '/images/massage-1.png',
  '/images/relax-1.png',
];

export default function GaleriaPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Galéria
          </h1>
          <p className="text-xl text-gray-600">
            Pozrite si naše wellness zariadenia a priestory
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <Image
                src={src}
                alt={`Wellness galéria ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
