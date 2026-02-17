import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBookioLang, isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PricingItem = {
  title: string;
  duration: string;
  price: string;
  image: string;
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

const pricingData: Record<Locale, PricingItem[]> = {
  sk: [
    { title: 'Privátny wellness č.1', duration: '60 min', price: '50 €', image: '/images/image.png' },
    { title: 'Privátny wellness č.1', duration: '90 min', price: '60 €', image: '/images/image.png' },
    { title: 'Privátny wellness č.1', duration: '120 min', price: '70 €', image: '/images/image.png' },
    { title: 'Privátny wellness č.1', duration: '180 min', price: '120 €', image: '/images/image.png' },
    { title: 'Privátny wellness č.2', duration: '60 min', price: '50 €', image: '/images/image 6.png' },
    { title: 'Privátny wellness č.2', duration: '90 min', price: '60 €', image: '/images/image 6.png' },
    { title: 'Privátny wellness č.2', duration: '120 min', price: '70 €', image: '/images/image 6.png' },
    { title: 'Privátny wellness č.2', duration: '180 min', price: '120 €', image: '/images/image 6.png' },
    { title: 'Privátna sauna', duration: '60 min', price: '40 €', image: '/images/image 2.png' },
    { title: 'Privátna sauna', duration: '90 min', price: '50 €', image: '/images/image 2.png' },
    { title: 'Privátna sauna', duration: '120 min', price: '60 €', image: '/images/image 2.png' },
    { title: 'Privátna sauna', duration: '180 min', price: '120 €', image: '/images/image 2.png' },
    { title: 'Relaxačná miestnosť', duration: '60 min', price: '30 €', image: '/images/image 5.png' },
    { title: 'Relaxačná miestnosť', duration: '90 min', price: '40 €', image: '/images/image 5.png' },
    { title: 'Relaxačná miestnosť', duration: '120 min', price: '50 €', image: '/images/image 5.png' },
    { title: 'Relaxačná miestnosť', duration: '180 min', price: '100 €', image: '/images/image 5.png' },
    { title: 'Masáž', duration: '50 min', price: '35 €', image: '/images/image 7.png' },
  ],
  en: [
    { title: 'Private Wellness No.1', duration: '60 min', price: '50 €', image: '/images/image.png' },
    { title: 'Private Wellness No.1', duration: '90 min', price: '60 €', image: '/images/image.png' },
    { title: 'Private Wellness No.1', duration: '120 min', price: '70 €', image: '/images/image.png' },
    { title: 'Private Wellness No.1', duration: '180 min', price: '120 €', image: '/images/image.png' },
    { title: 'Private Wellness No.2', duration: '60 min', price: '50 €', image: '/images/image 6.png' },
    { title: 'Private Wellness No.2', duration: '90 min', price: '60 €', image: '/images/image 6.png' },
    { title: 'Private Wellness No.2', duration: '120 min', price: '70 €', image: '/images/image 6.png' },
    { title: 'Private Wellness No.2', duration: '180 min', price: '120 €', image: '/images/image 6.png' },
    { title: 'Private Sauna', duration: '60 min', price: '40 €', image: '/images/image 2.png' },
    { title: 'Private Sauna', duration: '90 min', price: '50 €', image: '/images/image 2.png' },
    { title: 'Private Sauna', duration: '120 min', price: '60 €', image: '/images/image 2.png' },
    { title: 'Private Sauna', duration: '180 min', price: '120 €', image: '/images/image 2.png' },
    { title: 'Relax Room', duration: '60 min', price: '30 €', image: '/images/image 5.png' },
    { title: 'Relax Room', duration: '90 min', price: '40 €', image: '/images/image 5.png' },
    { title: 'Relax Room', duration: '120 min', price: '50 €', image: '/images/image 5.png' },
    { title: 'Relax Room', duration: '180 min', price: '100 €', image: '/images/image 5.png' },
    { title: 'Massage', duration: '50 min', price: '35 €', image: '/images/image 7.png' },
  ],
};

const metadataByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'Cenník - Spa-Relax Bratislava | Ceny služieb',
    description: 'Ceny našich wellness služieb v Bratislave.',
  },
  en: {
    title: 'Pricing - Spa-Relax Bratislava | Service Prices',
    description: 'Prices of our wellness services in Bratislava.',
  },
};

const copy = {
  sk: {
    title: 'Ceny našich služieb',
    reserve: 'Rezervovať',
  },
  en: {
    title: 'Prices of Our Services',
    reserve: 'Book now',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metadataByLocale.sk;
  return metadataByLocale[locale];
}

export default async function CennikLocalizedPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale];
  const pricing = pricingData[locale];
  const bookiaLink = `https://services.bookio.com/spa-relax-bratislava/widget?lang=${getBookioLang(locale)}`;

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            {t.title}
          </h1>
          <div className="w-24 h-1 bg-[#CD7F32] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pricing.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3] flex flex-col"
              >
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    priority={index < 2}
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-h-[60px] flex flex-col justify-start">
                      <h3 className="text-xl font-display font-bold text-[#2c2c2c]">{item.title}</h3>
                    </div>
                    <span className="text-sm text-[#6b6b6b] whitespace-nowrap pt-1">{item.duration}</span>
                  </div>
                  <div className="flex-1 flex items-start justify-center">
                    <div className="text-3xl font-display font-bold text-[#CD7F32] text-center min-h-[44px] flex items-center justify-center">
                      {item.price}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={bookiaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-[#CD7F32] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#A0522D] transition-all shadow-md hover:shadow-lg hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
                    >
                      {t.reserve}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
