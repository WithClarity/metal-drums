import React from 'react';
import type { DrumType, Pattern } from '../types/drum';
import { defaultDrumTypes } from '../types/drum';

interface SequencerProps {
  pattern: Pattern | null;
  currentStep: number;
  onStepToggle: (drumType: DrumType, step: number) => void;
  onDrumTrigger: (drumType: DrumType) => Promise<void>;
}

const drumLabels: Record<DrumType, string> = {
  kick: 'BD', // Bass Drum
  snare: 'SD', // Snare Drum
  hihat: 'HH', // Hi-Hat
  openhat: 'OH', // Open Hat
  crash: 'CR', // Crash
  ride: 'RD', // Ride
  tom1: 'HT', // High Tom
  tom2: 'MT', // Mid Tom
  tom3: 'LT', // Low Tom
};

const drumColors: Record<DrumType, string> = {
  kick: 'bg-red-700 hover:bg-red-600 text-red-100',
  snare: 'bg-blue-700 hover:bg-blue-600 text-blue-100',
  hihat: 'bg-yellow-700 hover:bg-yellow-600 text-yellow-100',
  openhat: 'bg-yellow-600 hover:bg-yellow-500 text-yellow-100',
  crash: 'bg-orange-700 hover:bg-orange-600 text-orange-100',
  ride: 'bg-purple-700 hover:bg-purple-600 text-purple-100',
  tom1: 'bg-green-700 hover:bg-green-600 text-green-100',
  tom2: 'bg-green-800 hover:bg-green-700 text-green-100',
  tom3: 'bg-green-900 hover:bg-green-800 text-green-100',
};

export function Sequencer({ pattern, currentStep, onStepToggle, onDrumTrigger }: SequencerProps) {
  const steps = pattern?.steps || 16;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Drum Machine</h2>
        <div className="text-sm text-gray-400">
          Pattern: {pattern?.name || 'None'} • {steps} Steps
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-[120px_repeat(16,1fr)] gap-1 items-center">
        {/* Header Row - Step Numbers */}
        <div className="text-xs text-gray-500 text-center font-mono">STEP</div>
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`h-8 flex items-center justify-center text-xs font-mono font-bold rounded-t-md border-b-2 transition-all duration-150 ${
              i === currentStep
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-md'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            } ${i % 4 === 0 ? 'border-l-2 border-l-cyan-400' : ''}`}
          >
            {i + 1}
          </div>
        ))}

        {/* Drum Rows */}
        {defaultDrumTypes.map((drumType) => (
          <React.Fragment key={drumType}>
            {/* Drum Label/Trigger Button */}
            <button
              onClick={async () => {
                try {
                  await onDrumTrigger(drumType);
                } catch (error) {
                  console.error('Failed to trigger drum:', error);
                }
              }}
              className={`h-10 w-full rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${drumColors[drumType]} border border-opacity-30 border-white`}
            >
              {drumLabels[drumType]}
            </button>

            {/* Step Buttons for this drum */}
            {Array.from({ length: steps }, (_, i) => {
              const isActive = pattern?.beats[drumType]?.[i] || false;
              const isCurrentStep = i === currentStep;
              const isDownbeat = i % 4 === 0;

              return (
                <button
                  key={i}
                  onClick={() => onStepToggle(drumType, i)}
                  className={`h-10 w-full rounded-md transition-all duration-150 border-2 font-mono text-xs font-bold relative overflow-hidden group ${
                    isActive
                      ? 'bg-cyan-400 text-black border-cyan-300 shadow-lg shadow-cyan-500/25'
                      : 'bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  } ${isCurrentStep ? 'ring-2 ring-cyan-400 ring-opacity-75' : ''} ${
                    isDownbeat ? 'border-l-cyan-400 border-l-4' : ''
                  }`}
                >
                  {/* Active step indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-cyan-500 opacity-90" />
                  )}

                  {/* Current step pulse animation */}
                  {isCurrentStep && (
                    <div className="absolute inset-0 bg-cyan-400 opacity-20 animate-pulse" />
                  )}

                  {/* Button content */}
                  <div className="relative z-10">
                    {isActive ? '●' : '○'}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Grid Legend */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <span>● Active Step</span>
          <span>○ Inactive Step</span>
          <span className="text-cyan-400">● Current Playing Step</span>
          <span className="text-cyan-400">| Downbeat</span>
        </div>
      </div>

      {!pattern && (
        <div className="text-center text-gray-400 py-8">
          <p className="text-lg">No pattern loaded</p>
          <p className="text-sm">Select a genre preset to get started!</p>
        </div>
      )}
    </div>
  );
}
