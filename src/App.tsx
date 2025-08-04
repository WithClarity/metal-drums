import { useDrumMachine } from './hooks/useDrumMachine';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import type { DrumType } from './types/drum';
import { DrumMachineSequencer } from './components/DrumMachineSequencer';
import { TransportControls } from './components/TransportControls';
import { PatternSelector } from './components/PatternSelector';
import { GrooveControls } from './components/GrooveControls';
import { MixerControls } from './components/MixerControls';
import { EffectsControls } from './components/EffectsControls';
import { AdvancedPerformanceControls } from './components/AdvancedPerformanceControls';
import { DrumNotation } from './components/DrumNotation';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { AlertCircle, Music } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState<'mixer' | 'effects' | 'performance' | 'notation' | 'shortcuts'>('performance');

  const {
    isPlaying,
    currentStep,
    pattern,
    bpm,
    volume,
    isLoading,
    error,
    currentGenre,
    play,
    pause,
    stop,
    setBPM,
    setVolume,
    setGenre,
    // createPatternFromGenre, // Currently unused, kept for potential future use
    toggleStep,
    editStep,
    triggerDrum,
    clearPattern,
    loadPresetPattern,
    getGenrePatterns,
    swing,
    humanization,
    velocityRandomization,
    setSwing,
    setHumanization,
    setVelocityRandomization,

    // Advanced features
    masterProbability,
    scatterIntensity,
    autoFillInterval,
    setMasterProbability,
    setScatterIntensity,
    setAutoFillInterval,
    triggerScatter,
    triggerFill,
    randomizeDrums,
    copyPattern,
    pastePattern,
    setDrumVolume,
    setDrumMute,
    setDrumSolo,
  } = useDrumMachine();

  // Set up keyboard controls
  useKeyboardControls({
    isPlaying,
    onPlay: play,
    onPause: pause,
    onStop: stop,
    onTriggerDrum: triggerDrum,
    onRandomize: () => randomizeDrums(['kick', 'snare', 'hihat', 'openhat', 'crash', 'ride', 'tom1', 'tom2', 'tom3'], 50),
    onScatter: () => triggerScatter(scatterIntensity),
    onClear: clearPattern,
    onCopy: copyPattern,
    onPaste: pastePattern,
  });

  // Professional drum machine features - remove unused placeholder functions
  const handleSavePattern = () => {
    // TODO: Implement pattern save
    console.log('Save pattern');
  };

  const handleLoadPattern = () => {
    // TODO: Implement pattern load
    console.log('Load pattern');
  };

  const handleMixerVolumeChange = (drum: string, volume: number) => {
    setDrumVolume(drum as DrumType, volume);
  };

  const handleMixerPanChange = (drum: string, pan: number) => {
    // TODO: Implement per-drum pan control
    console.log('Mixer pan change:', drum, pan);
  };

  const handleMixerMute = (drum: string, muted: boolean) => {
    setDrumMute(drum as DrumType, muted);
  };

  const handleMixerSolo = (drum: string, soloed: boolean) => {
    setDrumSolo(drum as DrumType, soloed);
  };

  const handleEffectsReverb = (type: string, level: number, time: number, gate: number) => {
    // TODO: Implement reverb effect
    console.log('Reverb:', type, level, time, gate);
  };

  const handleEffectsDelay = (type: string, level: number, time: number, feedback: number) => {
    // TODO: Implement delay effect
    console.log('Delay:', type, level, time, feedback);
  };

  const handleEffectsFilter = (type: string, frequency: number, resonance: number) => {
    // TODO: Implement filter effect
    console.log('Filter:', type, frequency, resonance);
  };

  const handleEffectsDistortion = (amount: number, type: string) => {
    // TODO: Implement distortion effect
    console.log('Distortion:', amount, type);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 text-red-200">
            <AlertCircle size={24} />
            <div>
              <h2 className="font-bold">Audio Error</h2>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2">Please check your browser audio settings and refresh the page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold">Loading Audio Engine...</h2>
          <p className="text-gray-400">Initializing drum samples and audio context</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Music size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Metal Drums
                </h1>
                <p className="text-gray-400 text-lg mt-2">
                  Professional Drum Machine • Real Samples • Genre-Specific Patterns
                </p>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {/* Left Sidebar - Main Controls */}
            <div className="lg:col-span-1 xl:col-span-1 space-y-6">
              <TransportControls
                isPlaying={isPlaying}
                isLoading={isLoading}
                bpm={bpm}
                volume={volume}
                pattern={pattern}
                onPlay={play}
                onPause={pause}
                onStop={stop}
                onBPMChange={setBPM}
                onVolumeChange={setVolume}
                onClear={clearPattern}
              />

              <PatternSelector
                currentPattern={pattern}
                currentGenre={currentGenre}
                onPatternSelect={loadPresetPattern}
                onGenreChange={setGenre}
                getGenrePatterns={getGenrePatterns}
                isDisabled={isLoading}
              />

              <GrooveControls
                swing={swing}
                humanization={humanization}
                velocityRandomization={velocityRandomization}
                onSwingChange={setSwing}
                onHumanizationChange={setHumanization}
                onVelocityRandomizationChange={setVelocityRandomization}
              />
            </div>

            {/* Main Grid - Sequencer */}
            <div className="lg:col-span-2 xl:col-span-3">
              <DrumMachineSequencer
                pattern={pattern}
                currentStep={currentStep}
                onStepToggle={toggleStep}
                onStepEdit={editStep}
                onDrumTrigger={triggerDrum}
              />
            </div>

            {/* Right Sidebar - Professional Controls */}
            <div className="lg:col-span-1 xl:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
                <div className="flex gap-2 mb-6 p-1 bg-gray-700/50 rounded-lg">
                  {(['performance', 'mixer', 'effects', 'notation', 'shortcuts'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-3 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg transform scale-[1.02]'
                          : 'bg-transparent text-gray-300 hover:bg-gray-600/50 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'performance' && (
                  <AdvancedPerformanceControls
                    onScatter={triggerScatter}
                    onRandomize={randomizeDrums}
                    onFillTrigger={triggerFill}
                    onPatternCopy={copyPattern}
                    onPatternPaste={pastePattern}
                    onPatternClear={clearPattern}
                    onSavePattern={handleSavePattern}
                    onLoadPattern={handleLoadPattern}
                    probability={masterProbability}
                    onProbabilityChange={setMasterProbability}
                    scatterIntensity={scatterIntensity}
                    onScatterIntensityChange={setScatterIntensity}
                    autoFillInterval={autoFillInterval}
                    onAutoFillIntervalChange={setAutoFillInterval}
                    shuffle={swing}
                    onShuffleChange={setSwing}
                  />
                )}

                {activeTab === 'mixer' && (
                  <MixerControls
                    onVolumeChange={handleMixerVolumeChange}
                    onPanChange={handleMixerPanChange}
                    onMute={handleMixerMute}
                    onSolo={handleMixerSolo}
                    onMasterVolumeChange={setVolume}
                    masterVolume={volume}
                  />
                )}

                {activeTab === 'effects' && (
                  <EffectsControls
                    onReverbChange={handleEffectsReverb}
                    onDelayChange={handleEffectsDelay}
                    onFilterChange={handleEffectsFilter}
                    onDistortionChange={handleEffectsDistortion}
                  />
                )}

                {activeTab === 'notation' && pattern && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Drum Notation</h3>
                    <DrumNotation pattern={pattern} />
                  </div>
                )}

                {activeTab === 'shortcuts' && (
                  <KeyboardShortcuts />
                )}
              </div>
            </div>
          </div>

          {/* Pattern info */}
          {pattern && (
            <div className="mt-8 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold">{pattern.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    {pattern.genre.replace('-', ' ').toUpperCase()} • {pattern.steps} steps • {pattern.bpm} BPM
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                      Pattern ID: {pattern.id}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      Real Samples
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Current Step</p>
                  <p className="font-mono text-3xl text-cyan-400">{currentStep + 1}/{pattern.steps}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>Built with React, TypeScript & Web Audio API • Genre-Specific Real Drum Samples</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
