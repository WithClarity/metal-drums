import { Clipboard, Copy, Keyboard, Music, Play, RotateCcw, Shuffle, Square } from 'lucide-react';
import React from 'react';

export const KeyboardShortcuts: React.FC = () => {
  const drumKeys = [
    { key: 'Q', drum: 'Kick', color: 'bg-red-500' },
    { key: 'W', drum: 'Snare', color: 'bg-yellow-500' },
    { key: 'E', drum: 'Hi-Hat', color: 'bg-green-500' },
    { key: 'R', drum: 'Open Hat', color: 'bg-green-400' },
    { key: 'T', drum: 'Crash', color: 'bg-orange-500' },
    { key: 'Y', drum: 'Ride', color: 'bg-orange-400' },
    { key: 'U', drum: 'Tom 1', color: 'bg-blue-500' },
    { key: 'I', drum: 'Tom 2', color: 'bg-blue-400' },
    { key: 'O', drum: 'Tom 3', color: 'bg-purple-500' },
  ];

  const transportKeys = [
    { key: 'Space', action: 'Play/Pause', icon: Play },
    { key: 'Esc', action: 'Stop', icon: Square },
    { key: 'Del', action: 'Clear Pattern', icon: RotateCcw },
  ];

  const advancedKeys = [
    { key: 'Ctrl+R', action: 'Randomize', icon: Shuffle },
    { key: 'Ctrl+S', action: 'Scatter', icon: Music },
    { key: 'Ctrl+C', action: 'Copy Pattern', icon: Copy },
    { key: 'Ctrl+V', action: 'Paste Pattern', icon: Clipboard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Keyboard size={24} className="text-blue-400" />
        <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
      </div>

      {/* Drum Triggers */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <Music size={18} className="text-cyan-400" />
          Drum Triggers
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {drumKeys.map(({ key, drum, color }) => (
            <div key={key} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center text-white font-bold text-sm`}>
                {key}
              </div>
              <span className="text-sm text-gray-300">{drum}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Controls */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <Play size={18} className="text-green-400" />
          Transport
        </h4>
        <div className="space-y-2">
          {transportKeys.map(({ key, action, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center">
                <Icon size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-white">{action}</span>
                <div className="text-xs text-gray-400">{key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Controls */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <Shuffle size={18} className="text-purple-400" />
          Advanced
        </h4>
        <div className="space-y-2">
          {advancedKeys.map(({ key, action, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                <Icon size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-white">{action}</span>
                <div className="text-xs text-gray-400">{key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">💡 Pro Tips</h4>
        <ul className="text-xs text-blue-200 space-y-1">
          <li>• Keyboard shortcuts work when not typing in input fields</li>
          <li>• Hold keys for rapid drum triggers while pattern plays</li>
          <li>• Use shortcuts during live performance for dynamic control</li>
          <li>• Combine with mouse/touch for hybrid control workflows</li>
        </ul>
      </div>
    </div>
  );
};
