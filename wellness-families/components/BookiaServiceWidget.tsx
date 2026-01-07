'use client';

import Link from 'next/link';

export default function BookiaServiceWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3] p-8 sm:p-12">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#c97d60]/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#c97d60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#2c2c2c] mb-4">
            Online rezervácia
          </h3>
          <p className="text-lg text-[#6b6b6b] mb-8 max-w-2xl mx-auto">
            Rezervujte si návštevu v našom privátnom wellness centre. 
            Vyberte si dátum, čas a službu, ktorú si chcete rezervovať.
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <Link
            href="https://services.bookio.com/wellmass-zktmzrwb?lang=sk&hiddenHeader=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#c97d60] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#b86a4d] transition-all shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto min-h-[44px] flex items-center justify-center touch-manipulation"
          >
            Otvoriť rezervačný systém
          </Link>
        </div>
        
        <div className="bg-[#faf9f7] rounded-xl p-6 border border-[#e8e6e3]">
          <p className="text-sm text-[#6b6b6b] mb-2">
            <strong className="text-[#2c2c2c]">Poznámka:</strong> Rezervačný systém sa otvorí v novom okne.
          </p>
          <p className="text-sm text-[#6b6b6b]">
            V rezervačnom systéme si môžete vybrať z kategórií: Wellness, Sauna, Relax alebo Masáž.
          </p>
        </div>
      </div>
    </div>
  );
}

