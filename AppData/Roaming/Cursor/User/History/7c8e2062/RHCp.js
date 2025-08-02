// Modern ES6+ Game Engine with PixiJS Integration
class DailyQuotePuzzle {
    constructor() {
        this.quotes = quotesCalendar;
        this.currentQuote = this.quotes[0];
        this.activeWord = null;
        this.solvedWords = new Set();
        this.authorSolved = false;
        this.isUnscrambling = false;
        this.gameComplete = false;
        this.startTime = null;
        this.endTime = null;
        this.gameTime = 0;
        
        // User input state
        this.userInput = '';
        this.availableLetters = [];
        this.usedLetters = [];
        
        // Settings
        this.soundEffectsEnabled = true;
        this.backgroundMusicEnabled = true;
        
        // Calendar state
        this.currentCalendarMonth = new Date().getMonth();
        this.currentCalendarYear = new Date().getFullYear();
        
        // PixiJS Application
        this.pixiApp = null;
        this.particleContainer = null;
        
        // Sound system
        this.sounds = new Map();
        
        // SDK
        this.sdk = null;
        this.sdkInitialized = false;
        
        // DOM Elements
        this.elements = this.initializeElements();
        
        // Initialize the game
        this.init();
    }
    
    initializeElements() {
        const elements = {
            quoteText: document.getElementById('quoteText'),
            quoteAuthor: document.getElementById('quoteAuthor'),
            congrats: document.getElementById('congrats'),
            inputArea: document.getElementById('inputArea'),
            inputTitle: document.getElementById('inputTitle'),
            letterCells: document.getElementById('letterCells'),
            availableLetters: document.getElementById('availableLetters'),
            resetBtn: document.getElementById('resetBtn'),
            backspaceBtn: document.getElementById('backspaceBtn'),
            unscrambleBtn: document.getElementById('unscrambleBtn'),
            helpIcon: document.getElementById('helpIcon'),
            calendarIcon: document.getElementById('calendarIcon'),
            statsIcon: document.getElementById('statsIcon'),
            calendarModal: document.getElementById('calendarModal'),
            closeCalendar: document.getElementById('closeCalendar'),
            calendarDates: document.getElementById('calendarDates'),
            dateLine: document.getElementById('dateLine'),
            calendarStatus: document.getElementById('calendarStatus'),
            helpModal: document.getElementById('helpModal'),
            closeHelp: document.getElementById('closeHelp'),
            statsModal: document.getElementById('statsModal'),
            closeStats: document.getElementById('closeStats'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettings: document.getElementById('closeSettings'),
            settingsIcon: document.getElementById('settingsIcon'),
            soundEffectsToggle: document.getElementById('soundEffectsToggle'),
            backgroundMusicToggle: document.getElementById('backgroundMusicToggle'),
            totalSolved: document.getElementById('totalSolved'),
            currentStreak: document.getElementById('currentStreak'),
            successRate: document.getElementById('successRate'),
            avgTime: document.getElementById('avgTime'),
            prevMonth: document.getElementById('prevMonth'),
            nextMonth: document.getElementById('nextMonth'),
            calendarMonthYear: document.getElementById('calendarMonthYear')
        };
        
        // Debug: Log missing elements
        const missingElements = Object.entries(elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);
        
        if (missingElements.length > 0) {
            console.warn('Missing elements:', missingElements);
        }
        
        return elements;
    }
    
    async init() {
        this.startTime = new Date();
        await this.initializeSDK();
        await this.initializePixiJS();
        await this.initializeSounds();
        this.loadSettings();
        this.loadUserData();
        this.renderQuote();
        this.updateDateDisplay();
        this.renderInputArea();
        this.setupEventListeners();
        
        // Ensure all modals are hidden
        if (this.elements.calendarModal) this.elements.calendarModal.style.display = 'none';
        if (this.elements.helpModal) this.elements.helpModal.style.display = 'none';
        if (this.elements.statsModal) this.elements.statsModal.style.display = 'none';
        if (this.elements.settingsModal) this.elements.settingsModal.style.display = 'none';
        
        // Debug: Check if any modal is visible
        console.log('Modal states:', {
            calendar: this.elements.calendarModal ? this.elements.calendarModal.style.display : 'element not found',
            help: this.elements.helpModal ? this.elements.helpModal.style.display : 'element not found',
            stats: this.elements.statsModal ? this.elements.statsModal.style.display : 'element not found',
            settings: this.elements.settingsModal ? this.elements.settingsModal.style.display : 'element not found'
        });
        
        // Auto-activate first word
        if (this.currentQuote.scrambledWords.length > 0) {
            setTimeout(() => {
                this.handleWordClick(this.currentQuote.scrambledWords[0]);
            }, 500);
        }
    }
    
    async initializeSDK() {
        try {
            console.log('Initializing Arkadium SDK...');
            
            // Wait for SDK to be available
            let attempts = 0;
            const maxAttempts = 50;
            
            while (typeof window.ArkadiumGameSDK === 'undefined' && attempts < maxAttempts) {
                console.log(`Waiting for SDK... Attempt ${attempts + 1}/${maxAttempts}`);
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (typeof window.ArkadiumGameSDK === 'undefined') {
                throw new Error('SDK not available');
            }
            
            this.sdk = await window.ArkadiumGameSDK.getInstance();
            
            if (this.sdk && typeof this.sdk.debugMode === 'function') {
                this.sdk.debugMode(true);
            }
            
            this.sdkInitialized = true;
            console.log('SDK initialized successfully');
            
            // Notify SDK of game lifecycle
            if (this.sdk.lifecycle) {
                if (typeof this.sdk.lifecycle.onTestReady === 'function') {
                    this.sdk.lifecycle.onTestReady();
                }
                if (typeof this.sdk.lifecycle.onGameStart === 'function') {
                    this.sdk.lifecycle.onGameStart();
                }
            }
            
        } catch (error) {
            console.warn('SDK initialization failed:', error);
            this.sdkInitialized = false;
        }
    }
    
    async initializePixiJS() {
        // Temporarily disable PixiJS to avoid visual issues
        // Will be re-enabled when particle effects are implemented
        console.log('PixiJS initialization disabled for now');
        return;
        
        // Original code commented out for future use:
        /*
        try {
            // Wait a bit for DOM to be fully rendered
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Get the game container dimensions
            const gameContainer = document.querySelector('.newspaper-container');
            if (!gameContainer) {
                console.log('Game container not found, skipping PixiJS initialization');
                return;
            }
            
            const containerRect = gameContainer.getBoundingClientRect();
            
            // Ensure we have valid dimensions
            if (containerRect.width === 0 || containerRect.height === 0) {
                console.log('Container has zero dimensions, using fallback size');
                this.pixiApp = new PIXI.Application({
                    width: 800,
                    height: 600,
                    transparent: true,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1
                });
            } else {
                // Create a PixiJS application sized to match the game container
                this.pixiApp = new PIXI.Application({
                    width: containerRect.width,
                    height: containerRect.height,
                    transparent: true,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1
                });
            }
            
            // Create particle container
            this.particleContainer = new PIXI.Container();
            this.pixiApp.stage.addChild(this.particleContainer);
            
            // Position the canvas to overlay the game container
            this.pixiApp.view.style.position = 'absolute';
            this.pixiApp.view.style.top = containerRect.top + 'px';
            this.pixiApp.view.style.left = containerRect.left + 'px';
            this.pixiApp.view.style.pointerEvents = 'none';
            this.pixiApp.view.style.zIndex = '1000';
            
            // Add to body
            document.body.appendChild(this.pixiApp.view);
            
            // Update canvas position on window resize
            window.addEventListener('resize', () => {
                if (this.pixiApp && this.pixiApp.view && gameContainer) {
                    const newRect = gameContainer.getBoundingClientRect();
                    this.pixiApp.view.style.top = newRect.top + 'px';
                    this.pixiApp.view.style.left = newRect.left + 'px';
                }
            });
            
        } catch (error) {
            console.log('PixiJS initialization failed:', error);
        }
        */
    }
    
    async initializeSounds() {
        const soundFiles = {
            keyType: 'sounds/keytype.mp3',
            wordComplete: 'sounds/word-complete.mp3',
            authorComplete: 'sounds/author-complete.mp3',
            puzzleComplete: 'sounds/puzzle-complete.mp3',
            buttonClick: 'sounds/button-click.mp3',
            wordActivate: 'sounds/word-activate.mp3',
            error: 'sounds/error.mp3',
            celebration: 'sounds/celebration.mp3',
            reset: 'sounds/reset.mp3',
            quoteComplete: 'sounds/quote-complete.mp3',
            backgroundMusic: 'sounds/background-music.mp3'
        };
        
        for (const [name, path] of Object.entries(soundFiles)) {
            try {
                const audio = new Audio(path);
                audio.preload = 'auto';
                
                if (name === 'backgroundMusic') {
                    audio.loop = true;
                    audio.volume = 0.2;
                } else {
                    audio.volume = 0.5;
                }
                
                audio.addEventListener('error', () => {
                    console.log(`Could not load sound: ${path}`);
                });
                
                audio.addEventListener('canplaythrough', () => {
                    this.sounds.set(name, audio);
                });
                
            } catch (error) {
                console.log(`Error loading sound ${name}:`, error);
            }
        }
    }
    
    playSound(soundName, volume = 0.5) {
        try {
            const audio = this.sounds.get(soundName);
            if (audio && this.soundEffectsEnabled) {
                const audioClone = audio.cloneNode();
                audioClone.volume = volume;
                audioClone.play().catch(e => {
                    console.log(`Could not play sound: ${soundName}`);
                });
            }
        } catch (error) {
            console.log(`Error playing sound ${soundName}:`, error);
        }
    }
    
    generateTypingSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            oscillator.type = 'square';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (error) {
            console.log('Could not generate typing sound:', error);
        }
    }
    
    playTypingSound() {
        if (!this.soundEffectsEnabled) return;
        
        if (this.sounds.has('keyType')) {
            this.playSound('keyType', 0.3);
        } else {
            this.generateTypingSound();
        }
    }
    
    playWordCompleteSound() {
        this.playSound('wordComplete', 0.4);
    }
    
    playAuthorCompleteSound() {
        this.playSound('authorComplete', 0.4);
    }
    
    playPuzzleCompleteSound() {
        this.playSound('puzzleComplete', 0.6);
    }
    
    playButtonClickSound() {
        this.playSound('buttonClick', 0.3);
    }
    
    playWordActivateSound() {
        this.playSound('wordActivate', 0.3);
    }
    
    playErrorSound() {
        this.playSound('error', 0.4);
    }
    
    playCelebrationSound() {
        this.playSound('celebration', 0.5);
    }
    
    playResetSound() {
        this.playSound('reset', 0.4);
    }
    
    playQuoteCompleteSound() {
        this.playSound('quoteComplete', 0.6);
    }
    
    playBackgroundMusic() {
        try {
            const audio = this.sounds.get('backgroundMusic');
            if (audio && this.backgroundMusicEnabled) {
                if (audio.paused) {
                    audio.currentTime = 0;
                }
                audio.play().catch(e => {
                    console.log('Could not play background music:', e);
                });
            }
        } catch (error) {
            console.log('Error playing background music:', error);
        }
    }
    
    pauseBackgroundMusic() {
        try {
            const audio = this.sounds.get('backgroundMusic');
            if (audio) {
                audio.pause();
            }
        } catch (error) {
            console.log('Error pausing background music:', error);
        }
    }
    
    toggleBackgroundMusic() {
        if (this.backgroundMusicEnabled) {
            const audio = this.sounds.get('backgroundMusic');
            if (audio && audio.paused) {
                this.playBackgroundMusic();
            }
        } else {
            this.pauseBackgroundMusic();
        }
    }
    
    async saveSettings() {
        const settings = {
            soundEffectsEnabled: this.soundEffectsEnabled,
            backgroundMusicEnabled: this.backgroundMusicEnabled
        };
        
        if (this.sdkInitialized && this.sdk && this.sdk.persistence) {
            try {
                await this.sdk.persistence.localSet('dailyQuotePuzzleSettings', JSON.stringify(settings));
                console.log('Settings saved via SDK');
            } catch (error) {
                console.warn('Failed to save settings via SDK, falling back to localStorage:', error);
                localStorage.setItem('dailyQuotePuzzleSettings', JSON.stringify(settings));
            }
        } else {
            localStorage.setItem('dailyQuotePuzzleSettings', JSON.stringify(settings));
        }
    }
    
    async loadSettings() {
        try {
            let savedSettings = null;
            
            if (this.sdkInitialized && this.sdk && this.sdk.persistence) {
                try {
                    savedSettings = await this.sdk.persistence.localGet('dailyQuotePuzzleSettings');
                    console.log('Settings loaded via SDK');
                } catch (error) {
                    console.warn('Failed to load settings via SDK, falling back to localStorage:', error);
                    savedSettings = localStorage.getItem('dailyQuotePuzzleSettings');
                }
            } else {
                savedSettings = localStorage.getItem('dailyQuotePuzzleSettings');
            }
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.soundEffectsEnabled = settings.soundEffectsEnabled !== undefined ? settings.soundEffectsEnabled : true;
                this.backgroundMusicEnabled = settings.backgroundMusicEnabled !== undefined ? settings.backgroundMusicEnabled : true;
            }
        } catch (error) {
            console.log('Could not load settings:', error);
            this.soundEffectsEnabled = true;
            this.backgroundMusicEnabled = true;
        }
        
        if (this.elements.soundEffectsToggle) {
            this.elements.soundEffectsToggle.checked = this.soundEffectsEnabled;
        }
        if (this.elements.backgroundMusicToggle) {
            this.elements.backgroundMusicToggle.checked = this.backgroundMusicEnabled;
        }
        // Don't auto-start background music due to browser autoplay restrictions
        // this.toggleBackgroundMusic();
    }
    
    loadUserData() {
        const userData = JSON.parse(localStorage.getItem('quotePuzzleUserData')) || {
            puzzles: {},
            stats: {
                totalSolved: 0,
                currentStreak: 0,
                maxStreak: 0,
                totalTime: 0,
                lastPlayed: null
            }
        };
        return userData;
    }
    
    saveUserData(userData) {
        localStorage.setItem('quotePuzzleUserData', JSON.stringify(userData));
    }
    
    recordPuzzleCompletion() {
        const userData = this.loadUserData();
        const dateStr = this.currentQuote.date;
        this.endTime = new Date();
        this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);
        
        userData.puzzles[dateStr] = {
            solved: true,
            time: this.gameTime,
            date: dateStr
        };
        
        userData.stats.totalSolved = Object.values(userData.puzzles).filter(p => p.solved).length;
        
        const today = new Date(dateStr);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = this.formatDate(yesterday);
        
        if (userData.puzzles[yesterdayStr]?.solved) {
            userData.stats.currentStreak++;
        } else {
            userData.stats.currentStreak = 1;
        }
        
        if (userData.stats.currentStreak > userData.stats.maxStreak) {
            userData.stats.maxStreak = userData.stats.currentStreak;
        }
        
        userData.stats.totalTime += this.gameTime;
        userData.stats.lastPlayed = dateStr;
        
        this.saveUserData(userData);
    }
    
    updateStatsDisplay() {
        const userData = this.loadUserData();
        const stats = userData.stats;
        
        this.elements.totalSolved.textContent = stats.totalSolved;
        this.elements.currentStreak.textContent = stats.currentStreak;
        
        const totalPlayed = Object.keys(userData.puzzles).length;
        const successRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;
        this.elements.successRate.textContent = `${successRate}%`;
        
        const avgTime = stats.totalSolved > 0 ? Math.round(stats.totalTime / stats.totalSolved) : 0;
        this.elements.avgTime.textContent = `${avgTime}s`;
    }

    updateCongratsStats() {
        const userData = this.loadUserData();
        const stats = userData.stats;
        
        document.getElementById('congratsTotalSolved').textContent = stats.totalSolved;
        document.getElementById('congratsCurrentStreak').textContent = stats.currentStreak;
        
        const totalPlayed = Object.keys(userData.puzzles).length;
        const successRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;
        document.getElementById('congratsSuccessRate').textContent = `${successRate}%`;
        
        const avgTime = stats.totalSolved > 0 ? Math.round(stats.totalTime / stats.totalSolved) : 0;
        document.getElementById('congratsAvgTime').textContent = `${avgTime}s`;
    }
    
    updateDateDisplay() {
        // Only update date display if the element exists
        if (this.elements.dateLine) {
            const date = new Date(this.currentQuote.date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.elements.dateLine.textContent = date.toLocaleDateString('en-US', options);
        }
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    getProperCapitalization(word, index, allWords) {
        const lowerWord = word.toLowerCase();
        
        if (index === 0) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        }
        
        if (index > 0) {
            const prevWord = allWords[index - 1];
            if (prevWord && /[.!?]$/.test(prevWord.trim())) {
                return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
            }
        }
        
        const properNouns = [
            'jobs', 'steve', 'lennon', 'john', 'wilde', 'oscar', 'roosevelt', 'eleanor',
            'disney', 'walt', 'mandela', 'nelson', 'einstein', 'albert', 'gandhi', 'mahatma',
            'luther', 'martin', 'king', 'teresa', 'mother', 'ford', 'henry', 'edison', 'thomas',
            'curie', 'marie', 'lincoln', 'abraham', 'washington', 'george', 'jefferson', 'thomas',
            'franklin', 'benjamin', 'churchill', 'winston', 'kennedy', 'john', 'reagan', 'ronald',
            'obama', 'barack', 'clinton', 'bill', 'bush', 'george', 'carter', 'jimmy',
            'america', 'american', 'united', 'states', 'england', 'britain', 'france', 'germany',
            'italy', 'spain', 'russia', 'china', 'japan', 'india', 'africa', 'europe', 'asia',
            'australia', 'canada', 'mexico', 'brazil', 'argentina', 'egypt', 'israel', 'turkey',
            'greece', 'poland', 'sweden', 'norway', 'denmark', 'finland', 'ireland', 'scotland',
            'wales', 'london', 'paris', 'berlin', 'rome', 'madrid', 'moscow', 'beijing', 'tokyo',
            'delhi', 'mumbai', 'sydney', 'toronto', 'montreal', 'vancouver', 'new', 'york',
            'los', 'angeles', 'chicago', 'houston', 'philadelphia', 'phoenix', 'san', 'antonio',
            'diego', 'dallas', 'jose', 'austin', 'jacksonville', 'francisco', 'columbus',
            'charlotte', 'fort', 'worth', 'indianapolis', 'seattle', 'denver', 'washington',
            'boston', 'nashville', 'baltimore', 'oklahoma', 'portland', 'vegas', 'louisville',
            'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento', 'mesa', 'kansas',
            'atlanta', 'long', 'beach', 'colorado', 'springs', 'raleigh', 'omaha', 'miami',
            'oakland', 'minneapolis', 'tulsa', 'cleveland', 'wichita', 'arlington',
            'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december',
            'god', 'lord', 'jesus', 'christ', 'buddha', 'allah', 'christmas', 'easter',
            'thanksgiving', 'halloween', 'valentine', 'patrick', 'internet', 'facebook',
            'google', 'apple', 'microsoft', 'amazon', 'twitter', 'instagram', 'youtube',
            'netflix', 'disney', 'marvel', 'dc', 'batman', 'superman', 'spiderman'
        ];
        
        if (properNouns.includes(lowerWord)) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        }
        
        if (lowerWord === 'i') {
            return 'I';
        }
        
        return lowerWord;
    }
    
    renderQuote() {
        const words = this.currentQuote.text.split(' ');
        let html = '';
        
        words.forEach((word, index) => {
            const scrambledWord = this.currentQuote.scrambledWords.find(sw => sw.index === index);
            const isSolved = scrambledWord && this.solvedWords.has(scrambledWord.original);
            
            if (scrambledWord && !isSolved) {
                const isActive = this.activeWord && this.activeWord.original === scrambledWord.original;
                html += `<span class="quote-word scrambled ${isActive ? 'active' : ''}" 
                            data-word-index="${index}">${scrambledWord.scrambled}</span> `;
            } else {
                const displayWord = isSolved ? 
                    this.getProperCapitalization(scrambledWord.original, index, words) : 
                    this.getProperCapitalization(word, index, words);
                html += `<span class="quote-word">${displayWord}</span> `;
            }
        });
        
        // Add quotation marks around the entire quote
        this.elements.quoteText.innerHTML = `"${html.trim()}"`;
        
        document.querySelectorAll('.quote-word.scrambled').forEach(el => {
            el.addEventListener('click', () => this.handleWordClick(
                this.currentQuote.scrambledWords.find(sw => sw.index === parseInt(el.dataset.wordIndex))
            ));
        });
        
        if (this.authorSolved) {
            const authorName = this.currentQuote.author.charAt(0).toUpperCase() + this.currentQuote.author.slice(1).toLowerCase();
            this.elements.quoteAuthor.textContent = `- ${authorName}`;
            this.elements.quoteAuthor.className = 'author';
        } else {
            const isActive = this.activeWord && this.activeWord.isAuthor;
            this.elements.quoteAuthor.innerHTML = `<span class="author scrambled ${isActive ? 'active' : ''}" 
                                                        id="authorScrambled">${this.currentQuote.scrambledAuthor}</span>`;
            document.getElementById('authorScrambled').addEventListener('click', () => this.handleAuthorClick());
        }
    }
    
    handleWordClick(wordData) {
        if (this.solvedWords.has(wordData.original) || this.isUnscrambling) return;
        
        document.querySelectorAll('.quote-word.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.author.active').forEach(el => {
            el.classList.remove('active');
        });
        
        const wordElements = document.querySelectorAll('.quote-word');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );
        if (targetWordEl) {
            targetWordEl.classList.add('active');
        }
        
        this.activeWord = wordData;
        this.userInput = '';
        this.availableLetters = wordData.scrambled.split('');
        this.usedLetters = [];
        
        this.renderInputArea();
    }
    
    handleAuthorClick() {
        if (this.authorSolved || this.isUnscrambling) return;
        
        document.querySelectorAll('.quote-word.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.author.active').forEach(el => {
            el.classList.remove('active');
        });
        
        const authorEl = document.querySelector('.author.scrambled');
        if (authorEl) {
            authorEl.classList.add('active');
        }
        
        this.activeWord = {
            original: this.currentQuote.author.toLowerCase(),
            scrambled: this.currentQuote.scrambledAuthor,
            isAuthor: true
        };
        
        this.userInput = '';
        this.availableLetters = this.currentQuote.scrambledAuthor.split('');
        this.usedLetters = [];
        
        this.renderInputArea();
    }
    
    renderInputArea() {
        if (!this.activeWord) {
            if (this.solvedWords.size === this.currentQuote.scrambledWords.length && this.authorSolved) {
                this.elements.inputArea.classList.remove('show');
                return;
            }
            
            const firstWord = this.currentQuote.scrambledWords.find(word => !this.solvedWords.has(word.original));
            if (firstWord) {
                setTimeout(() => this.handleWordClick(firstWord), 100);
            } else if (!this.authorSolved) {
                setTimeout(() => this.handleAuthorClick(), 100);
            }
            return;
        }
        
        this.elements.inputArea.classList.add('show');
        this.elements.inputTitle.textContent = this.activeWord.isAuthor
            ? 'Unscramble Author'
            : 'Unscramble Word';
        
        const targetLength = this.activeWord.original.length;
        this.elements.letterCells.innerHTML = '';
        
        for (let i = 0; i < targetLength; i++) {
            const cell = document.createElement('div');
            cell.className = 'letter-cell';
            cell.textContent = this.userInput[i] || '';
            this.elements.letterCells.appendChild(cell);
        }
        
        this.elements.availableLetters.innerHTML = '';
        
        this.availableLetters.forEach((letter, index) => {
            const btn = document.createElement('div');
            btn.className = `letter-btn ${this.usedLetters.includes(index) ? 'used' : ''}`;
            btn.textContent = letter;
            btn.dataset.index = index;
            
            if (!this.usedLetters.includes(index)) {
                btn.addEventListener('click', () => this.handleLetterClick(letter, index));
            }
            
            this.elements.availableLetters.appendChild(btn);
        });
    }
    
    handleLetterClick(letter, index) {
        if (this.usedLetters.includes(index) || this.isUnscrambling) return;
        
        this.userInput += letter;
        this.usedLetters = [...this.usedLetters, index];
        
        this.playTypingSound();
        this.renderInputArea();
        
        if (this.userInput.length === this.activeWord.original.length) {
            const inputWord = this.userInput.toLowerCase();
            const targetWord = this.activeWord.original.toLowerCase();
            
            if (inputWord === targetWord) {
                if (this.activeWord.isAuthor) {
                    this.authorSolved = true;
                    this.updateAuthorDisplay();
                    this.playAuthorCompleteSound();
                } else {
                    this.solvedWords.add(this.activeWord.original);
                    this.updateWordDisplay(this.activeWord);
                    this.playWordCompleteSound();
                }
                
                setTimeout(() => {
                    this.activateNextWordSmoothly();
                }, 1200);
            } else {
                setTimeout(() => {
                    this.resetInput();
                }, 1000);
            }
        }
    }
    
    updateWordDisplay(wordData) {
        const wordElements = document.querySelectorAll('.quote-word');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );
        
        if (targetWordEl) {
            const words = this.currentQuote.text.split(' ');
            const properWord = this.getProperCapitalization(wordData.original, wordData.index, words);
            
            this.animateWordCompletion(targetWordEl, properWord);
        }
    }
    
    updateAuthorDisplay() {
        const authorName = this.currentQuote.author.charAt(0).toUpperCase() + this.currentQuote.author.slice(1).toLowerCase();
        this.animateAuthorCompletion(this.elements.quoteAuthor, `- ${authorName}`);
    }
    
    animateWordCompletion(wordElement, newText) {
        wordElement.classList.add('small-celebration');
        
        setTimeout(() => {
            wordElement.textContent = newText;
            wordElement.className = 'quote-word word-reveal';
            wordElement.removeAttribute('data-word-index');
            
            setTimeout(() => {
                wordElement.classList.remove('word-reveal');
            }, 400);
        }, 400);
        
        setTimeout(() => {
            wordElement.classList.remove('small-celebration');
        }, 800);
    }
    
    animateAuthorCompletion(authorElement, newText) {
        authorElement.classList.add('small-celebration');
        
        setTimeout(() => {
            authorElement.textContent = newText;
            authorElement.className = 'author word-reveal';
            
            setTimeout(() => {
                authorElement.classList.remove('word-reveal');
            }, 400);
        }, 400);
        
        setTimeout(() => {
            authorElement.classList.remove('small-celebration');
        }, 800);
    }
    
    activateNextWordSmoothly() {
        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });
        
        this.activeWord = null;
        this.userInput = '';
        this.availableLetters = [];
        this.usedLetters = [];
        this.renderInputArea();
        
        if (this.solvedWords.size === this.currentQuote.scrambledWords.length && this.authorSolved) {
            this.gameComplete = true;
            this.updateCongratsStats();
            this.elements.congrats.classList.add('show');
            this.playQuoteCompleteSound();
            
            const quoteContainer = document.querySelector('.quote-container');
            quoteContainer.classList.add('puzzle-completed', 'quote-complete');
            setTimeout(() => {
                quoteContainer.classList.remove('puzzle-completed');
            }, 1000);
            
            this.recordPuzzleCompletion();
            return;
        }
        
        if (!this.authorSolved && this.solvedWords.size === this.currentQuote.scrambledWords.length) {
            setTimeout(() => {
                this.activateAuthorSmoothly();
            }, 300);
        } else {
            for (const word of this.currentQuote.scrambledWords) {
                if (!this.solvedWords.has(word.original)) {
                    setTimeout(() => {
                        this.activateWordSmoothly(word);
                    }, 300);
                    return;
                }
            }
        }
    }
    
    activateWordSmoothly(wordData) {
        if (this.solvedWords.has(wordData.original)) return;
        
        this.activeWord = wordData;
        this.userInput = '';
        this.availableLetters = wordData.scrambled.split('');
        this.usedLetters = [];
        
        this.renderInputArea();
        
        const wordElements = document.querySelectorAll('.quote-word.scrambled');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );
        
        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });
        
        if (targetWordEl) {
            targetWordEl.classList.add('active');
        }
    }
    
    activateAuthorSmoothly() {
        if (this.authorSolved) return;
        
        this.activeWord = {
            original: this.currentQuote.author.toLowerCase(),
            scrambled: this.currentQuote.scrambledAuthor,
            isAuthor: true
        };
        
        this.userInput = '';
        this.availableLetters = this.currentQuote.scrambledAuthor.split('');
        this.usedLetters = [];
        
        this.renderInputArea();
        
        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });
        
        const authorEl = document.querySelector('.author.scrambled');
        if (authorEl) {
            authorEl.classList.add('active');
        }
    }
    
    handleKeyDown(event) {
        if (!this.activeWord || this.availableLetters.length === 0 || this.isUnscrambling) return;
        
        if (event.key === 'Backspace') {
            this.handleBackspace();
            return;
        }
        
        if (event.key.length !== 1) return;
        
        const key = event.key.toLowerCase();
        const availableIndex = this.availableLetters.findIndex((letter, index) =>
            letter.toLowerCase() === key && !this.usedLetters.includes(index)
        );
        
        if (availableIndex !== -1) {
            this.handleLetterClick(this.availableLetters[availableIndex], availableIndex);
        }
    }
    
    handleBackspace() {
        if (!this.activeWord || this.userInput.length === 0 || this.isUnscrambling) return;
        
        this.userInput = this.userInput.slice(0, -1);
        this.usedLetters = this.usedLetters.slice(0, -1);
        this.renderInputArea();
    }
    
    resetInput() {
        if (this.isUnscrambling) return;
        
        this.playResetSound();
        this.userInput = '';
        this.usedLetters = [];
        this.renderInputArea();
    }
    
    unscrambleCurrentWord() {
        if (!this.activeWord || this.isUnscrambling) return;
        
        this.isUnscrambling = true;
        this.elements.resetBtn.disabled = true;
        this.elements.backspaceBtn.disabled = true;
        this.elements.unscrambleBtn.disabled = true;
        
        const targetWord = this.activeWord.original;
        const scrambledLetters = this.activeWord.scrambled.split('');
        
        this.userInput = '';
        this.usedLetters = [];
        
        let letterIndex = 0;
        let attempts = 0;
        const maxAttempts = targetWord.length * 2; // Safety limit
        
        const addNextLetter = () => {
            if (letterIndex >= targetWord.length) {
                // Word is complete, check if it's correct
                const inputWord = this.userInput.toLowerCase();
                const targetWordLower = this.activeWord.original.toLowerCase();
                
                if (inputWord === targetWordLower) {
                    setTimeout(() => {
                        if (this.activeWord.isAuthor) {
                            this.authorSolved = true;
                            this.updateAuthorDisplay();
                            this.playAuthorCompleteSound();
                        } else {
                            this.solvedWords.add(this.activeWord.original);
                            this.updateWordDisplay(this.activeWord);
                            this.playWordCompleteSound();
                        }
                        
                        setTimeout(() => {
                            this.isUnscrambling = false;
                            this.elements.resetBtn.disabled = false;
                            this.elements.backspaceBtn.disabled = false;
                            this.elements.unscrambleBtn.disabled = false;
                            this.activateNextWordSmoothly();
                        }, 1200);
                    }, 300);
                } else {
                    // Word is wrong, reset and try again
                    this.userInput = '';
                    this.usedLetters = [];
                    letterIndex = 0;
                    attempts++;
                    
                    if (attempts < maxAttempts) {
                        setTimeout(addNextLetter, 200);
                    } else {
                        // Give up and reset
                        this.isUnscrambling = false;
                        this.elements.resetBtn.disabled = false;
                        this.elements.backspaceBtn.disabled = false;
                        this.elements.unscrambleBtn.disabled = false;
                        this.resetInput();
                    }
                }
                return;
            }
            
            attempts++;
            if (attempts > maxAttempts) {
                // Safety timeout - give up
                this.isUnscrambling = false;
                this.elements.resetBtn.disabled = false;
                this.elements.backspaceBtn.disabled = false;
                this.elements.unscrambleBtn.disabled = false;
                this.resetInput();
                return;
            }
            
            const targetLetter = targetWord[letterIndex];
            const scrambledIndex = scrambledLetters.findIndex((letter, index) => 
                letter.toLowerCase() === targetLetter.toLowerCase() && !this.usedLetters.includes(index)
            );
            
            if (scrambledIndex !== -1) {
                this.userInput += scrambledLetters[scrambledIndex];
                this.usedLetters = [...this.usedLetters, scrambledIndex];
                this.playTypingSound();
                this.renderInputArea();
                
                letterIndex++;
                setTimeout(addNextLetter, 200);
            } else {
                // Letter not found, try to find any available letter
                const availableIndex = scrambledLetters.findIndex((letter, index) => 
                    !this.usedLetters.includes(index)
                );
                
                if (availableIndex !== -1) {
                    this.userInput += scrambledLetters[availableIndex];
                    this.usedLetters = [...this.usedLetters, availableIndex];
                    this.playTypingSound();
                    this.renderInputArea();
                    
                    letterIndex++;
                    setTimeout(addNextLetter, 200);
                } else {
                    // No more letters available, reset and try again
                    this.userInput = '';
                    this.usedLetters = [];
                    letterIndex = 0;
                    setTimeout(addNextLetter, 200);
                }
            }
        };
        
        addNextLetter();
    }
    
    renderCalendar() {
        const today = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        
        this.elements.calendarMonthYear.textContent =
            `${monthNames[this.currentCalendarMonth]} ${this.currentCalendarYear}`;
        
        const firstDay = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const lastDay = new Date(this.currentCalendarYear, this.currentCalendarMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        let html = '';
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="calendar-date"></div>';
        }
        
        const userData = this.loadUserData();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentCalendarYear, this.currentCalendarMonth, day);
            const dateStr = this.formatDate(date);
            const isToday = dateStr === this.formatDate(today);
            const isPast = date < today;
            const isFuture = date > today;
            
            let classes = 'calendar-date';
            if (isToday) classes += ' today';
            else if (isPast) classes += ' past';
            else if (isFuture) classes += ' future';
            
            if (userData.puzzles && userData.puzzles[dateStr] && userData.puzzles[dateStr].solved) {
                classes += ' solved';
            }
            
            const quote = this.quotes.find(q => q.date === dateStr);
            if (quote) {
                html += `<div class="${classes}" data-date="${dateStr}" style="cursor: pointer;" title="Play ${dateStr} puzzle">${day}</div>`;
            } else {
                html += `<div class="${classes}" style="opacity: 0.3;" title="No puzzle available">${day}</div>`;
            }
        }
        
        this.elements.calendarDates.innerHTML = html;
        
        document.querySelectorAll('.calendar-date[data-date]').forEach(el => {
            el.addEventListener('click', () => {
                const dateStr = el.dataset.date;
                this.loadChallengeForDate(dateStr);
                this.elements.calendarModal.style.display = 'none';
            });
        });
        
        this.updateCalendarNavigation();
    }
    
    updateCalendarNavigation() {
        const today = new Date();
        const quoteDates = this.quotes.map(q => new Date(q.date));
        const earliestDate = new Date(Math.min(...quoteDates));
        const latestDate = new Date(Math.max(...quoteDates));
        
        const currentViewDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const earliestViewDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
        this.elements.prevMonth.disabled = currentViewDate <= earliestViewDate;
        
        const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.elements.nextMonth.disabled = currentViewDate >= currentMonthDate;
    }
    
    loadChallengeForDate(dateStr) {
        const quote = this.quotes.find(q => q.date === dateStr);
        if (quote) {
            this.currentQuote = quote;
            this.solvedWords = new Set();
            this.authorSolved = false;
            this.activeWord = null;
            this.userInput = '';
            this.availableLetters = [];
            this.usedLetters = [];
            this.gameComplete = false;
            this.startTime = new Date();
            
            this.elements.congrats.classList.remove('show');
            this.renderQuote();
            this.updateDateDisplay();
            this.renderInputArea();
            
            if (this.currentQuote.scrambledWords.length > 0) {
                setTimeout(() => {
                    this.handleWordClick(this.currentQuote.scrambledWords[0]);
                }, 300);
            }
        }
    }
    
    setupEventListeners() {
        // Debug: Check if elements exist
        console.log('Setting up event listeners...');
        console.log('Elements found:', {
            resetBtn: !!this.elements.resetBtn,
            backspaceBtn: !!this.elements.backspaceBtn,
            unscrambleBtn: !!this.elements.unscrambleBtn,
            helpIcon: !!this.elements.helpIcon,
            calendarIcon: !!this.elements.calendarIcon,
            statsIcon: !!this.elements.statsIcon,
            settingsIcon: !!this.elements.settingsIcon
        });
        
        // Game controls
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => this.resetInput());
        }
        if (this.elements.backspaceBtn) {
            this.elements.backspaceBtn.addEventListener('click', () => this.handleBackspace());
        }
        if (this.elements.unscrambleBtn) {
            this.elements.unscrambleBtn.addEventListener('click', () => this.unscrambleCurrentWord());
        }
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Calendar functionality
        if (this.elements.calendarIcon) {
            this.elements.calendarIcon.addEventListener('click', () => {
                this.elements.calendarModal.style.display = 'flex';
                this.renderCalendar();
            });
        }
        
        if (this.elements.closeCalendar) {
            this.elements.closeCalendar.addEventListener('click', () => {
                this.elements.calendarModal.style.display = 'none';
            });
        }
        
        if (this.elements.prevMonth) {
            this.elements.prevMonth.addEventListener('click', () => {
                this.currentCalendarMonth--;
                if (this.currentCalendarMonth < 0) {
                    this.currentCalendarMonth = 11;
                    this.currentCalendarYear--;
                }
                this.renderCalendar();
            });
        }
        
        if (this.elements.nextMonth) {
            this.elements.nextMonth.addEventListener('click', () => {
                this.currentCalendarMonth++;
                if (this.currentCalendarMonth > 11) {
                    this.currentCalendarMonth = 0;
                    this.currentCalendarYear++;
                }
                this.renderCalendar();
            });
        }
        
        // Help functionality
        if (this.elements.helpIcon) {
            this.elements.helpIcon.addEventListener('click', () => {
                this.elements.helpModal.style.display = 'flex';
            });
        }
        
        if (this.elements.closeHelp) {
            this.elements.closeHelp.addEventListener('click', () => {
                this.elements.helpModal.style.display = 'none';
            });
        }
        
        // Stats functionality
        if (this.elements.statsIcon) {
            this.elements.statsIcon.addEventListener('click', () => {
                this.updateStatsDisplay();
                this.elements.statsModal.style.display = 'flex';
            });
        }
        
        if (this.elements.closeStats) {
            this.elements.closeStats.addEventListener('click', () => {
                this.elements.statsModal.style.display = 'none';
            });
        }
        
        // Settings functionality
        if (this.elements.settingsIcon) {
            this.elements.settingsIcon.addEventListener('click', () => {
                this.loadSettings();
                this.elements.settingsModal.style.display = 'flex';
            });
        }
        
        if (this.elements.closeSettings) {
            this.elements.closeSettings.addEventListener('click', () => {
                this.elements.settingsModal.style.display = 'none';
            });
        }
        
        // Settings toggle listeners
        if (this.elements.soundEffectsToggle) {
            this.elements.soundEffectsToggle.addEventListener('change', (e) => {
                this.soundEffectsEnabled = e.target.checked;
                this.saveSettings();
            });
        }
        
        if (this.elements.backgroundMusicToggle) {
            this.elements.backgroundMusicToggle.addEventListener('change', (e) => {
                this.backgroundMusicEnabled = e.target.checked;
                this.toggleBackgroundMusic();
                this.saveSettings();
            });
        }
        
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (this.elements.calendarModal && e.target === this.elements.calendarModal) {
                this.elements.calendarModal.style.display = 'none';
            }
            if (this.elements.helpModal && e.target === this.elements.helpModal) {
                this.elements.helpModal.style.display = 'none';
            }
            if (this.elements.statsModal && e.target === this.elements.statsModal) {
                this.elements.statsModal.style.display = 'none';
            }
            if (this.elements.settingsModal && e.target === this.elements.settingsModal) {
                this.elements.settingsModal.style.display = 'none';
            }
        });

        // Past challenges button in congrats section
        const pastChallengesBtn = document.getElementById('pastChallengesBtn');
        if (pastChallengesBtn) {
            pastChallengesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.elements.congrats.classList.remove('show');
                this.elements.calendarModal.style.display = 'flex';
                this.renderCalendar();
            });
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DailyQuotePuzzle();
}); 