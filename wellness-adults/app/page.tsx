import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20 bg-gray-50 relative">
        {/* Background decorative images */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64">
            <Image
              src="/images/gallery-3.jpg"
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-64 h-64">
            <Image
              src="/images/gallery-4.jpg"
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Kam v Bratislave za <em className="text-purple-600">oddychom</em>
            </h2>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Wellness Bratislava
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Nie sme ako ostatné 
              hromadné alebo hotelové wellness. Sme privátny wellness kde sa 
              zameriavame na každého jednotlivého zákazníka behom procedúr ako 
              saunovanie, masáže alebo kúpanie vo vírivke.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom 
              pozornosti budete iba Vy!
            </p>
          </div>
        </div>
      </section>
      <Services />
      
      {/* Gift Vouchers Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Venujte svojim blízkym
            </h2>
            <h3 className="text-3xl font-semibold text-purple-600 mb-6">
              oddych
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Darujte im niektorú zo širokej možností našich darčekových poukážok. 
              Detaily zistíte u nás na recepcii.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg"
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </section>
      
    </>
  );
}
