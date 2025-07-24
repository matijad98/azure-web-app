import { useCallback } from 'react';

interface GongProps {
  onHit: () => void;
  isAnimating?: boolean;
}

export const Gong = ({ onHit, isAnimating = false }: GongProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onHit();
    },
    [onHit]
  );

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* Office Word Team Banner */}
      <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-blue-100">Microsoft Office</div>
          <div className="text-2xl font-bold">Word Team</div>
          <div className="text-sm text-blue-200">Feature Release Celebration</div>
        </div>
      </div>

      {/* Gong Stand Structure - Based on Real Gong Image */}
      <div className="relative w-96 h-80 mx-auto">
        {/* Base Platforms - Bottom rectangular bases */}
        <div className="absolute bottom-0 left-4 w-20 h-8 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 rounded-sm shadow-lg transform perspective-500 rotateX-10"></div>
        <div className="absolute bottom-0 right-4 w-20 h-8 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 rounded-sm shadow-lg transform perspective-500 rotateX-10"></div>

        {/* Support Blocks on Bases */}
        <div className="absolute bottom-6 left-8 w-12 h-6 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-sm shadow-md"></div>
        <div className="absolute bottom-6 right-8 w-12 h-6 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-sm shadow-md"></div>

        {/* Vertical Posts - Main support columns */}
        <div className="absolute bottom-12 left-12 w-4 h-48 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 rounded-full shadow-lg"></div>
        <div className="absolute bottom-12 right-12 w-4 h-48 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 rounded-full shadow-lg"></div>

        {/* Decorative Caps on Posts */}
        <div className="absolute top-16 left-10 w-8 h-8 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-md"></div>
        <div className="absolute top-16 right-10 w-8 h-8 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-md"></div>

        {/* Horizontal Crossbar - Top beam connecting posts */}
        <div className="absolute top-20 left-10 right-10 h-3 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 rounded-full shadow-lg"></div>

        {/* Crossbar decorative elements */}
        <div className="absolute top-18 left-16 w-2 h-2 bg-amber-900 rounded-full"></div>
        <div className="absolute top-18 right-16 w-2 h-2 bg-amber-900 rounded-full"></div>
        <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-900 rounded-full"></div>

        {/* Hanging Chains - Positioned to match centered gong */}
        <div
          className={`absolute top-24 left-1/2 transform -translate-x-6 transition-transform duration-300 ${
            isAnimating ? 'animate-swing' : ''
          }`}
        >
          <div className="w-0.5 h-8 bg-gray-800 shadow-sm"></div>
          <div className="absolute top-0 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-2 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-4 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-6 w-1 h-1 bg-gray-900 rounded-full"></div>
        </div>

        <div
          className={`absolute top-24 left-1/2 transform translate-x-6 transition-transform duration-300 ${
            isAnimating ? 'animate-swing' : ''
          }`}
        >
          <div className="w-0.5 h-8 bg-gray-800 shadow-sm"></div>
          <div className="absolute top-0 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-2 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-4 w-1 h-1 bg-gray-900 rounded-full"></div>
          <div className="absolute top-6 w-1 h-1 bg-gray-900 rounded-full"></div>
        </div>

        {/* Gong Mallet - positioned better relative to new gong position */}
        <div
          className={`absolute top-38 left-2 transform transition-transform duration-300 ${
            isAnimating ? 'rotate-45 scale-110' : 'rotate-12'
          }`}
        >
          <div className="w-1 h-14 bg-amber-800 rounded-full shadow-sm"></div>
          <div className="absolute top-0 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="absolute top-0 w-0.5 h-3 bg-gray-900"></div>
        </div>

        {/* The Gong Disc - Explicitly centered between the posts */}
        <div
          className={`absolute top-32 w-48 h-48 cursor-pointer transition-transform duration-300 ease-out ${
            isAnimating ? 'animate-pulse scale-110 drop-shadow-2xl' : 'hover:scale-105 drop-shadow-lg'
          }`}
          style={{
            left: 'calc(50% - 96px)', // Center of container minus half gong width (24 * 4 = 96px)
            animation: isAnimating ? 'gong-vibrate 0.8s ease-out' : undefined,
          }}
          onClick={handleClick}
          role="button"
          aria-label="Strike the celebration gong"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              const fakeEvent = {
                currentTarget: e.currentTarget,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
              } as React.MouseEvent<HTMLDivElement>;
              handleClick(fakeEvent);
            }
          }}
        >
          {/* Outer Ring - Main golden surface */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-2xl transition-all duration-300 ${
              isAnimating ? 'shadow-yellow-400/50 shadow-2xl' : ''
            }`}
          ></div>

          {/* Strike Effect Ripples - Only visible when animating */}
          {isAnimating && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-yellow-300 opacity-70 animate-ping"></div>
              <div
                className="absolute inset-2 rounded-full border-2 border-yellow-400 opacity-50 animate-ping"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="absolute inset-4 rounded-full border border-yellow-500 opacity-30 animate-ping"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </>
          )}

          {/* Middle Ring - Depth layer */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 shadow-inner"></div>

          {/* Inner Ring - Central area */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-800 shadow-inner"></div>

          {/* Center Boss - Raised center without logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-900 shadow-lg"></div>

          {/* Central raised dot - traditional gong center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-800 via-yellow-900 to-amber-900 shadow-inner"></div>

          {/* Concentric Circles for Traditional Gong Appearance */}
          <div className="absolute inset-6 rounded-full border border-yellow-600 opacity-40"></div>
          <div className="absolute inset-12 rounded-full border border-yellow-700 opacity-50"></div>
          <div className="absolute inset-16 rounded-full border border-yellow-800 opacity-30"></div>

          {/* Multiple Shine Effects for Realism */}
          <div
            className={`absolute top-8 left-8 w-12 h-12 bg-white rounded-full blur-sm transition-opacity duration-300 ${
              isAnimating ? 'opacity-60' : 'opacity-30'
            }`}
          ></div>
          <div
            className={`absolute top-16 left-16 w-6 h-6 bg-white rounded-full blur-xs transition-opacity duration-300 ${
              isAnimating ? 'opacity-80' : 'opacity-50'
            }`}
          ></div>
          <div
            className={`absolute top-20 left-24 w-3 h-3 bg-white rounded-full transition-opacity duration-300 ${
              isAnimating ? 'opacity-90' : 'opacity-70'
            }`}
          ></div>

          {/* Additional dynamic shine effects when struck */}
          {isAnimating && (
            <>
              <div className="absolute top-12 right-12 w-8 h-8 bg-white opacity-40 rounded-full blur-sm animate-pulse"></div>
              <div
                className="absolute bottom-12 left-20 w-4 h-4 bg-white opacity-50 rounded-full animate-pulse"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="absolute top-1/2 right-8 w-6 h-6 bg-white opacity-30 rounded-full blur-xs animate-pulse"
                style={{ animationDelay: '0.4s' }}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
