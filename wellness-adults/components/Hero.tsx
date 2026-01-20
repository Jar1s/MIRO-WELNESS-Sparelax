import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const heroVideoSrc = '/videos/hero-video.mp4?v=20250120';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Photo 1.png"
          alt="Wellness"
          fill
          className="object-cover"
          priority
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/Photo 1.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0d0d0d]/85"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-white/90 mb-4 drop-shadow-lg font-light">
            Vitajte
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#CD7F32] mb-6 drop-shadow-lg">
            Spa-Relax
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8 drop-shadow-lg">
            Bratislava
          </h2>
          
          {/* Opening Hours */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-md mx-auto border border-white/20">
            <p className="text-white font-semibold mb-3 text-lg">Naša ponuka</p>
            <div className="space-y-2 text-white/90">
              <p className="flex justify-between">
                <span className="font-medium">Pondelok – Piatok:</span>
                <span>11:00 – 22:00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Sobota – Nedeľa:</span>
                <span>10:00 – 22:00</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/rezervacia"
              className="bg-[#CD7F32] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#A0522D] transition shadow-lg"
            >
              Rezervovať vstup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
