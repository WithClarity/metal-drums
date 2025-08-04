# Copilot Instructions for Metal Drums Pattern Maker

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React TypeScript web application for creating drum patterns for metal, post-hardcore, metalcore, and jazz genres. The app features an interactive drum sequencer with audio playback capabilities.

## Key Technologies
- React with TypeScript
- Vite for build tooling
- Web Audio API for sound generation and playback
- CSS Modules or Tailwind CSS for styling

## Development Guidelines
- Use TypeScript strictly with proper type definitions
- Implement responsive design principles
- Focus on audio performance and low latency
- Create modular components for drum pads, sequencer, and pattern controls
- Use modern React patterns (hooks, context)
- Implement proper error handling for audio operations

## Audio Requirements
- Use Web Audio API for drum sample playback
- Support BPM adjustment (60-300 BPM)
- Implement swing/groove timing
- Handle multiple simultaneous audio tracks
- Provide visual feedback for beats and timing

## Drum Kit Components
- Kick drum, snare, hi-hat (open/closed), crash, ride, toms
- Genre-specific sample sets
- Volume and panning controls per drum
- Effects processing capabilities

## Pattern Features
- 16-step sequencer minimum
- Pattern length variation (8, 16, 32 steps)
- Pattern saving/loading
- Preset patterns for each genre
- Real-time pattern editing
- Copy/paste functionality
