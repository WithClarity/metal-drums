import { useState } from 'react';
import type { DrumType, Step, Pattern } from '../types/drum';
import { defaultDrumTypes } from '../types/drum';

interface DrumMachineSequencerProps {
  pattern: Pattern | null;
  currentStep: number;
  onStepToggle: (drumType: DrumType, step: number) => void;
  onStepEdit: (drumType: DrumType, step: number, stepData: Step) => void;
  onDrumTrigger: (drumType: DrumType) => Promise<void>;
}

const drumInfo: Record<DrumType, { label: string; color: string; key: string }> = {
  kick: { label: 'Bass Drum', color: 'bg-red-600 hover:bg-red-500', key: 'BD' },
  snare: { label: 'Snare Drum', color: 'bg-blue-600 hover:bg-blue-500', key: 'SD' },
  hihat: { label: 'Hi-Hat Closed', color: 'bg-yellow-600 hover:bg-yellow-500', key: 'HH' },
  openhat: { label: 'Hi-Hat Open', color: 'bg-yellow-500 hover:bg-yellow-400', key: 'OH' },
  crash: { label: 'Crash Cymbal', color: 'bg-orange-600 hover:bg-orange-500', key: 'CR' },
  ride: { label: 'Ride Cymbal', color: 'bg-purple-600 hover:bg-purple-500', key: 'RD' },
  tom1: { label: 'High Tom', color: 'bg-green-600 hover:bg-green-500', key: 'HT' },
  tom2: { label: 'Mid Tom', color: 'bg-green-700 hover:bg-green-600', key: 'MT' },
  tom3: { label: 'Low Tom', color: 'bg-green-800 hover:bg-green-700', key: 'LT' },
};

export function DrumMachineSequencer({
  pattern,
  currentStep,
  onStepToggle,
  onStepEdit,
  onDrumTrigger
}: DrumMachineSequencerProps) {
  const [selectedDrum, setSelectedDrum] = useState<DrumType>('kick');
  const [editMode, setEditMode] = useState<'normal' | 'velocity' | 'accent'>('normal');
  const steps = pattern?.steps || 16;

  const getStepData = (drumType: DrumType, stepIndex: number): Step => {
    // Handle legacy boolean patterns
    const stepData = pattern?.beats[drumType]?.[stepIndex];
    if (typeof stepData === 'boolean') {
      return { active: stepData, velocity: 100, accent: false };
    }
    return stepData || { active: false, velocity: 100, accent: false };
  };

  const handleStepClick = (drumType: DrumType, stepIndex: number) => {
    const currentStepData = getStepData(drumType, stepIndex);

    if (editMode === 'normal') {
      onStepToggle(drumType, stepIndex);
    } else if (editMode === 'velocity') {
      // Cycle through velocity levels: 127 (loud) -> 100 (normal) -> 64 (soft) -> 0 (off)
      const velocities = [0, 64, 100, 127];
      const currentIndex = velocities.indexOf(currentStepData.velocity);
      const nextVelocity = velocities[(currentIndex + 1) % velocities.length];
      onStepEdit(drumType, stepIndex, {
        ...currentStepData,
        velocity: nextVelocity,
        active: nextVelocity > 0
      });
    } else if (editMode === 'accent') {
      onStepEdit(drumType, stepIndex, {
        ...currentStepData,
        accent: !currentStepData.accent
      });
    }
  };

  const getStepIntensity = (stepData: Step) => {
    if (!stepData.active) return 'bg-gray-800 border-gray-600 text-gray-500';

    // Simplified color scheme - just two main states for better clarity
    if (stepData.accent) {
      return 'bg-red-500 border-red-400 text-white shadow-lg';
    }

    // Active step - bright cyan for better visibility
    return 'bg-cyan-500 border-cyan-400 text-white shadow-md';
  };

  const getVelocityBar = (velocity: number) => {
    const height = Math.round((velocity / 127) * 100);
    return (
      <div className="absolute bottom-0 left-0 w-full bg-cyan-400 opacity-60 transition-all duration-200"
           style={{ height: `${height}%` }} />
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Professional Drum Machine</h2>
          <p className="text-gray-400 text-sm">
            Pattern: {pattern?.name || 'None'} • {steps} Steps • {pattern?.bpm || 120} BPM
          </p>
        </div>

        {/* Edit Mode Selector */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {[
            { mode: 'normal' as const, label: 'Edit', desc: 'Toggle steps' },
            { mode: 'velocity' as const, label: 'Velocity', desc: 'Step volume' },
            { mode: 'accent' as const, label: 'Accent', desc: 'Emphasis' }
          ].map(({ mode, label, desc }) => (
            <button
              key={mode}
              onClick={() => setEditMode(mode)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                editMode === mode
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title={desc}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Transport Bar - Step indicators */}
      <div className="mb-4">
        <div className="grid grid-cols-[120px_repeat(16,1fr)] gap-1">
          <div className="text-xs text-gray-500 text-center font-mono">STEP</div>
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className={`h-6 flex items-center justify-center text-xs font-mono font-bold rounded transition-all duration-150 ${
                i === currentStep
                  ? 'bg-yellow-400 text-black shadow-md animate-pulse'
                  : 'bg-gray-700 text-gray-300'
              } ${i % 4 === 0 ? 'border-l-2 border-l-yellow-400' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Drum Tracks */}
      <div className="space-y-1">
        {defaultDrumTypes.map((drumType) => (
          <div key={drumType} className="grid grid-cols-[120px_repeat(16,1fr)] gap-1 items-center">
            {/* Drum Label/Trigger */}
            <button
              onClick={async () => {
                setSelectedDrum(drumType);
                try {
                  await onDrumTrigger(drumType);
                } catch (error) {
                  console.error('Failed to trigger drum:', error);
                }
              }}
              className={`h-12 rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                drumInfo[drumType].color
              } ${
                selectedDrum === drumType ? 'ring-2 ring-cyan-400' : ''
              } text-white border border-white/20 flex flex-col justify-center items-center`}
              title={drumInfo[drumType].label}
            >
              <span className="text-lg">{drumInfo[drumType].key}</span>
              <span className="text-xs opacity-75">{drumType.toUpperCase()}</span>
            </button>

            {/* Step Buttons */}
            {Array.from({ length: steps }, (_, i) => {
              const stepData = getStepData(drumType, i);
              const isCurrentStep = i === currentStep;
              const isDownbeat = i % 4 === 0;

              return (
                <button
                  key={i}
                  onClick={() => handleStepClick(drumType, i)}
                  className={`h-12 w-full rounded-md border-2 font-mono text-xs font-bold relative overflow-hidden group transition-all duration-150 ${
                    getStepIntensity(stepData)
                  } ${isCurrentStep ? 'ring-2 ring-yellow-400 ring-opacity-90 animate-pulse' : ''} ${
                    isDownbeat ? 'border-l-yellow-400 border-l-4' : ''
                  }`}
                  title={`Step ${i + 1}: ${stepData.active ? `Velocity ${stepData.velocity}${stepData.accent ? ' (Accent)' : ''}` : 'Off'}`}
                >
                  {/* Velocity bar */}
                  {stepData.active && editMode === 'velocity' && getVelocityBar(stepData.velocity)}

                  {/* Current step indicator */}
                  {isCurrentStep && (
                    <div className="absolute inset-0 bg-yellow-400 opacity-30" />
                  )}

                  {/* Step content */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    {stepData.active ? (
                      <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">●</span>
                        {editMode === 'velocity' && (
                          <span className="text-xs font-mono">{stepData.velocity}</span>
                        )}
                        {stepData.accent && editMode === 'accent' && (
                          <span className="text-xs font-bold">!</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xl opacity-40">○</span>
                    )}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <p className="font-semibold text-gray-300 mb-2">Controls:</p>
            <p>● Click steps to toggle on/off</p>
            <p>● Use mode buttons to edit velocity/accent</p>
            <p>● Click drum names to trigger sounds</p>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-2">Legend:</p>
            <p><span className="text-yellow-400">●</span> Current playing step</p>
            <p><span className="text-red-400">●</span> Accent (emphasized)</p>
            <p><span className="text-yellow-400">|</span> Downbeat (1, 5, 9, 13)</p>
          </div>
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
