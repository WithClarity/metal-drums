import type { DrumType, Pattern } from '../types/drum';
import { defaultDrumTypes } from '../types/drum';

interface SequencerProps {
  pattern: Pattern | null;
  currentStep: number;
  onStepToggle: (drumType: DrumType, step: number) => void;
  onDrumTrigger: (drumType: DrumType) => Promise<void>;
}

const drumLabels: Record<DrumType, string> = {
  kick: 'Kick',
  snare: 'Snare',
  hihat: 'Hi-Hat',
  openhat: 'Open Hat',
  crash: 'Crash',
  ride: 'Ride',
  tom1: 'Tom 1',
  tom2: 'Tom 2',
  tom3: 'Tom 3',
};

const drumColors: Record<DrumType, string> = {
  kick: 'bg-red-600 hover:bg-red-500',
  snare: 'bg-blue-600 hover:bg-blue-500',
  hihat: 'bg-yellow-600 hover:bg-yellow-500',
  openhat: 'bg-yellow-500 hover:bg-yellow-400',
  crash: 'bg-orange-600 hover:bg-orange-500',
  ride: 'bg-purple-600 hover:bg-purple-500',
  tom1: 'bg-green-600 hover:bg-green-500',
  tom2: 'bg-green-700 hover:bg-green-600',
  tom3: 'bg-green-800 hover:bg-green-700',
};

export function Sequencer({ pattern, currentStep, onStepToggle, onDrumTrigger }: SequencerProps) {
  const steps = pattern?.steps || 16;

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-3">Drum Sequencer</h2>

      {/* Step indicators */}
      <div className="mb-3">
        <div className="flex gap-1">
          <div className="w-16 text-xs text-gray-400 flex items-center">Steps</div>
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className={`h-6 w-6 rounded border flex items-center justify-center text-xs font-bold ${
                i === currentStep
                  ? 'bg-blue-500 text-white border-blue-400'
                  : 'bg-gray-700 text-gray-300 border-gray-600'
              } ${(i + 1) % 4 === 1 ? 'border-yellow-400' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Drum tracks */}
      <div className="space-y-1">
        {defaultDrumTypes.map((drumType) => (
          <div key={drumType} className="flex items-center gap-1">
            {/* Drum trigger button */}
            <button
              onClick={async () => {
                try {
                  await onDrumTrigger(drumType);
                } catch (error) {
                  console.error('Failed to trigger drum:', error);
                }
              }}
              className={`w-16 h-6 rounded text-white text-xs font-medium ${drumColors[drumType]} transition-colors flex-shrink-0`}
            >
              {drumLabels[drumType]}
            </button>

            {/* Step buttons */}
            <div className="flex gap-1">
              {Array.from({ length: steps }, (_, i) => {
                const isActive = pattern?.beats[drumType]?.[i] || false;
                const isCurrentStep = i === currentStep;

                return (
                  <button
                    key={i}
                    onClick={() => onStepToggle(drumType, i)}
                    className={`h-6 w-6 rounded border transition-all ${
                      isActive
                        ? `${drumColors[drumType]} border-white shadow-lg`
                        : 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                    } ${isCurrentStep ? 'ring-1 ring-white ring-opacity-60' : ''}`}
                    aria-label={`Toggle ${drumLabels[drumType]} step ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!pattern && (
        <div className="text-center text-gray-400 py-6">
          <p>No pattern loaded. Select a genre preset to get started!</p>
        </div>
      )}
    </div>
  );
}
