'use client';

import { useEffect } from 'react';

interface BookiaWidgetProps {
  bookiaId?: string;
  embedUrl?: string;
  className?: string;
}

export default function BookiaWidget({ 
  bookiaId, 
  embedUrl,
  className = '' 
}: BookiaWidgetProps) {
  // Widget script approach - must be called unconditionally
  useEffect(() => {
    const actualBookiaId = bookiaId || process.env.NEXT_PUBLIC_BOOKIA_ID;

    // If embedUrl is provided, skip widget script
    if (embedUrl) return;
    
    if (!actualBookiaId || actualBookiaId === 'YOUR_BOOKIA_ID') {
      console.warn('Bookia ID nie je nastavený. Prosím nastavte NEXT_PUBLIC_BOOKIA_ID v .env.local');
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[data-bookia-id="${actualBookiaId}"]`);
    if (existingScript) {
      return;
    }

    // Create and load Bookia widget script
    const script = document.createElement('script');
    script.src = `https://widget.bookia.sk/embed.js`;
    script.async = true;
    script.setAttribute('data-bookia-id', actualBookiaId);
    
    script.onerror = () => {
      console.error('Nepodarilo sa načítať Bookia widget');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-bookia-id="${actualBookiaId}"]`);
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, [bookiaId, embedUrl]);

  const actualBookiaId = bookiaId || process.env.NEXT_PUBLIC_BOOKIA_ID;

  // If embedUrl is provided, use iframe approach
  if (embedUrl) {
    return (
      <div className={className}>
        <iframe
          src={embedUrl}
          className="w-full min-h-[600px] border-0 rounded-lg"
          title="Bookia Rezervácia"
          allow="payment"
        />
      </div>
    );
  }

  if (!actualBookiaId || actualBookiaId === 'YOUR_BOOKIA_ID') {
    return (
      <div className={className}>
        <div className="min-h-[600px] flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Bookia ID nie je nastavený
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Prosím nastavte <code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_BOOKIA_ID</code> v súbore <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>
            </p>
            <p className="text-sm text-gray-500">
              Alebo kontaktujte Bookia podporu na info@bookia.sk
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Bookia widget will be injected here by the script */}
      <div id={`bookia-widget-${actualBookiaId}`} className="min-h-[600px]"></div>
    </div>
  );
}

// Helper function to get Bookia direct link
export function getBookiaLink(bookiaId?: string): string {
  const id = bookiaId || process.env.NEXT_PUBLIC_BOOKIA_ID;
  if (!id || id === 'YOUR_BOOKIA_ID') {
    return '#';
  }
  return 'https://services.bookio.com/spa-relax-bratislava/widget?lang=sk';
}
