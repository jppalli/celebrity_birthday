# Object Hunter - Semantic Word Game

A modern HTML5 word guessing game where players discover hidden physical objects by guessing similar items and receiving similarity scores based on physical properties.

## 🎮 How to Play

1. The game selects a random physical object from its database
2. You guess other physical objects (apple, chair, bicycle, etc.)
3. Each guess receives a similarity score (0-100%) based on physical attributes
4. Use the visual property maps to understand relationships
5. Find the target object to win!

## 🚀 Features

- **Semantic Similarity**: Advanced scoring based on size, hardness, weight, temperature, material, category, and function
- **Visual Property Maps**: Interactive scatter plots showing physical relationships
- **Animations & Sound**: Smooth animations and audio feedback
- **Statistics Tracking**: Game stats with win rates and streaks
- **Hint System**: Get hints after 5 guesses (3 hints max per game)
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: React 18 (via CDN)
- **Styling**: Tailwind CSS + Custom CSS
- **Audio**: Web Audio API with fallback synthetic sounds
- **Storage**: LocalStorage for game statistics

## 📁 Project Structure

```
object-hunter/
├── index.html              # Main HTML file
├── js/
│   ├── main.js            # Game initialization
│   ├── gameData.js        # Word bank and physical attributes
│   ├── gameLogic.js       # Core game logic
│   ├── audioManager.js    # Sound management
│   ├── animationManager.js # Animation system
│   └── components/
│       ├── GameApp.jsx    # Main React component
│       ├── HintSystem.jsx # Hint functionality
│       ├── StatsModal.jsx # Statistics display
│       └── SettingsModal.jsx # Game settings
├── styles/
│   ├── main.css          # Main game styles
│   └── animations.css    # Animation definitions
├── assets/
│   └── sounds/           # Audio files (optional)
└── README.md
```

## 🎯 Game Mechanics

### Similarity Calculation
The game calculates similarity based on:
- **Physical Properties** (70%): Size, hardness, weight, temperature
- **Category Bonus** (25%): Same category (Food, Furniture, etc.)
- **Material Bonus** (15%): Same material (Wood, Metal, etc.)
- **Shape Bonus** (10%): Same shape (Round, Rectangle, etc.)
- **Location Bonus** (10%): Same typical location
- **Function Bonus** (15%): Same primary function

### Similarity Levels
- 🎯 **Perfect** (100%): Exact match
- 🔥 **Very Close** (80-99%): Very similar objects
- ♨️ **Getting Warm** (60-79%): Moderately similar
- 🌡️ **Somewhat Similar** (40-59%): Some similarities
- ❄️ **Distantly Related** (20-39%): Few similarities
- 🧊 **Very Different** (0-19%): Almost no similarities

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **Start playing!** No build process or server required

### Optional: Add Sound Files
Place audio files in `assets/sounds/`:
- `correct.mp3/wav` - Success sound
- `close.mp3/wav` - Close guess sound  
- `wrong.mp3/wav` - Wrong guess sound

## 🎨 Customization

### Adding New Objects
Edit `js/gameData.js` to add new objects to `WORD_BANK` and `PHYSICAL_ATTRIBUTES`.

### Styling
- Modify `styles/main.css` for visual changes
- Edit `styles/animations.css` for animation tweaks
- Tailwind classes can be customized in components

### Game Rules
Adjust similarity calculation in `js/gameLogic.js` `calculateSimilarity()` method.

## 🌐 Browser Compatibility

- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Features used**: ES6+, CSS Grid, Flexbox, Web Audio API
- **Mobile**: Responsive design works on iOS and Android

## 📱 Mobile Experience

The game is fully responsive and touch-friendly:
- Optimized input controls
- Readable text on small screens
- Touch-friendly buttons and interactions

## 🔧 Development

### Local Development
Simply open `index.html` in your browser. No build process needed!

### Production Deployment
Upload all files to any web server. The game is entirely client-side.

## 🎵 Audio System

The game includes a sophisticated audio system:
- **Automatic fallback** to synthetic sounds if audio files missing
- **Volume control** in settings
- **Sound toggle** for quiet environments
- **Web Audio API** for programmatic sound generation

## 📊 Statistics

Game tracks:
- Games played and won
- Win percentage
- Current and best win streaks
- Average guesses per game
- Best game (fewest guesses)

## 🎯 Future Enhancements

Potential improvements:
- More object categories (abstract concepts, actions)
- Multiplayer mode
- Daily challenges
- Achievement system
- Expanded word bank
- Difficulty levels
- Custom object sets

## 📄 License

This project is open source. Feel free to modify and distribute.

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional objects and attributes
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements
- Mobile experience refinements

---

**Enjoy hunting for objects!** 🎯