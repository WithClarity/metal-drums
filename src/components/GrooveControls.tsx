import { useState } from 'react';
import { Settings, Shuffle, Clock, Volume } from 'lucide-react';

interface GrooveControlsProps {
  swing: number;
  humanization: number;
  velocityRandomization: number;
  onSwingChange: (value: number) => void;
  onHumanizationChange: (value: number) => void;
  onVelocityRandomizationChange: (value: number) => void;
}

export function GrooveControls({
  swing,
  humanization,
  velocityRandomization,
  onSwingChange,
  onHumanizationChange,
  onVelocityRandomizationChange,
}: GrooveControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings size={20} />
          Groove Controls
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Swing Control */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
              <Clock size={16} />
              Swing: <span className="font-mono text-cyan-400">{swing}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="75"
              value={swing}
              onChange={(e) => onSwingChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Straight</span>
              <span>Heavy Swing</span>
            </div>
          </div>

          {/* Humanization Control */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
              <Shuffle size={16} />
              Humanize: <span className="font-mono text-cyan-400">{humanization}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={humanization}
              onChange={(e) => onHumanizationChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Robotic</span>
              <span>Human-like</span>
            </div>
          </div>

          {/* Velocity Randomization Control */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
              <Volume size={16} />
              Velocity Variation: <span className="font-mono text-cyan-400">{velocityRandomization}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={velocityRandomization}
              onChange={(e) => onVelocityRandomizationChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Consistent</span>
              <span>Dynamic</span>
            </div>
          </div>

          {/* Presets */}
          <div className="pt-2 border-t border-gray-700">
            <label className="block text-white text-sm font-medium mb-2">
              Groove Presets:
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  onSwingChange(0);
                  onHumanizationChange(0);
                  onVelocityRandomizationChange(0);
                }}
                className="px-3 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
              >
                Robotic
              </button>
              <button
                onClick={() => {
                  onSwingChange(25);
                  onHumanizationChange(15);
                  onVelocityRandomizationChange(20);
                }}
                className="px-3 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
              >
                Subtle Groove
              </button>
              <button
                onClick={() => {
                  onSwingChange(50);
                  onHumanizationChange(30);
                  onVelocityRandomizationChange(40);
                }}
                className="px-3 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
              >
                Jazz Feel
              </button>
              <button
                onClick={() => {
                  onSwingChange(0);
                  onHumanizationChange(40);
                  onVelocityRandomizationChange(60);
                }}
                className="px-3 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
              >
                Live Drummer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
