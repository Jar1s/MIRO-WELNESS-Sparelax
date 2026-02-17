'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DEFAULT_LOCALE,
  getBookioLang,
  stripLocaleFromPathname,
  toLocalizedPath,
  type Locale,
} from '@/lib/i18n';

type HeaderProps = {
  locale?: Locale;
};

const copy = {
  sk: {
    home: 'Úvod',
    about: 'O nás',
    services: 'Služby',
    pricing: 'Cenník',
    contact: 'Kontakt',
    reservation: 'Rezervácia',
    openMenu: 'Otvoriť menu',
    closeMenu: 'Zavrieť menu',
    languageSwitch: 'Zmeniť jazyk',
  },
  en: {
    home: 'Home',
    about: 'About us',
    services: 'Services',
    pricing: 'Pricing',
    contact: 'Contact',
    reservation: 'Reservation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageSwitch: 'Change language',
  },
} as const;

export default function Header({ locale = DEFAULT_LOCALE }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const t = copy[locale];
  const basePath = stripLocaleFromPathname(pathname || '/');
  const rootPath = toLocalizedPath(locale, '/');
  const skPath = toLocalizedPath('sk', basePath);
  const enPath = toLocalizedPath('en', basePath);
  const bookiaLink = `https://services.bookio.com/spa-relax-bratislava/widget?lang=${getBookioLang(locale)}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const navItems = [
    { href: rootPath, label: t.home },
    { href: toLocalizedPath(locale, '/o-nas'), label: t.about },
    { href: toLocalizedPath(locale, '/sluzby'), label: t.services },
    { href: toLocalizedPath(locale, '/cennik'), label: t.pricing },
    { href: toLocalizedPath(locale, '/kontakt'), label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <Link
            href={rootPath}
            className="text-2xl sm:text-3xl font-display font-bold text-[#CD7F32] tracking-tight hover:text-[#A0522D] transition-colors drop-shadow-sm"
          >
            Spa-Relax Bratislava
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2c2c2c] hover:text-[#CD7F32] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-1 rounded-full border border-[#e8d8c4] bg-white p-1">
              <Link
                href={skPath}
                aria-label={t.languageSwitch}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  locale === 'sk'
                    ? 'bg-[#CD7F32] text-white'
                    : 'text-[#2c2c2c] hover:bg-[#f5f3f0]'
                }`}
              >
                SK
              </Link>
              <Link
                href={enPath}
                aria-label={t.languageSwitch}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  locale === 'en'
                    ? 'bg-[#CD7F32] text-white'
                    : 'text-[#2c2c2c] hover:bg-[#f5f3f0]'
                }`}
              >
                EN
              </Link>
            </div>

            <Link
              href={bookiaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#CD7F32] text-white px-6 py-2.5 rounded-full hover:bg-[#A0522D] transition-all font-medium text-sm tracking-wide shadow-lg hover:shadow-xl"
            >
              {t.reservation}
            </Link>
          </div>

          {isMobile && (
            <button
              className="text-[#2c2c2c] p-2 sm:p-3 drop-shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMenuOpen}
              type="button"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 sm:mt-6 space-y-2 sm:space-y-3 pb-6 bg-white/98 backdrop-blur-md rounded-lg p-4 sm:p-6 -mx-4 sm:-mx-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#CD7F32] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex gap-2 pt-2">
              <Link
                href={skPath}
                className={`flex-1 text-center px-3 py-2.5 rounded-full text-sm font-semibold ${
                  locale === 'sk' ? 'bg-[#CD7F32] text-white' : 'bg-[#f5f3f0] text-[#2c2c2c]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                SK
              </Link>
              <Link
                href={enPath}
                className={`flex-1 text-center px-3 py-2.5 rounded-full text-sm font-semibold ${
                  locale === 'en' ? 'bg-[#CD7F32] text-white' : 'bg-[#f5f3f0] text-[#2c2c2c]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                EN
              </Link>
            </div>

            <Link
              href={bookiaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#CD7F32] text-white px-6 py-3.5 sm:py-3 rounded-full text-center hover:bg-[#A0522D] transition-all font-medium mt-4 min-h-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.reservation}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
