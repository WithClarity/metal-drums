import { useState, useEffect, useCallback, useRef } from 'react';
import { drumEngine } from '../audio/drumEngine';
import type { Pattern, DrumType, Genre, Step } from '../types/drum';
import { genrePresets } from '../types/drum';

export interface UseDrumMachineReturn {
  isPlaying: boolean;
  currentStep: number;
  pattern: Pattern | null;
  bpm: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
  currentGenre: Genre;
  swing: number;
  humanization: number;
  velocityRandomization: number;

  // Advanced features
  masterProbability: number;
  scatterIntensity: number;
  autoFillInterval: number;
  isRecordingMotion: boolean;

  // Actions
  play: () => Promise<void>;
  stop: () => void;
  pause: () => void;
  setBPM: (bpm: number) => void;
  setVolume: (volume: number) => void;
  setGenre: (genre: Genre) => Promise<void>;
  loadPattern: (pattern: Pattern) => void;
  createPatternFromGenre: (genre: Genre) => void;
  toggleStep: (drumType: DrumType, step: number) => void;
  editStep: (drumType: DrumType, step: number, stepData: Partial<Step>) => void;
  triggerDrum: (drumType: DrumType) => Promise<void>;
  clearPattern: () => void;

  // Groove controls
  setSwing: (value: number) => void;
  setHumanization: (value: number) => void;
  setVelocityRandomization: (value: number) => void;

  // Advanced performance controls
  setMasterProbability: (value: number) => void;
  setScatterIntensity: (value: number) => void;
  setAutoFillInterval: (interval: number) => void;
  triggerScatter: (intensity: number) => void;
  triggerFill: (fillType: 'auto' | 'manual', pattern?: number) => void;
  randomizeDrums: (drums: DrumType[], intensity: number) => void;
  copyPattern: () => void;
  pastePattern: () => void;

  // Motion sequencing
  startMotionRecording: () => void;
  stopMotionRecording: () => void;
  clearMotion: () => void;

  // Mixer controls
  setDrumVolume: (drumType: DrumType, volume: number) => void;
  setDrumMute: (drumType: DrumType, muted: boolean) => void;
  setDrumSolo: (drumType: DrumType, soloed: boolean) => void;

  // Preset pattern functions
  loadPresetPattern: (pattern: Pattern) => void;
  getGenrePatterns: (genre: Genre) => Pattern[];
  getAllPatterns: () => Pattern[];
}

export function useDrumMachine(): UseDrumMachineReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [bpm, setBPMState] = useState(120);
  const [volume, setVolumeState] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [samplesLoaded, setSamplesLoaded] = useState(false);
  const [currentGenre, setCurrentGenreState] = useState<Genre>('metal');
  const [swing, setSwingState] = useState(0);
  const [humanization, setHumanizationState] = useState(0);
  const [velocityRandomization, setVelocityRandomizationState] = useState(0);

  // Advanced features state
  const [masterProbability, setMasterProbabilityState] = useState(100);
  const [scatterIntensity, setScatterIntensityState] = useState(5);
  const [autoFillInterval, setAutoFillIntervalState] = useState(0);
  const [isRecordingMotion, setIsRecordingMotion] = useState(false);
  const [copiedPattern, setCopiedPattern] = useState<Pattern | null>(null);

  const isInitialized = useRef(false);

  // Initialize drum engine only once
  useEffect(() => {
    if (isInitialized.current) return;

    const initialize = async () => {
      try {
        setIsLoading(true);
        await drumEngine.initialize();

        // Set up step callback
        drumEngine.onStep((step) => {
          setCurrentStep(step);
        });

        // Load a default pattern on initialization
        const metalPatterns = genrePresets.metal;
        if (metalPatterns && metalPatterns.length > 0) {
          const defaultPattern = metalPatterns[0];

          // Convert legacy boolean patterns to new Step interface
          const convertedPattern = { ...defaultPattern };
          Object.keys(convertedPattern.beats).forEach(drumType => {
            const beats = convertedPattern.beats[drumType as DrumType];
            if (beats && beats.length > 0) {
              // Check if pattern uses old boolean format
              if (typeof beats[0] === 'boolean') {
                convertedPattern.beats[drumType as DrumType] = (beats as unknown as boolean[]).map((active: boolean) => ({
                  active: active,
                  velocity: 100,
                  accent: false
                }));
              }
            }
          });

          setPattern(convertedPattern);
          setBPMState(convertedPattern.bpm);
          drumEngine.setPattern(convertedPattern);
        }

        isInitialized.current = true;
        setError(null);
      } catch (err) {
        setError('Failed to initialize audio engine');
        console.error('Audio initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    return () => {
      if (isInitialized.current) {
        drumEngine.dispose();
      }
    };
  }, []);

  const loadDefaultSamples = async () => {
    // For now, we'll use synthetic sounds
    // In a real app, you'd load actual drum samples
    const samples = [
      { name: 'Kick', type: 'kick' as DrumType, url: '', volume: 0.8, pan: 0 },
      { name: 'Snare', type: 'snare' as DrumType, url: '', volume: 0.7, pan: 0 },
      { name: 'Hi-Hat', type: 'hihat' as DrumType, url: '', volume: 0.5, pan: 0.2 },
      { name: 'Open Hat', type: 'openhat' as DrumType, url: '', volume: 0.6, pan: 0.2 },
      { name: 'Crash', type: 'crash' as DrumType, url: '', volume: 0.6, pan: 0.3 },
      { name: 'Ride', type: 'ride' as DrumType, url: '', volume: 0.6, pan: -0.2 },
      { name: 'Tom 1', type: 'tom1' as DrumType, url: '', volume: 0.7, pan: -0.1 },
      { name: 'Tom 2', type: 'tom2' as DrumType, url: '', volume: 0.7, pan: 0 },
      { name: 'Tom 3', type: 'tom3' as DrumType, url: '', volume: 0.7, pan: 0.1 },
    ];

    await drumEngine.loadSamples(samples);
    setSamplesLoaded(true);
  };

  const ensureSamplesLoaded = useCallback(async () => {
    if (!samplesLoaded) {
      await loadDefaultSamples();
    }
  }, [samplesLoaded]);

  const play = useCallback(async () => {
    if (!isInitialized.current) return;

    try {
      await ensureSamplesLoaded();
      await drumEngine.play();
      setIsPlaying(true);
    } catch (err) {
      setError('Failed to start playback');
      console.error('Playback error:', err);
    }
  }, [ensureSamplesLoaded]);

  const stop = useCallback(() => {
    drumEngine.stop();
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  const pause = useCallback(() => {
    drumEngine.pause();
    setIsPlaying(false);
  }, []);

  const setBPM = useCallback((newBpm: number) => {
    setBPMState(newBpm);
    drumEngine.setBPM(newBpm);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    drumEngine.setVolume(newVolume);
  }, []);

  const setGenre = useCallback(async (genre: Genre) => {
    try {
      setIsLoading(true);
      drumEngine.genre = genre;
      setCurrentGenreState(genre);

      // Load samples for the new genre
      setSamplesLoaded(false); // Reset sample loading state
      await loadDefaultSamples(); // Load samples for the genre

      // Automatically load the first pattern from the selected genre
      const patterns = genrePresets[genre];
      if (patterns && patterns.length > 0) {
        const firstPattern = patterns[0];

        // Convert legacy boolean patterns to new Step interface
        const convertedPattern = { ...firstPattern };
        Object.keys(convertedPattern.beats).forEach(drumType => {
          const beats = convertedPattern.beats[drumType as DrumType];
          if (beats && beats.length > 0) {
            // Check if pattern uses old boolean format
            if (typeof beats[0] === 'boolean') {
              convertedPattern.beats[drumType as DrumType] = (beats as unknown as boolean[]).map((active: boolean) => ({
                active: active,
                velocity: 100,
                accent: false
              }));
            }
          }
        });

        setPattern(convertedPattern);
        setBPMState(convertedPattern.bpm);
        drumEngine.setPattern(convertedPattern);
      }

      console.log(`Switched to ${genre} genre`);
    } catch (err) {
      console.error('Failed to switch genre:', err);
      setError(`Failed to load ${genre} samples`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPattern = useCallback((newPattern: Pattern) => {
    // Convert legacy boolean patterns to new Step interface
    const convertedPattern = { ...newPattern };

    Object.keys(convertedPattern.beats).forEach(drumType => {
      const beats = convertedPattern.beats[drumType as DrumType];
      if (beats && beats.length > 0) {
        // Check if pattern uses old boolean format
        if (typeof beats[0] === 'boolean') {
          convertedPattern.beats[drumType as DrumType] = (beats as unknown as boolean[]).map((active: boolean) => ({
            active: active,
            velocity: 100,
            accent: false
          }));
        }
      }
    });

    setPattern(convertedPattern);
    setBPMState(convertedPattern.bpm);
    drumEngine.setPattern(convertedPattern);
  }, []);

  const loadPresetPattern = useCallback((pattern: Pattern) => {
    loadPattern(pattern);
  }, [loadPattern]);

  const getGenrePatterns = useCallback((genre: Genre): Pattern[] => {
    return genrePresets[genre] || [];
  }, []);

  const getAllPatterns = useCallback((): Pattern[] => {
    return Object.values(genrePresets).flat();
  }, []);

  const createPatternFromGenre = useCallback((genre: Genre) => {
    // Load the first pattern from the genre as default
    const patterns = genrePresets[genre];
    if (patterns && patterns.length > 0) {
      loadPattern(patterns[0]);
    }
  }, [loadPattern]);

  const toggleStep = useCallback((drumType: DrumType, step: number) => {
    if (!pattern) return;

    const newPattern = { ...pattern };
    if (!newPattern.beats[drumType]) {
      newPattern.beats[drumType] = new Array(pattern.steps).fill(null).map(() => ({
        active: false,
        velocity: 100,
        accent: false
      }));
    }

    // Get current step data or create default
    const currentStep = newPattern.beats[drumType]![step] || { active: false, velocity: 100, accent: false };

    // Toggle the active state while preserving other properties
    newPattern.beats[drumType]![step] = {
      ...currentStep,
      active: !currentStep.active
    };

    loadPattern(newPattern);
  }, [pattern, loadPattern]);

  const editStep = useCallback((drumType: DrumType, step: number, stepData: Partial<Step>) => {
    if (!pattern) return;

    const newPattern = { ...pattern };
    if (!newPattern.beats[drumType]) {
      newPattern.beats[drumType] = new Array(pattern.steps).fill(null).map(() => ({
        active: false,
        velocity: 100,
        accent: false
      }));
    }

    // Get current step data or create default
    const currentStep = newPattern.beats[drumType]![step] || { active: false, velocity: 100, accent: false };

    // Update with new data
    newPattern.beats[drumType]![step] = {
      ...currentStep,
      ...stepData
    };

    loadPattern(newPattern);
  }, [pattern, loadPattern]);

  const triggerDrum = useCallback(async (drumType: DrumType) => {
    try {
      await ensureSamplesLoaded();
      await drumEngine.triggerDrum(drumType);
    } catch (err) {
      console.error('Failed to trigger drum:', err);
    }
  }, [ensureSamplesLoaded]);

  const clearPattern = useCallback(() => {
    if (!pattern) return;

    const clearedPattern = {
      ...pattern,
      beats: {}
    };
    loadPattern(clearedPattern);
  }, [pattern, loadPattern]);

  const setSwing = useCallback((value: number) => {
    setSwingState(value);
    drumEngine.setSwing(value);
  }, []);

  const setHumanization = useCallback((value: number) => {
    setHumanizationState(value);
    drumEngine.setHumanization(value);
  }, []);

  const setVelocityRandomization = useCallback((value: number) => {
    setVelocityRandomizationState(value);
    drumEngine.setVelocityRandomization(value);
  }, []);

  // Advanced performance controls
  const setMasterProbability = useCallback((value: number) => {
    setMasterProbabilityState(value);
    drumEngine.setMasterProbability(value);
  }, []);

  const setScatterIntensity = useCallback((value: number) => {
    setScatterIntensityState(value);
  }, []);

  const setAutoFillInterval = useCallback((interval: number) => {
    setAutoFillIntervalState(interval);
    // TODO: Implement auto-fill logic
  }, []);

  const triggerScatter = useCallback((intensity: number) => {
    drumEngine.triggerScatter(intensity);
  }, []);

  const triggerFill = useCallback((fillType: 'auto' | 'manual', patternNumber?: number) => {
    // TODO: Implement fill patterns
    console.log('Fill triggered:', fillType, patternNumber);
  }, []);

  const randomizeDrums = useCallback((drums: DrumType[], intensity: number) => {
    if (!pattern) return;

    const newPattern = { ...pattern };
    drums.forEach(drumType => {
      const drumSteps = newPattern.beats[drumType];
      if (drumSteps) {
        newPattern.beats[drumType] = drumSteps.map(step => ({
          ...step,
          active: Math.random() * 100 < intensity ? !step.active : step.active,
          velocity: step.active ? Math.max(60, Math.min(127, step.velocity + (Math.random() - 0.5) * 40)) : step.velocity
        }));
      }
    });

    setPattern(newPattern);
    drumEngine.setPattern(newPattern);
  }, [pattern]);

  const copyPattern = useCallback(() => {
    if (pattern) {
      setCopiedPattern({ ...pattern });
    }
  }, [pattern]);

  const pastePattern = useCallback(() => {
    if (copiedPattern) {
      setPattern(copiedPattern);
      drumEngine.setPattern(copiedPattern);
    }
  }, [copiedPattern]);

  // Motion sequencing
  const startMotionRecording = useCallback(() => {
    setIsRecordingMotion(true);
    // TODO: Implement motion recording
  }, []);

  const stopMotionRecording = useCallback(() => {
    setIsRecordingMotion(false);
    // TODO: Stop motion recording
  }, []);

  const clearMotion = useCallback(() => {
    // TODO: Clear motion data
    console.log('Motion cleared');
  }, []);

  // Mixer controls
  const setDrumVolume = useCallback((drumType: DrumType, volume: number) => {
    drumEngine.setDrumVolume(drumType, volume);
  }, []);

  const setDrumMute = useCallback((drumType: DrumType, muted: boolean) => {
    drumEngine.setDrumMute(drumType, muted);
  }, []);

  const setDrumSolo = useCallback((drumType: DrumType, soloed: boolean) => {
    drumEngine.setDrumSolo(drumType, soloed);
  }, []);

  return {
    isPlaying,
    currentStep,
    pattern,
    bpm,
    volume,
    isLoading,
    error,
    currentGenre,
    swing,
    humanization,
    velocityRandomization,

    // Advanced features
    masterProbability,
    scatterIntensity,
    autoFillInterval,
    isRecordingMotion,

    // Actions
    play,
    stop,
    pause,
    setBPM,
    setVolume,
    setGenre,
    loadPattern,
    createPatternFromGenre,
    toggleStep,
    editStep,
    triggerDrum,
    clearPattern,

    // Groove controls
    setSwing,
    setHumanization,
    setVelocityRandomization,

    // Advanced performance controls
    setMasterProbability,
    setScatterIntensity,
    setAutoFillInterval,
    triggerScatter,
    triggerFill,
    randomizeDrums,
    copyPattern,
    pastePattern,

    // Motion sequencing
    startMotionRecording,
    stopMotionRecording,
    clearMotion,

    // Mixer controls
    setDrumVolume,
    setDrumMute,
    setDrumSolo,

    // Preset patterns
    loadPresetPattern,
    getGenrePatterns,
    getAllPatterns,
  };
}
