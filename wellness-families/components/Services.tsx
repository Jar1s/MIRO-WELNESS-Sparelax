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
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-[#CD7F32] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            Naše služby
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Služby, ktoré vám ponúkame
          </h2>
          <div className="w-24 h-1 bg-[#CD7F32] mx-auto"></div>
        </div>
        
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-black ${
                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8 xl:mt-16'
              }`}
            >
              <div className="relative h-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[560px]">
                <Image
                  key={`${service.title}-${service.image}`}
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    index === 0 ? 'scale-[1.12] group-hover:scale-[1.18]' : 'group-hover:scale-110'
                  }`}
                  style={index === 0 ? { objectPosition: 'center' } : undefined}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 sm:p-8 lg:p-10 text-white w-full text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <div className="w-16 h-1 bg-[#CD7F32] mx-auto lg:mx-0"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/cennik"
            className="inline-block bg-[#CD7F32] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#A0522D] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
          >
            Zobraziť cenník
          </Link>
        </div>
      </div>
    </section>
  );
}
