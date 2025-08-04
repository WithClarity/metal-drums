const fs = require('fs');

// Read the current types file
let content = fs.readFileSync('src/types/drum.ts', 'utf8');

console.log('Fixing pattern definitions...');

// Replace all Array.from patterns with createStep function calls
content = content.replace(/Array\.from\({ length: (\d+) }, \([^)]*\) => \(\{\s*active: ([^,]+),\s*velocity: ([^,]+),\s*accent: ([^}]+)\s*\}\)\)/g,
  'Array.from({ length: $1 }, (_, i) => createStep($2, $3, $4))');

// Replace specific patterns that might not match the above
content = content.replace(/Array\.from\({ length: (\d+) }, \(\) => \(\{\s*active: ([^,]+),\s*velocity: ([^,]+),\s*accent: ([^}]+)\s*\}\)\)/g,
  'Array.from({ length: $1 }, () => createStep($2, $3, $4))');

// Add missing properties to patterns that don't have them
content = content.replace(/(\{\s*id: '[^']+',\s*name: '[^']+',\s*genre: '[^']+',\s*bpm: \d+,\s*steps: \d+,\s*swing: [^,]+,)\s*beats:/g,
  '$1\n      variations: 1,\n      fills: Array(16).fill(false),\n      beats:');

// Special cases for patterns with different step counts
content = content.replace(/fills: Array\(16\)\.fill\(false\),\s*beats:\s*\{\s*([^}]+)\s*kick: Array\.from\({ length: (\d+) },/g,
  (match, p1, stepCount) => {
    return match.replace('Array(16).fill(false)', `Array(${stepCount}).fill(false)`);
  });

console.log('Pattern definitions fixed!');
fs.writeFileSync('src/types/drum.ts', content);
