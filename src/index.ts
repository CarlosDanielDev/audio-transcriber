const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`audio-transcriber - Transcribe audio files using local Whisper

Usage:
  audio-transcriber <file> [options]

Options:
  -h, --help     Show this help message
  -v, --version  Show version number`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("0.1.0");
  process.exit(0);
}

console.log("audio-transcriber: no input file specified. Use --help for usage.");
process.exit(1);
