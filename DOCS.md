# 🥁 Metal Drums - Professional Web Drum Machine

**Version 1.0.0** - Production Ready Release

A professional-grade drum machine web application built with React and TypeScript, featuring real drum samples, advanced performance controls, and musical notation rendering.

![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-Latest-646cff) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 **Features**

### **Core Drum Machine**
- 🎵 **Multi-Genre Support**: Metal, Post-Hardcore, Metalcore, Jazz (98 professional patterns)
- 🔊 **Real Audio Samples**: High-quality WAV recordings included
- 🎛️ **16-Step Sequencer**: Professional pattern programming interface
- ⚡ **Real-Time Performance**: Live drum triggering and pattern playback
- 🎚️ **BPM Control**: 60-300 BPM with smooth transitions

### **Advanced Performance**
- 🎯 **Probability System**: Dynamic pattern variations with master probability
- 🌪️ **Scatter Effect**: Adds organic timing variations for human feel
- 🎲 **Smart Randomization**: Intelligent pattern generation by drum groups
- 🥁 **Fill Patterns**: Automatic and manual fill generation
- 🎵 **Groove Controls**: Swing, humanization, velocity randomization

### **Professional Mixing & Effects**
- 🎛️ **Professional Mixer**: Per-drum volume, pan, mute, solo controls
- 🎚️ **Master Section**: Master volume with visual monitoring
- 🎸 **Effects Processor**: Reverb, delay, filter, distortion
- 🔧 **Advanced Effects**: Per-drum and master effect chains

### **Unique Features**
- 🎼 **Drum Notation Renderer**: Professional musical staff notation display
- ⌨️ **Keyboard Controls**: Live performance with QWERTY shortcuts
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI/UX**: Beautiful animations, gradients, and transitions

## 📊 **Pattern Library**

**98 Professional Patterns** across 4 genres:
- **Metal**: 30 patterns (120-210 BPM) - Heavy, aggressive, double-bass rhythms
- **Post-Hardcore**: 20 patterns (130-200 BPM) - Dynamic, emotional patterns
- **Metalcore**: 27 patterns (140-210 BPM) - Technical, breakdown-heavy
- **Jazz**: 21 patterns (80-280 BPM) - Swing, bebop, Latin rhythms

## 🎹 **Keyboard Shortcuts**

### **Drum Triggers** (Live Performance)
- `Q` - Kick Drum, `W` - Snare, `E` - Hi-Hat (Closed), `R` - Hi-Hat (Open)
- `T` - Crash, `Y` - Ride, `U` - High Tom, `I` - Mid Tom, `O` - Low Tom

### **Transport Controls**
- `SPACE` - Play/Pause, `S` - Stop, `R` - Record, `C` - Clear Pattern

### **Pattern Navigation**
- `←/→` - Previous/Next Pattern, `↑/↓` - Previous/Next Genre

### **Advanced Controls**
- `F` - Generate Fill, `G` - Toggle Groove, `M` - Mute All, `N` - Show Notation

## 🛠️ **Quick Start**

### **Installation**
```bash
# Clone the repository
git clone https://github.com/WithClarity/metal-drums.git
cd metal-drums

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Build for Production**
```bash
npm run build
npm run preview
```

## 🎨 **User Interface**

### **Main Components**
- **Sequencer**: 16-step grid with visual feedback and velocity controls
- **Transport**: Play, stop, record, BPM adjustment
- **Pattern Selector**: Genre and pattern navigation with search
- **Mixer**: Professional mixing console with effects
- **Notation**: Real-time drum staff notation display

### **Tabs System**
- **Sequencer**: Main pattern programming interface
- **Mixer**: Advanced audio mixing and effects
- **Notation**: Musical staff notation viewer
- **Shortcuts**: Keyboard reference guide

## 🔧 **Audio System**

### **Drum Kit**
- **Kick**: Deep, punchy low-end foundation
- **Snare**: Crisp, cutting mid-range punch
- **Hi-Hats**: Closed and open variations for rhythm
- **Toms**: High, mid, and low toms for fills
- **Cymbals**: Crash, ride, and splash for accents

### **Sample Quality**
- **Format**: 44.1kHz 16-bit WAV files
- **Sources**: Professional drum recordings
- **Processing**: Normalized and optimized for web playback
- **Latency**: Optimized for real-time performance

## 📱 **Responsive Design**

- **Desktop**: Full-featured interface with all controls
- **Tablet**: Touch-optimized with responsive layout
- **Mobile**: Simplified interface for core functionality
- **Progressive**: Enhanced features on capable devices

## 🎵 **Pattern Details**

### **Metal Genre**
Aggressive, heavy patterns with emphasis on kick drums and crash cymbals. BPM range 120-210.

### **Post-Hardcore Genre**
Dynamic patterns with emotional builds and breakdowns. BPM range 130-200.

### **Metalcore Genre**
Technical patterns with breakdowns and blast beats. BPM range 140-210.

### **Jazz Genre**
Swing patterns, bebop rhythms, and Latin grooves. BPM range 80-280.

## 🔄 **Version History**

### **v1.0.0** (Current)
- ✅ Complete drum machine with 98 patterns
- ✅ Professional mixer and effects processor
- ✅ Musical notation rendering system
- ✅ Advanced performance controls
- ✅ Keyboard shortcuts for live performance
- ✅ Responsive design for all devices
- ✅ Production-ready build system

## 🏗️ **Technical Stack**

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Audio**: Web Audio API for low-latency playback
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React icon library
- **Deployment**: Static build optimized for web

## 📄 **Project Structure**

```
src/
├── components/           # React components
│   ├── DrumMachineSequencer.tsx
│   ├── ProfessionalMixer.tsx
│   ├── DrumNotation.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useDrumMachine.ts
│   └── useKeyboardControls.ts
├── audio/               # Audio engine
│   └── drumEngine.ts
├── types/               # TypeScript definitions
│   └── drum.ts
└── assets/              # Audio samples
```

## 🚀 **Development**

### **Local Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Code Quality**
- TypeScript strict mode enabled
- ESLint configuration for React/TypeScript
- Consistent code formatting
- Component-based architecture

## 📞 **Support**

For issues, feature requests, or contributions, please visit the GitHub repository.

---

**Built with ❤️ for drummers and music producers worldwide**
