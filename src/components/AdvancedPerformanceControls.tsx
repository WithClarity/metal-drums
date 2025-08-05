import { Clipboard, Copy, Layers, Shuffle, Trash2, Zap } from 'lucide-react';
import React from 'react';
import type { DrumType } from '../types/drum';

interface AdvancedPerformanceControlsProps {
  onScatter: (intensity: number) => void;
  onRandomize: (drums: DrumType[], intensity: number) => void;
  onFillTrigger: (fillType: 'auto' | 'manual', pattern?: number) => void;
  onPatternCopy: () => void;
  onPatternPaste: () => void;
  onPatternClear: () => void;
  onSavePattern?: () => void;
  onLoadPattern?: () => void;
  onCopyToGuitarPro?: () => void;
  probability: number;
  onProbabilityChange: (value: number) => void;
  scatterIntensity: number;
  onScatterIntensityChange: (value: number) => void;
  autoFillInterval: number;
  onAutoFillIntervalChange: (interval: number) => void;
  shuffle?: number;
  onShuffleChange?: (value: number) => void;
}

export const AdvancedPerformanceControls: React.FC<AdvancedPerformanceControlsProps> = ({
  onScatter,
  onRandomize,
  onFillTrigger,
  onPatternCopy,
  onPatternPaste,
  onPatternClear,
  onSavePattern,
  onLoadPattern,
  onCopyToGuitarPro,
  probability,
  onProbabilityChange,
  scatterIntensity,
  onScatterIntensityChange,
  autoFillInterval,
  onAutoFillIntervalChange,
  shuffle = 0,
  onShuffleChange,
}) => {
  // Define the actual drum types based on the type definition
  const allDrumTypes: DrumType[] = ['kick', 'snare', 'hihat', 'openhat', 'crash', 'ride', 'tom1', 'tom2', 'tom3'];
  const rhythmDrums: DrumType[] = ['kick', 'snare'];
  const cymbalDrums: DrumType[] = ['hihat', 'openhat', 'crash', 'ride'];
  const tomDrums: DrumType[] = ['tom1', 'tom2', 'tom3'];

  return (
    <div className="space-y-4">
      {/* Live Performance Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white mb-3 pb-2 border-b border-gray-600 flex items-center gap-2">
          <Zap size={20} className="text-cyan-400" />
          Live Performance
        </h3>

        {/* Master Probability */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">Master Probability</label>
            <span className="text-cyan-400 font-mono text-sm px-2 py-1 bg-gray-700 rounded">{probability}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={probability}
            onChange={(e) => onProbabilityChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${probability}%, #374151 ${probability}%, #374151 100%)`
            }}
          />
        </div>

        {/* Scatter Controls */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">Scatter Intensity</label>
            <span className="text-orange-400 font-mono text-sm px-2 py-1 bg-gray-700 rounded">{scatterIntensity}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={scatterIntensity}
            onChange={(e) => onScatterIntensityChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${scatterIntensity * 10}%, #374151 ${scatterIntensity * 10}%, #374151 100%)`
            }}
          />
          <button
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm tracking-wide"
            onClick={() => onScatter(scatterIntensity)}
          >
            Apply Scatter
          </button>
        </div>

        {/* Shuffle */}
        {onShuffleChange && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">Shuffle</label>
              <span className="text-yellow-400 font-mono text-sm px-2 py-1 bg-gray-700 rounded">{shuffle}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={shuffle}
              onChange={(e) => onShuffleChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #eab308 0%, #eab308 ${((shuffle + 50) / 100) * 100}%, #374151 ${((shuffle + 50) / 100) * 100}%, #374151 100%)`
              }}
            />
          </div>
        )}

        {/* Auto Fill */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Auto Fill Every</label>
          <select
            value={autoFillInterval}
            onChange={(e) => onAutoFillIntervalChange(parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          >
            <option value={0}>Off</option>
            <option value={2}>2 bars</option>
            <option value={4}>4 bars</option>
            <option value={8}>8 bars</option>
            <option value={16}>16 bars</option>
            <option value={32}>32 bars</option>
          </select>
        </div>
      </div>

      {/* Fill Controls */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white mb-3 pb-2 border-b border-gray-600 flex items-center gap-2">
          <Layers size={20} className="text-purple-400" />
          Fill Patterns
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm"
            onClick={() => onFillTrigger('manual', 1)}
          >
            Fill A
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm"
            onClick={() => onFillTrigger('manual', 2)}
          >
            Fill B
          </button>
        </div>
      </div>

      {/* Randomization */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white mb-3 pb-2 border-b border-gray-600 flex items-center gap-2">
          <Shuffle size={20} className="text-green-400" />
          Randomization
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs text-center"
            onClick={() => onRandomize(rhythmDrums, 30)}
          >
            Rhythm
          </button>
          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs text-center"
            onClick={() => onRandomize(cymbalDrums, 40)}
          >
            Cymbals
          </button>
          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs text-center"
            onClick={() => onRandomize(allDrumTypes, 25)}
          >
            All Drums
          </button>
          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs text-center"
            onClick={() => onRandomize(tomDrums, 50)}
          >
            Toms
          </button>
        </div>
      </div>

      {/* Pattern Operations */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white mb-3 pb-2 border-b border-gray-600 flex items-center gap-2">
          <Clipboard size={20} className="text-blue-400" />
          Pattern Operations
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-1"
            onClick={onPatternCopy}
          >
            <Copy size={12} />
            Copy
          </button>
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-1"
            onClick={onPatternPaste}
          >
            <Clipboard size={12} />
            Paste
          </button>
          <button
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-1"
            onClick={onPatternClear}
          >
            <Trash2 size={12} />
            Clear
          </button>
        </div>

        {/* Guitar Pro Export */}
        {onCopyToGuitarPro && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-2"
              onClick={onCopyToGuitarPro}
              title="Copy pattern to clipboard in Guitar Pro format"
            >
              <Copy size={14} />
              Export to Guitar Pro
            </button>
          </div>
        )}

        {/* Save/Load buttons */}
        {(onSavePattern || onLoadPattern) && (
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-600">
            {onSavePattern && (
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-1"
                onClick={onSavePattern}
              >
                Save
              </button>
            )}
            {onLoadPattern && (
              <button
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2.5 px-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-1"
                onClick={onLoadPattern}
              >
                Load
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
