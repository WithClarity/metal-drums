import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Genre, Pattern } from '../types/drum';

interface PatternSelectorProps {
  currentPattern: Pattern | null;
  currentGenre: Genre;
  onPatternSelect: (pattern: Pattern) => void;
  onGenreChange: (genre: Genre) => void;
  getGenrePatterns: (genre: Genre) => Pattern[];
  isDisabled?: boolean;
}

const genres: Genre[] = ['metal', 'post-hardcore', 'metalcore', 'jazz'];

const genreDisplayNames: Record<Genre, string> = {
  'metal': 'Metal',
  'post-hardcore': 'Post-Hardcore',
  'metalcore': 'Metalcore',
  'jazz': 'Jazz'
};

export function PatternSelector({
  currentPattern,
  currentGenre,
  onPatternSelect,
  onGenreChange,
  getGenrePatterns,
  isDisabled = false
}: PatternSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const patterns = getGenrePatterns(currentGenre);

  const handlePatternSelect = (pattern: Pattern) => {
    onPatternSelect(pattern);
    setIsExpanded(false);
  };

  const handleGenreChange = (genre: Genre) => {
    onGenreChange(genre);
    setIsExpanded(false);
  };

  const getCurrentPatternDisplay = () => {
    if (!currentPattern) return 'Select a Pattern';
    return `${genreDisplayNames[currentPattern.genre]} - ${currentPattern.name}`;
  };

  return (
    <div className="card-pro rounded-xl p-6 fade-in">
      <h2 className="text-xl font-bold text-gradient mb-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Pattern Library
      </h2>
      <div className="space-y-4">
        {/* Genre Tabs */}
        <div className="grid grid-cols-2 gap-1">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                handleGenreChange(genre);
                setIsExpanded(false);
              }}
              disabled={isDisabled}
              className={`px-3 py-2 text-sm font-medium rounded transition-colors ${currentGenre === genre
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {genreDisplayNames[genre]}
            </button>
          ))}
        </div>

        {/* Current Pattern Display */}
        <div className="bg-gray-800 rounded-lg p-3">
          <label className="block text-white text-sm font-medium mb-2">
            Current Pattern
          </label>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={isDisabled}
            className={`w-full flex items-center justify-between px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <span className="truncate">{getCurrentPatternDisplay()}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Pattern List */}
        {isExpanded && (
          <div className="bg-gray-800 rounded-lg max-h-64 overflow-y-auto">
            <div className="p-2 border-b border-gray-700">
              <h3 className="text-white font-medium text-sm">
                {genreDisplayNames[currentGenre]} Patterns ({patterns.length})
              </h3>
            </div>
            <div className="p-2 space-y-1">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => handlePatternSelect(pattern)}
                  disabled={isDisabled}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${currentPattern?.id === pattern.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{pattern.name}</span>
                    <span className="text-xs opacity-75">
                      {pattern.bpm} BPM • {pattern.steps} steps
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pattern Info */}
        {currentPattern && !isExpanded && (
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">BPM:</span>
                <span className="text-white ml-2">{currentPattern.bpm}</span>
              </div>
              <div>
                <span className="text-gray-400">Steps:</span>
                <span className="text-white ml-2">{currentPattern.steps}</span>
              </div>
              <div>
                <span className="text-gray-400">Swing:</span>
                <span className="text-white ml-2">{currentPattern.swing}</span>
              </div>
              <div>
                <span className="text-gray-400">ID:</span>
                <span className="text-green-400 ml-2 font-mono text-xs">{currentPattern.id}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
