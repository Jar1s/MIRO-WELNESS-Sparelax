import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galéria - Wellness Heaven',
  description: 'Pozrite si naše wellness zariadenia a priestory',
};

const images = [
  '/images/new-photos/photo-00.jpg',
  '/images/new-photos/photo-01.jpg',
  '/images/new-photos/photo-02.jpg',
  '/images/new-photos/photo-03.jpg',
  '/images/new-photos/photo-04.jpg',
  '/images/new-photos/photo-05.jpg',
  '/images/new-photos/photo-06.jpg',
  '/images/new-photos/photo-07.jpg',
  '/images/new-photos/photo-08.jpg',
  '/images/new-photos/photo-09.jpg',
  '/images/new-photos/photo-10.jpg',
  '/images/new-photos/photo-11.jpg',
  '/images/new-photos/photo-12.jpg',
  '/images/new-photos/photo-13.jpg',
  '/images/new-photos/photo-14.jpg',
  '/images/new-photos/photo-15.jpg',
  '/images/new-photos/photo-16.jpg',
  '/images/new-photos/photo-17.jpg',
  '/images/new-photos/photo-18.jpg',
  '/images/new-photos/photo-19.jpg',
  '/images/new-photos/photo-20.jpg',
  '/images/new-photos/photo-21.jpg',
  '/images/new-photos/photo-22.jpg',
  '/images/new-photos/photo-23.jpg',
  '/images/new-photos/photo-24.jpg',
  '/images/new-photos/photo-25.jpg',
  '/images/new-photos/photo-26.jpg',
  '/images/new-photos/photo-27.jpg',
  '/images/new-photos/photo-28.jpg',
  '/images/new-photos/photo-29.jpg',
  '/images/new-photos/photo-30.jpg',
  '/images/new-photos/photo-31.jpg',
  '/images/new-photos/photo-32.jpg',
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
