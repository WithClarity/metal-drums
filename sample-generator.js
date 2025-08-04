/**
 * Basic Drum Sample Generator
 * Creates simple drum samples using synthetic waveforms
 * This provides basic functionality until users add real samples
 */

// Create a simple kick drum sample (sine wave with envelope)
function createKickSample() {
  const sampleRate = 44100;
  const duration = 1.0;
  const samples = sampleRate * duration;
  const buffer = new Float32Array(samples);
  
  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    
    // Sine wave starting at 60Hz, dropping to 40Hz
    const frequency = 60 - (20 * time);
    const sine = Math.sin(2 * Math.PI * frequency * time);
    
    // Exponential decay envelope
    const envelope = Math.exp(-5 * time);
    
    buffer[i] = sine * envelope * 0.8;
  }
  
  return buffer;
}

// Create a simple snare sample (noise with envelope)
function createSnareSample() {
  const sampleRate = 44100;
  const duration = 0.2;
  const samples = sampleRate * duration;
  const buffer = new Float32Array(samples);
  
  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    
    // White noise
    const noise = (Math.random() * 2 - 1);
    
    // Quick decay envelope
    const envelope = Math.exp(-10 * time);
    
    buffer[i] = noise * envelope * 0.6;
  }
  
  return buffer;
}

// Create a simple hi-hat sample (filtered noise)
function createHihatSample() {
  const sampleRate = 44100;
  const duration = 0.1;
  const samples = sampleRate * duration;
  const buffer = new Float32Array(samples);
  
  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    
    // High-frequency noise
    const noise = (Math.random() * 2 - 1);
    
    // Very quick decay
    const envelope = Math.exp(-20 * time);
    
    buffer[i] = noise * envelope * 0.4;
  }
  
  return buffer;
}

// Export for use (this is just documentation - actual generation would need proper audio encoding)
console.log('Sample generator ready - use Web Audio API to create WAV files');
