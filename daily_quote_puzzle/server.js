const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes (needed for Arkadium sandbox)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files
app.use(express.static('.'));

// Main route - serve the game
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'daily_quote_challenge.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        game: 'Daily Quote Puzzle',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎮 Daily Quote Puzzle Server running at:`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://127.0.0.1:${PORT}`);
    console.log('');
    console.log('🔧 Ready for Arkadium sandbox testing!');
    console.log('📝 Game file: daily_quote_puzzle.html');
});