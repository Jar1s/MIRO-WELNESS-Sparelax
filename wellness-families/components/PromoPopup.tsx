'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LOCALE, toLocalizedPath, type Locale } from '@/lib/i18n';

type PopupData = {
  id: string;
  title?: string | null;
  body?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  popup_size?: 'sm' | 'md' | 'lg' | null;
  updated_at?: string | null;
};

type PromoPopupProps = {
  locale?: Locale;
};

export default function PromoPopup({ locale = DEFAULT_LOCALE }: PromoPopupProps) {
  const router = useRouter();
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);
  const [imageOk, setImageOk] = useState(true);
  const pricingPath = toLocalizedPath(locale, '/cennik');
  const t =
    locale === 'en'
      ? {
          dialogLabel: 'Promo notification',
          openPricing: 'Open pricing',
          close: 'Close',
          more: 'Learn more',
          fallbackAlt: 'Promo',
        }
      : {
          dialogLabel: 'Promo notifikácia',
          openPricing: 'Otvoriť cenník',
          close: 'Zavrieť',
          more: 'Zistiť viac',
          fallbackAlt: 'Promo',
        };

  const getDismissKey = (data: PopupData) =>
    `promo_popup_dismissed_${data.id}_${data.updated_at ?? 'v1'}`;

  const loadPopup = useCallback(async () => {
    try {
      const res = await fetch(`/api/popup?_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;

      const json = await res.json();
      const data: PopupData | null = json?.popup ?? null;
      if (!data?.id) {
        setPopup(null);
        setVisible(false);
        return;
      }

      const forcePreview = new URLSearchParams(window.location.search).get('popupPreview') === '1';
      const key = getDismissKey(data);
      const dismissed = localStorage.getItem(key);

      setPopup(data);
      setImageOk(true);
      setVisible(forcePreview || !dismissed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      void loadPopup();
    }, 0);

    const handleFocus = () => {
      void loadPopup();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'promo_popup_force_refresh') {
        void loadPopup();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    const interval = window.setInterval(() => {
      void loadPopup();
    }, 30000);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
      window.clearInterval(interval);
    };
  }, [loadPopup]);

  useEffect(() => {
    if (!visible) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overscrollBehavior = 'none';

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, [visible]);

  const handleClose = () => {
    if (popup) {
      const key = getDismissKey(popup);
      localStorage.setItem(key, '1');
    }
    setVisible(false);
  };

  const handleOpenAction = () => {
    handleClose();
    const target = popup?.link_url?.trim();

    if (!target) {
      router.push(pricingPath);
      return;
    }

    if (/^https?:\/\//i.test(target)) {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }

    if (target.startsWith('/')) {
      router.push(target);
      return;
    }

    router.push(pricingPath);
  };

  if (!popup || !visible) return null;

  const normalizedSize: 'sm' | 'md' | 'lg' =
    popup.popup_size === 'lg' || popup.popup_size === 'sm' ? popup.popup_size : 'md';
  const sizeClass =
    normalizedSize === 'lg'
      ? 'w-[88vw] sm:w-[480px] lg:w-[560px] max-h-[82vh] sm:max-h-[88vh]'
      : normalizedSize === 'sm'
        ? 'w-[56vw] sm:w-[220px] lg:w-[260px] max-h-[54vh] sm:max-h-[60vh]'
        : 'w-[70vw] sm:w-[320px] lg:w-[380px] max-h-[66vh] sm:max-h-[72vh]';

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-sm overscroll-none"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogLabel}
    >
      <div className="relative h-full w-full overflow-hidden">
        {popup.image_url && imageOk ? (
          <>
            <img
              src={popup.image_url}
              alt={popup.title || t.fallbackAlt}
              className="absolute inset-0 h-full w-full object-cover scale-[1.03] blur-[6px] opacity-45"
              draggable={false}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

            <div className="relative z-[2] flex h-full w-full items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
              <div className="relative inline-flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAction();
                  }}
                  className="block rounded-sm outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-[#CD7F32]"
                  aria-label={t.openPricing}
                >
                  <div className={`${sizeClass} flex items-center justify-center`}>
                    <img
                      src={popup.image_url}
                      alt={popup.title || t.fallbackAlt}
                      className="block h-auto w-auto max-h-full max-w-full shadow-2xl"
                      draggable={false}
                      onError={() => setImageOk(false)}
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAction();
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#f6d4a8] bg-[#CD7F32] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-2xl transition-colors hover:bg-[#A0522D]"
                  style={{ marginBottom: 'max(0px, calc(env(safe-area-inset-bottom) - 8px))' }}
                >
                  {t.more}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-white text-center gap-3 relative z-[2]">
            {popup.title && <h4 className="text-2xl font-semibold">{popup.title}</h4>}
            {popup.body && <p className="text-sm text-white/85 max-w-[580px]">{popup.body}</p>}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute z-[130] inline-flex h-12 w-12 p-0 items-center justify-center rounded-full bg-black/55 text-white shadow-xl ring-1 ring-white/85 backdrop-blur-sm transition-colors hover:bg-black/75"
          style={{ top: 'calc(env(safe-area-inset-top) + 14px)', right: 14 }}
          aria-label={t.close}
        >
          <svg
            className="h-6 w-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {(!popup.image_url || !imageOk) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenAction();
            }}
            className="absolute left-1/2 -translate-x-1/2 z-[130] inline-flex min-h-11 items-center justify-center rounded-full border border-[#f6d4a8] bg-[#CD7F32] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-2xl transition-colors hover:bg-[#A0522D]"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 18px)' }}
          >
            {t.more}
          </button>
        )}
      </div>
    </div>
  );
}
