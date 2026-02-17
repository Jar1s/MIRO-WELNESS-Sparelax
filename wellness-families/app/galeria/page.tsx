import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galéria - Spa-Relax Bratislava',
  description: 'Pozrite si naše wellness zariadenia a priestory',
};

const images = [
  '/images/new-photos-webp/photo-00.webp',
  '/images/new-photos-webp/photo-01.webp',
  '/images/new-photos-webp/photo-02.webp',
  '/images/new-photos-webp/photo-03.webp',
  '/images/new-photos-webp/photo-04.webp',
  '/images/new-photos-webp/photo-05.webp',
  '/images/new-photos-webp/photo-06.webp',
  '/images/new-photos-webp/photo-07.webp',
  '/images/new-photos-webp/photo-08.webp',
  '/images/new-photos-webp/photo-09.webp',
  '/images/new-photos-webp/photo-10.webp',
  '/images/new-photos-webp/photo-11.webp',
  '/images/new-photos-webp/photo-12.webp',
  '/images/new-photos-webp/photo-13.webp',
  '/images/new-photos-webp/photo-14.webp',
  '/images/new-photos-webp/photo-15.webp',
  '/images/new-photos-webp/photo-16.webp',
  '/images/new-photos-webp/photo-17.webp',
  '/images/new-photos-webp/photo-18.webp',
  '/images/new-photos-webp/photo-19.webp',
  '/images/new-photos-webp/photo-20.webp',
  '/images/new-photos-webp/photo-21.webp',
  '/images/new-photos-webp/photo-22.webp',
  '/images/new-photos-webp/photo-23.webp',
  '/images/new-photos-webp/photo-24.webp',
  '/images/new-photos-webp/photo-25.webp',
  '/images/new-photos-webp/photo-26.webp',
  '/images/new-photos-webp/photo-27.webp',
  '/images/new-photos-webp/photo-28.webp',
  '/images/new-photos-webp/photo-29.webp',
  '/images/new-photos-webp/photo-30.webp',
  '/images/new-photos-webp/photo-31.webp',
  '/images/new-photos-webp/photo-32.webp',
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
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
