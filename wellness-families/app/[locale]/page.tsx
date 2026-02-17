import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Image from 'next/image';
import Link from 'next/link';
import { isLocale, toLocalizedPath, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'Spa-Relax Bratislava - Privátny Wellness | Bratislava',
    description:
      'Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.',
  },
  en: {
    title: 'Spa-Relax Bratislava - Private Wellness | Bratislava',
    description:
      'Private wellness in Bratislava – Ruzinov. Private spa for couples or groups of friends. Sauna, massages and jacuzzi.',
  },
};

const copy = {
  sk: {
    aboutKicker: 'O nás',
    aboutTitleStart: 'Kam v Bratislave za',
    aboutTitleAccent: 'oddychom',
    aboutText1:
      'Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Nie sme ako ostatné hromadné alebo hotelové wellness. Sme privátny wellness kde sa zameriavame na každého jednotlivého zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.',
    aboutText2:
      'Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom pozornosti budete iba Vy!',
    learnMore: 'Zistiť viac →',
    giftKicker: 'Darčekové poukážky',
    giftTitle: 'Venujte svojim blízkym oddych',
    giftText:
      'Darujte im niektorú zo širokej možností našich darčekových poukážok. Detaily zistíte u nás na recepcii.',
    contactUs: 'Kontaktujte nás',
  },
  en: {
    aboutKicker: 'About us',
    aboutTitleStart: 'Where in Bratislava to find',
    aboutTitleAccent: 'true relaxation',
    aboutText1:
      'We offer private wellness for couples or groups of friends. Unlike crowded public or hotel spas, our private concept focuses on each guest individually during sauna sessions, massages and jacuzzi relaxation.',
    aboutText2:
      'In our private wellness, you avoid crowds and the attention stays focused on you.',
    learnMore: 'Learn more →',
    giftKicker: 'Gift vouchers',
    giftTitle: 'Give your loved ones a moment of rest',
    giftText:
      'Choose from our wide range of gift vouchers and give an unforgettable wellness experience. Details are available at reception.',
    contactUs: 'Contact us',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metadataByLocale.sk;
  return metadataByLocale[locale];
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale];

  return (
    <>
      <Hero locale={locale} />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#faf9f7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/image 4.png"
                alt="Wellness"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
              <p className="text-[#CD7F32] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
                {t.aboutKicker}
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c]"
                style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0' }}
              >
                {t.aboutTitleStart}{' '}
                <span className="text-[#CD7F32] underline underline-offset-8 decoration-[#CD7F32] decoration-4">
                  {t.aboutTitleAccent}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.aboutText1}</p>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.aboutText2}</p>
              <Link
                href={toLocalizedPath(locale, '/o-nas')}
                className="inline-flex items-center gap-2 justify-center text-[#2c2c2c] hover:text-[#A0522D] transition-colors font-semibold min-h-[44px] border-b-2 border-[#CD7F32] pb-1 mx-auto lg:mx-0"
              >
                {t.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Services locale={locale} />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -mr-32 sm:-mr-40 lg:-mr-48 -mt-32 sm:-mt-40 lg:-mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -ml-32 sm:-ml-40 lg:-ml-48 -mb-32 sm:-mb-40 lg:-mb-48"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
              {t.giftKicker}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
              {t.giftTitle}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">{t.giftText}</p>
            <Link
              href={toLocalizedPath(locale, '/kontakt')}
              className="inline-block bg-[#f5f5f5] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#ededed] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation border border-[#A0522D]/25"
              style={{ color: 'var(--gift-cta-color)' }}
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
