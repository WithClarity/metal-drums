import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import type { Pattern } from '../types/drum';

interface TransportControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  bpm: number;
  volume: number;
  pattern: Pattern | null;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onBPMChange: (bpm: number) => void;
  onVolumeChange: (volume: number) => void;
  onClear: () => void;
}

export function TransportControls({
  isPlaying,
  isLoading,
  bpm,
  volume,
  pattern,
  onPlay,
  onPause,
  onStop,
  onBPMChange,
  onVolumeChange,
  onClear,
}: TransportControlsProps) {
  return (
    <div className="card-pro rounded-xl p-6 fade-in">
      <h2 className="text-xl font-bold text-gradient mb-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
        Transport
      </h2>

      {/* Enhanced Playback controls */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isLoading || !pattern}
          className={`btn-pro transport-button flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isPlaying
              ? 'playing bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
            } disabled:bg-gray-600 disabled:cursor-not-allowed text-white border border-white/20`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onStop}
          disabled={isLoading}
          className="btn-pro flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-all duration-300 border border-white/20"
          aria-label="Stop"
        >
          <Square size={24} />
        </button>

        <button
          onClick={onClear}
          disabled={isLoading}
          className="btn-pro flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-all duration-300 border border-white/20"
          aria-label="Clear pattern"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Enhanced BPM Control */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <span className="text-cyan-400">♪</span>
          BPM: <span className="text-cyan-400 font-mono text-lg">{bpm}</span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="60"
            max="300"
            value={bpm}
            onChange={(e) => onBPMChange(Number(e.target.value))}
            className="slider w-full h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg appearance-none cursor-pointer"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>60</span>
            <span className="text-cyan-400 font-mono">Tempo</span>
            <span>300</span>
          </div>
        </div>
      </div>

      {/* Enhanced Volume Control */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <span className="text-purple-400">🔊</span>
          Volume: <span className="text-purple-400 font-mono text-lg">{Math.round(volume * 100)}%</span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="slider w-full h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg appearance-none cursor-pointer"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span className="text-purple-400 font-mono">Master</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' :
                isPlaying ? 'bg-green-400' : 'bg-gray-500'
              }`}></div>
            <span className="text-gray-300">
              {isLoading ? 'Loading...' : isPlaying ? 'Playing' : 'Stopped'}
            </span>
          </div>
          {pattern && (
            <span className="text-xs text-gray-500 font-mono">
              {pattern.genre.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
