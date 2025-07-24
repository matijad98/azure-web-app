import { FeatureCelebration, Gong, GongStats } from './components';
import { useFeatureCollection, useGong } from './hooks';

export const App = () => {
  const { isAnimating, hitCount, playGongSound, resetCount } = useGong();
  const { features, addFeature } = useFeatureCollection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 relative overflow-hidden">
      {/* Microsoft Logo Decorations */}
      <div className="absolute top-10 left-10 text-blue-600 opacity-20">
        <div className="grid grid-cols-2 gap-1 w-16 h-16">
          <div className="bg-red-500 rounded-sm"></div>
          <div className="bg-green-500 rounded-sm"></div>
          <div className="bg-blue-500 rounded-sm"></div>
          <div className="bg-yellow-500 rounded-sm"></div>
        </div>
      </div>

      {/* Floor 20 Label */}
      <div className="absolute top-10 right-10 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="text-sm font-medium">Microsoft Building</div>
        <div className="text-2xl font-bold">Floor 20</div>
      </div>

      {/* Decorative Microsoft Logos scattered around */}
      <div className="absolute top-1/4 left-5 opacity-10">
        <div className="grid grid-cols-2 gap-1 w-12 h-12 rotate-12">
          <div className="bg-red-400 rounded-sm"></div>
          <div className="bg-green-400 rounded-sm"></div>
          <div className="bg-blue-400 rounded-sm"></div>
          <div className="bg-yellow-400 rounded-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 opacity-10">
        <div className="grid grid-cols-2 gap-1 w-10 h-10 -rotate-45">
          <div className="bg-red-400 rounded-sm"></div>
          <div className="bg-green-400 rounded-sm"></div>
          <div className="bg-blue-400 rounded-sm"></div>
          <div className="bg-yellow-400 rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <header className="py-6 text-center relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🏮 Microsoft Word Feature Gong 🏮</h1>
        <p className="text-gray-600 text-lg">Celebrate every feature release with our office tradition</p>
        <div className="mt-2 text-blue-600 font-medium">Office Word Team • Feature Release Celebrations</div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 relative z-10">
        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg font-medium">Strike the gong to celebrate your latest feature release!</p>
          <p className="text-gray-500 text-sm mt-1">🎉 Every ship deserves a celebration</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-start">
          {/* Stats Component - Left Side */}
          <div className="lg:order-1">
            <GongStats hitCount={hitCount} onReset={resetCount} />
          </div>

          {/* Gong Component - Center with extra spacing */}
          <div className="flex justify-center lg:order-2 py-8">
            <Gong onHit={playGongSound} isAnimating={isAnimating} />
          </div>

          {/* Feature Collection - Right Side */}
          <div className="lg:order-3">
            <FeatureCelebration onAddFeature={addFeature} recentFeatures={features} />
          </div>
        </div>

        {/* Instructions for Office Word Team */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Microsoft Word Feature Celebration Gong
            </h2>
            <p className="text-center text-gray-600 mb-6 text-lg">
              Our office tradition: Every time we ship a new Word feature, we celebrate by striking the gong! 🎉
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="font-semibold mb-2 text-blue-800">Ship a Feature</h3>
                <p>Complete and release a new Word feature for any platform</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="font-semibold mb-2 text-green-800">Strike the Gong</h3>
                <p>Click the gong to create that satisfying celebration sound</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold mb-2 text-orange-800">Celebrate Together</h3>
                <p>Share the joy of shipping features that help millions work better</p>
              </div>
            </div>

            {/* Microsoft Word Team Branding */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  <div className="bg-red-500 rounded-sm"></div>
                  <div className="bg-green-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-yellow-500 rounded-sm"></div>
                </div>
                <span className="font-medium">Microsoft Office Word Team</span>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">W</div>
              </div>
              <p className="text-center text-xs mt-2 text-gray-500">
                Empowering productivity through innovation • One feature at a time
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="grid grid-cols-2 gap-1 w-7 h-7">
            <div className="bg-red-500 rounded-sm"></div>
            <div className="bg-green-500 rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-yellow-500 rounded-sm"></div>
          </div>
          <span className="text-lg font-semibold text-gray-700">Microsoft Corporation</span>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">WORD</div>
        </div>
        <p className="text-sm font-medium text-gray-600">🎯 Celebrating innovation in productivity software 🎯</p>
        <p className="text-xs mt-2 text-blue-600">Office Word Team • Belgrade Office • Usce Tower</p>
        <p className="text-xs mt-1 text-gray-400">"Empowering every person and organization to achieve more"</p>
      </footer>
    </div>
  );
};
