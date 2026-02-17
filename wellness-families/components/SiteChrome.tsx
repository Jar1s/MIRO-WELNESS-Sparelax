'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n';

type SiteChromeProps = {
  children: React.ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const parts = (pathname || '/').split('/').filter(Boolean);
  const maybeLocale = parts[0];
  const locale: Locale = maybeLocale && isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
  const pagePart = maybeLocale && isLocale(maybeLocale) ? parts[1] : parts[0];
  const isAdmin = pagePart === 'admin';

  if (isAdmin) {
    return <main className="overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      <Header locale={locale} />
      <main className="overflow-x-hidden">{children}</main>
      <Footer locale={locale} />
      <PromoPopup locale={locale} />
    </>
  );
}
