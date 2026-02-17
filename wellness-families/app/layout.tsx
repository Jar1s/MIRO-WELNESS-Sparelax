import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { headers } from 'next/headers';
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { normalizeLocale } from '@/lib/i18n';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sparelaxbratislava.sk";

export const metadata: Metadata = {
  title: "Spa-Relax Bratislava - Privátny Wellness | Bratislava",
  description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Spa-Relax Bratislava - Privátny Wellness | Bratislava",
    description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
    images: [
      {
        url: `${siteUrl}/images/image%204.png`,
        width: 1200,
        height: 630,
        alt: "Spa-Relax Bratislava",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa-Relax Bratislava - Privátny Wellness | Bratislava",
    description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
    images: [`${siteUrl}/images/image%204.png`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = (await headers()).get('x-locale');
  const locale = normalizeLocale(localeHeader);

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { background: #faf9f7; }
              @media (prefers-color-scheme: dark) {
                html, body { background: #04070d; }
              }
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#CD7F32" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Spa-Relax Bratislava" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var media = window.matchMedia('(prefers-color-scheme: dark)');
                  var applyTheme = function () {
                    document.documentElement.setAttribute('data-theme', media.matches ? 'dark' : 'light');
                  };
                  applyTheme();
                  if (typeof media.addEventListener === 'function') {
                    media.addEventListener('change', applyTheme);
                  } else if (typeof media.addListener === 'function') {
                    media.addListener(applyTheme);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
        {fbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1" />`,
              }}
            />
          </>
        )}

        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
