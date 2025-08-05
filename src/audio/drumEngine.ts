import type { DrumSample, DrumType, Genre, Pattern } from '../types/drum';

// Define drum kit presets
export interface DrumKit {
  id: string;
  name: string;
  description: string;
  genre: Genre[];
  samples: Record<DrumType, string>;
}

// Available drum kits
export const DRUM_KITS: DrumKit[] = [
  {
    id: 'pearl',
    name: 'Pearl Studio Kit',
    description: 'Clean, professional studio sounds',
    genre: ['jazz', 'metal', 'metalcore', 'post-hardcore'],
    samples: {
      kick: '/audio/samples/pearlkit-kick.wav',
      snare: '/audio/samples/pearlkit-snare1.wav',
      hihat: '/audio/samples/pearlkit-hihat.wav',
      openhat: '/audio/samples/pearlkit-hihatO.wav',
      crash: '/audio/samples/pearlkit-ridecrash.wav',
      ride: '/audio/samples/pearlkit-ride1.wav',
      tom1: '/audio/samples/pearlkit-hitom1.wav',
      tom2: '/audio/samples/pearlkit-hitom2.wav',
      tom3: '/audio/samples/pearlkit-lowtom1.wav',
    }
  },
  {
    id: 'real-heavy',
    name: 'Big & Heavy Real Kit',
    description: 'Powerful, punchy real drum samples',
    genre: ['metal', 'metalcore'],
    samples: {
      kick: '/audio/samples/real-kick-F036.wav',
      snare: '/audio/samples/real-01BB1-snare-R4M.wav',
      hihat: '/audio/samples/real-01L1.UF-HiHat-M.wav',
      openhat: '/audio/samples/real-01L3.UF-HiHat-A-L.wav',
      crash: '/audio/samples/real-01EG19THCM.wav',
      ride: '/audio/samples/real-long-ride.wav',
      tom1: '/audio/samples/real-02.TOM1C-L.wav',
      tom2: '/audio/samples/real-02.TOM5C-L.wav',
      tom3: '/audio/samples/real-03.TOM2C-L.wav',
    }
  },
  {
    id: 'real-aggressive',
    name: 'Aggressive Real Kit',
    description: 'Hard-hitting samples for extreme genres',
    genre: ['metalcore', 'post-hardcore'],
    samples: {
      kick: '/audio/samples/real-kick-F045.wav',
      snare: '/audio/samples/real-01RR-snare-R2A-R.wav',
      hihat: '/audio/samples/real-02R3.UF-HiHat-M.wav',
      openhat: '/audio/samples/real-02R3.UF-HiHat-A-R.wav',
      crash: '/audio/samples/real-01TP19THCM.wav',
      ride: '/audio/samples/real-long-ride.wav',
      tom1: '/audio/samples/real-02.TOM1C-L.wav',
      tom2: '/audio/samples/real-03.TOM3C-L.wav',
      tom3: '/audio/samples/real-08.TOM4M.wav',
    }
  },
  {
    id: 'real-dynamic',
    name: 'Dynamic Real Kit',
    description: 'Versatile samples for post-hardcore and dynamic playing',
    genre: ['post-hardcore', 'metal'],
    samples: {
      kick: '/audio/samples/real-kick-F024.wav',
      snare: '/audio/samples/real-02LI-snare-R2M.wav',
      hihat: '/audio/samples/real-01L2.UF-HiHat-M.wav',
      openhat: '/audio/samples/real-02L4.UF-HiHat-A-R.wav',
      crash: '/audio/samples/real-01TP20CHIM.wav',
      ride: '/audio/samples/real-long-ride.wav',
      tom1: '/audio/samples/real-02.TOM1C-L.wav',
      tom2: '/audio/samples/real-02.TOM5C-L.wav',
      tom3: '/audio/samples/real-03.TOM2C-L.wav',
    }
  },
  {
    id: 'real-jazz',
    name: 'Jazz Real Kit',
    description: 'Warm, dynamic samples perfect for jazz',
    genre: ['jazz'],
    samples: {
      kick: '/audio/samples/real-kick-F049.wav',
      snare: '/audio/samples/real-soft-snare.wav',
      hihat: '/audio/samples/real-01PD.UF-HiHat-M.wav',
      openhat: '/audio/samples/real-01L3.UF-HiHat-A-L.wav',
      crash: '/audio/samples/pearlkit-ridecrash.wav',
      ride: '/audio/samples/real-long-ride.wav',
      tom1: '/audio/samples/pearlkit-hitom1.wav',
      tom2: '/audio/samples/pearlkit-hitom2.wav',
      tom3: '/audio/samples/pearlkit-lowtom1.wav',
    }
  },
  {
    id: 'classic',
    name: 'Classic Electronic',
    description: 'Classic drum machine sounds',
    genre: ['metal', 'metalcore', 'post-hardcore'],
    samples: {
      kick: '/audio/samples/BDRUM13.wav',
      snare: '/audio/samples/SNARE2.wav',
      hihat: '/audio/samples/HHCLOSE1.wav',
      openhat: '/audio/samples/HHOPEN1.wav',
      crash: '/audio/samples/CRASH.wav',
      ride: '/audio/samples/RIDE.wav',
      tom1: '/audio/samples/TOMHI5.wav',
      tom2: '/audio/samples/TOMMID5.wav',
      tom3: '/audio/samples/TOMLOW5.wav',
    }
  }
];

// Primary sample mapping for each drum type (Pearl kit - clean sounds)
const SAMPLE_MAPPING: Record<DrumType, string> = DRUM_KITS[0].samples;

// Genre-specific sample variations for more authentic sounds
const GENRE_SAMPLE_MAPPING: Record<Genre, Partial<Record<DrumType, string>>> = {
  metal: {
    kick: '/audio/samples/real-kick-F036.wav', // Powerful metal kick
    snare: '/audio/samples/real-01BB1-snare-R4M.wav', // Tight, punchy snare
    hihat: '/audio/samples/real-01L1.UF-HiHat-M.wav', // Crisp metal hi-hat
    crash: '/audio/samples/real-01EG19THCM.wav', // Better metal crash
  },
  metalcore: {
    kick: '/audio/samples/real-kick-F045.wav', // Aggressive kick
    snare: '/audio/samples/real-01RR-snare-R2A-R.wav', // Sharp metalcore snare
    hihat: '/audio/samples/real-02R3.UF-HiHat-M.wav', // Modern hi-hat
    crash: '/audio/samples/real-01TP19THCM.wav', // Aggressive metalcore crash
  },
  'post-hardcore': {
    kick: '/audio/samples/real-kick-F024.wav', // Punchy but controlled
    snare: '/audio/samples/real-02LI-snare-R2M.wav', // Dynamic snare
    hihat: '/audio/samples/real-01L2.UF-HiHat-M.wav', // Balanced hi-hat
    crash: '/audio/samples/real-01TP20CHIM.wav', // Post-hardcore crash
  },
  jazz: {
    kick: '/audio/samples/real-kick-F049.wav', // Softer jazz kick
    snare: '/audio/samples/real-soft-snare.wav', // Jazz snare
    hihat: '/audio/samples/real-01PD.UF-HiHat-M.wav', // Jazz hi-hat
    ride: '/audio/samples/real-long-ride.wav', // Jazz ride cymbal
    crash: '/audio/samples/pearlkit-ridecrash.wav', // Keep original for jazz
  },
};

export class DrumEngine {
  private audioContext: AudioContext | null = null;
  private samples: Map<DrumType, AudioBuffer> = new Map();
  private isPlaying = false;
  private currentStep = 0;
  private pattern: Pattern | null = null;
  private stepCallback: ((step: number) => void) | null = null;
  private currentGenre: Genre = 'metal'; // Default genre

  // Chris Wilson's scheduling technique variables
  private schedulerId: number | null = null;
  private nextNoteTime = 0.0;
  private currentNote = 0;
  private lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  private scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  private notesInQueue: Array<{ note: number, time: number }> = [];
  private bpm = 120;
  private masterGain: GainNode | null = null;

  // Humanization and groove parameters
  private humanizeAmount = 0; // 0-100, amount of timing variation
  private swingAmount = 0; // 0-100, swing percentage
  private velocityRandomization = 0; // 0-100, velocity variation amount

  // Advanced performance features
  private masterProbability = 100; // 0-100, global probability multiplier

  // Current drum kit
  private currentKit: DrumKit = DRUM_KITS[0]; // Default to Pearl kit
  private kitChangeCallback: ((kit: DrumKit) => void) | null = null;

  // Scatter effect properties
  private scatterEnabled = false;
  private scatterDepth = 5; // 1-10

  // Per-drum mixer properties
  private perDrumGain: Map<DrumType, GainNode> = new Map();
  private perDrumMute: Map<DrumType, boolean> = new Map();
  private perDrumSolo: Map<DrumType, boolean> = new Map();

  // Legacy effects nodes (for compatibility)
  private reverbNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private distortionNode: WaveShaperNode | null = null;
  private effectsGain: GainNode | null = null;
  private effectsSettings = {
    reverb: { level: 0, type: 'room', time: 0.5, gate: false },
    delay: { level: 0, time: 0.25, feedback: 0.3, type: 'stereo' },
    filter: { frequency: 1000, resonance: 1, type: 'lowpass' },
    distortion: { amount: 0, type: 'overdrive' }
  };

  // Effects processing nodes
  private masterLimiter: DynamicsCompressorNode | null = null;
  private masterEQ: BiquadFilterNode | null = null;
  private drumEffectChains: Map<DrumType, {
    reverb?: ConvolverNode;
    delay?: DelayNode;
    filter?: BiquadFilterNode;
    distortion?: WaveShaperNode;
    compressor?: DynamicsCompressorNode;
    gainNode: GainNode;
  }> = new Map();

  // Effects state
  private effectsEnabled = {
    masterReverb: false,
    masterDelay: false,
    masterLimiter: true,
    masterEQ: false,
  };

  private drumEffectsState: Record<DrumType, {
    reverb: { enabled: boolean; wet: number; params: Record<string, number> };
    delay: { enabled: boolean; wet: number; params: Record<string, number> };
    filter: { enabled: boolean; wet: number; params: Record<string, number> };
    distortion: { enabled: boolean; wet: number; params: Record<string, number> };
    compressor: { enabled: boolean; wet: number; params: Record<string, number> };
  }> = {
      kick: {
        reverb: { enabled: false, wet: 20, params: { room: 30, decay: 40 } },
        delay: { enabled: false, wet: 15, params: { time: 125, feedback: 25 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 8000, resonance: 1 } },
        distortion: { enabled: false, wet: 30, params: { drive: 20 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -12, ratio: 4 } },
      },
      snare: {
        reverb: { enabled: false, wet: 35, params: { room: 50, decay: 30 } },
        delay: { enabled: false, wet: 20, params: { time: 250, feedback: 15 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 12000, resonance: 0.7 } },
        distortion: { enabled: false, wet: 25, params: { drive: 15 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -8, ratio: 6 } },
      },
      hihat: {
        reverb: { enabled: false, wet: 15, params: { room: 20, decay: 15 } },
        delay: { enabled: false, wet: 10, params: { time: 125, feedback: 10 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 15000, resonance: 0.5 } },
        distortion: { enabled: false, wet: 20, params: { drive: 10 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -15, ratio: 3 } },
      },
      openhat: {
        reverb: { enabled: false, wet: 25, params: { room: 40, decay: 25 } },
        delay: { enabled: false, wet: 15, params: { time: 250, feedback: 12 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 12000, resonance: 0.6 } },
        distortion: { enabled: false, wet: 15, params: { drive: 8 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -12, ratio: 4 } },
      },
      crash: {
        reverb: { enabled: false, wet: 45, params: { room: 70, decay: 60 } },
        delay: { enabled: false, wet: 25, params: { time: 375, feedback: 20 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 10000, resonance: 0.8 } },
        distortion: { enabled: false, wet: 20, params: { drive: 12 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -10, ratio: 5 } },
      },
      ride: {
        reverb: { enabled: false, wet: 30, params: { room: 50, decay: 45 } },
        delay: { enabled: false, wet: 20, params: { time: 250, feedback: 18 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 8000, resonance: 0.7 } },
        distortion: { enabled: false, wet: 15, params: { drive: 10 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -12, ratio: 4 } },
      },
      tom1: {
        reverb: { enabled: false, wet: 25, params: { room: 40, decay: 35 } },
        delay: { enabled: false, wet: 15, params: { time: 125, feedback: 20 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 6000, resonance: 1.2 } },
        distortion: { enabled: false, wet: 25, params: { drive: 15 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -10, ratio: 5 } },
      },
      tom2: {
        reverb: { enabled: false, wet: 25, params: { room: 40, decay: 35 } },
        delay: { enabled: false, wet: 15, params: { time: 125, feedback: 20 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 4000, resonance: 1.2 } },
        distortion: { enabled: false, wet: 25, params: { drive: 15 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -10, ratio: 5 } },
      },
      tom3: {
        reverb: { enabled: false, wet: 25, params: { room: 40, decay: 35 } },
        delay: { enabled: false, wet: 15, params: { time: 125, feedback: 20 } },
        filter: { enabled: false, wet: 100, params: { cutoff: 2000, resonance: 1.2 } },
        distortion: { enabled: false, wet: 25, params: { drive: 15 } },
        compressor: { enabled: false, wet: 100, params: { threshold: -10, ratio: 5 } },
      },
    };

  async initialize() {
    // Don't create AudioContext here - wait for user gesture
    console.log('DrumEngine ready for user interaction');
  }

  private async ensureAudioContext() {
    if (this.audioContext) return;

    try {
      this.audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();

      // Resume context if suspended (for autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create master gain node for volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.7;

      // Initialize effects chain
      this.initializeEffects();

      // Load initial kit samples
      await this.loadKitSamples();

      console.log('Audio context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw error;
    }
  }
  async loadSamples(samples: DrumSample[]) {
    await this.ensureAudioContext();
    if (!this.audioContext) throw new Error('Audio context not initialized');

    console.log(`Loading real drum samples for genre: ${this.currentGenre}...`);

    // Load actual audio files instead of synthetic sounds
    const loadPromises = samples.map(async (sample) => {
      try {
        // Check for genre-specific sample first, then fall back to default
        const genreSpecific = GENRE_SAMPLE_MAPPING[this.currentGenre]?.[sample.type];
        const samplePath = genreSpecific || SAMPLE_MAPPING[sample.type];

        if (!samplePath) {
          console.warn(`No sample file mapped for drum type: ${sample.type}`);
          return;
        }

        const response = await fetch(samplePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch sample: ${samplePath}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

        this.samples.set(sample.type, audioBuffer);
        // console.log(`Loaded ${genreSpecific ? 'genre-specific' : 'default'} sample for ${sample.type}: ${samplePath}`);
      } catch (error) {
        console.error(`Failed to load sample for ${sample.type}:`, error);
        // Fallback to synthetic sound if sample loading fails
        const fallbackBuffer = this.createDrumSound(sample.type);
        this.samples.set(sample.type, fallbackBuffer);
        // console.log(`Using synthetic fallback for ${sample.type}`);
      }
    });

    await Promise.all(loadPromises);
    console.log(`Loaded ${this.samples.size} drum samples for ${this.currentGenre} genre`);
  }

  private createDrumSound(drumType: DrumType): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not initialized');

    const sampleRate = this.audioContext.sampleRate;
    let duration: number;
    let buffer: AudioBuffer;

    switch (drumType) {
      case 'kick':
        duration = 1.2;
        buffer = this.createMetalKick(duration, sampleRate);
        break;
      case 'snare':
        duration = 0.4;
        buffer = this.createMetalSnare(duration, sampleRate);
        break;
      case 'hihat':
        duration = 0.08;
        buffer = this.createMetalHiHat(duration, sampleRate, true);
        break;
      case 'openhat':
        duration = 0.3;
        buffer = this.createMetalHiHat(duration, sampleRate, false);
        break;
      case 'crash':
        duration = 2.5;
        buffer = this.createMetalCymbal(duration, sampleRate, 'crash');
        break;
      case 'ride':
        duration = 1.5;
        buffer = this.createMetalCymbal(duration, sampleRate, 'ride');
        break;
      case 'tom1':
        duration = 0.6;
        buffer = this.createMetalTom(duration, sampleRate, 180);
        break;
      case 'tom2':
        duration = 0.6;
        buffer = this.createMetalTom(duration, sampleRate, 140);
        break;
      case 'tom3':
        duration = 0.6;
        buffer = this.createMetalTom(duration, sampleRate, 100);
        break;
      default:
        duration = 0.3;
        buffer = this.createGenericDrum(duration, sampleRate);
    }

    return buffer;
  }

  private createMetalKick(duration: number, sampleRate: number): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;

      // Multi-layered kick for metal punch
      // Sub frequency fundamental
      const sub = Math.sin(2 * Math.PI * 50 * t * Math.exp(-t * 20)) * Math.exp(-t * 5);

      // Punch frequency with rapid pitch decay
      const punch = Math.sin(2 * Math.PI * 80 * t * Math.exp(-t * 25)) * Math.exp(-t * 8);

      // Click/attack component
      const click = Math.sin(2 * Math.PI * 1500 * t) * Math.exp(-t * 120) * 0.3;

      // Slight overdrive/distortion for metal character
      let sample = (sub * 0.6 + punch * 0.8 + click) * 0.9;
      sample = Math.tanh(sample * 1.2); // Gentle saturation

      data[i] = sample;
    }

    return buffer;
  }

  private createMetalSnare(duration: number, sampleRate: number): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;

      // Fundamental tone
      const fundamental = Math.sin(2 * Math.PI * 220 * t) * 0.3;

      // Harmonic content for body
      const harmonic = Math.sin(2 * Math.PI * 440 * t) * 0.2;

      // High frequency noise for snare rattle
      const noise = (Math.random() * 2 - 1) * 0.7;

      // High-pass filtered noise for crack
      let highNoise = noise;
      if (i > 0) {
        highNoise = noise - data[i - 1] * 0.8;
      }

      // Attack envelope with quick decay
      const env = Math.exp(-t * 20) * (1 + Math.exp(-t * 200) * 2);

      const sample = (fundamental + harmonic + highNoise) * env * 0.8;
      data[i] = Math.tanh(sample); // Soft clipping for character
    }

    return buffer;
  }

  private createMetalHiHat(duration: number, sampleRate: number, closed: boolean): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;

      // Multiple frequency bands for metallic shimmer
      let sample = 0;
      const frequencies = [8000, 10000, 12000, 15000, 18000];

      for (const freq of frequencies) {
        sample += Math.sin(2 * Math.PI * freq * t + Math.random() * 0.1) * 0.15;
      }

      // High frequency noise
      const noise = (Math.random() * 2 - 1) * 0.8;

      // Multiple high-pass filters for crisp sound
      let filtered = noise;
      for (let j = 0; j < 3; j++) {
        if (i > j) {
          filtered = filtered - data[i - j - 1] * 0.9;
        }
      }

      sample = (sample + filtered) * 0.5;

      // Different envelopes for closed vs open
      const env = closed
        ? Math.exp(-t * 80)
        : Math.exp(-t * 15) * (1 - Math.exp(-t * 50)) * 2;

      data[i] = sample * env * 0.6;
    }

    return buffer;
  }

  private createMetalCymbal(duration: number, sampleRate: number, type: 'crash' | 'ride'): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;

      let sample = 0;

      if (type === 'crash') {
        // Crash: explosive, bright, long decay
        const frequencies = [3000, 4000, 5000, 6000, 8000, 10000, 12000];
        for (const freq of frequencies) {
          sample += Math.sin(2 * Math.PI * freq * t + Math.random() * 0.2) * 0.1;
        }

        // Explosive noise component
        const noise = (Math.random() * 2 - 1) * 0.6;
        sample = (sample + noise) * Math.exp(-t * 2) * (1 + Math.exp(-t * 20) * 3);

      } else {
        // Ride: more controlled, pingy attack
        const fundamentals = [1200, 2400, 3600];
        for (const freq of fundamentals) {
          sample += Math.sin(2 * Math.PI * freq * t) * 0.2;
        }

        // Ping component
        const ping = Math.sin(2 * Math.PI * 4000 * t) * Math.exp(-t * 15) * 0.4;

        const env = Math.exp(-t * 3) + Math.exp(-t * 30) * 0.3;
        sample = (sample + ping) * env;
      }

      data[i] = Math.tanh(sample * 0.8);
    }

    return buffer;
  }

  private createMetalTom(duration: number, sampleRate: number, frequency: number): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;

      // Pitch envelope - starts higher and drops
      const pitchEnv = Math.exp(-t * 8);
      const currentFreq = frequency * (1 + pitchEnv * 0.8);

      // Fundamental and harmonics
      const fundamental = Math.sin(2 * Math.PI * currentFreq * t);
      const harmonic2 = Math.sin(2 * Math.PI * currentFreq * 1.5 * t) * 0.3;
      const harmonic3 = Math.sin(2 * Math.PI * currentFreq * 2.2 * t) * 0.15;

      // Attack and sustain envelope
      const env = Math.exp(-t * 6) * (1 + Math.exp(-t * 50) * 0.8);

      const sample = (fundamental + harmonic2 + harmonic3) * env * 0.7;
      data[i] = Math.tanh(sample);
    }

    return buffer;
  }

  private createGenericDrum(duration: number, sampleRate: number): AudioBuffer {
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext!.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const sample = (Math.random() * 2 - 1) * Math.exp(-t * 10);
      data[i] = sample * 0.5;
    }

    return buffer;
  }

  // Chris Wilson's precise scheduling implementation
  private scheduler() {
    if (!this.audioContext || !this.pattern) return;

    // Look ahead and schedule any notes that need to be played
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentNote, this.nextNoteTime);
      this.nextNote();
    }

    if (this.isPlaying) {
      this.schedulerId = window.setTimeout(() => this.scheduler(), this.lookahead);
    }
  }
  private scheduleNote(beatNumber: number, time: number) {
    if (!this.pattern) return;

    // Add note to queue for visual synchronization
    this.notesInQueue.push({ note: beatNumber, time });

    // Check each drum type for this step
    Object.entries(this.pattern.beats).forEach(([drumType, beats]) => {
      if (!beats || !beats[beatNumber]) return;

      const step = beats[beatNumber];
      // Handle both legacy boolean format and new Step interface
      const isActive = typeof step === 'boolean' ? step : step?.active;
      const velocity = typeof step === 'boolean' ? 100 : (step?.velocity || 100);

      if (isActive) {
        const drumTypeKey = drumType as DrumType;

        // Check if drum is muted or solo'd
        if (this.isDrumMuted(drumTypeKey)) {
          return;
        }

        // Apply probability checks
        const stepProbability = typeof step === 'boolean' ? 100 : (step?.probability || 100);
        const effectiveProbability = (stepProbability / 100) * (this.masterProbability / 100) * 100;

        if (Math.random() * 100 > effectiveProbability) {
          return; // Skip this note based on probability
        }

        // Apply scatter effect
        let scatterTime = time;
        if (this.scatterEnabled) {
          const maxScatter = (60 / this.bpm) * 0.1; // Max 10% of beat duration
          const scatterAmount = (this.scatterDepth / 10) * maxScatter;
          scatterTime += (Math.random() - 0.5) * 2 * scatterAmount;
        }

        // Apply humanization to timing and velocity
        const humanizedTime = this.getHumanizedTime(scatterTime, beatNumber);
        const humanizedVelocity = this.getHumanizedVelocity(velocity);

        // Apply advanced step features
        if (typeof step !== 'boolean') {
          // Flam effect
          if (step?.flam) {
            this.playDrumSound(drumTypeKey, humanizedTime - 0.02, humanizedVelocity * 0.8);
          }

          // Roll effect
          if (step?.roll && step.roll > 0) {
            const rollDuration = 60 / this.bpm / 4; // Quarter beat duration
            const rollInterval = rollDuration / step.roll;
            for (let i = 0; i < step.roll; i++) {
              this.playDrumSound(drumTypeKey, humanizedTime + (i * rollInterval), humanizedVelocity * 0.9);
            }
            return; // Don't play the main hit
          }
        }

        this.playDrumSound(drumTypeKey, humanizedTime, humanizedVelocity);
      }
    });

    // Update current step for UI - use requestAnimationFrame for smooth visual updates
    this.currentStep = beatNumber;
    if (this.stepCallback) {
      // Calculate delay to sync visual update with audio playback
      const delay = Math.max(0, (time - this.audioContext!.currentTime) * 1000);

      if (delay < 10) {
        // If very close to now, update immediately
        this.stepCallback(beatNumber);
      } else {
        // Schedule the visual update to sync with audio
        setTimeout(() => {
          if (this.stepCallback) {
            this.stepCallback(beatNumber);
          }
        }, delay);
      }
    }
  }

  private nextNote() {
    if (!this.pattern) return;

    // Simple and accurate BPM calculation
    // For 16 steps in 4/4 time: each step = 1/16th note
    // At 120 BPM, quarter note = 0.5 seconds, so 16th note = 0.125 seconds
    const quarterNoteTime = 60.0 / this.bpm; // seconds per quarter note
    const sixteenthNoteTime = quarterNoteTime / 4; // seconds per 16th note

    this.nextNoteTime += sixteenthNoteTime;

    // Advance the beat number, wrap around to 0
    this.currentNote = (this.currentNote + 1) % this.pattern.steps;
  }

  private playDrumSound(drumType: DrumType, time: number, velocity: number = 100) {
    if (!this.audioContext || !this.masterGain) return;

    const buffer = this.samples.get(drumType);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.connect(gainNode);

      // Connect to per-drum gain if available, otherwise master gain
      const perDrumGain = this.perDrumGain.get(drumType);
      if (perDrumGain) {
        gainNode.connect(perDrumGain);
      } else {
        gainNode.connect(this.masterGain);
      }

      // Set volume based on drum type and velocity
      const baseVolumes: Record<DrumType, number> = {
        kick: 1.0,
        snare: 0.9,
        hihat: 0.6,
        openhat: 0.7,
        crash: 0.8,
        ride: 0.7,
        tom1: 0.8,
        tom2: 0.8,
        tom3: 0.8,
      };

      // Calculate final volume: base volume × velocity (0-127 MIDI range)
      const velocityMultiplier = velocity / 127;
      const finalVolume = (baseVolumes[drumType] || 0.8) * velocityMultiplier;

      gainNode.gain.value = Math.max(0.01, Math.min(1.0, finalVolume));

      source.start(time);
    } catch (error) {
      console.error('Error playing drum sound:', error);
    }
  }

  // Add humanization and swing to timing calculation
  private getHumanizedTime(baseTime: number, stepIndex: number): number {
    let finalTime = baseTime;

    // Apply swing (for 8th note patterns)
    if (this.swingAmount > 0 && stepIndex % 2 === 1) {
      const swingDelay = (this.swingAmount / 100) * 0.1; // Max 100ms swing
      finalTime += swingDelay;
    }

    // Apply humanization (random timing variation)
    if (this.humanizeAmount > 0) {
      const maxVariation = (this.humanizeAmount / 100) * 0.02; // Max 20ms variation
      const variation = (Math.random() - 0.5) * 2 * maxVariation;
      finalTime += variation;
    }

    return finalTime;
  }

  // Add velocity randomization
  private getHumanizedVelocity(baseVelocity: number): number {
    if (this.velocityRandomization === 0) return baseVelocity;

    const maxVariation = (this.velocityRandomization / 100) * 30; // Max ±30 velocity units
    const variation = (Math.random() - 0.5) * 2 * maxVariation;
    return Math.max(20, Math.min(127, baseVelocity + variation));
  }

  setPattern(pattern: Pattern | null) {
    const wasPlaying = this.isPlaying;

    if (wasPlaying) {
      this.stop();
    }

    this.pattern = pattern;

    if (pattern) {
      this.bpm = pattern.bpm;
      console.log(`Pattern set: ${pattern.name} (${pattern.bpm} BPM, ${pattern.steps} steps)`);
    }

    this.currentStep = 0;
    this.currentNote = 0;

    if (wasPlaying && pattern) {
      // Small delay to prevent glitches when switching patterns during playback
      setTimeout(() => {
        this.play();
      }, 50);
    }
  }

  setBPM(bpm: number) {
    this.bpm = Math.max(60, Math.min(300, bpm));
  }

  setVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  onStep(callback: (step: number) => void) {
    this.stepCallback = callback;
  }

  // Public methods for controlling humanization and groove
  setHumanization(amount: number) {
    this.humanizeAmount = Math.max(0, Math.min(100, amount));
  }

  setSwing(amount: number) {
    this.swingAmount = Math.max(0, Math.min(100, amount));
  }

  setVelocityRandomization(amount: number) {
    this.velocityRandomization = Math.max(0, Math.min(100, amount));
  }

  getHumanization() {
    return this.humanizeAmount;
  }

  getSwing() {
    return this.swingAmount;
  }

  getVelocityRandomization() {
    return this.velocityRandomization;
  }

  async play() {
    await this.ensureAudioContext();

    if (!this.audioContext || !this.pattern) {
      console.warn('Cannot play: audio context or pattern not available');
      return;
    }

    if (this.isPlaying) return;

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.isPlaying = true;
    this.nextNoteTime = this.audioContext.currentTime;
    this.scheduler(); // Start the scheduling loop
  }

  stop() {
    this.isPlaying = false;
    this.currentStep = 0;
    this.currentNote = 0;
    this.nextNoteTime = 0;
    this.notesInQueue.length = 0;

    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }

    if (this.stepCallback) {
      this.stepCallback(0);
    }
  }

  pause() {
    this.isPlaying = false;

    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }
  }

  async triggerDrum(drumType: DrumType, velocity: number = 100) {
    await this.ensureAudioContext();
    if (!this.audioContext) return;
    this.playDrumSound(drumType, this.audioContext.currentTime, velocity);
  }

  // Advanced performance features
  setMasterProbability(probability: number) {
    this.masterProbability = Math.max(0, Math.min(100, probability));
  }

  setScatter(enabled: boolean, depth: number = 5) {
    this.scatterEnabled = enabled;
    this.scatterDepth = Math.max(1, Math.min(10, depth));
  }

  triggerScatter(intensity: number) {
    this.setScatter(true, intensity);
    // Disable scatter after 4 beats (1 bar)
    setTimeout(() => {
      this.setScatter(false);
    }, (60 / this.bpm) * 4 * 1000);
  }

  setDrumVolume(drumType: DrumType, volume: number) {
    if (!this.perDrumGain.has(drumType) && this.audioContext) {
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.masterGain!);
      this.perDrumGain.set(drumType, gainNode);
    }
    const gainNode = this.perDrumGain.get(drumType);
    if (gainNode) {
      gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  setDrumMute(drumType: DrumType, muted: boolean) {
    this.perDrumMute.set(drumType, muted);
  }

  setDrumSolo(drumType: DrumType, soloed: boolean) {
    this.perDrumSolo.set(drumType, soloed);
  }

  isDrumMuted(drumType: DrumType): boolean {
    // Check if this drum is muted OR if other drums are soloed and this one isn't
    const isMuted = this.perDrumMute.get(drumType) || false;
    const anySoloed = Array.from(this.perDrumSolo.values()).some(solo => solo);
    const isThisSoloed = this.perDrumSolo.get(drumType) || false;

    return isMuted || (anySoloed && !isThisSoloed);
  }

  dispose() {
    this.stop();
    this.samples.clear();

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }

    this.audioContext = null;
    this.masterGain = null;
  }

  get currentStepNumber() {
    return this.currentStep;
  }

  get playing() {
    return this.isPlaying;
  }

  set genre(newGenre: Genre) {
    this.currentGenre = newGenre;
    // Note: Samples will be reloaded when needed during ensureSamplesLoaded
  }

  // Effects control methods
  setReverb(type: string, level: number, time: number, gate: number) {
    if (!this.audioContext) return;

    this.effectsSettings.reverb = { level, type, time, gate: gate > 0 };

    if (level > 0 && !this.reverbNode) {
      this.reverbNode = this.audioContext.createConvolver();
      this.createImpulseResponse(time, gate);
    }

    if (this.reverbNode && this.effectsGain) {
      this.effectsGain.gain.value = level / 100;
    }

    console.log(`Reverb set: ${type}, level: ${level}%, time: ${time}s`);
  }

  setDelay(type: string, level: number, time: number, feedback: number) {
    if (!this.audioContext) return;

    this.effectsSettings.delay = { level, time, feedback, type };

    if (level > 0 && !this.delayNode) {
      this.delayNode = this.audioContext.createDelay(1.0);
      const feedbackGain = this.audioContext.createGain();

      this.delayNode.delayTime.value = time;
      feedbackGain.gain.value = feedback;

      this.delayNode.connect(feedbackGain);
      feedbackGain.connect(this.delayNode);
    }

    if (this.delayNode) {
      this.delayNode.delayTime.value = time;
    }

    console.log(`Delay set: ${type}, level: ${level}%, time: ${time}s, feedback: ${feedback}`);
  }

  setFilter(type: string, frequency: number, resonance: number) {
    if (!this.audioContext) return;

    this.effectsSettings.filter = { frequency, resonance, type: type as BiquadFilterType };

    if (!this.filterNode) {
      this.filterNode = this.audioContext.createBiquadFilter();
    }

    this.filterNode.type = type as BiquadFilterType;
    this.filterNode.frequency.value = frequency;
    this.filterNode.Q.value = resonance;

    console.log(`Filter set: ${type}, freq: ${frequency}Hz, Q: ${resonance}`);
  }

  setDistortion(amount: number, type: string) {
    if (!this.audioContext) return;

    this.effectsSettings.distortion = { amount, type };

    if (amount > 0 && !this.distortionNode) {
      this.distortionNode = this.audioContext.createWaveShaper();
      this.distortionNode.curve = this.makeDistortionCurve(amount);
      this.distortionNode.oversample = '4x';
    }

    if (this.distortionNode) {
      this.distortionNode.curve = this.makeDistortionCurve(amount);
    }

    console.log(`Distortion set: ${type}, amount: ${amount}%`);
  }

  private createImpulseResponse(time: number, gate: number) {
    if (!this.audioContext || !this.reverbNode) return;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * time;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, gate);
      }
    }

    this.reverbNode.buffer = impulse;
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
  }

  // Guitar Pro clipboard functionality
  exportToGuitarPro(): string {
    if (!this.pattern) return '';

    // Guitar Pro drum notation mapping
    const gpDrumMap = {
      kick: 36,      // C2 - Bass Drum
      snare: 38,     // D2 - Snare
      hihat: 42,     // F#2 - Closed Hi-Hat
      openhat: 46,   // A#2 - Open Hi-Hat
      crash: 49,     // C#3 - Crash Cymbal 1
      ride: 51,      // D#3 - Ride Cymbal 1
      tom1: 50,      // D3 - High Tom
      tom2: 47,      // B2 - Low-Mid Tom
      tom3: 43,      // G2 - High Floor Tom
    };

    let gpData = '';
    const stepDuration = 1920 / (this.pattern.steps / 4); // 16th notes in MIDI ticks

    // Header for Guitar Pro drum track
    gpData += `\\title "${this.pattern.name}"\n`;
    gpData += `\\tempo ${this.pattern.bpm}\n`;
    gpData += `\\track "Drums" channel 10\n`;
    gpData += `\\clef percussion\n`;

    // Convert pattern to Guitar Pro notation
    for (let step = 0; step < this.pattern.steps; step++) {
      const stepTime = step * stepDuration;
      let notesAtStep: string[] = [];

      Object.entries(this.pattern.beats).forEach(([drumType, beats]) => {
        const stepData = beats[step];
        if (typeof stepData === 'object' && stepData?.active) {
          const midiNote = gpDrumMap[drumType as DrumType];
          const velocity = stepData.velocity || 100;
          const accent = stepData.accent ? '>' : '';
          notesAtStep.push(`${midiNote}:${velocity}${accent}`);
        }
      });

      if (notesAtStep.length > 0) {
        gpData += `${stepTime} [${notesAtStep.join(' ')}] ${stepDuration}\n`;
      }
    }

    return gpData;
  }

  async copyToClipboard(): Promise<boolean> {
    try {
      const gpData = this.exportToGuitarPro();

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(gpData);
        console.log('Pattern copied to clipboard in Guitar Pro format');
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = gpData;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Pattern copied to clipboard (fallback method)');
        return true;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  // Import from Guitar Pro format
  importFromGuitarPro(gpData: string): Pattern | null {
    try {
      const lines = gpData.split('\n');
      let title = 'Imported Pattern';
      let bpm = 120;
      const beats: Record<DrumType, any[]> = {
        kick: [], snare: [], hihat: [], openhat: [], crash: [],
        ride: [], tom1: [], tom2: [], tom3: []
      };

      // Reverse MIDI note mapping
      const midiToDrum: Record<number, DrumType> = {
        36: 'kick', 38: 'snare', 42: 'hihat', 46: 'openhat',
        49: 'crash', 51: 'ride', 50: 'tom1', 47: 'tom2', 43: 'tom3'
      };

      // Parse Guitar Pro data
      lines.forEach(line => {
        if (line.startsWith('\\title')) {
          title = line.split('"')[1] || title;
        } else if (line.startsWith('\\tempo')) {
          bpm = parseInt(line.split(' ')[1]) || bpm;
        } else if (line.match(/^\d+\s+\[.*\]/)) {
          // Parse note data
          const match = line.match(/\[(.*?)\]/);
          if (match) {
            const notes = match[1].split(' ');
            notes.forEach(note => {
              const [midiNote, velocityStr] = note.split(':');
              const midiNum = parseInt(midiNote);
              const velocity = parseInt(velocityStr) || 100;
              const drumType = midiToDrum[midiNum];

              if (drumType) {
                // This is a simplified import - would need proper step calculation
                beats[drumType].push({
                  active: true,
                  velocity,
                  accent: velocityStr?.includes('>') || false
                });
              }
            });
          }
        }
      });

      // Fill empty steps to match pattern length
      const patternLength = 16; // Default
      Object.keys(beats).forEach(drumType => {
        const drumBeats = beats[drumType as DrumType];
        while (drumBeats.length < patternLength) {
          drumBeats.push({ active: false, velocity: 100, accent: false });
        }
      });

      return {
        id: `imported-${Date.now()}`,
        name: title,
        genre: 'metal' as Genre,
        bpm,
        steps: patternLength,
        beats,
        swing: 0,
        variations: 1,
        fills: new Array(patternLength).fill(false)
      };
    } catch (error) {
      console.error('Failed to import Guitar Pro data:', error);
      return null;
    }
  }

  // Initialize master effects chain
  private initializeEffects() {
    if (!this.audioContext) return;

    // Create master effects
    this.masterLimiter = this.audioContext.createDynamicsCompressor();
    this.masterLimiter.threshold.value = -1;
    this.masterLimiter.knee.value = 0;
    this.masterLimiter.ratio.value = 20;
    this.masterLimiter.attack.value = 0.003;
    this.masterLimiter.release.value = 0.01;

    this.masterEQ = this.audioContext.createBiquadFilter();
    this.masterEQ.type = 'highshelf';
    this.masterEQ.frequency.value = 10000;
    this.masterEQ.gain.value = 0;

    // Connect master effects chain
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain.connect(this.masterEQ);
      this.masterEQ.connect(this.masterLimiter);
      this.masterLimiter.connect(this.audioContext.destination);
    }
  }

  // Set drum-specific effects
  setDrumEffect(drumType: DrumType, effectType: string, config: any) {
    if (!this.audioContext) return;

    if (!this.drumEffectChains.has(drumType)) {
      // Initialize effect chain for this drum
      const gainNode = this.audioContext.createGain();
      this.drumEffectChains.set(drumType, { gainNode });
    }

    const chain = this.drumEffectChains.get(drumType)!;

    // Update state
    if (this.drumEffectsState[drumType] && this.drumEffectsState[drumType][effectType as keyof typeof this.drumEffectsState[typeof drumType]]) {
      Object.assign(this.drumEffectsState[drumType][effectType as keyof typeof this.drumEffectsState[typeof drumType]], config);
    }

    switch (effectType) {
      case 'reverb':
        if (config.enabled && !chain.reverb) {
          chain.reverb = this.audioContext.createConvolver();
          // Create simple reverb impulse
          const impulse = this.createSimpleImpulse(1.0, 0.3);
          chain.reverb.buffer = impulse;
        }
        break;

      case 'delay':
        if (config.enabled && !chain.delay) {
          chain.delay = this.audioContext.createDelay(1.0);
          chain.delay.delayTime.value = (config.params?.time || 125) / 1000;
        }
        break;

      case 'filter':
        if (config.enabled && !chain.filter) {
          chain.filter = this.audioContext.createBiquadFilter();
          chain.filter.type = 'lowpass';
          chain.filter.frequency.value = config.params?.cutoff || 8000;
          chain.filter.Q.value = config.params?.resonance || 1;
        }
        break;

      case 'distortion':
        if (config.enabled && !chain.distortion) {
          chain.distortion = this.audioContext.createWaveShaper();
          chain.distortion.curve = this.makeDistortionCurve(config.params?.drive || 20);
          chain.distortion.oversample = '4x';
        }
        break;

      case 'compressor':
        if (config.enabled && !chain.compressor) {
          chain.compressor = this.audioContext.createDynamicsCompressor();
          chain.compressor.threshold.value = config.params?.threshold || -12;
          chain.compressor.ratio.value = config.params?.ratio || 4;
          chain.compressor.attack.value = 0.003;
          chain.compressor.release.value = 0.1;
        }
        break;
    }
  }

  // Create simple reverb impulse
  private createSimpleImpulse(duration: number, decay: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not initialized');

    const length = this.audioContext.sampleRate * duration;
    const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
      }
    }

    return impulse;
  }

  // Get drum effects state for UI
  getDrumEffectsState() {
    return this.drumEffectsState;
  }

  // Get master effects state for UI
  getMasterEffectsState() {
    return {
      reverb: { enabled: this.effectsEnabled.masterReverb, wet: 25, params: { room: 50, decay: 40 } },
      delay: { enabled: this.effectsEnabled.masterDelay, wet: 20, params: { time: 250, feedback: 30 } },
      limiter: { enabled: this.effectsEnabled.masterLimiter, wet: 100, params: { threshold: -1, ratio: 20 } },
      eq: { enabled: this.effectsEnabled.masterEQ, wet: 100, params: { frequency: 10000, gain: 0 } }
    };
  }

  // Set master effects
  setMasterEffect(effectType: string, config: any) {
    switch (effectType) {
      case 'limiter':
        if (this.masterLimiter && config.enabled !== undefined) {
          this.effectsEnabled.masterLimiter = config.enabled;
          if (config.params) {
            if (config.params.threshold !== undefined) {
              this.masterLimiter.threshold.value = config.params.threshold;
            }
            if (config.params.ratio !== undefined) {
              this.masterLimiter.ratio.value = config.params.ratio;
            }
          }
        }
        break;

      case 'eq':
        if (this.masterEQ && config.enabled !== undefined) {
          this.effectsEnabled.masterEQ = config.enabled;
          if (config.params) {
            if (config.params.frequency !== undefined) {
              this.masterEQ.frequency.value = config.params.frequency;
            }
            if (config.params.gain !== undefined) {
              this.masterEQ.gain.value = config.params.gain;
            }
          }
        }
        break;
    }
  }

  // Kit selection methods
  getCurrentKit(): DrumKit {
    return this.currentKit;
  }

  getAvailableKits(): DrumKit[] {
    return DRUM_KITS;
  }

  getKitsForGenre(genre: Genre): DrumKit[] {
    return DRUM_KITS.filter(kit => kit.genre.includes(genre));
  }

  async setDrumKit(kitId: string): Promise<void> {
    const kit = DRUM_KITS.find(k => k.id === kitId);
    if (!kit) {
      console.error(`Drum kit with id '${kitId}' not found`);
      return;
    }

    console.log(`Switching to drum kit: ${kit.name}`);
    this.currentKit = kit;

    // Reload samples with new kit
    await this.loadKitSamples();

    // Notify listeners of kit change
    if (this.kitChangeCallback) {
      this.kitChangeCallback(kit);
    }
  }

  setKitChangeCallback(callback: (kit: DrumKit) => void) {
    this.kitChangeCallback = callback;
  }

  private async loadKitSamples() {
    if (!this.audioContext) {
      await this.ensureAudioContext();
    }

    const samples = this.currentKit.samples;
    console.log(`Loading samples for kit: ${this.currentKit.name}`);

    // Clear existing samples
    this.samples.clear();

    const loadPromises = Object.entries(samples).map(async ([drumType, url]) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        this.samples.set(drumType as DrumType, audioBuffer);
        console.log(`✓ Loaded ${drumType}: ${url}`);
      } catch (error) {
        console.error(`Failed to load sample for ${drumType}:`, error);
        // Fallback to synthetic sound if sample loading fails
        const fallbackBuffer = this.createDrumSound(drumType as DrumType);
        this.samples.set(drumType as DrumType, fallbackBuffer);
      }
    });

    await Promise.all(loadPromises);
    console.log(`Loaded ${this.samples.size} drum samples for ${this.currentKit.name}`);
  }
}

// Create singleton instance and export it
export const drumEngine = new DrumEngine();
