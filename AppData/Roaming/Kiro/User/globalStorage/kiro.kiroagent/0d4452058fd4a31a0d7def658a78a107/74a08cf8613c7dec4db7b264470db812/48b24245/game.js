// Word Quest - Main Game Logic with Arkadium SDK Integration

class WordQuest {
    constructor() {
        this.targetWord = '';
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.guesses = [];
        this.keyboardState = {};
        this.stats = this.loadStats();
        
        // DOM elements
        this.statusMessage = document.getElementById('status-message');
        this.sdkStatus = document.getElementById('sdk-status');
        this.gameBoard = document.getElementById('game-board');
        this.keyboard = document.getElementById('keyboard');
        
        // Modals
        this.winModal = document.getElementById('win-modal');
        this.loseModal = document.getElementById('lose-modal');
        this.statsModal = document.getElementById('stats-modal');
        this.hintPanel = document.getElementById('hint-panel');
        
        // Initialize Arkadium SDK
        this.initializeSDK();
        
        // Initialize game
        this.init();
    }
    
    async initializeSDK() {
        try {
            this.updateSDKStatus('Checking for Arkadium SDK...');
            
            // Wait for SDK to be available
            let attempts = 0;
            while (!window.ArkadiumGameSDK && attempts < 20) {
                this.updateSDKStatus(`Waiting for SDK (${attempts + 1}/20)...`);
                await new Promise(resolve => setTimeout(resolve, 250));
                attempts++;
            }
            
            if (!window.ArkadiumGameSDK) {
                this.updateSDKStatus('SDK not found - running in standalone mode');
                console.warn('Arkadium SDK not available - game will run without SDK features');
                return;
            }
            
            this.updateSDKStatus('SDK found, initializing...');
            
            // Initialize SDK with proper configuration
            this.sdk = await window.ArkadiumGameSDK.getInstance({
                gameId: 'word-quest',
                version: '1.0.0',
                debug: true
            });
            
            this.updateSDKStatus(`SDK initialized successfully`);
            console.log('SDK instance:', this.sdk);
            
            // Enable debug mode if available
            if (this.sdk.setDebugMode) {
                this.sdk.setDebugMode(true);
                this.updateSDKStatus('Debug mode enabled');
            }
            
            // Signal game is loading
            this.updateSDKStatus('Sending onLoading signal...');
            if (this.sdk.lifecycle && this.sdk.lifecycle.onLoading) {
                this.sdk.lifecycle.onLoading();
                console.log('onLoading() called');
            }
            
            // Store SDK reference globally for sandbox access
            window.gameSDK = this.sdk;
            window.wordQuestGame = this;
            
            this.updateSDKStatus('SDK ready for sandbox testing');
            
        } catch (e) {
            this.updateSDKStatus(`SDK Error: ${e.message}`);
            console.error('SDK initialization error:', e);
            console.log('Game will continue without SDK features');
        }
    }
    
    updateSDKStatus(message) {
        if (this.sdkStatus) {
            this.sdkStatus.textContent = message;
        }
        console.log('SDK: ' + message);
    }
    
    updateStatus(message) {
        if (this.statusMessage) {
            this.statusMessage.textContent = message;
        }
        console.log(message);
    }
    
    async init() {
        this.updateStatus('Initializing Word Quest...');
        
        // Get today's word
        this.targetWord = getTodaysWord();
        console.log('Target word:', this.targetWord); // For debugging - remove in production
        
        // Create game board
        this.createGameBoard();
        
        // Create keyboard
        this.createKeyboard();
        
        // Add event listeners
        this.addEventListeners();
        
        // Update stats display
        this.updateStatsDisplay();
        
        // Wait for game to be fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateStatus('Guess today\'s 5-letter word!');
        
        // CRITICAL: Call onTestReady() to remove the loading overlay
        if (window.gameSDK && window.gameSDK.lifecycle && window.gameSDK.lifecycle.onTestReady) {
            this.updateSDKStatus('Game ready - calling onTestReady()...');
            window.gameSDK.lifecycle.onTestReady();
            this.updateSDKStatus('Game loaded successfully!');
        }
    }
    
    createGameBoard() {
        this.gameBoard.innerHTML = '';
        
        for (let row = 0; row < 6; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            rowElement.id = `row-${row}`;
            
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${row}-${col}`;
                rowElement.appendChild(cell);
            }
            
            this.gameBoard.appendChild(rowElement);
        }
    }
    
    createKeyboard() {
        const keyboardLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
        
        this.keyboard.innerHTML = '';
        
        keyboardLayout.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                keyElement.textContent = key === 'BACKSPACE' ? '⌫' : key;
                keyElement.dataset.key = key;
                
                if (key === 'ENTER' || key === 'BACKSPACE') {
                    keyElement.classList.add('wide');
                }
                
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                rowElement.appendChild(keyElement);
            });
            
            this.keyboard.appendChild(rowElement);
        });
    }
    
    addEventListeners() {
        // Physical keyboard
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const key = e.key.toUpperCase();
            
            if (key === 'ENTER') {
                this.handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                this.handleKeyPress('BACKSPACE');
            } else if (key.match(/[A-Z]/) && key.length === 1) {
                this.handleKeyPress(key);
            }
        });
        
        // Control buttons
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('stats-btn').addEventListener('click', () => this.showStats());
        
        // Modal buttons
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.hideModal(this.winModal);
            this.newGame();
        });
        
        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.hideModal(this.loseModal);
            this.newGame();
        });
        
        document.getElementById('close-stats-btn').addEventListener('click', () => {
            this.hideModal(this.statsModal);
        });
        
        document.getElementById('close-hint-btn').addEventListener('click', () => {
            this.hideHint();
        });
        
        // Close modals on background click
        [this.winModal, this.loseModal, this.statsModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });
    }
    
    handleKeyPress(key) {
        if (this.gameOver) return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol >= 5) return;
        
        const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
        cell.textContent = letter;
        cell.classList.add('filled');
        
        this.currentCol++;
    }
    
    deleteLetter() {
        if (this.currentCol <= 0) return;
        
        this.currentCol--;
        const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
        cell.textContent = '';
        cell.classList.remove('filled');
    }
    
    submitGuess() {
        if (this.currentCol !== 5) {
            this.showMessage('Not enough letters!');
            return;
        }
        
        // Get current guess
        const guess = this.getCurrentGuess();
        
        // Validate word
        if (!isValidWord(guess)) {
            this.showMessage('Not a valid word!');
            this.animateInvalidRow();
            return;
        }
        
        // Add to guesses
        this.guesses.push(guess);
        
        // Check letters and update display
        this.checkGuess(guess);
        
        // Check win condition
        if (guess === this.targetWord) {
            this.gameWon = true;
            this.gameOver = true;
            this.showWinModal();
            this.updateStats(true);
            return;
        }
        
        // Move to next row
        this.currentRow++;
        this.currentCol = 0;
        
        // Check lose condition
        if (this.currentRow >= 6) {
            this.gameOver = true;
            this.showLoseModal();
            this.updateStats(false);
            return;
        }
        
        this.updateStatus(`${6 - this.currentRow} guesses remaining`);
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < 5; col++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${col}`);
            guess += cell.textContent;
        }
        return guess;
    }
    
    checkGuess(guess) {
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');
        const letterCounts = {};
        
        // Count letters in target word
        targetLetters.forEach(letter => {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        });
        
        // First pass: mark correct positions
        const results = new Array(5).fill('absent');
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                results[i] = 'correct';
                letterCounts[guessLetters[i]]--;
            }
        }
        
        // Second pass: mark present letters
        for (let i = 0; i < 5; i++) {
            if (results[i] === 'absent' && letterCounts[guessLetters[i]] > 0) {
                results[i] = 'present';
                letterCounts[guessLetters[i]]--;
            }
        }
        
        // Update cells with animation
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const cell = document.getElementById(`cell-${this.currentRow}-${i}`);
                cell.classList.add('reveal', results[i]);
                
                // Update keyboard
                this.updateKeyboard(guessLetters[i], results[i]);
            }, i * 100);
        }
    }
    
    updateKeyboard(letter, state) {
        const keyElement = document.querySelector(`[data-key="${letter}"]`);
        if (!keyElement) return;
        
        const currentState = this.keyboardState[letter];
        
        // Don't downgrade from correct to present/absent
        if (currentState === 'correct') return;
        if (currentState === 'present' && state === 'absent') return;
        
        // Remove old state
        keyElement.classList.remove('correct', 'present', 'absent');
        
        // Add new state
        keyElement.classList.add(state);
        this.keyboardState[letter] = state;
    }
    
    animateInvalidRow() {
        for (let col = 0; col < 5; col++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${col}`);
            cell.style.animation = 'shake 0.5s';
            setTimeout(() => {
                cell.style.animation = '';
            }, 500);
        }
    }
    
    showMessage(text) {
        // Remove existing message
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'game-message';
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    showWinModal() {
        const attempts = this.currentRow + 1;
        document.getElementById('win-message').textContent = 
            `You guessed it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`;
        document.getElementById('word-reveal').textContent = this.targetWord;
        
        this.showModal(this.winModal);
        this.createConfetti();
        
        // Update status
        this.updateStatus('Congratulations! You won!');
    }
    
    showLoseModal() {
        document.getElementById('lose-word-reveal').textContent = this.targetWord;
        this.showModal(this.loseModal);
        
        // Update status
        this.updateStatus('Game over! Better luck next time.');
    }
    
    showStats() {
        this.updateStatsModal();
        this.showModal(this.statsModal);
    }
    
    showHint() {
        const hint = getWordHint(this.targetWord);
        document.getElementById('hint-text').textContent = hint;
        this.hintPanel.classList.add('show');
    }
    
    hideHint() {
        this.hintPanel.classList.remove('show');
    }
    
    showModal(modal) {
        modal.classList.add('show');
    }
    
    hideModal(modal) {
        modal.classList.remove('show');
    }
    
    createConfetti() {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                
                // Random size
                const size = Math.random() * 8 + 6;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                // Random color
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random rotation
                const rotation = Math.random() * 360;
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 20);
        }
    }
    
    newGame() {
        // Reset game state
        this.targetWord = getTodaysWord();
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.guesses = [];
        this.keyboardState = {};
        
        console.log('New target word:', this.targetWord); // For debugging
        
        // Clear board
        this.createGameBoard();
        
        // Reset keyboard
        this.createKeyboard();
        
        // Update status
        this.updateStatus('Guess today\'s 5-letter word!');
    }
    
    loadStats() {
        const defaultStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: [0, 0, 0, 0, 0, 0]
        };
        
        try {
            const saved = localStorage.getItem('wordquest-stats');
            return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
        } catch {
            return defaultStats;
        }
    }
    
    saveStats() {
        try {
            localStorage.setItem('wordquest-stats', JSON.stringify(this.stats));
        } catch (e) {
            console.error('Failed to save stats:', e);
        }
    }
    
    updateStats(won) {
        this.stats.gamesPlayed++;
        
        if (won) {
            this.stats.gamesWon++;
            this.stats.currentStreak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
            this.stats.guessDistribution[this.currentRow]++;
        } else {
            this.stats.currentStreak = 0;
        }
        
        this.saveStats();
        this.updateStatsDisplay();
    }
    
    updateStatsDisplay() {
        const winPercentage = this.stats.gamesPlayed > 0 
            ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) 
            : 0;
        
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('win-percentage').textContent = winPercentage;
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
    }
    
    updateStatsModal() {
        const winRate = this.stats.gamesPlayed > 0 
            ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) 
            : 0;
        
        document.getElementById('total-games').textContent = this.stats.gamesPlayed;
        document.getElementById('total-wins').textContent = this.stats.gamesWon;
        document.getElementById('win-rate').textContent = winRate + '%';
        document.getElementById('best-streak').textContent = this.stats.maxStreak;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wordQuest = new WordQuest();
});