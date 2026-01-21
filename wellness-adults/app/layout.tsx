import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sparelaxbratislava.sk";

export const metadata: Metadata = {
  title: "Spa-Relax Bratislava - Privátny Wellness | Bratislava",
  description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
  metadataBase: new URL(siteUrl),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
