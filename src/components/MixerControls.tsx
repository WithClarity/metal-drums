import { useState } from 'react';
import { Volume2, Settings, Headphones, Speaker } from 'lucide-react';

interface MixerControlsProps {
  onVolumeChange: (drum: string, volume: number) => void;
  onPanChange: (drum: string, pan: number) => void;
  onMute: (drum: string, muted: boolean) => void;
  onSolo: (drum: string, soloed: boolean) => void;
  onMasterVolumeChange: (volume: number) => void;
  masterVolume: number;
}

interface DrumChannel {
  id: string;
  name: string;
  shortName: string;
  color: string;
  defaultVolume: number;
}

const drumChannels: DrumChannel[] = [
  { id: 'kick', name: 'Kick Drum', shortName: 'BD', color: 'bg-red-500', defaultVolume: 85 },
  { id: 'snare', name: 'Snare Drum', shortName: 'SD', color: 'bg-yellow-500', defaultVolume: 80 },
  { id: 'hihat', name: 'Hi-Hat Closed', shortName: 'CH', color: 'bg-green-500', defaultVolume: 70 },
  { id: 'openhat', name: 'Hi-Hat Open', shortName: 'OH', color: 'bg-green-400', defaultVolume: 75 },
  { id: 'crash', name: 'Crash Cymbal', shortName: 'CR', color: 'bg-orange-500', defaultVolume: 85 },
  { id: 'ride', name: 'Ride Cymbal', shortName: 'RD', color: 'bg-orange-400', defaultVolume: 75 },
  { id: 'tom1', name: 'High Tom', shortName: 'HT', color: 'bg-blue-500', defaultVolume: 80 },
  { id: 'tom2', name: 'Mid Tom', shortName: 'MT', color: 'bg-blue-400', defaultVolume: 80 },
  { id: 'tom3', name: 'Low Tom', shortName: 'LT', color: 'bg-purple-500', defaultVolume: 80 },
];

export function MixerControls({
  onVolumeChange,
  onPanChange,
  onMute,
  onSolo,
  onMasterVolumeChange,
  masterVolume
}: MixerControlsProps) {
  const [channelStates, setChannelStates] = useState<{
    [key: string]: { volume: number; pan: number; muted: boolean; soloed: boolean; }
  }>(() => {
    const initial: Record<string, { volume: number; pan: number; muted: boolean; soloed: boolean; }> = {};
    drumChannels.forEach(channel => {
      initial[channel.id] = {
        volume: channel.defaultVolume,
        pan: 0,
        muted: false,
        soloed: false
      };
    });
    return initial;
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateChannelState = (drumId: string, updates: Partial<typeof channelStates[string]>) => {
    setChannelStates(prev => ({
      ...prev,
      [drumId]: { ...prev[drumId], ...updates }
    }));
  };

  const handleVolumeChange = (drumId: string, volume: number) => {
    updateChannelState(drumId, { volume });
    onVolumeChange(drumId, volume);
  };

  const handlePanChange = (drumId: string, pan: number) => {
    updateChannelState(drumId, { pan });
    onPanChange(drumId, pan);
  };

  const handleMute = (drumId: string) => {
    const newMuted = !channelStates[drumId].muted;
    updateChannelState(drumId, { muted: newMuted });
    onMute(drumId, newMuted);
  };

  const handleSolo = (drumId: string) => {
    const newSoloed = !channelStates[drumId].soloed;
    updateChannelState(drumId, { soloed: newSoloed });
    onSolo(drumId, newSoloed);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Volume2 size={20} className="text-blue-400" />
          Mixer
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`p-2 rounded-lg transition-colors ${
            showAdvanced ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
          }`}
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Master Section */}
      <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            <Speaker size={16} />
            Master Out
          </h4>
          <span className="text-xs text-gray-400">{masterVolume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={masterVolume}
          onChange={(e) => onMasterVolumeChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Channel Strips */}
      <div className="space-y-3">
        {drumChannels.map((channel) => {
          const state = channelStates[channel.id];
          return (
            <div
              key={channel.id}
              className={`p-3 rounded-lg border transition-all ${
                state.soloed
                  ? 'bg-yellow-900/30 border-yellow-600'
                  : state.muted
                  ? 'bg-red-900/20 border-red-800 opacity-50'
                  : 'bg-gray-700/30 border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${channel.color}`} />
                  <span className="text-sm font-medium text-white">{channel.shortName}</span>
                  <span className="text-xs text-gray-400">{channel.name}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleMute(channel.id)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      state.muted
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => handleSolo(channel.id)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      state.soloed
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    S
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Volume */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Vol</span>
                    <span className="text-xs text-gray-300">{state.volume}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="127"
                    value={state.volume}
                    onChange={(e) => handleVolumeChange(channel.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    disabled={state.muted}
                  />
                </div>

                {/* Pan (Advanced) */}
                {showAdvanced && (
                  <div className="w-20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Pan</span>
                      <span className="text-xs text-gray-300">
                        {state.pan === 0 ? 'C' : state.pan > 0 ? `R${state.pan}` : `L${Math.abs(state.pan)}`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-64"
                      max="64"
                      value={state.pan}
                      onChange={(e) => handlePanChange(channel.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      disabled={state.muted}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monitoring */}
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400 flex items-center gap-2">
            <Headphones size={16} />
            Monitor
          </span>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">
              {drumChannels.filter(ch => !channelStates[ch.id].muted).length} Active
            </span>
            {drumChannels.some(ch => channelStates[ch.id].soloed) && (
              <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded">
                Solo Mode
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
