import { useState } from 'react';
import type { DrumType, Pattern, Step } from '../types/drum';
import { defaultDrumTypes } from '../types/drum';

interface DrumMachineSequencerProps {
    pattern: Pattern | null;
    currentStep: number;
    onStepToggle: (drumType: DrumType, step: number) => void;
    onStepEdit: (drumType: DrumType, step: number, stepData: Step) => void;
    onDrumTrigger: (drumType: DrumType) => Promise<void>;
}

const drumInfo: Record<DrumType, { label: string; color: string; key: string; gradient: string }> = {
    kick: {
        label: 'Bass Drum',
        color: 'bg-red-600 hover:bg-red-500',
        key: 'BD',
        gradient: 'from-red-600 to-red-800'
    },
    snare: {
        label: 'Snare Drum',
        color: 'bg-blue-600 hover:bg-blue-500',
        key: 'SD',
        gradient: 'from-blue-600 to-blue-800'
    },
    hihat: {
        label: 'Hi-Hat Closed',
        color: 'bg-yellow-600 hover:bg-yellow-500',
        key: 'HH',
        gradient: 'from-yellow-600 to-yellow-800'
    },
    openhat: {
        label: 'Hi-Hat Open',
        color: 'bg-yellow-500 hover:bg-yellow-400',
        key: 'OH',
        gradient: 'from-yellow-500 to-yellow-700'
    },
    crash: {
        label: 'Crash Cymbal',
        color: 'bg-orange-600 hover:bg-orange-500',
        key: 'CR',
        gradient: 'from-orange-600 to-orange-800'
    },
    ride: {
        label: 'Ride Cymbal',
        color: 'bg-purple-600 hover:bg-purple-500',
        key: 'RD',
        gradient: 'from-purple-600 to-purple-800'
    },
    tom1: {
        label: 'High Tom',
        color: 'bg-green-600 hover:bg-green-500',
        key: 'HT',
        gradient: 'from-green-600 to-green-800'
    },
    tom2: {
        label: 'Mid Tom',
        color: 'bg-green-700 hover:bg-green-600',
        key: 'MT',
        gradient: 'from-green-700 to-green-900'
    },
    tom3: {
        label: 'Low Tom',
        color: 'bg-green-800 hover:bg-green-700',
        key: 'LT',
        gradient: 'from-green-800 to-gray-900'
    },
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

    return (
        <div className="card-pro rounded-xl p-6 fade-in">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gradient mb-2">Professional Drum Machine</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
                            Pattern: {pattern?.name || 'None'}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                            {steps} Steps
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                            {pattern?.bpm || 120} BPM
                        </span>
                    </div>
                </div>

                {/* Enhanced Edit Mode Selector */}
                <div className="flex bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-1 border border-gray-600/50">
                    {[
                        { mode: 'normal' as const, label: 'Edit', desc: 'Toggle steps', icon: '✎' },
                        { mode: 'velocity' as const, label: 'Velocity', desc: 'Step volume', icon: '♪' },
                        { mode: 'accent' as const, label: 'Accent', desc: 'Emphasis', icon: '⚡' }
                    ].map(({ mode, label, desc, icon }) => (
                        <button
                            key={mode}
                            onClick={() => setEditMode(mode)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${editMode === mode
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg transform scale-105'
                                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                }`}
                            title={desc}
                        >
                            <span className="text-lg">{icon}</span>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step Number Headers with Enhanced Design */}
            <div className="grid grid-cols-10 gap-3 mb-4">
                {/* Drum Label Column */}
                <div className="text-center">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Drums</span>
                </div>

                {/* Step Numbers */}
                {Array.from({ length: steps }, (_, i) => (
                    <div key={i} className="text-center">
                        <span className={`text-sm font-mono font-bold ${i === currentStep ? 'text-cyan-400 animate-pulse' : 'text-gray-500'
                            } ${i % 4 === 0 ? 'text-yellow-400' : ''}`}>
                            {i + 1}
                        </span>
                        {i % 4 === 0 && (
                            <div className="w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mt-1 rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Enhanced Drum Grid */}
            <div className="space-y-3">
                {defaultDrumTypes.map((drumType) => (
                    <div key={drumType} className="grid grid-cols-10 gap-3 items-center">
                        {/* Enhanced Drum Button */}
                        <button
                            onClick={async () => {
                                await onDrumTrigger(drumType);
                                setSelectedDrum(drumType);
                            }}
                            className={`btn-pro h-12 rounded-lg text-sm font-bold bg-gradient-to-r ${drumInfo[drumType].gradient
                                } ${selectedDrum === drumType ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-900' : ''
                                } text-white border border-white/20 flex flex-col justify-center items-center shadow-lg hover:shadow-xl transform transition-all duration-200`}
                            title={`${drumInfo[drumType].label} - Click to trigger`}
                        >
                            <span className="text-lg font-black">{drumInfo[drumType].key}</span>
                            <span className="text-xs opacity-75 uppercase tracking-wide">{drumType}</span>
                        </button>

                        {/* Enhanced Step Buttons */}
                        {Array.from({ length: steps }, (_, i) => {
                            const stepData = getStepData(drumType, i);
                            const isCurrentStep = i === currentStep;
                            const isDownbeat = i % 4 === 0;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleStepClick(drumType, i)}
                                    className={`step-button h-12 w-full rounded-lg border-2 font-mono text-xs font-bold relative overflow-hidden transition-all duration-200 ${stepData.active
                                            ? stepData.accent
                                                ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 text-white shadow-lg active'
                                                : 'bg-gradient-to-br from-cyan-500 to-cyan-700 border-cyan-400 text-white shadow-md active'
                                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 text-gray-500 hover:border-gray-500'
                                        } ${isCurrentStep ? 'current ring-2 ring-yellow-400 ring-opacity-75' : ''
                                        } ${isDownbeat ? 'ring-1 ring-yellow-400/30' : ''
                                        }`}
                                    title={`Step ${i + 1}: ${stepData.active ? `Velocity ${stepData.velocity}${stepData.accent ? ' (Accent)' : ''}` : 'Off'}`}
                                >
                                    {/* Velocity visualization */}
                                    {stepData.active && editMode === 'velocity' && (
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-cyan-400/60 transition-all duration-300"
                                            style={{ height: `${Math.round((stepData.velocity / 127) * 100)}%` }}
                                        />
                                    )}

                                    {/* Current step overlay */}
                                    {isCurrentStep && (
                                        <div className="absolute inset-0 bg-yellow-400/20 animate-pulse" />
                                    )}

                                    {/* Downbeat indicator */}
                                    {isDownbeat && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400" />
                                    )}

                                    {/* Step content */}
                                    <div className="relative z-10 flex items-center justify-center h-full">
                                        {stepData.active ? (
                                            <div className="flex flex-col items-center">
                                                <span className="text-xl font-bold drop-shadow-lg">●</span>
                                                {editMode === 'velocity' && (
                                                    <span className="text-xs font-mono font-bold">{stepData.velocity}</span>
                                                )}
                                                {stepData.accent && editMode === 'accent' && (
                                                    <span className="text-xs">⚡</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-600 text-xl">○</span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Enhanced Edit Mode Instructions */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-300">
                    <strong className="text-cyan-400">Current Mode: {editMode.charAt(0).toUpperCase() + editMode.slice(1)}</strong>
                    <div className="mt-2 space-y-1 text-xs">
                        {editMode === 'normal' && (
                            <p>💡 Click steps to toggle on/off • Click drum buttons to trigger sounds</p>
                        )}
                        {editMode === 'velocity' && (
                            <p>💡 Click steps to cycle through velocity levels (soft → medium → loud → off)</p>
                        )}
                        {editMode === 'accent' && (
                            <p>💡 Click active steps to add/remove accent emphasis</p>
                        )}
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
