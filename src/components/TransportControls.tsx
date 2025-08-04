import { Play, Pause, Square, RotateCcw } from 'lucide-react';
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
    <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-3">Transport</h2>

      {/* Playback controls */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isLoading || !pattern}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={onStop}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          aria-label="Stop"
        >
          <Square size={20} />
        </button>

        <button
          onClick={onClear}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          aria-label="Clear pattern"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* BPM Control */}
      <div className="mb-4">
        <label htmlFor="bpm" className="block text-white text-sm font-medium mb-2">
          BPM: <span className="font-mono text-lg text-cyan-400">{bpm}</span>
        </label>
        <input
          id="bpm"
          type="range"
          min="60"
          max="300"
          value={bpm}
          onChange={(e) => onBPMChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60</span>
          <span>300</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[80, 120, 140, 180, 200].map(presetBpm => (
            <button
              key={presetBpm}
              onClick={() => onBPMChange(presetBpm)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                bpm === presetBpm
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {presetBpm}
            </button>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <label htmlFor="volume" className="block text-white text-sm font-medium mb-1">
          Volume: <span className="font-mono">{Math.round(volume * 100)}%</span>
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
}
