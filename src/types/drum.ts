export type DrumType = 'kick' | 'snare' | 'hihat' | 'openhat' | 'crash' | 'ride' | 'tom1' | 'tom2' | 'tom3';

export type Genre = 'metal' | 'post-hardcore' | 'metalcore' | 'jazz';

export interface DrumSample {
  name: string;
  type: DrumType;
  url: string;
  volume: number;
  pan: number;
}

export interface Step {
  active: boolean;
  velocity: number; // 0-127 (MIDI standard)
  accent: boolean;
  // Advanced features - will be expanded
  probability?: number; // 0-100 (percentage chance to trigger)
  flam?: boolean; // double hit with slight delay
  roll?: number; // 0-16 (number of sub-steps for rolls)
  pan?: number; // -50 to 50 (individual step panning)
  pitch?: number; // -24 to 24 (semitones)
}

export interface Pattern {
  id: string;
  name: string;
  genre: Genre;
  bpm: number;
  steps: number;
  swing: number;
  beats: { [key in DrumType]?: Step[] };
  variations: number; // number of pattern variations
  fills: boolean[]; // which steps are fill patterns
}

export interface PatternVariation {
  id: string;
  name: string;
  beats: { [key in DrumType]?: Step[] };
}

export interface DrumKit {
  name: string;
  genre: Genre;
  samples: DrumSample[];
}

export interface AudioState {
  isPlaying: boolean;
  currentStep: number;
  bpm: number;
  volume: number;
  swing: number;
}

export const defaultDrumTypes: DrumType[] = [
  'kick',
  'snare',
  'hihat',
  'openhat',
  'crash',
  'ride',
  'tom1',
  'tom2',
  'tom3'
];

// Helper function to create a default step
export const createStep = (
  active: boolean = false,
  velocity: number = 100,
  accent: boolean = false
): Step => ({
  active,
  velocity,
  accent,
});

// Utility function to convert boolean arrays to Step arrays
const createSteps = (pattern: boolean[], velocity: number = 100, accent: boolean = false): Step[] => {
  return pattern.map(active => createStep(
    active,
    active ? velocity : 0,
    active ? accent : false
  ));
};

// Comprehensive library of authentic drum patterns based on extensive research
export const genrePresets: Record<Genre, Pattern[]> = {
  metal: [
    {
      id: 'metal-thrash-basic',
      name: 'Thrash Metal Basic',
      genre: 'metal',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(
          [0, 4, 8, 12].includes(i),
          110,
          [0, 8].includes(i)
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(
          [4, 12].includes(i),
          120,
          true
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(
          i % 2 === 0,
          80 + (i % 4 === 0 ? 20 : 0),
          i % 4 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(
          i === 0,
          127,
          true
        )),
      }
    },
    {
      id: 'metal-blast-traditional',
      name: 'Traditional Blast Beat',
      genre: 'metal',
      bpm: 220,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 115, i % 4 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 1, 110, false
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metal-blast-hammer',
      name: 'Hammer Blast Beat',
      genre: 'metal',
      bpm: 240,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 120, i % 4 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 115, i % 4 === 0
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 90, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-blast-gravity',
      name: 'Gravity Blast (Freehand)',
      genre: 'metal',
      bpm: 260,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(true, 110, i % 4 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(true, 100 + (i % 2 === 0 ? 15 : 0), i % 8 === 0
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 75, false
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metal-double-bass',
      name: 'Double Bass Assault',
      genre: 'metal',
      bpm: 200,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: ![2, 5, 10, 13].includes(i),
          velocity: 115 + (i % 4 === 0 ? 10 : 0),
          accent: i % 4 === 0
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 4 === 0, 90, true
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metal-gallop',
      name: 'Metal Gallop',
      genre: 'metal',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 3, 5, 6, 8, 10, 11, 13, 14].includes(i),
          velocity: 110 + ([0, 3, 6, 8, 11, 14].includes(i) ? 10 : 0),
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 75 + (i % 2 === 0 ? 10 : 0), i % 4 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-blackmetal-tremolo',
      name: 'Black Metal Tremolo',
      genre: 'metal',
      bpm: 190,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 4 === 0, 105, [0, 8].includes(i)
        )),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 100,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: ![2, 6, 10, 14].includes(i),
          velocity: 85 + (i % 2 === 0 ? 10 : 0),
          accent: i % 8 === 0
        })),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-doom-heavy',
      name: 'Doom Metal Crusher',
      genre: 'metal',
      bpm: 80,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 9, 12, 15].includes(i),
          velocity: 70 + ([0, 6, 12].includes(i) ? 20 : 0),
          accent: [0, 12].includes(i)
        })),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 110,
          accent: true
        })),
      }
    },
    {
      id: 'metal-progressive-complex',
      name: 'Progressive Metal 7/8',
      genre: 'metal',
      bpm: 140,
      steps: 14,
      swing: 0,
      variations: 1,
      fills: Array(14).fill(false),
      beats: {
        kick: Array.from({ length: 14 }, (_, i) => ({
          active: [0, 3, 6, 7, 10].includes(i),
          velocity: 115 + ([0, 7].includes(i) ? 10 : 0),
          accent: [0, 7].includes(i)
        })),
        snare: Array.from({ length: 14 }, (_, i) => ({
          active: [4, 11].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 14 }, (_, i) => ({
          active: [0, 2, 4, 6, 7, 9, 11, 13].includes(i),
          velocity: 80 + (i % 7 === 0 ? 15 : 0),
          accent: i % 7 === 0
        })),
        crash: Array.from({ length: 14 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-power-driving',
      name: 'Power Metal Drive',
      genre: 'metal',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 4, 6, 8, 12, 14].includes(i),
          velocity: 115 + ([0, 8].includes(i) ? 10 : 0),
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 3, 5, 6, 7, 8, 9, 11, 13, 14, 15].includes(i),
          velocity: 85 + ([0, 8].includes(i) ? 10 : 0),
          accent: [0, 8].includes(i)
        })),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 10].includes(i),
          velocity: 90,
          accent: false
        })),
      }
    },
    {
      id: 'metal-blast-bomb',
      name: 'Bomb Blast (Cannibal)',
      genre: 'metal',
      bpm: 230,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(true, 110 + (i % 4 === 0 ? 15 : 0), i % 4 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 115, i % 8 === 0
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 80, false
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metal-skank-beat',
      name: 'Skank Beat (Thrash)',
      genre: 'metal',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 4 === 0, 115, [0, 8].includes(i)
        )),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 110,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85 + (i % 4 === 0 ? 10 : 0), i % 4 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-polyrhythm-5over4',
      name: 'Polyrhythmic 5-over-4',
      genre: 'metal',
      bpm: 150,
      steps: 20,
      swing: 0,
      variations: 1,
      fills: Array(20).fill(false),
      beats: {
        kick: Array.from({ length: 20 }, (_, i) => ({
          active: [0, 4, 8, 12, 16].includes(i),
          velocity: 115,
          accent: [0, 8, 16].includes(i)
        })),
        snare: Array.from({ length: 20 }, (_, i) => ({
          active: [5, 10, 15].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 20 }, (_, i) => ({
          active: ![5, 10, 15].includes(i),
          velocity: 80 + (i % 5 === 0 ? 10 : 0),
          accent: i % 5 === 0
        })),
        crash: Array.from({ length: 20 }, (_, i) => ({
          active: [0, 16].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metal-sludge-groove',
      name: 'Sludge Metal Groove',
      genre: 'metal',
      bpm: 90,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 5, 8, 11, 13].includes(i),
          velocity: 120 + ([0, 8].includes(i) ? 7 : 0),
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 7, 12, 15].includes(i),
          velocity: 115,
          accent: [4, 12].includes(i)
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 75 + ([0, 8].includes(i) ? 15 : 0),
          accent: [0, 8].includes(i)
        })),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metal-folk-celtic',
      name: 'Folk Metal Celtic',
      genre: 'metal',
      bpm: 140,
      steps: 16,
      swing: 0.1,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 5, 8, 11, 13].includes(i),
          velocity: 110,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 105,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 3, 5, 7, 9, 11, 13, 15].includes(i),
          velocity: 75,
          accent: false
        })),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 120,
          accent: true
        })),
        ride: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 85, i % 8 === 0
        )),
      }
    },
    {
      id: 'metal-symphonic-epic',
      name: 'Symphonic Metal Epic',
      genre: 'metal',
      bpm: 110,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 4 === 0, 115, [0, 8].includes(i)
        )),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 110,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, () => createStep(false, 0, false)),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15].includes(i),
          velocity: 90 + ([0, 8].includes(i) ? 10 : 0),
          accent: [0, 8].includes(i)
        })),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 105,
          accent: true
        })),
      }
    },
    {
      id: 'metal-industrial-machine',
      name: 'Industrial Metal Machine',
      genre: 'metal',
      bpm: 128,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 110),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 120, true),
        hihat: createSteps([true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'metal-prog-polyrhythm',
      name: 'Progressive Polyrhythm 5/4',
      genre: 'metal',
      bpm: 135,
      steps: 20,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, true, false, false, true, false, true, false, false, true, false], 105),
        snare: createSteps([false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false], 115, true),
        hihat: createSteps([true, true, false, true, true, true, true, false, true, true, true, true, false, true, true, true, true, false, true, true], 80),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'metal-extreme-gravity',
      name: 'Extreme Gravity Blast',
      genre: 'metal',
      bpm: 220,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 115),
        snare: createSteps([false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true], 120, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 0),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'metal-viking-epic',
      name: 'Viking Metal Epic',
      genre: 'metal',
      bpm: 145,
      steps: 16,
      swing: 0.05,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false], 110),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 115, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 0),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true], 90),
        tom1: createSteps([false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true], 105, true),
        tom2: createSteps([false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false], 100, true),
        tom3: createSteps([false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false], 95, true),
      }
    },
    {
      id: 'metal-drone-ambient',
      name: 'Drone Doom Ambient',
      genre: 'metal',
      bpm: 60,
      steps: 32,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 100),
        snare: createSteps([false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 110, true),
        hihat: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 70),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 120, true),
      }
    },
    {
      id: 'metal-speed-attack',
      name: 'Speed Metal Attack',
      genre: 'metal',
      bpm: 185,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 110),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 120, true),
        hihat: createSteps([true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'metal-groove-nu',
      name: 'Nu Metal Groove',
      genre: 'metal',
      bpm: 125,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 110),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 120, true),
        hihat: createSteps([true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'metal-stoner-fuzz',
      name: 'Stoner Metal Fuzz',
      genre: 'metal',
      bpm: 100,
      steps: 16,
      swing: 0.08,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 90),
      }
    },

    // === Research-Based Authentic Patterns ===

    // Million Dollar Beat (Basic Rock)
    {
      id: 'metal-million-dollar',
      name: 'Million Dollar Beat',
      genre: 'metal',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 85),
      }
    },

    // Four on the Floor (Metal version)
    {
      id: 'metal-four-floor',
      name: 'Four on the Floor Metal',
      genre: 'metal',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 115),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 125, true),
        hihat: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 80),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },

    // 16th Note Metal Groove
    {
      id: 'metal-16th-groove',
      name: '16th Note Metal Groove',
      genre: 'metal',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 112),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 122, true),
        hihat: createSteps([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], 75),
      }
    },

    // D-Beat Pattern
    {
      id: 'metal-d-beat',
      name: 'D-Beat Discharge Style',
      genre: 'metal',
      bpm: 200,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 115),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 125, true),
        hihat: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 90),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },

    // Traditional Blast Beat (Single Stroke) - REMOVED DUPLICATE

    // Skank Beat (Proto-blast) - FIXED ID CONFLICT
    {
      id: 'metal-skank-proto-blast',
      name: 'Skank Beat (Proto-Blast)',
      genre: 'metal',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 115),
        snare: createSteps([false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true], 120, true),
        ride: createSteps([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], 90),
      }
    },

    // Economy Blast (Two-foot)
    {
      id: 'metal-economy-blast',
      name: 'Economy Blast (Two-Foot)',
      genre: 'metal',
      bpm: 250,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(true, 118, i % 4 === 0
        )),
        snare: createSteps([false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true], 127, true),
        ride: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 95),
      }
    },
  ],

  // === POST-HARDCORE PATTERNS ===
  'post-hardcore': [
    {
      id: 'posthc-fugazi-style',
      name: 'Fugazi Dynamic',
      genre: 'post-hardcore',
      bpm: 150,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, false, false, true, false, true, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true], 120, true),
        hihat: createSteps([true, true, false, true, false, true, true, false, true, true, false, true, false, true, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-drive-like-jehu',
      name: 'Drive Like Jehu Chaos',
      genre: 'post-hardcore',
      bpm: 160,
      steps: 15, // 15/8 time signature
      swing: 0,
      variations: 1,
      fills: Array(15).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, true, false, false, false, true, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, true, false, false, false, true], 120, true),
        hihat: createSteps([true, true, false, true, false, true, false, true, true, false, true, true, false, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-at-drive-in',
      name: 'At The Drive-In Energy',
      genre: 'post-hardcore',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, false, false, true, false, false, true, false, true, false, false, true, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, true, false, true, true, true, false, true, true, false, true, false, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true], 90),
      }
    },
    {
      id: 'posthc-experimental-odd',
      name: 'Experimental 7/4',
      genre: 'post-hardcore',
      bpm: 140,
      steps: 14,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, true, false, false, true, false, false, false, true], 110),
        snare: createSteps([false, false, false, true, false, false, false, false, true, false, false, true, false, false], 120, true),
        hihat: createSteps([true, false, true, false, true, true, false, true, false, true, true, false, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-emotional-build',
      name: 'Emotional Build-Up',
      genre: 'post-hardcore',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true], 85),
        crash: createSteps([false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false], 90),
      }
    },
    {
      id: 'posthc-math-rock',
      name: 'Math Rock Complexity',
      genre: 'post-hardcore',
      bpm: 135,
      steps: 13, // 13/8 time
      swing: 0,
      variations: 1,
      fills: Array(13).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false], 110),
        snare: createSteps([false, false, true, false, false, false, false, true, false, false, true, false, false], 120, true),
        hihat: createSteps([true, true, false, true, true, false, true, false, true, true, false, true, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-screamo-chaos',
      name: 'Screamo Chaos',
      genre: 'post-hardcore',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, true, false, false, true, false, true, false, true, true, false, false, true, false], 110),
        snare: createSteps([false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true], 120, true),
        hihat: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-emo-violence',
      name: 'Emo Violence',
      genre: 'post-hardcore',
      bpm: 200,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, true, false, true, false, true, true, false, true, true, false, true, false, true, true, false], 110),
        snare: createSteps([false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true], 120, true),
        hihat: createSteps([true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-quiet-loud',
      name: 'Quiet-Loud Dynamics',
      genre: 'post-hardcore',
      bpm: 155,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false], 85),
        crash: createSteps([false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, false, false, false, false, false, false, false, true, true, false, true, true, true, false, true], 90),
      }
    },
    {
      id: 'posthc-polyrhythmic',
      name: 'Polyrhythmic Experiment',
      genre: 'post-hardcore',
      bpm: 144,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true], 110),
        snare: createSteps([false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false], 120, true),
        hihat: createSteps([true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-dillinger-escape',
      name: 'Dillinger Escape Plan',
      genre: 'post-hardcore',
      bpm: 190,
      steps: 11, // 11/8 time
      swing: 0,
      variations: 1,
      fills: Array(11).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, false, true, false, true, false, false, true], 110),
        snare: createSteps([false, false, false, true, false, false, false, false, true, false, false], 120, true),
        hihat: createSteps([true, true, false, false, true, false, true, false, false, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-glassjaw-angular',
      name: 'Glassjaw Angular',
      genre: 'post-hardcore',
      bpm: 165,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 110),
        snare: createSteps([false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true], 120, true),
        hihat: createSteps([true, true, false, false, true, false, true, false, true, true, false, false, true, false, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        tom1: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 105, true),
      }
    },
    {
      id: 'posthc-thursday-melody',
      name: 'Thursday Melodic',
      genre: 'post-hardcore',
      bpm: 140,
      steps: 16,
      swing: 0.05,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, true, false, false, true, true, false, true, false, true, false, false, true, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 90),
      }
    },
    {
      id: 'posthc-saosin-technical',
      name: 'Saosin Technical',
      genre: 'post-hardcore',
      bpm: 175,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, true, false, true, false, true, false, true, true, true, false, true, false, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        tom1: createSteps([false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true], 105, true),
      }
    },
    {
      id: 'posthc-underoath-breakdown',
      name: 'Underoath Breakdown',
      genre: 'post-hardcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 85),
        crash: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 127, true),
        tom1: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 105, true),
        tom2: createSteps([false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true], 100, true),
      }
    },
    {
      id: 'posthc-alexisonfire-dual',
      name: 'Alexisonfire Dual Vocal',
      genre: 'post-hardcore',
      bpm: 150,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false], 110),
        snare: createSteps([false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false], 120, true),
        hihat: createSteps([true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 90),
      }
    },
    {
      id: 'posthc-dance-gavin-electronic',
      name: 'Dance Gavin Dance Electronic',
      genre: 'post-hardcore',
      bpm: 155,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true], 120, true),
        hihat: createSteps([true, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
      }
    },
    {
      id: 'posthc-circa-survive-ambient',
      name: 'Circa Survive Ambient',
      genre: 'post-hardcore',
      bpm: 125,
      steps: 16,
      swing: 0.08,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([true, false, false, true, false, false, false, true, false, false, true, false, false, false, true, false], 85),
        crash: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 127, true),
        ride: createSteps([false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false], 90),
      }
    },
    {
      id: 'posthc-poison-the-well-heavy',
      name: 'Poison The Well Heavy',
      genre: 'post-hardcore',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, true, false, false, true, false, true, false, true, true, false, false, true, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 85),
        crash: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 127, true),
        ride: createSteps([false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true], 90),
      }
    }
  ],

  metalcore: [
    {
      id: 'metalcore-basic',
      name: 'Metalcore Basic',
      genre: 'metalcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false], 115),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 125, true),
        hihat: createSteps([true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true], 80),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },

    // Modern Metalcore Chug
    {
      id: 'metalcore-chug',
      name: 'Modern Metalcore Chug',
      genre: 'metalcore',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false], 115),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 125, true),
        hihat: createSteps([true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true], 85),
        crash: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 127, true),
      }
    },

    // Breakdown Pattern
    {
      id: 'metalcore-breakdown',
      name: 'Metalcore Breakdown',
      genre: 'metalcore',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], 120),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 127, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 0),
        crash: createSteps([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], 127, true),
      }
    },

    // Double Bass Gallop
    {
      id: 'metalcore-gallop',
      name: 'Double Bass Gallop',
      genre: 'metalcore',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, true, true, false, false, true, false, true, false, true, true, false, false, true, false], 115),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 122, true),
        hihat: createSteps([true, true, false, false, true, true, false, true, true, true, false, false, true, true, false, true], 80),
      }
    },

    // Melodic Metalcore Verse
    {
      id: 'metalcore-melodic',
      name: 'Melodic Metalcore Verse',
      genre: 'metalcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 118, true),
        hihat: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 75),
        ride: createSteps([false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false], 85),
      }
    },

    // Progressive Metalcore 7/8
    {
      id: 'metalcore-prog-7-8',
      name: 'Progressive Metalcore 7/8',
      genre: 'metalcore',
      bpm: 150,
      steps: 14,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, true, false, true, false, false, true, false, true, false], 112),
        snare: createSteps([false, false, true, false, false, false, true, false, false, true, false, false, false, true], 120, true),
        hihat: createSteps([true, true, false, true, true, false, true, true, true, false, true, true, false, true], 80),
      }
    },
    // Additional Metalcore Patterns
    {
      id: 'metalcore-august-burns-red',
      name: 'August Burns Red Style',
      genre: 'metalcore',
      bpm: 190,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 6, 8, 10, 14].includes(i),
          velocity: 120,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 4 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-killswitch-engage',
      name: 'Killswitch Engage Groove',
      genre: 'metalcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 8, 11, 14].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 80, i % 8 === 0
        )),
        openhat: Array.from({ length: 16 }, (_, i) => ({
          active: [6, 14].includes(i),
          velocity: 100,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-as-i-lay-dying',
      name: 'As I Lay Dying Intensity',
      genre: 'metalcore',
      bpm: 200,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 4, 5, 8, 9, 12, 13].includes(i),
          velocity: 118,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 90, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metalcore-parkway-drive',
      name: 'Parkway Drive Rhythm',
      genre: 'metalcore',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 5, 8, 10, 13].includes(i),
          velocity: 122,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 85, i % 4 === 0
        )),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 110,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-architects-technical',
      name: 'Architects Technical',
      genre: 'metalcore',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 5, 7, 8, 10, 13, 15].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 6, 12, 14].includes(i),
          velocity: 120,
          accent: [4, 12].includes(i)
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 80, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-breakdown-chugga',
      name: 'Breakdown Chugga',
      genre: 'metalcore',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14].includes(i),
          velocity: 125,
          accent: [0, 4, 8, 12].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 127,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: ![4, 12].includes(i),
          velocity: 75,
          accent: false
        })),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-blast-melodic',
      name: 'Melodic Blast',
      genre: 'metalcore',
      bpm: 210,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 115, i % 8 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 1, 110, false
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 8 === 0
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 4, 8, 12].includes(i),
          velocity: 95,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-djent-polyrhythm',
      name: 'Djent Polyrhythm',
      genre: 'metalcore',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 7, 10, 12, 15].includes(i),
          velocity: 120,
          accent: [0, 12].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 115,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 3 === 0, 70, false
        )),
      }
    },
    {
      id: 'metalcore-killswitch-engage-groove',
      name: 'Killswitch Engage Groove',
      genre: 'metalcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 8, 11, 14].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 80, i % 8 === 0
        )),
        openhat: Array.from({ length: 16 }, (_, i) => ({
          active: [6, 14].includes(i),
          velocity: 100,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-as-i-lay-dying-intensity',
      name: 'As I Lay Dying Intensity',
      genre: 'metalcore',
      bpm: 200,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 4, 5, 8, 9, 12, 13].includes(i),
          velocity: 118,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 90, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => createStep(i === 0, 127, true
        )),
      }
    },
    {
      id: 'metalcore-parkway-drive-rhythm',
      name: 'Parkway Drive Rhythm',
      genre: 'metalcore',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 5, 8, 10, 13].includes(i),
          velocity: 122,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 85, i % 4 === 0
        )),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 110,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-architects-advanced',
      name: 'Architects Advanced',
      genre: 'metalcore',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 5, 7, 8, 10, 13, 15].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 6, 12, 14].includes(i),
          velocity: 120,
          accent: [4, 12].includes(i)
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 80, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-breakdown-chugga-heavy',
      name: 'Breakdown Chugga Heavy',
      genre: 'metalcore',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14].includes(i),
          velocity: 125,
          accent: [0, 4, 8, 12].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 127,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: ![4, 12].includes(i),
          velocity: 75,
          accent: false
        })),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-melodic-blast',
      name: 'Melodic Blast',
      genre: 'metalcore',
      bpm: 210,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 115, i % 8 === 0
        )),
        snare: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 1, 110, false
        )),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 8 === 0
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 4, 8, 12].includes(i),
          velocity: 95,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-djent-polyrhythm-advanced',
      name: 'Djent Polyrhythm Advanced',
      genre: 'metalcore',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 7, 10, 12, 15].includes(i),
          velocity: 120,
          accent: [0, 12].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [5, 13].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 4, 6, 9, 11, 14].includes(i),
          velocity: 80,
          accent: false
        })),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 8].includes(i),
          velocity: 110,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-all-that-remains',
      name: 'All That Remains Style',
      genre: 'metalcore',
      bpm: 175,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 6, 8, 10, 14].includes(i),
          velocity: 118,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 123,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 82, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-bullet-for-valentine',
      name: 'Bullet for My Valentine',
      genre: 'metalcore',
      bpm: 190,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 8, 11, 14].includes(i),
          velocity: 120,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 4 === 0
        )),
        tom2: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 105,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-unearth-groove',
      name: 'Unearth Groove',
      genre: 'metalcore',
      bpm: 165,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 5, 8, 10, 13].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 80, i % 8 === 0
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [7, 15].includes(i),
          velocity: 90,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-trivium-technical',
      name: 'Trivium Technical',
      genre: 'metalcore',
      bpm: 185,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 1, 4, 6, 8, 9, 12, 14].includes(i),
          velocity: 118,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 85, i % 4 === 0
        )),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [3, 11].includes(i),
          velocity: 110,
          accent: false
        })),
      }
    },
    {
      id: 'metalcore-shadows-fall',
      name: 'Shadows Fall Rhythm',
      genre: 'metalcore',
      bpm: 170,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 6, 8, 10, 14].includes(i),
          velocity: 117,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 122,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 83, i % 8 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    {
      id: 'metalcore-atreyu-melodic',
      name: 'Atreyu Melodic Core',
      genre: 'metalcore',
      bpm: 160,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 8, 11, 14].includes(i),
          velocity: 115,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 120,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 80, i % 8 === 0
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 5, 9, 13].includes(i),
          velocity: 85,
          accent: false
        })),
      }
    },
  ],

  jazz: [
    {
      id: 'jazz-swing-basic',
      name: 'Classic Swing',
      genre: 'jazz',
      bpm: 120,
      steps: 16,
      swing: 0.67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 85),
        ride: createSteps([true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true], 90),
      }
    },
    {
      id: 'jazz-bebop-complex',
      name: 'Bebop Complexity',
      genre: 'jazz',
      bpm: 180,
      steps: 16,
      swing: 0.67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true], 120, true),
        hihat: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 85),
        ride: createSteps([true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, false], 90),
      }
    },
    {
      id: 'jazz-latin-mambo',
      name: 'Latin Jazz Mambo',
      genre: 'jazz',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false], 110),
        snare: createSteps([false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false], 120, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 85),
        ride: createSteps([true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true], 90),
      }
    },
    {
      id: 'jazz-brushes-ballad',
      name: 'Brush Ballad',
      genre: 'jazz',
      bpm: 80,
      steps: 16,
      swing: 0.67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], 120, true),
        hihat: createSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 85),
        ride: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 90),
      }
    },
    {
      id: 'jazz-fusion-linear',
      name: 'Fusion Linear',
      genre: 'jazz',
      bpm: 130,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false], 110),
        snare: createSteps([false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], 120, true),
        hihat: createSteps([false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true], 85),
        ride: createSteps([false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false], 90),
      }
    },
    {
      id: 'jazz-elvin-jones',
      name: 'Elvin Jones Triplets',
      genre: 'jazz',
      bpm: 160,
      steps: 12, // Triplet feel
      swing: 0,
      variations: 1,
      fills: Array(12).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, true, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, true, false, false, false, false, false, true, false, false], 120, true),
        hihat: createSteps([false, false, true, false, false, true, false, false, true, false, false, true], 85),
        ride: createSteps([true, false, true, true, false, true, true, false, true, true, false, true], 90),
        tom1: createSteps([false, true, false, false, false, false, false, true, false, false, false, false], 105, true),
      }
    },
    {
      id: 'jazz-waltz-3-4',
      name: 'Jazz Waltz 3/4',
      genre: 'jazz',
      bpm: 140,
      steps: 12,
      swing: 0.67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, true, false, false, false, false, false], 110),
        snare: createSteps([false, false, false, true, false, false, false, false, false, true, false, false], 120, true),
        hihat: Array.from({ length: 12 }, (_, i) => ({
          active: [1, 4, 7, 10].includes(i),
          velocity: 70,
          accent: false
        })),
        ride: Array.from({ length: 12 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10].includes(i),
          velocity: 85,
          accent: i % 4 === 0
        })),
      }
    },
    {
      id: 'jazz-bebop-fast',
      name: 'Bebop Fast Swing',
      genre: 'jazz',
      bpm: 200,
      steps: 16,
      swing: 0.60,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 6, 8, 14].includes(i),
          velocity: 75,
          accent: false
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 85,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 5, 9, 13].includes(i),
          velocity: 65,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 80 + ([0, 8].includes(i) ? 10 : 0),
          accent: [0, 8].includes(i)
        })),
      }
    },
    {
      id: 'jazz-latin-montuno',
      name: 'Latin Jazz Montuno',
      genre: 'jazz',
      bpm: 180,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: createSteps([true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false], 90),
        snare: createSteps([false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false], 95, true),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 3, 5, 7, 9, 11, 13, 15].includes(i),
          velocity: 70,
          accent: false
        })),
        ride: createSteps([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], 85),
      }
    },
    {
      id: 'jazz-bossa-nova',
      name: 'Bossa Nova',
      genre: 'jazz',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 6, 8, 10, 14].includes(i),
          velocity: 120,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 125,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(true, 85, i % 4 === 0
        )),
        crash: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 127,
          accent: true
        })),
      }
    },
    // Additional Jazz Patterns
    {
      id: 'jazz-big-band-swing',
      name: 'Big Band Swing',
      genre: 'jazz',
      bpm: 140,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 100,
          accent: true
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 90,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 75,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 80 + ([0, 8].includes(i) ? 15 : 0),
          accent: [0, 8].includes(i)
        })),
      }
    },
    {
      id: 'jazz-bossa-nova-ballad',
      name: 'Bossa Nova Ballad',
      genre: 'jazz',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 6, 10].includes(i),
          velocity: 85,
          accent: i === 0
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [3, 7, 11, 15].includes(i),
          velocity: 70,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 65, false
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 75,
          accent: [0, 8].includes(i)
        })),
      }
    },
    {
      id: 'jazz-shuffle-blues',
      name: 'Shuffle Blues',
      genre: 'jazz',
      bpm: 110,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 95,
          accent: true
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 85,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 70,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 8, 10].includes(i),
          velocity: 80,
          accent: [0, 8].includes(i)
        })),
      }
    },
    {
      id: 'jazz-samba-latin',
      name: 'Samba Latin',
      genre: 'jazz',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 6, 10, 14].includes(i),
          velocity: 90,
          accent: [0, 10].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 4, 8, 12].includes(i),
          velocity: 80,
          accent: [4, 12].includes(i)
        })),
        hihat: Array.from({ length: 16 }, () => createStep(true, 65, false)),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 3, 5, 7, 9, 11, 13, 15].includes(i),
          velocity: 75,
          accent: false
        })),
      }
    },
    {
      id: 'jazz-bebop-uptempo',
      name: 'Bebop Uptempo',
      genre: 'jazz',
      bpm: 220,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 100,
          accent: true
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 95,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 80,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => createStep(true, 85 + (i % 4 === 0 ? 10 : 0), i % 4 === 0
        )),
      }
    },
    {
      id: 'jazz-cool-ballad',
      name: 'Cool Jazz Ballad',
      genre: 'jazz',
      bpm: 80,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 85,
          accent: false
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 75,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 60,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 70,
          accent: false
        })),
      }
    },
    {
      id: 'jazz-fusion-linear-complex',
      name: 'Jazz Fusion Linear',
      genre: 'jazz',
      bpm: 140,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 8, 11].includes(i),
          velocity: 100,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 95,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 5, 9, 13].includes(i),
          velocity: 80,
          accent: false
        })),
        tom1: Array.from({ length: 16 }, (_, i) => ({
          active: [6, 14].includes(i),
          velocity: 90,
          accent: false
        })),
      }
    },
    {
      id: 'jazz-afro-cuban',
      name: 'Afro-Cuban Jazz',
      genre: 'jazz',
      bpm: 150,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 6, 8, 14].includes(i),
          velocity: 95,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 4, 10, 12].includes(i),
          velocity: 85,
          accent: [4, 12].includes(i)
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 3, 5, 7, 9, 11, 13, 15].includes(i),
          velocity: 70,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 80,
          accent: [0, 8].includes(i)
        })),
      }
    },
    {
      id: 'jazz-polyrhythm-3over4',
      name: 'Jazz Polyrhythm 3/4',
      genre: 'jazz',
      bpm: 120,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 9, 12, 15].includes(i),
          velocity: 90,
          accent: [0, 6, 12].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 8].includes(i),
          velocity: 85,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 5, 8, 11, 14].includes(i),
          velocity: 75,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 4, 8, 12].includes(i),
          velocity: 80,
          accent: true
        })),
      }
    },
    {
      id: 'jazz-brushes-swing',
      name: 'Brushes Swing',
      genre: 'jazz',
      bpm: 100,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 75,
          accent: false
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 65,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 55,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 2, 4, 6, 8, 10, 12, 14].includes(i),
          velocity: 60,
          accent: false
        })),
      }
    },
    {
      id: 'jazz-fast-bebop',
      name: 'Fast Bebop',
      genre: 'jazz',
      bpm: 280,
      steps: 16,
      swing: 67,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 8].includes(i),
          velocity: 105,
          accent: true
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 100,
          accent: false
        })),
        hihat: Array.from({ length: 16 }, (_, i) => ({
          active: [2, 6, 10, 14].includes(i),
          velocity: 85,
          accent: false
        })),
        ride: Array.from({ length: 16 }, (_, i) => createStep(true, 90 + (i % 4 === 0 ? 15 : 0), i % 4 === 0
        )),
      }
    },
    // Additional Post-Hardcore Pattern
    {
      id: 'posthc-la-dispute-storytelling',
      name: 'La Dispute Storytelling',
      genre: 'post-hardcore',
      bpm: 130,
      steps: 16,
      swing: 0,
      variations: 1,
      fills: Array(16).fill(false),
      beats: {
        kick: Array.from({ length: 16 }, (_, i) => ({
          active: [0, 3, 6, 8, 11, 14].includes(i),
          velocity: 100,
          accent: [0, 8].includes(i)
        })),
        snare: Array.from({ length: 16 }, (_, i) => ({
          active: [4, 12].includes(i),
          velocity: 105,
          accent: true
        })),
        hihat: Array.from({ length: 16 }, (_, i) => createStep(i % 2 === 0, 75, i % 8 === 0
        )),
        ride: Array.from({ length: 16 }, (_, i) => ({
          active: [1, 5, 9, 13].includes(i),
          velocity: 80,
          accent: false
        })),
      }
    },
  ]
};
