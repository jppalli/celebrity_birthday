// main.js for Morpheus game

document.addEventListener('DOMContentLoaded', async () => {
    const sdk = await window.ArkadiumGameSDK.getInstance();
    // Enable debug logs if needed
    // sdk.debugMode(true);

    // DOM elements
    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');
    const todayChallenge = document.getElementById('today-challenge');
    const todayStart = document.getElementById('today-start');
    const todayTarget = document.getElementById('today-target');
    const todaySteps = document.getElementById('today-steps');
    const calendar = document.getElementById('calendar');
    const backBtn = document.getElementById('back-btn');
    const startWord = document.getElementById('start-word');
    const targetWord = document.getElementById('target-word');
    const challengeDate = document.getElementById('challenge-date');
    const gameGrid = document.getElementById('game-grid');
    const keyboardContainer = document.getElementById('keyboard');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const counterDotsContainer = document.getElementById('counter-dots');
    const hintPanel = document.getElementById('hint-panel');
    const hintText = document.getElementById('hint-text');
    const currentDateDisplay = document.getElementById('current-date');
    
    // Game challenges
    const challenges = {
        // Predefined challenges for the last 7 days
        '2023-10-01': {
            start: 'COLD',
            target: 'WARM',
            optimal: 5,
            validWords: ['COLD', 'CORD', 'CARD', 'WARD', 'WARP', 'WARM'],
            solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM']
        },
        '2023-10-02': {
            start: 'FISH',
            target: 'DUCK',
            optimal: 4,
            validWords: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK'],
            solution: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK']
        },
        '2023-10-03': {
            start: 'MOON',
            target: 'STAR',
            optimal: 5,
            validWords: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR'],
            solution: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR']
        },
        '2023-10-04': {
            start: 'LOVE',
            target: 'HATE',
            optimal: 3,
            validWords: ['LOVE', 'LAVE', 'LATE', 'HATE'],
            solution: ['LOVE', 'LAVE', 'LATE', 'HATE']
        },
        '2023-10-05': {
            start: 'FIRE',
            target: 'SNOW',
            optimal: 6,
            validWords: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW'],
            solution: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW']
        },
        '2023-10-06': {
            start: 'EAST',
            target: 'WEST',
            optimal: 3,
            validWords: ['EAST', 'PAST', 'PEST', 'WEST'],
            solution: ['EAST', 'PAST', 'PEST', 'WEST']
        },
        '2023-10-07': {
            start: 'CAKE',
            target: 'TART',
            optimal: 3,
            validWords: ['CAKE', 'CARE', 'TARE', 'TART'],
            solution: ['CAKE', 'CARE', 'TARE', 'TART']
        }
    };
    
    // Current date
    const today = new Date();
    const todayStr = formatDate(today);
    
    // Game state
    let currentChallenge = null;
    let gameState = {
        currentAttempt: 1,
        currentRow: 1,
        currentCell: 0,
        gameWon: false,
        gameOver: false,
        grid: []
    };
    
    // Initialize the game
    function initGame() {
        // Set current date
        currentDateDisplay.textContent = formatDateForDisplay(today);
        
        // Check if today's challenge exists, if not create one
        if (!challenges[todayStr]) {
            const keys = Object.keys(challenges);
            const randomChallenge = challenges[keys[Math.floor(Math.random() * keys.length)]];
            challenges[todayStr] = randomChallenge;
        }
        
        // Set today's challenge
        const todayChallengeData = challenges[todayStr];
        todayStart.textContent = todayChallengeData.start;
        todayTarget.textContent = todayChallengeData.target;
        todaySteps.textContent = todayChallengeData.optimal;
        
        // Create calendar
        createCalendar();
        
        // Set event listeners
        todayChallenge.addEventListener('click', () => loadChallenge(todayStr));
        backBtn.addEventListener('click', showMenu);
        submitBtn.addEventListener('click', submitAttempt);
        resetBtn.addEventListener('click', resetGame);
        hintBtn.addEventListener('click', showHint);
        
        // Keyboard event listener
        document.addEventListener('keydown', handleKeyPress);
    }
    
    // ... existing code ...
    // (The rest of the JavaScript from your <script> tag goes here, unchanged)
    // ... existing code ...

    // Initialize the game
    initGame();
    // Notify Arkadium SDK that the game is ready
    sdk.lifecycle.onTestReady();
}); 