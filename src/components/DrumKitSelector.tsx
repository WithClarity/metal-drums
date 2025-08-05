import React from 'react';
import type { DrumKit } from '../audio/drumEngine';
import type { Genre } from '../types/drum';

interface DrumKitSelectorProps {
  currentKit: DrumKit;
  availableKits: DrumKit[];
  onKitChange: (kitId: string) => Promise<void>;
  currentGenre?: Genre;
  className?: string;
}

export const DrumKitSelector: React.FC<DrumKitSelectorProps> = ({
  currentKit,
  availableKits,
  onKitChange,
  currentGenre,
  className = ''
}) => {
  // Filter kits by current genre if specified
  const filteredKits = currentGenre
    ? availableKits.filter(kit => kit.genre.includes(currentGenre))
    : availableKits;

  const handleKitChange = async (kitId: string) => {
    try {
      await onKitChange(kitId);
    } catch (error) {
      console.error('Failed to change drum kit:', error);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🥁 Drum Kit Selection
        </h3>
        <div className="text-sm text-gray-400">
          {filteredKits.length} kit{filteredKits.length !== 1 ? 's' : ''} available
          {currentGenre && ` for ${currentGenre}`}
        </div>
      </div>

      {/* Current Kit Display */}
      <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-cyan-400">{currentKit.name}</h4>
            <p className="text-sm text-gray-300">{currentKit.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentKit.genre.map(genre => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-medium"
                >
                  {genre.replace('-', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="text-2xl">✓</div>
        </div>
      </div>

      {/* Kit Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredKits.map((kit) => {
          const isActive = kit.id === currentKit.id;
          const isRecommended = currentGenre && kit.genre.includes(currentGenre);

          return (
            <button
              key={kit.id}
              onClick={() => handleKitChange(kit.id)}
              disabled={isActive}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border-cyan-400 cursor-default'
                  : isRecommended
                  ? 'bg-gradient-to-br from-green-800/50 to-emerald-800/50 border-green-500/50 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-700/60 hover:to-emerald-700/60'
                  : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/50 hover:border-gray-500 hover:bg-gradient-to-br hover:from-gray-700/60 hover:to-gray-800/60'
              }`}
              title={kit.description}
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className={`font-bold text-sm ${
                  isActive ? 'text-cyan-300' : isRecommended ? 'text-green-300' : 'text-white'
                }`}>
                  {kit.name}
                </h5>
                {isRecommended && currentGenre && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    ★ Recommended
                  </span>
                )}
              </div>

              <p className={`text-xs mb-3 ${
                isActive ? 'text-cyan-200' : 'text-gray-400'
              }`}>
                {kit.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {kit.genre.map(genre => (
                  <span
                    key={genre}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      isActive
                        ? 'bg-cyan-500/30 text-cyan-200'
                        : isRecommended
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-gray-600/50 text-gray-300'
                    }`}
                  >
                    {genre.replace('-', ' ').toUpperCase()}
                  </span>
                ))}
              </div>

              {isActive && (
                <div className="mt-3 text-cyan-400 text-sm font-medium flex items-center gap-1">
                  ✓ Currently Active
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filteredKits.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No drum kits available for the current genre.</p>
          <p className="text-sm mt-2">Try selecting a different genre or check all available kits.</p>
        </div>
      )}

      {/* Kit Information */}
      <div className="text-xs text-gray-500 p-3 bg-gray-800/30 rounded-lg">
        <p className="mb-1">💡 <strong>Tip:</strong> Different kits have unique characteristics:</p>
        <ul className="space-y-1 ml-4">
          <li>• <strong>Pearl Studio:</strong> Clean, professional sounds</li>
          <li>• <strong>Big & Heavy Real:</strong> Powerful metal samples</li>
          <li>• <strong>Aggressive Real:</strong> Hard-hitting extreme genre sounds</li>
          <li>• <strong>Dynamic Real:</strong> Versatile samples with great dynamics</li>
          <li>• <strong>Jazz Real:</strong> Warm, dynamic jazz tones</li>
          <li>• <strong>Classic Electronic:</strong> Traditional drum machine sounds</li>
        </ul>
      </div>
    </div>
  );
};
