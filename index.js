#!/usr/bin/env node

/**
 * ASCII Art Generator
 * A fun project by OpenClaw
 */

const readline = require('readline');

// Predefined ASCII art templates
const ART_TEMPLATES = {
  heart: `
   ♥♥♥     ♥♥♥
 ♥♥♥♥♥   ♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 ♥♥♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥
    ♥♥♥♥♥♥♥♥
      ♥♥♥♥
       ♥
`,

  smile: `
   .--""--.
  /        \\
 |  __ __ \\_
 |  /  \\  \\ |
 | |  O  | |
 | |  _/  | |
 | \\ \\__/  /
  '------' 
`,

  star: `
        .
     ,  |  .
   ,* |  |  .
  /|\\_|_/\\ | .
 / |       |\\|
|  |       | |
 \\ \\      / /
  '--'--'--' 
`,

  rocket: `
      ^ 
     / \\
    /   \\
   /     \\
  /  ____ \\
 |  /    \\ |
 | |      | |
 | |  ____| |
 | | |    | |
  \\ \\|____| |
   \\       /
    '-----' 
`,

  coffee: `
       (
        )
     (
      )
 ___/__\\___________
/                  \\
|  |  |  |  |   |
|  |  |  |  |___|
|  |  |  |  |
 \\__|__|__|__|  
`,

  cat: `
      /\\_/\\
    ( o.o )
     > ^ <
    /|   |\\
   (_|   |_)
`
};

// Banner
const BANNER = `
╔══════════════════════════════════════╗
║     🎨 ASCII Art Generator by OpenClaw    ║
║                                        ║
║  Type 'help' for available art           ║
║  Type 'list' to see all styles       ║
║  Type 'exit' to quit                  ║
╚══════════════════════════════════════╝
`;

// Color codes
const COLORS = {
  reset: '\\x1b[0m',
  bright: '\\x1b[1m',
  red: '\\x1b[31m',
  green: '\\x1b[32m',
  yellow: '\\x1b[33m',
  blue: '\\x1b[34m',
  magenta: '\\x1b[35m',
  cyan: '\\x1b[36m',
};

function color(text, colorName) {
  return `${COLORS[colorName]}${text}${COLORS.reset}`;
}

function showBanner() {
  console.log(color(BANNER, 'cyan'));
}

function showHelp() {
  console.log(color('\\n📖 Available Commands:', 'bright'));
  console.log('  • help     - Show this help message');
  console.log('  • list     - List all available art styles');
  console.log('  • <style>  - Generate specific art (e.g., "heart", "smile", "star", "rocket", "coffee", "cat")');
  console.log('  • random   - Generate random art');
  console.log('  • exit     - Quit the program');
  console.log('');
}

function showList() {
  console.log(color('\\n🎨 Available Art Styles:', 'bright'));
  Object.keys(ART_TEMPLATES).forEach((key, index) => {
    console.log(`  ${index + 1}. ${key}`);
  });
  console.log('');
}

function generateArt(style) {
  const art = ART_TEMPLATES[style.toLowerCase()];

  if (!art) {
    console.log(color(`❌ Style "${style}" not found. Type 'list' to see available styles.`, 'red'));
    return;
  }

  console.log('');
  console.log(color(art.trim(), 'magenta'));
  console.log('');
  console.log(color(`Generated: ${style}`, 'green'));
  console.log(color('Tip: Copy and paste anywhere! 📋', 'yellow'));
}

function generateRandom() {
  const styles = Object.keys(ART_TEMPLATES);
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  generateArt(randomStyle);
}

// Create readline interface for interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt() {
  rl.question(color('\\n🎨 Enter art style (or command): ', 'yellow'), (input) => {
    input = input.trim().toLowerCase();

    if (!input) {
      prompt();
      return;
    }

    if (input === 'exit' || input === 'quit') {
      console.log(color('\\n👋 Goodbye! Thanks for using ASCII Art Generator!', 'green'));
      rl.close();
      return;
    }

    if (input === 'help') {
      showHelp();
    } else if (input === 'list') {
      showList();
    } else if (input === 'random') {
      generateRandom();
    } else {
      generateArt(input);
    }

    prompt();
  });
}

// Check if input is piped or interactive
if (process.stdin.isTTY) {
  showBanner();
  console.log(color('\\n🚀 Ready to generate some ASCII art!', 'bright'));
  console.log('');
  prompt();
} else {
  // Pipe mode: read from stdin
  let input = '';
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    input = input.trim().toLowerCase();
    if (input === 'random') {
      generateRandom();
    } else {
      generateArt(input);
    }
  });
}
