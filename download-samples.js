#!/usr/bin/env node

/**
 * Drum Sample Downloader
 *
 * This script downloads royalty-free drum samples from various sources
 * and places them in the correct directory for the Metal Drums app.
 *
 * Usage: node download-samples.js
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample URLs (using Freesound.org public samples)
const SAMPLE_URLS = {
  // These are example URLs - users will need to get actual sample URLs
  kick: 'https://freesound.org/data/previews/316/316847_4988916-lq.mp3',
  snare: 'https://freesound.org/data/previews/316/316869_4988916-lq.mp3',
  hihat: 'https://freesound.org/data/previews/316/316825_4988916-lq.mp3',
  tom: 'https://freesound.org/data/previews/316/316840_4988916-lq.mp3',
  crash: 'https://freesound.org/data/previews/316/316822_4988916-lq.mp3',
  ride: 'https://freesound.org/data/previews/316/316866_4988916-lq.mp3'
};

const SAMPLE_DIR = path.join(__dirname, 'public', 'audio', 'samples');

// Ensure directory exists
if (!fs.existsSync(SAMPLE_DIR)) {
  fs.mkdirSync(SAMPLE_DIR, { recursive: true });
}

console.log('🥁 Metal Drums Sample Downloader');
console.log('================================');
console.log('');
console.log('⚠️  NOTE: This script uses example preview URLs from Freesound.');
console.log('   For better quality, download full samples manually from:');
console.log('   • https://99sounds.org/drum-samples/');
console.log('   • https://freesound.org/browse/tags/drums/');
console.log('   • https://samples.kb6.de/downloads.php');
console.log('');

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https://') ? https : http;
    const filepath = path.join(SAMPLE_DIR, filename);

    console.log(`Downloading ${filename}...`);

    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded ${filename}`);
          resolve();
        });

        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      } else {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllSamples() {
  console.log('Starting downloads...');

  for (const [drumType, url] of Object.entries(SAMPLE_URLS)) {
    try {
      // Convert to .wav extension (though files will still be mp3)
      const filename = `${drumType}.wav`;
      await downloadFile(url, filename);
    } catch (error) {
      console.error(`❌ Failed to download ${drumType}:`, error.message);
    }
  }

  console.log('');
  console.log('🎉 Download complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Restart your development server');
  console.log('2. Test the drum sounds in the app');
  console.log('3. For higher quality samples, replace files manually');
  console.log('4. See public/audio/samples/README.md for more info');
}

// Run the downloader
downloadAllSamples().catch(console.error);
