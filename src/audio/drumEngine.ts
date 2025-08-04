import type { Pattern, DrumType, DrumSample, Genre } from '../types/drum';

// Primary sample mapping for each drum type (Pearl kit - clean sounds)
const SAMPLE_MAPPING: Record<DrumType, string> = {
  kick: '/audio/samples/pearlkit-kick.wav',
  snare: '/audio/samples/pearlkit-snare1.wav',
  hihat: '/audio/samples/pearlkit-hihat.wav',
  openhat: '/audio/samples/pearlkit-hihatO.wav',
  crash: '/audio/samples/real-01FX18MDCM.wav', // Better default crash sound
  ride: '/audio/samples/pearlkit-ride1.wav',
  tom1: '/audio/samples/pearlkit-hitom1.wav',
  tom2: '/audio/samples/pearlkit-hitom2.wav',
  tom3: '/audio/samples/pearlkit-lowtom1.wav',
};

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
  private notesInQueue: Array<{note: number, time: number}> = [];
  private bpm = 120;
  private masterGain: GainNode | null = null;

  // Humanization and groove parameters
  private humanizeAmount = 0; // 0-100, amount of timing variation
  private swingAmount = 0; // 0-100, swing percentage
  private velocityRandomization = 0; // 0-100, velocity variation amount

  // Advanced performance features
  private masterProbability = 100; // 0-100, global probability multiplier
  private scatterEnabled = false; // Scatter effect state
  private scatterDepth = 5; // 1-10, scatter intensity
  // TODO: Implement fill patterns feature
  // private fillPatterns: Map<string, Pattern> = new Map(); // Fill pattern storage
  // private isInFillMode = false; // Whether currently playing a fill
  private perDrumGain: Map<DrumType, GainNode> = new Map(); // Per-drum volume control
  private perDrumMute: Map<DrumType, boolean> = new Map(); // Per-drum mute state
  private perDrumSolo: Map<DrumType, boolean> = new Map(); // Per-drum solo state

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
}

// Create singleton instance and export it
export const drumEngine = new DrumEngine();
