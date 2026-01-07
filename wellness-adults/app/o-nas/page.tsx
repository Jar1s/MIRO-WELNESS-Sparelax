export default function ONasPage() {
  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              O nás
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Privátny Wellness
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vitajte v Wellness Heaven – súkromnom wellness centre v Bratislave. 
                Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. 
                Nie sme ako ostatné hromadné alebo hotelové wellness.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sme privátny wellness, kde sa zameriavame na každého jednotlivého 
                zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom 
                pozornosti budete iba Vy!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Naša misia
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Poskytovať dospelým exkluzívne a tiché wellness prostredie, 
                  kde sa môžu úplne uvoľniť, zrelaxovať a načerpať novú energiu.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Prečo my
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Súkromné prostredie, individuálny prístup, tichá atmosféra 
                  a profesionálny personál, ktorý rozumie potrebám dospelých 
                  klientov.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
