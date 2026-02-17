'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DEFAULT_LOCALE, getBookioLang, type Locale } from '@/lib/i18n';

type HeroProps = {
  locale?: Locale;
};

const copy = {
  sk: {
    subtitle: 'Bratislava',
    description:
      'Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Sme privátny wellness, kde sa zameriavame na každého jednotlivého zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.',
    openingHours: 'Otváracie hodiny',
    weekdays: 'Pondelok – Piatok',
    weekends: 'Sobota – Nedeľa',
    cta: 'Rezervovať vstup',
  },
  en: {
    subtitle: 'Bratislava',
    description:
      'We offer private wellness for couples or groups of friends. Our private spa focuses on each guest individually during sauna sessions, massages, and jacuzzi relaxation.',
    openingHours: 'Opening Hours',
    weekdays: 'Monday – Friday',
    weekends: 'Saturday – Sunday',
    cta: 'Book your visit',
  },
} as const;

export default function Hero({ locale = DEFAULT_LOCALE }: HeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const t = copy[locale];
  const heroVideoSrc = '/videos/hero-video-optimized.mp4?v=20260217';
  const bookiaLink = `https://services.bookio.com/spa-relax-bratislava/widget?lang=${getBookioLang(locale)}`;

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateVideoMode = () => {
      const nav = navigator as Navigator & {
        connection?: {
          effectiveType?: string;
          saveData?: boolean;
        };
      };
      const connection = nav.connection;
      const slowConnection =
        connection?.effectiveType !== undefined &&
        ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
      const saveData = Boolean(connection?.saveData);

      const enabled = desktopQuery.matches && !reducedMotionQuery.matches && !slowConnection && !saveData;
      setShouldRenderVideo(enabled);

      if (!enabled) {
        setShowVideo(false);
      }
    };

    const bindMediaQueryChange = (query: MediaQueryList, listener: () => void) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', listener);
        return () => query.removeEventListener('change', listener);
      }

      query.addListener(listener);
      return () => query.removeListener(listener);
    };

    updateVideoMode();
    const removeDesktopListener = bindMediaQueryChange(desktopQuery, updateVideoMode);
    const removeMotionListener = bindMediaQueryChange(reducedMotionQuery, updateVideoMode);

    return () => {
      removeDesktopListener();
      removeMotionListener();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#faf9f7]">
      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/optimized/image-4.webp"
          alt="Spa-Relax Bratislava"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#faf9f7]/92"></div>
      </div>

      {/* Video / Image Side for desktop */}
      <div className="hidden lg:block lg:flex-1 relative order-1 min-h-screen">
        {/* Fallback image */}
        <Image
          src="/images/optimized/hero-poster.webp"
          alt="Wellness"
          fill
          className={`object-cover z-0 transition-opacity duration-700 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        
        {/* Video Background */}
        {shouldRenderVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
              showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            poster="/images/optimized/hero-poster.webp"
            onCanPlay={() => setShowVideo(true)}
            onError={() => {
              setShowVideo(false);
              setShouldRenderVideo(false);
            }}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
        
        {/* Gradient overlay - multiple layers for better effect */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#CD7F32]/35 via-[#CD7F32]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Content Side */}
      <div className="relative z-10 w-full lg:flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-20 order-1 lg:order-2 min-h-[100vh] lg:min-h-screen">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg lg:bg-transparent lg:backdrop-blur-0 lg:rounded-none lg:p-0 lg:shadow-none text-center lg:space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-5 leading-tight">
            Spa-Relax
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-light text-[#6b6b6b] mb-6 sm:mb-10">
            {t.subtitle}
          </h2>
          
          <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed mb-8 sm:mb-12 max-w-xl mx-auto">
            {t.description}
          </p>

          {/* Opening Hours - Modern Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg border border-[#e8e6e3] text-center">
            <p className="text-[#2c2c2c] font-semibold mb-4 text-base sm:text-lg font-display">{t.openingHours}</p>
            <div className="space-y-3">
              <div className="py-2 border-b border-[#e8e6e3]">
                <p className="text-[#6b6b6b] font-medium text-sm sm:text-base mb-1">{t.weekdays}</p>
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">11:00 – 22:00</p>
              </div>
              <div className="py-2">
                <p className="text-[#6b6b6b] font-medium text-sm sm:text-base mb-1">{t.weekends}</p>
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">10:00 – 22:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href={bookiaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#CD7F32] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#A0522D] transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-center min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
