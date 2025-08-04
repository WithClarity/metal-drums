import { useState } from 'react';
import { Waves, Repeat, Sliders, RefreshCw } from 'lucide-react';

interface EffectsControlsProps {
  onReverbChange: (type: string, level: number, time: number, gate: number) => void;
  onDelayChange: (type: string, level: number, time: number, feedback: number) => void;
  onFilterChange: (type: string, frequency: number, resonance: number) => void;
  onDistortionChange: (amount: number, type: string) => void;
}

const reverbTypes = [
  { id: 'room', name: 'Room' },
  { id: 'hall', name: 'Hall' },
  { id: 'plate', name: 'Plate' },
  { id: 'spring', name: 'Spring' },
  { id: 'reverse', name: 'Reverse' },
  { id: 'gated', name: 'Gated' },
  { id: 'ambience', name: 'Ambience' },
  { id: 'cathedral', name: 'Cathedral' }
];

const delayTypes = [
  { id: 'tape', name: 'Tape' },
  { id: 'digital', name: 'Digital' },
  { id: 'analog', name: 'Analog' },
  { id: 'reverse', name: 'Reverse' },
  { id: 'pingpong', name: 'Ping-Pong' },
  { id: 'multitap', name: 'Multi-Tap' },
  { id: 'modulated', name: 'Modulated' },
  { id: 'granular', name: 'Granular' }
];

const filterTypes = [
  { id: 'lowpass', name: 'Low Pass' },
  { id: 'highpass', name: 'High Pass' },
  { id: 'bandpass', name: 'Band Pass' },
  { id: 'notch', name: 'Notch' }
];

const distortionTypes = [
  { id: 'tube', name: 'Tube' },
  { id: 'transistor', name: 'Transistor' },
  { id: 'bitcrush', name: 'Bit Crush' },
  { id: 'overdrive', name: 'Overdrive' }
];

export function EffectsControls({
  onReverbChange,
  onDelayChange,
  onFilterChange,
  onDistortionChange
}: EffectsControlsProps) {
  const [reverbSettings, setReverbSettings] = useState({
    type: 'room',
    level: 0,
    time: 50,
    gate: 0
  });

  const [delaySettings, setDelaySettings] = useState({
    type: 'digital',
    level: 0,
    time: 25,
    feedback: 30
  });

  const [filterSettings, setFilterSettings] = useState({
    type: 'lowpass',
    frequency: 100,
    resonance: 0
  });

  const [distortionSettings, setDistortionSettings] = useState({
    amount: 0,
    type: 'tube'
  });

  const updateReverb = (updates: Partial<typeof reverbSettings>) => {
    const newSettings = { ...reverbSettings, ...updates };
    setReverbSettings(newSettings);
    onReverbChange(newSettings.type, newSettings.level, newSettings.time, newSettings.gate);
  };

  const updateDelay = (updates: Partial<typeof delaySettings>) => {
    const newSettings = { ...delaySettings, ...updates };
    setDelaySettings(newSettings);
    onDelayChange(newSettings.type, newSettings.level, newSettings.time, newSettings.feedback);
  };

  const updateFilter = (updates: Partial<typeof filterSettings>) => {
    const newSettings = { ...filterSettings, ...updates };
    setFilterSettings(newSettings);
    onFilterChange(newSettings.type, newSettings.frequency, newSettings.resonance);
  };

  const updateDistortion = (updates: Partial<typeof distortionSettings>) => {
    const newSettings = { ...distortionSettings, ...updates };
    setDistortionSettings(newSettings);
    onDistortionChange(newSettings.amount, newSettings.type);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 space-y-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Waves size={20} className="text-cyan-400" />
        Effects
      </h3>

      {/* Reverb */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Waves size={16} />
          Reverb
        </h4>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {reverbTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => updateReverb({ type: type.id })}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                reverbSettings.type === type.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Level</label>
            <input
              type="range"
              min="0"
              max="100"
              value={reverbSettings.level}
              onChange={(e) => updateReverb({ level: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{reverbSettings.level}%</span>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Time</label>
            <input
              type="range"
              min="0"
              max="100"
              value={reverbSettings.time}
              onChange={(e) => updateReverb({ time: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{reverbSettings.time}%</span>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Gate</label>
            <input
              type="range"
              min="0"
              max="100"
              value={reverbSettings.gate}
              onChange={(e) => updateReverb({ gate: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{reverbSettings.gate}%</span>
          </div>
        </div>
      </div>

      {/* Delay */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Repeat size={16} />
          Delay
        </h4>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {delayTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => updateDelay({ type: type.id })}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                delaySettings.type === type.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Level</label>
            <input
              type="range"
              min="0"
              max="100"
              value={delaySettings.level}
              onChange={(e) => updateDelay({ level: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{delaySettings.level}%</span>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Time</label>
            <input
              type="range"
              min="0"
              max="100"
              value={delaySettings.time}
              onChange={(e) => updateDelay({ time: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{delaySettings.time}%</span>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Feedback</label>
            <input
              type="range"
              min="0"
              max="100"
              value={delaySettings.feedback}
              onChange={(e) => updateDelay({ feedback: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{delaySettings.feedback}%</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Sliders size={16} />
          Filter
        </h4>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {filterTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => updateFilter({ type: type.id })}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                filterSettings.type === type.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Frequency</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filterSettings.frequency}
              onChange={(e) => updateFilter({ frequency: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{filterSettings.frequency}%</span>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Resonance</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filterSettings.resonance}
              onChange={(e) => updateFilter({ resonance: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300">{filterSettings.resonance}%</span>
          </div>
        </div>
      </div>

      {/* Distortion */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <RefreshCw size={16} />
          Distortion
        </h4>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {distortionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => updateDistortion({ type: type.id })}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                distortionSettings.type === type.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Amount</label>
          <input
            type="range"
            min="0"
            max="100"
            value={distortionSettings.amount}
            onChange={(e) => updateDistortion({ amount: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-300">{distortionSettings.amount}%</span>
        </div>
      </div>
    </div>
  );
}
