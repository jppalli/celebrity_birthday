# Sound Assets

This folder contains audio files for the Object Hunter game.

## Required Files:
- `correct.mp3` / `correct.wav` - Success sound when guessing correctly
- `close.mp3` / `close.wav` - Sound when guess is close (60%+ similarity)
- `wrong.mp3` / `wrong.wav` - Sound when guess is far from target

## Notes:
- The game will work without these files using synthetic Web Audio API sounds
- For best compatibility, provide both MP3 and WAV formats
- Keep file sizes small for faster loading
- Recommended duration: 0.5-1.5 seconds per sound