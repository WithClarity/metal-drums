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
- `Q` - Kick Drum
- `W` - Snare
- `E` - Hi-Hat (Closed)
- `R` - Hi-Hat (Open)
- `T` - Crash Cymbal
- `Y` - Ride Cymbal
- `U` - High Tom
- `I` - Mid Tom
- `O` - Low Tom

### **Transport Controls**
- `Space` - Play/Pause
- `Esc` - Stop
- `Del` - Clear Pattern

### **Advanced Controls**
- `Ctrl+R` - Randomize Pattern
- `Ctrl+S` - Apply Scatter Effect
- `Ctrl+C` - Copy Pattern
- `Ctrl+V` - Paste Pattern

## �️ **Installation & Setup**

## 📚 Documentation

- **[Complete Documentation](DOCS.md)** - Comprehensive guide covering development, deployment, and technical details
- **[Version History](CHANGELOG.md)** - Release notes and version information
- **[Audio Samples Guide](public/audio/samples/README.md)** - Information about drum samples

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Modern web browser with Web Audio API support

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/yourusername/metal-drums.git
cd metal-drums

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:5173
```

### **Build for Production**
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🥁 **Audio Samples Included**

This application comes with **high-quality drum samples** already included:
- **Professional recordings** optimized for each genre
- **Genre-specific sets** for authentic sound per style
- **44.1kHz WAV files** for pristine audio quality
- **Low-latency optimized** for real-time performance

No additional setup required - just install and play! 🎵

## 🏗️ Technology Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Web Audio API** for professional audio
- **Tailwind CSS** for modern styling

For detailed technical information, see [DOCS.md](DOCS.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Made with ❤️ for drummers and music producers**
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
