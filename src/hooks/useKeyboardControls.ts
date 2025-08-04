import { useEffect, useCallback } from 'react';
import type { DrumType } from '../types/drum';

interface KeyboardControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onTriggerDrum: (drumType: DrumType) => void;
  onRandomize?: () => void;
  onScatter?: () => void;
  onClear?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
}

// Keyboard mappings for drum triggers
const DRUM_KEY_MAP: Record<string, DrumType> = {
  'q': 'kick',
  'w': 'snare',
  'e': 'hihat',
  'r': 'openhat',
  't': 'crash',
  'y': 'ride',
  'u': 'tom1',
  'i': 'tom2',
  'o': 'tom3',
};

// Transport control mappings
const TRANSPORT_KEY_MAP = {
  ' ': 'play/pause', // Spacebar
  'Escape': 'stop',
  'Delete': 'clear',
  'r': 'randomize', // With Ctrl
  's': 'scatter', // With Ctrl
  'c': 'copy', // With Ctrl
  'v': 'paste', // With Ctrl
};

export function useKeyboardControls({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onTriggerDrum,
  onRandomize,
  onScatter,
  onClear,
  onCopy,
  onPaste,
}: KeyboardControlsProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent keyboard shortcuts when typing in input fields
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }

    const key = event.key.toLowerCase();
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    // Handle transport controls
    if (key === ' ') { // Spacebar
      event.preventDefault();
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
      return;
    }

    if (key === 'escape') {
      event.preventDefault();
      onStop();
      return;
    }

    if (key === 'delete' || key === 'backspace') {
      event.preventDefault();
      onClear?.();
      return;
    }

    // Handle Ctrl+key combinations
    if (isCtrlPressed) {
      event.preventDefault();
      
      switch (key) {
        case 'r':
          onRandomize?.();
          break;
        case 's':
          onScatter?.();
          break;
        case 'c':
          onCopy?.();
          break;
        case 'v':
          onPaste?.();
          break;
      }
      return;
    }

    // Handle drum triggers
    const drumType = DRUM_KEY_MAP[key];
    if (drumType) {
      event.preventDefault();
      onTriggerDrum(drumType);
    }
  }, [isPlaying, onPlay, onPause, onStop, onTriggerDrum, onRandomize, onScatter, onClear, onCopy, onPaste]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Return the key mappings for display in UI
  return {
    drumKeys: DRUM_KEY_MAP,
    transportKeys: TRANSPORT_KEY_MAP,
  };
}
