import { Metadata } from 'next';
import BookiaServiceWidget from "@/components/BookiaServiceWidget";

export const metadata: Metadata = {
  title: 'Rezervácia - Wellness Heaven | Online rezervácia',
  description: 'Rezervujte si návštevu v našom privátnom wellness centre. Online rezervácia cez Bookia.',
};

export default function RezervaciaPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#c97d60] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            Rezervácia
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Rezervujte si návštevu
          </h1>
          <div className="w-24 h-1 bg-[#c97d60] mx-auto mb-3 sm:mb-4"></div>
          <p className="text-lg sm:text-xl text-[#6b6b6b]">
            Vyberte si dátum a čas pre vašu návštevu
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <BookiaServiceWidget />
        </div>
      </div>
    </div>
  );
}
