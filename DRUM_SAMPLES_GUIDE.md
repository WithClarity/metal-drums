# How to Get High-Quality Drum Samples

The synthetic drum sounds aren't great! Here's how to get much better real drum samples:

## Quick Setup (Recommended)

### Option 1: 99Sounds (Best Quality)
1. Go to: https://99sounds.org/drum-samples/
2. Download "99 Drum Samples I" (free, requires email)
3. Extract the ZIP file
4. Copy these files to `public/audio/samples/`:
   - Any kick drum → rename to `kick.wav`
   - Any snare drum → rename to `snare.wav`
   - Any hi-hat (closed) → rename to `hihat.wav`
   - Any tom → rename to `tom.wav`
   - Any crash cymbal → rename to `crash.wav`
   - Any ride cymbal → rename to `ride.wav`

### Option 2: KB6 Samples (Largest Collection)
1. Go to: https://samples.kb6.de/downloads.php
2. Pick any drum machine you like (e.g., "Alesis SR-16", "Roland TR-808")
3. Download the drum set
4. Extract and copy 6 samples as described above

### Option 3: Freesound.org (Individual Samples)
1. Go to: https://freesound.org/browse/tags/drums/
2. Search for specific drums (e.g., "kick drum", "snare", "hi-hat")
3. Download individual samples
4. Convert to WAV if needed
5. Rename and copy to `public/audio/samples/`

## File Requirements
- **Format**: WAV (preferred) or MP3
- **Sample Rate**: 44.1kHz or 48kHz
- **Bit Depth**: 16-bit minimum, 24-bit preferred
- **Size**: Keep under 5MB per file for web loading
- **Names**: Must be exactly: `kick.wav`, `snare.wav`, `hihat.wav`, `tom.wav`, `crash.wav`, `ride.wav`

## Metal/Metalcore Recommendations
For the best metal sounds, look for:
- **Kick**: Punchy, deep kicks with good attack
- **Snare**: Crisp, cutting snares with good crack
- **Hi-hat**: Tight, metallic closed hi-hats
- **Tom**: Resonant floor or rack toms
- **Crash**: Bright, explosive crashes
- **Ride**: Clear bell tone with good sustain

## After Installing Samples
1. Restart the development server (`npm run dev`)
2. Refresh your browser
3. Test the drum pads - you should hear real drums!
4. Adjust volume in the app if needed

## Troubleshooting
- Check browser console for loading errors
- Ensure file names match exactly
- Verify files aren't corrupted
- Check that files are in the correct directory

The difference in sound quality will be night and day! 🥁
