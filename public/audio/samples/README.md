# Audio Samples Directory

High-quality drum samples for the Metal Drums application. The current Pearl Kit samples provide excellent sound quality for all genres.

## Quick Sample Upgrade (Optional)

### 99Sounds (Recommended)
**URL**: https://99sounds.org/drum-samples/
- **99 Drum Samples I**: Contains 99 individual drum samples including kicks, snares, hi-hats, crashes, rides, and toms
- **99 Drum Samples II**: Contains 110 additional drum samples with focus on kicks and snares
- **Quality**: Professional 24-bit WAV format
- **License**: Royalty-free
- **Perfect for**: Metal, electronic, and modern music production

### KB6 Samples
**URL**: https://samples.kb6.de/downloads.php
- **Content**: 332 drum sets with 36,070 WAV samples
- **Quality**: Various formats from classic drum machines and synthesizers
- **License**: Free to use
- **Perfect for**: Wide variety of genres including vintage and modern sounds

### Freesound.org
**URL**: https://freesound.org/browse/tags/drums/
- **Content**: User-uploaded drum samples and one-shots
- **Quality**: Varies (check sample rate and bit depth)
- **License**: Creative Commons (check individual licenses)
- **Perfect for**: Unique and experimental sounds

## Installation Instructions

### Step 1: Download Samples
1. Visit one of the recommended sources above
2. Download drum sample packs or individual samples
3. Look for these specific drum types:
   - **Kick drum** (bass drum) - Name it `kick.wav`
   - **Snare drum** - Name it `snare.wav`
   - **Hi-hat** (closed) - Name it `hihat.wav`
   - **Tom** (any tom) - Name it `tom.wav`
   - **Crash cymbal** - Name it `crash.wav`
   - **Ride cymbal** - Name it `ride.wav`

### Step 2: Prepare Samples
1. Ensure all samples are in WAV format (preferred) or MP3
2. Recommended specs: 44.1kHz or 48kHz sample rate, 16-bit or 24-bit
3. Trim samples to remove silence at the beginning
4. Keep file sizes reasonable (under 5MB each for web loading)

### Step 3: Replace Placeholder Files
1. Replace the placeholder files in this directory:
   ```
   public/audio/samples/kick.wav
   public/audio/samples/snare.wav
   public/audio/samples/hihat.wav
   public/audio/samples/tom.wav
   public/audio/samples/crash.wav
   public/audio/samples/ride.wav
   ```
2. Make sure the filenames match exactly
3. Restart the development server if it's running

### Step 4: Test the Samples
1. Open the app in your browser
2. Click on the drum pads or use the sequencer
3. You should hear your new drum samples instead of the synthetic sounds

## Specific Recommendations for Metal/Metalcore

For metal and metalcore genres, look for:
- **Kick**: Deep, punchy kicks with good low-end and click attack
- **Snare**: Crisp snares with good crack and presence
- **Hi-hat**: Tight, metallic hi-hats
- **Toms**: Resonant toms with good sustain
- **Crash**: Bright, explosive crash cymbals
- **Ride**: Defined bell sound with good sustain

## File Format Notes
- **WAV**: Best quality, larger file size
- **MP3**: Smaller file size, slightly compressed audio
- **Sample Rate**: 44.1kHz is standard for music
- **Bit Depth**: 16-bit is sufficient, 24-bit is higher quality

## Troubleshooting
- If samples don't load, check the browser console for errors
- Ensure file paths match exactly
- Check that files are not corrupted
- Verify the audio format is supported by web browsers

## License Compliance
Always check the license of any samples you download:
- **Creative Commons 0**: Free to use for any purpose
- **Attribution**: Free to use with credit required
- **Royalty-free**: Free to use in your projects
- Avoid samples marked "All Rights Reserved" unless you have permission
