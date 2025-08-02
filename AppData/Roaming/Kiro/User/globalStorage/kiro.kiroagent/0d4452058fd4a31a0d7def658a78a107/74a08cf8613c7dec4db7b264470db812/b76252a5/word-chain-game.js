// Word Chain - Daily Challenge Game with Arkadium SDK Integration

class WordChainGame {
    constructor() {
        this.currentWord = [];
        this.foundWords = [];
        this.availableLetters = [];
        this.score = 0;
        this.streak = 0;
        this.maxWordLength = 8;
        this.targetWordsCount = 10;
        this.gameComplete = false;
        
        // Daily challenge letters (changes based on date)
        this.dailyLetters = this.getDailyLetters();
        
        // DOM elements
        this.statusMessage = document.getElementById('status-message');
        this.sdkStatus = document.getElementById('sdk-status');
        this.wordChain = document.getElementById('word-chain');
        this.currentWordEl = document.getElementById('current-word');
        this.availableLettersEl = document.getElementById('available-letters');
        this.scoreEl = document.getElementById('score');
        this.wordsFoundEl = document.getElementById('words-found');
        this.streakEl = document.getElementById('streak');
        this.targetInfo = document.getElementById('target-info');
        this.progressInfo = document.getElementById('progress-info');
        
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
            
            // Initialize SDK
            this.sdk = await window.ArkadiumGameSDK.getInstance({
                gameId: 'word-chain',
                version: '1.0.0',
                debug: true
            });
            
            this.updateSDKStatus('SDK initialized successfully');
            
            // Enable debug mode if available
            if (this.sdk.setDebugMode) {
                this.sdk.setDebugMode(true);
            }
            
            // Signal game is loading
            if (this.sdk.lifecycle && this.sdk.lifecycle.onLoading) {
                this.sdk.lifecycle.onLoading();
            }
            
            // Store SDK reference globally
            window.gameSDK = this.sdk;
            window.wordChainGame = this;
            
            this.updateSDKStatus('SDK ready for sandbox testing');
            
        } catch (e) {
            this.updateSDKStatus(`SDK Error: ${e.message}`);
            console.error('SDK initialization error:', e);
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
    }
    
    getDailyLetters() {
        // Generate daily letters based on current date
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        
        // Predefined letter sets for different days
        const letterSets = [
            ['A', 'E', 'R', 'T', 'S', 'N', 'I', 'O'],
            ['L', 'A', 'N', 'D', 'E', 'R', 'S', 'T'],
            ['C', 'H', 'A', 'I', 'R', 'S', 'E', 'T'],
            ['P', 'L', 'A', 'N', 'T', 'E', 'R', 'S'],
            ['W', 'A', 'T', 'E', 'R', 'S', 'H', 'I'],
            ['F', 'L', 'O', 'W', 'E', 'R', 'S', 'T'],
            ['G', 'A', 'R', 'D', 'E', 'N', 'S', 'T']
        ];
        
        return letterSets[dayOfYear % letterSets.length];
    }
    
    async init() {
        this.updateStatus('Initializing Word Chain...');
        
        // Set up available letters
        this.availableLetters = [...this.dailyLetters];
        
        // Create UI
        this.createCurrentWordSlots();
        this.createAvailableLetters();
        this.addEventListeners();
        this.updateDisplay();
        
        // Clear initial placeholder
        this.wordChain.innerHTML = '';
        
        // Wait for game to be fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateStatus('Find words using the letters below!');
        
        // Signal game ready
        if (this.sdk && this.sdk.lifecycle && this.sdk.lifecycle.onTestReady) {
            this.updateSDKStatus('Game ready - calling onTestReady()...');
            this.sdk.lifecycle.onTestReady();
            this.updateSDKStatus('Game loaded successfully!');
        }
    }
    
    createCurrentWordSlots() {
        this.currentWordEl.innerHTML = '';
        for (let i = 0; i < this.maxWordLength; i++) {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            slot.dataset.index = i;
            this.currentWordEl.appendChild(slot);
        }
    }
    
    createAvailableLetters() {
        this.availableLettersEl.innerHTML = '';
        this.availableLetters.forEach((letter, index) => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            btn.dataset.letter = letter;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.addLetter(letter, index));
            this.availableLettersEl.appendChild(btn);
        });
    }
    
    addEventListeners() {
        document.getElementById('clear-btn').addEventListener('click', () => this.clearCurrentWord());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitWord());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.gameComplete) return;
            
            const key = e.key.toUpperCase();
            if (key === 'ENTER') {
                this.submitWord();
            } else if (key === 'BACKSPACE') {
                this.removeLastLetter();
            } else if (key.match(/[A-Z]/) && key.length === 1) {
                const availableIndex = this.availableLetters.findIndex(letter => letter === key);
                if (availableIndex !== -1) {
                    this.addLetter(key, availableIndex);
                }
            }
        });
    }
    
    addLetter(letter, index) {
        if (this.currentWord.length >= this.maxWordLength) return;
        
        // Add letter to current word
        this.currentWord.push({ letter, originalIndex: index });
        
        // Remove from available letters
        this.availableLetters.splice(index, 1);
        
        // Update display
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    removeLastLetter() {
        if (this.currentWord.length === 0) return;
        
        const lastLetter = this.currentWord.pop();
        
        // Add back to available letters in original position
        this.availableLetters.splice(lastLetter.originalIndex, 0, lastLetter.letter);
        this.availableLetters.sort();
        
        // Update display
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    clearCurrentWord() {
        // Return all letters to available
        this.currentWord.forEach(item => {
            this.availableLetters.push(item.letter);
        });
        this.availableLetters.sort();
        
        this.currentWord = [];
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    updateCurrentWordDisplay() {
        const slots = this.currentWordEl.querySelectorAll('.letter-slot');
        slots.forEach((slot, index) => {
            if (index < this.currentWord.length) {
                slot.textContent = this.currentWord[index].letter;
                slot.classList.add('filled');
                slot.classList.remove('active');
            } else if (index === this.currentWord.length) {
                slot.textContent = '';
                slot.classList.remove('filled');
                slot.classList.add('active');
            } else {
                slot.textContent = '';
                slot.classList.remove('filled', 'active');
            }
        });
    }
    
    submitWord() {
        if (this.currentWord.length < 3) {
            this.showMessage('Words must be at least 3 letters long!');
            return;
        }
        
        const word = this.currentWord.map(item => item.letter).join('');
        
        // Check if word already found
        if (this.foundWords.includes(word)) {
            this.showMessage('Word already found!');
            return;
        }
        
        // Check if valid word (simplified validation)
        if (this.isValidWord(word)) {
            this.addFoundWord(word);
            this.clearCurrentWord();
            this.updateScore(word);
            this.checkGameComplete();
        } else {
            this.showMessage('Not a valid word!');
            this.animateInvalidWord();
        }
    }
    
    isValidWord(word) {
        // Simplified word validation - in a real game, you'd use a dictionary
        const validWords = [
            'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE', 'OUR',
            'HAD', 'BY', 'WORD', 'WHAT', 'SAID', 'EACH', 'WHICH', 'SHE', 'DO', 'HOW', 'THEIR', 'IF',
            'WILL', 'UP', 'OTHER', 'ABOUT', 'OUT', 'MANY', 'THEN', 'THEM', 'THESE', 'SO', 'SOME', 'HER',
            'WOULD', 'MAKE', 'LIKE', 'INTO', 'HIM', 'HAS', 'TWO', 'MORE', 'GO', 'NO', 'WAY', 'COULD',
            'MY', 'THAN', 'FIRST', 'BEEN', 'CALL', 'WHO', 'OIL', 'SIT', 'NOW', 'FIND', 'LONG', 'DOWN',
            'DAY', 'DID', 'GET', 'COME', 'MADE', 'MAY', 'PART', 'OVER', 'NEW', 'SOUND', 'TAKE', 'ONLY',
            'LITTLE', 'WORK', 'KNOW', 'PLACE', 'YEAR', 'LIVE', 'ME', 'BACK', 'GIVE', 'MOST', 'VERY',
            'AFTER', 'THING', 'NAME', 'GOOD', 'SENTENCE', 'MAN', 'THINK', 'SAY', 'GREAT', 'WHERE',
            'HELP', 'THROUGH', 'MUCH', 'BEFORE', 'LINE', 'RIGHT', 'TOO', 'MEAN', 'OLD', 'ANY', 'SAME',
            'TELL', 'BOY', 'FOLLOW', 'CAME', 'WANT', 'SHOW', 'ALSO', 'AROUND', 'FORM', 'THREE', 'SMALL',
            'SET', 'PUT', 'END', 'WHY', 'AGAIN', 'TURN', 'HERE', 'OFF', 'WENT', 'OLD', 'NUMBER', 'GREAT',
            'TELL', 'MEN', 'SAY', 'SMALL', 'EVERY', 'FOUND', 'STILL', 'BETWEEN', 'MANE', 'SHOULD', 'HOME',
            'BIG', 'GIVE', 'AIR', 'LINE', 'SET', 'OWN', 'UNDER', 'READ', 'LAST', 'NEVER', 'US', 'LEFT',
            'END', 'ALONG', 'WHILE', 'MIGHT', 'NEXT', 'SOUND', 'BELOW', 'SAW', 'SOMETHING', 'THOUGHT',
            'BOTH', 'FEW', 'THOSE', 'ALWAYS', 'LOOKED', 'SHOW', 'LARGE', 'OFTEN', 'TOGETHER', 'ASKED',
            'HOUSE', 'DONT', 'WORLD', 'GOING', 'WANT', 'SCHOOL', 'IMPORTANT', 'UNTIL', 'FORM', 'FOOD',
            'KEEP', 'CHILDREN', 'FEET', 'LAND', 'SIDE', 'WITHOUT', 'BOY', 'ONCE', 'ANIMAL', 'LIFE',
            'ENOUGH', 'TOOK', 'SOMETIMES', 'FOUR', 'HEAD', 'ABOVE', 'KIND', 'BEGAN', 'ALMOST', 'LIVE',
            'PAGE', 'GOT', 'EARTH', 'NEED', 'FAR', 'HAND', 'HIGH', 'YEAR', 'MOTHER', 'LIGHT', 'COUNTRY',
            'FATHER', 'LET', 'NIGHT', 'PICTURE', 'BEING', 'STUDY', 'SECOND', 'SOON', 'STORY', 'SINCE',
            'WHITE', 'EVER', 'PAPER', 'HARD', 'NEAR', 'SENTENCE', 'BETTER', 'BEST', 'ACROSS', 'DURING',
            'TODAY', 'HOWEVER', 'SURE', 'KNEW', 'ITS', 'TRYING', 'TOLD', 'YOUNG', 'SUN', 'THING',
            'WHOLE', 'HEAR', 'EXAMPLE', 'HEARD', 'SEVERAL', 'CHANGE', 'ANSWER', 'ROOM', 'SEA', 'AGAINST',
            'TOP', 'TURNED', 'LEARN', 'POINT', 'CITY', 'PLAY', 'TOWARD', 'FIVE', 'HIMSELF', 'USUALLY',
            'MONEY', 'SEEN', 'DIDNT', 'CAR', 'MORNING', 'IM', 'BODY', 'UPON', 'FAMILY', 'LATER', 'TURN',
            'MOVE', 'FACE', 'DOOR', 'CUT', 'DONE', 'GROUP', 'TRUE', 'LEAVE', 'YOURE', 'IDEA', 'GIRL',
            'FISH', 'WALK', 'EXAMPLE', 'RIVER', 'STATE', 'ONCE', 'BOOK', 'HEAR', 'STOP', 'WITHOUT',
            'SECOND', 'LATER', 'MISS', 'IDEA', 'ENOUGH', 'EAT', 'FACE', 'WATCH', 'FAR', 'INDIAN', 'REAL',
            'ALMOST', 'LET', 'ABOVE', 'GIRL', 'SOMETIMES', 'MOUNTAIN', 'CUT', 'YOUNG', 'TALK', 'SOON',
            'LIST', 'SONG', 'BEING', 'LEAVE', 'FAMILY', 'ITS', 'MATTER', 'TURN', 'WANT', 'EVERY',
            'STARTED', 'WAVES', 'LISTEN', 'WIND', 'ROCK', 'SPACE', 'COVERED', 'FAST', 'SEVERAL', 'HOLD',
            'HIMSELF', 'TOWARD', 'FIVE', 'STEP', 'MORNING', 'PASSED', 'VOWEL', 'TRUE', 'HUNDRED', 'AGAINST',
            'PATTERN', 'NUMERAL', 'TABLE', 'NORTH', 'SLOWLY', 'MONEY', 'MAP', 'FARM', 'PULLED', 'DRAW',
            'VOICE', 'SEEN', 'COLD', 'CRIED', 'PLAN', 'NOTICE', 'SOUTH', 'SING', 'WAR', 'GROUND', 'FALL',
            'KING', 'TOWN', 'ILL', 'UNIT', 'FIGURE', 'CERTAIN', 'FIELD', 'TRAVEL', 'WOOD', 'FIRE', 'UPON'
        ];
        
        return validWords.includes(word.toUpperCase());
    }
    
    addFoundWord(word) {
        this.foundWords.push(word);
        
        // Add to word chain display
        const wordBubble = document.createElement('div');
        wordBubble.className = 'word-bubble';
        wordBubble.textContent = word;
        this.wordChain.appendChild(wordBubble);
        
        // Scroll to show new word
        this.wordChain.scrollTop = this.wordChain.scrollHeight;
        
        this.showMessage(`Great! Found "${word}"`);
    }
    
    updateScore(word) {
        // Score based on word length
        const points = word.length * 10;
        this.score += points;
        this.streak++;
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreEl.textContent = this.score;
        this.wordsFoundEl.textContent = this.foundWords.length;
        this.streakEl.textContent = this.streak;
        this.progressInfo.textContent = `Progress: ${this.foundWords.length}/${this.targetWordsCount} words found`;
    }
    
    checkGameComplete() {
        if (this.foundWords.length >= this.targetWordsCount) {
            this.gameComplete = true;
            this.updateStatus('🎉 Daily Challenge Complete! Well done!');
            this.showMessage('Challenge completed! Great job!');
        }
    }
    
    animateInvalidWord() {
        this.currentWordEl.style.animation = 'shake 0.5s';
        setTimeout(() => {
            this.currentWordEl.style.animation = '';
        }, 500);
    }
    
    showMessage(text) {
        // Remove existing message
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'game-message';
        message.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    showHint() {
        const hints = [
            "Try common 3-letter words like THE, AND, FOR",
            "Look for words ending in -ING, -ER, -ED",
            "Don't forget about short words like IS, IT, IN",
            "Try building longer words from shorter ones",
            "Common letter combinations: TH, ER, AN, RE, ED, ON, ES, ST, EN, OF"
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showMessage(`Hint: ${randomHint}`);
    }
    
    // SDK Integration Methods
    getGameState() {
        return {
            currentWord: this.currentWord,
            foundWords: this.foundWords,
            score: this.score,
            streak: this.streak,
            gameComplete: this.gameComplete,
            availableLetters: this.availableLetters
        };
    }
    
    pauseGame() {
        this.gamePaused = true;
        this.updateStatus('Game paused');
    }
    
    resumeGame() {
        this.gamePaused = false;
        this.updateStatus(this.gameComplete ? 'Challenge completed!' : 'Find words using the letters below!');
    }
    
    resetGame() {
        this.currentWord = [];
        this.foundWords = [];
        this.availableLetters = [...this.dailyLetters];
        this.score = 0;
        this.streak = 0;
        this.gameComplete = false;
        
        this.wordChain.innerHTML = '';
        this.createCurrentWordSlots();
        this.createAvailableLetters();
        this.updateDisplay();
        this.updateStatus('Find words using the letters below!');
    }
}

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wordChainGame = new WordChainGame();
});