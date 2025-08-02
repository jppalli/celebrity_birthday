# Daily Quote Puzzle Game

A modern, interactive word puzzle game where players unscramble inspirational quotes one word at a time. Built with vanilla JavaScript, HTML5, and CSS3.

## 🎮 Features

- **Daily Challenges**: New inspirational quotes every day
- **Word-by-Word Unscrambling**: Solve words individually with interactive letter selection
- **Author Puzzles**: Don't forget to unscramble the author's name too!
- **Sound Effects**: Immersive audio feedback for all interactions
- **Background Music**: Ambient background music that starts automatically
- **Progress Tracking**: Calendar view of past challenges and completion stats
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Cooldown System**: Unscramble feature with 60-second cooldown and visual timer
- **Modern UI**: Clean, newspaper-style interface with smooth animations

## 🚀 Live Demo

Play the game at: [https://yourusername.github.io/dailyquote_cursor](https://yourusername.github.io/dailyquote_cursor)

## 🎯 How to Play

1. **Click on scrambled words** to start unscrambling them
2. **Click letters** or **type on keyboard** to spell the word
3. **Use Backspace** to remove letters and **Reset** to clear
4. **Unscramble the author's name** at the bottom
5. **Use the Unscramble hint** (60-second cooldown) if you get stuck

## 📁 Project Structure

```
dailyquote_cursor/
├── index.html                 # Homepage with game menu
├── daily_quote_puzzle_modern.html  # Main game interface
├── game-modern.js            # Core game logic and mechanics
├── quotes_calendar.js        # Daily quotes and calendar data
├── sounds/                   # Audio files for sound effects
│   ├── background-music.mp3
│   ├── keytype.mp3
│   ├── word-complete.mp3
│   ├── author-complete.mp3
│   ├── quote-complete.mp3
│   ├── reset.mp3
│   └── backspace.mp3
└── README.md                 # This file
```

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Responsive design with Flexbox and Grid
- **Vanilla JavaScript**: ES6+ features, no frameworks required
- **Web Audio API**: Dynamic sound generation and playback
- **Local Storage**: Save game progress and settings locally

### Key Features
- **Audio Context Management**: Handles browser autoplay restrictions
- **Cooldown System**: Visual timer for unscramble feature
- **Calendar Integration**: Browse and play past challenges
- **Statistics Tracking**: Track completion rates and streaks
- **Responsive Design**: Mobile-first approach with touch support

## 🎵 Audio Features

- **Background Music**: Loops continuously during gameplay
- **Sound Effects**: Typing, word completion, author completion, and more
- **Audio Settings**: Toggle sound effects and background music
- **Browser Compatibility**: Handles autoplay restrictions gracefully

## 📱 Mobile Support

- **Touch Controls**: Full touch support for mobile devices
- **Responsive Layout**: Adapts to different screen sizes
- **Hamburger Menu**: Mobile-friendly navigation
- **Touch-Optimized**: Large touch targets and intuitive gestures

## 🔧 Setup for Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/dailyquote_cursor.git
   cd dailyquote_cursor
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

3. **No build process required** - it's pure HTML/CSS/JavaScript!

## 🌐 GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

2. **Your site will be available at**:
   `https://yourusername.github.io/dailyquote_cursor`

## 📊 Game Statistics

The game tracks:
- **Total puzzles solved**
- **Current streak**
- **Success rate**
- **Average completion time**
- **Daily completion status**

## 🎨 Design Philosophy

- **Newspaper Aesthetic**: Clean, readable typography with grid backgrounds
- **Vintage Typewriter**: Special Elite font for authentic feel
- **Smooth Animations**: Subtle transitions and feedback
- **Accessibility**: High contrast and clear visual hierarchy

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Fonts**: Special Elite from Google Fonts
- **Icons**: Font Awesome 6
- **Audio**: Custom sound effects and background music
- **Inspiration**: Classic word puzzles and daily challenges

---

**Enjoy unscrambling daily quotes and challenging your mind!** 🧩✨ 