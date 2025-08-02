// Celebrity Birthday Challenge Game Engine
class CelebrityBirthdayChallenge {
    constructor() {
        this.celebrities = celebrityBirthdays;
        this.currentCelebrity = null;
        this.guessesRemaining = 5;
        this.currentClueIndex = 0;
        this.gameComplete = false;
        this.gameWon = false;
        this.startTime = null;
        this.endTime = null;
        this.gameTime = 0;
        this.previousGuesses = [];
        this.score = 0;
        
        // Settings
        this.soundEffectsEnabled = true;
        this.backgroundMusicEnabled = true;
        
        // Calendar state
        this.currentCalendarMonth = new Date().getMonth();
        this.currentCalendarYear = new Date().getFullYear();
        
        // Sound system
        this.sounds = new Map();
        
        // DOM Elements
        this.elements = this.initializeElements();
        
        // Initialize the game
        this.init();
    }
    
    initializeElements() {
        const elements = {
            gameQuestion: document.getElementById('gameQuestion'),
            clueContainer: document.getElementById('clueContainer'),
            clueText: document.getElementById('clueText'),
            guessInput: document.getElementById('guessInput'),
            submitGuess: document.getElementById('submitGuess'),
            skipGuess: document.getElementById('skipGuess'),
            guessesLeft: document.getElementById('guessesLeft'),
            previousGuesses: document.getElementById('previousGuesses'),
            congrats: document.getElementById('congrats'),
            
            // Hamburger menu elements
            hamburgerMenu: document.getElementById('hamburgerMenu'),
            slideMenu: document.getElementById('slideMenu'),
            menuOverlay: document.getElementById('menuOverlay'),
            closeMenu: document.getElementById('closeMenu'),
            menuStatsLink: document.getElementById('menuStatsLink'),
            menuCalendarLink: document.getElementById('menuCalendarLink'),
            menuHelpLink: document.getElementById('menuHelpLink'),
            menuSoundEffectsToggle: document.getElementById('menuSoundEffectsToggle'),
            menuBackgroundMusicToggle: document.getElementById('menuBackgroundMusicToggle'),
            
            // Modal elements
            calendarModal: document.getElementById('calendarModal'),
            closeCalendar: document.getElementById('closeCalendar'),
            calendarDates: document.getElementById('calendarDates'),
            calendarStatus: document.getElementById('calendarStatus'),
            helpModal: document.getElementById('helpModal'),
            closeHelp: document.getElementById('closeHelp'),
            statsModal: document.getElementById('statsModal'),
            closeStats: document.getElementById('closeStats'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettings: document.getElementById('closeSettings'),
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
        await this.initializeSounds();
        this.loadSettings();
        this.loadUserData();
        this.selectTodaysCelebrity();
        this.setupEventListeners();
        
        // Ensure all modals are hidden
        if (this.elements.calendarModal) this.elements.calendarModal.style.display = 'none';
        if (this.elements.helpModal) this.elements.helpModal.style.display = 'none';
        if (this.elements.statsModal) this.elements.statsModal.style.display = 'none';
        if (this.elements.settingsModal) this.elements.settingsModal.style.display = 'none';
        
        // Start background music when game finishes loading
        setTimeout(() => {
            this.playBackgroundMusic();
        }, 1000);
        
        // Focus on input
        if (this.elements.guessInput) {
            this.elements.guessInput.focus();
        }
    }
    
    selectTodaysCelebrity() {
        const today = new Date();
        const todayStr = this.formatDate(today);
        
        // Find celebrity for today's date
        let celebrity = this.celebrities.find(c => c.date === todayStr);
        
        // If no celebrity for today, pick a random one for demo purposes
        if (!celebrity) {
            celebrity = this.celebrities[Math.floor(Math.random() * this.celebrities.length)];
        }
        
        this.currentCelebrity = celebrity;
        this.updateGameDisplay();
    }
    
    updateGameDisplay() {
        if (this.elements.guessesLeft) {
            this.elements.guessesLeft.textContent = `${this.guessesRemaining} guesses remaining`;
        }
        
        // Show first clue if no guesses made yet
        if (this.previousGuesses.length === 0 && this.currentClueIndex === 0) {
            this.showNextClue();
        }
    }
    
    showNextClue() {
        if (this.currentCelebrity && this.currentClueIndex < this.currentCelebrity.clues.length) {
            const clue = this.currentCelebrity.clues[this.currentClueIndex];
            this.elements.clueText.textContent = clue;
            this.elements.clueContainer.style.display = 'block';
            this.currentClueIndex++;
        }
    }
    
    makeGuess(guess) {
        if (this.gameComplete || this.guessesRemaining <= 0) return;
        
        const normalizedGuess = guess.toLowerCase().trim();
        const normalizedAnswer = this.currentCelebrity.name.toLowerCase().trim();
        
        // Check if guess is correct
        if (normalizedGuess === normalizedAnswer) {
            this.handleCorrectGuess();
        } else {
            this.handleIncorrectGuess(guess);
        }
    }
    
    handleCorrectGuess() {
        this.gameWon = true;
        this.gameComplete = true;
        this.endTime = new Date();
        this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);
        
        // Calculate score based on guesses used
        const guessesUsed = 5 - this.guessesRemaining + 1;
        this.score = Math.max(0, (6 - guessesUsed) * 100);
        
        // Show success message
        this.elements.gameQuestion.textContent = `🎉 Correct! It's ${this.currentCelebrity.name}!`;
        this.elements.gameQuestion.style.color = '#28a745';
        
        // Hide input area
        this.elements.guessInput.style.display = 'none';
        this.elements.submitGuess.style.display = 'none';
        this.elements.skipGuess.style.display = 'none';
        this.elements.guessesLeft.style.display = 'none';
        
        // Show all clues
        this.showAllClues();
        
        // Record completion and show stats
        this.recordGameCompletion();
        this.updateCongratsStats();
        this.elements.congrats.classList.add('show');
        
        this.playSuccessSound();
    }
    
    handleIncorrectGuess(guess) {
        this.guessesRemaining--;
        this.previousGuesses.push(guess);
        
        // Add to previous guesses display
        const guessElement = document.createElement('div');
        guessElement.className = 'previous-guess';
        guessElement.textContent = `❌ ${guess}`;
        this.elements.previousGuesses.appendChild(guessElement);
        
        if (this.guessesRemaining <= 0) {
            // Game over
            this.gameComplete = true;
            this.endTime = new Date();
            this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);
            
            this.elements.gameQuestion.textContent = `😞 Game Over! It was ${this.currentCelebrity.name}`;
            this.elements.gameQuestion.style.color = '#dc3545';
            
            // Hide input area
            this.elements.guessInput.style.display = 'none';
            this.elements.submitGuess.style.display = 'none';
            this.elements.skipGuess.style.display = 'none';
            this.elements.guessesLeft.style.display = 'none';
            
            // Show all clues
            this.showAllClues();
            
            this.playFailSound();
        } else {
            // Show next clue
            this.showNextClue();
            this.updateGameDisplay();
            this.playIncorrectSound();
        }
        
        // Clear input
        this.elements.guessInput.value = '';
    }
    
    skipGuess() {
        if (this.gameComplete || this.guessesRemaining <= 0) return;
        
        this.guessesRemaining--;
        this.showNextClue();
        this.updateGameDisplay();
        
        if (this.guessesRemaining <= 0) {
            this.handleIncorrectGuess('(skipped)');
        }
    }
    
    showAllClues() {
        let allClues = '';
        this.currentCelebrity.clues.forEach((clue, index) => {
            allClues += `<p><strong>Clue ${index + 1}:</strong> ${clue}</p>`;
        });
        this.elements.clueText.innerHTML = allClues;
    }
    
    async initializeSounds() {
        const soundFiles = {
            correct: 'sounds/word-complete.mp3',
            incorrect: 'sounds/error.mp3',
            success: 'sounds/puzzle-complete.mp3',
            fail: 'sounds/reset.mp3',
            buttonClick: 'sounds/keytype.mp3',
            backgroundMusic: 'sounds/background-music.mp3'
        };
        
        const loadPromises = [];
        
        for (const [name, path] of Object.entries(soundFiles)) {
            const loadPromise = new Promise((resolve) => {
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
                        resolve();
                    });
                    
                    audio.addEventListener('canplaythrough', () => {
                        this.sounds.set(name, audio);
                        console.log(`Sound loaded: ${name}`);
                        resolve();
                    });
                    
                    setTimeout(() => {
                        if (!this.sounds.has(name)) {
                            console.log(`Timeout loading sound: ${name}, adding anyway`);
                            this.sounds.set(name, audio);
                        }
                        resolve();
                    }, 3000);
                    
                } catch (error) {
                    console.log(`Error loading sound ${name}:`, error);
                    resolve();
                }
            });
            
            loadPromises.push(loadPromise);
        }
        
        await Promise.all(loadPromises);
        console.log('All sounds loaded, total sounds:', this.sounds.size);
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
    
    playCorrectSound() {
        this.playSound('correct', 0.4);
    }
    
    playIncorrectSound() {
        this.playSound('incorrect', 0.4);
    }
    
    playSuccessSound() {
        this.playSound('success', 0.6);
    }
    
    playFailSound() {
        this.playSound('fail', 0.4);
    }
    
    playButtonClickSound() {
        this.playSound('buttonClick', 0.3);
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
    
    saveSettings() {
        const settings = {
            soundEffectsEnabled: this.soundEffectsEnabled,
            backgroundMusicEnabled: this.backgroundMusicEnabled
        };
        localStorage.setItem('celebrityBirthdaySettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('celebrityBirthdaySettings');
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
        
        // Update toggle elements
        if (this.elements.soundEffectsToggle) {
            this.elements.soundEffectsToggle.checked = this.soundEffectsEnabled;
        }
        if (this.elements.backgroundMusicToggle) {
            this.elements.backgroundMusicToggle.checked = this.backgroundMusicEnabled;
        }
        if (this.elements.menuSoundEffectsToggle) {
            this.elements.menuSoundEffectsToggle.checked = this.soundEffectsEnabled;
        }
        if (this.elements.menuBackgroundMusicToggle) {
            this.elements.menuBackgroundMusicToggle.checked = this.backgroundMusicEnabled;
        }
    }
    
    loadUserData() {
        const userData = JSON.parse(localStorage.getItem('celebrityBirthdayUserData')) || {
            games: {},
            stats: {
                totalSolved: 0,
                currentStreak: 0,
                maxStreak: 0,
                totalTime: 0,
                totalScore: 0,
                lastPlayed: null
            }
        };
        return userData;
    }
    
    saveUserData(userData) {
        localStorage.setItem('celebrityBirthdayUserData', JSON.stringify(userData));
    }
    
    recordGameCompletion() {
        const userData = this.loadUserData();
        const dateStr = this.formatDate(new Date());
        
        userData.games[dateStr] = {
            solved: this.gameWon,
            time: this.gameTime,
            score: this.score,
            guessesUsed: 5 - this.guessesRemaining + (this.gameWon ? 1 : 0),
            date: dateStr
        };
        
        if (this.gameWon) {
            userData.stats.totalSolved = Object.values(userData.games).filter(g => g.solved).length;
            userData.stats.totalScore += this.score;
            
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = this.formatDate(yesterday);
            
            if (userData.games[yesterdayStr]?.solved) {
                userData.stats.currentStreak++;
            } else {
                userData.stats.currentStreak = 1;
            }
            
            if (userData.stats.currentStreak > userData.stats.maxStreak) {
                userData.stats.maxStreak = userData.stats.currentStreak;
            }
        }
        
        userData.stats.totalTime += this.gameTime;
        userData.stats.lastPlayed = dateStr;
        
        this.saveUserData(userData);
    }
    
    updateStatsDisplay() {
        const userData = this.loadUserData();
        const stats = userData.stats;
        
        if (this.elements.totalSolved) {
            this.elements.totalSolved.textContent = stats.totalSolved;
        }
        if (this.elements.currentStreak) {
            this.elements.currentStreak.textContent = stats.currentStreak;
        }
        
        const totalPlayed = Object.keys(userData.games).length;
        const successRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;
        if (this.elements.successRate) {
            this.elements.successRate.textContent = `${successRate}%`;
        }
        
        const avgTime = stats.totalSolved > 0 ? Math.round(stats.totalTime / stats.totalSolved) : 0;
        if (this.elements.avgTime) {
            this.elements.avgTime.textContent = `${avgTime}s`;
        }
    }

    updateCongratsStats() {
        const userData = this.loadUserData();
        const stats = userData.stats;
        
        const congratsTotalSolved = document.getElementById('congratsTotalSolved');
        const congratsCurrentStreak = document.getElementById('congratsCurrentStreak');
        const congratsSuccessRate = document.getElementById('congratsSuccessRate');
        const congratsAvgTime = document.getElementById('congratsAvgTime');
        
        if (congratsTotalSolved) congratsTotalSolved.textContent = stats.totalSolved;
        if (congratsCurrentStreak) congratsCurrentStreak.textContent = stats.currentStreak;
        
        const totalPlayed = Object.keys(userData.games).length;
        const successRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;
        if (congratsSuccessRate) congratsSuccessRate.textContent = `${successRate}%`;
        
        const avgTime = stats.totalSolved > 0 ? Math.round(stats.totalTime / stats.totalSolved) : 0;
        if (congratsAvgTime) congratsAvgTime.textContent = `${avgTime}s`;
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
            
            if (userData.games && userData.games[dateStr] && userData.games[dateStr].solved) {
                classes += ' solved';
            }
            
            const celebrity = this.celebrities.find(c => c.date === dateStr);
            if (celebrity) {
                html += `<div class="${classes}" data-date="${dateStr}" style="cursor: pointer;" title="Play ${dateStr} challenge">${day}</div>`;
            } else {
                html += `<div class="${classes}" style="opacity: 0.3;" title="No challenge available">${day}</div>`;
            }
        }
        
        this.elements.calendarDates.innerHTML = html;
        
        document.querySelectorAll('.calendar-date[data-date]').forEach(el => {
            el.addEventListener('click', () => {
                const dateStr = el.dataset.date;
                const clickedDate = new Date(dateStr);
                const today = new Date();
                
                if (clickedDate > today) {
                    return;
                }
                
                this.loadChallengeForDate(dateStr);
                this.elements.calendarModal.style.display = 'none';
            });
        });
        
        this.updateCalendarNavigation();
    }
    
    updateCalendarNavigation() {
        const today = new Date();
        const celebrityDates = this.celebrities.map(c => new Date(c.date));
        const earliestDate = new Date(Math.min(...celebrityDates));
        
        const currentViewDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const earliestViewDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
        this.elements.prevMonth.disabled = currentViewDate <= earliestViewDate;
        
        const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.elements.nextMonth.disabled = currentViewDate >= currentMonthDate;
    }
    
    loadChallengeForDate(dateStr) {
        const celebrity = this.celebrities.find(c => c.date === dateStr);
        if (celebrity) {
            this.currentCelebrity = celebrity;
            this.guessesRemaining = 5;
            this.currentClueIndex = 0;
            this.gameComplete = false;
            this.gameWon = false;
            this.previousGuesses = [];
            this.score = 0;
            this.startTime = new Date();
            
            // Reset UI
            this.elements.congrats.classList.remove('show');
            this.elements.gameQuestion.textContent = "Whose birthday is today?";
            this.elements.gameQuestion.style.color = '#333';
            this.elements.clueContainer.style.display = 'none';
            this.elements.guessInput.style.display = 'block';
            this.elements.submitGuess.style.display = 'inline-block';
            this.elements.skipGuess.style.display = 'inline-block';
            this.elements.guessesLeft.style.display = 'block';
            this.elements.guessInput.value = '';
            this.elements.previousGuesses.innerHTML = '';
            
            this.updateGameDisplay();
            this.elements.guessInput.focus();
        }
    }
    
    // Menu methods
    openMenu() {
        if (this.elements.slideMenu && this.elements.menuOverlay && this.elements.hamburgerMenu) {
            this.elements.slideMenu.classList.add('active');
            this.elements.menuOverlay.classList.add('active');
            this.elements.hamburgerMenu.querySelector('.hamburger-icon').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeMenu() {
        if (this.elements.slideMenu && this.elements.menuOverlay && this.elements.hamburgerMenu) {
            this.elements.slideMenu.classList.remove('active');
            this.elements.menuOverlay.classList.remove('active');
            this.elements.hamburgerMenu.querySelector('.hamburger-icon').classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    toggleMenu() {
        if (this.elements.slideMenu && this.elements.slideMenu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    setupEventListeners() {
        // Game controls
        if (this.elements.submitGuess) {
            this.elements.submitGuess.addEventListener('click', () => {
                const guess = this.elements.guessInput.value.trim();
                if (guess) {
                    this.makeGuess(guess);
                    this.playButtonClickSound();
                }
            });
        }
        
        if (this.elements.skipGuess) {
            this.elements.skipGuess.addEventListener('click', () => {
                this.skipGuess();
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.guessInput) {
            this.elements.guessInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const guess = this.elements.guessInput.value.trim();
                    if (guess) {
                        this.makeGuess(guess);
                        this.playButtonClickSound();
                    }
                }
            });
        }
        
        // Hamburger Menu Controls
        if (this.elements.hamburgerMenu) {
            this.elements.hamburgerMenu.addEventListener('click', () => {
                this.toggleMenu();
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.closeMenu) {
            this.elements.closeMenu.addEventListener('click', () => {
                this.closeMenu();
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.menuOverlay) {
            this.elements.menuOverlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
        // Menu Navigation Links
        if (this.elements.menuStatsLink) {
            this.elements.menuStatsLink.addEventListener('click', () => {
                this.closeMenu();
                this.updateStatsDisplay();
                this.elements.statsModal.style.display = 'flex';
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.menuCalendarLink) {
            this.elements.menuCalendarLink.addEventListener('click', () => {
                this.closeMenu();
                this.elements.calendarModal.style.display = 'flex';
                this.renderCalendar();
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.menuHelpLink) {
            this.elements.menuHelpLink.addEventListener('click', () => {
                this.closeMenu();
                this.elements.helpModal.style.display = 'flex';
                this.playButtonClickSound();
            });
        }
        
        // Menu Settings Toggles
        if (this.elements.menuSoundEffectsToggle) {
            this.elements.menuSoundEffectsToggle.addEventListener('change', (e) => {
                this.soundEffectsEnabled = e.target.checked;
                if (this.elements.soundEffectsToggle) {
                    this.elements.soundEffectsToggle.checked = e.target.checked;
                }
                this.saveSettings();
                this.playButtonClickSound();
            });
        }
        
        if (this.elements.menuBackgroundMusicToggle) {
            this.elements.menuBackgroundMusicToggle.addEventListener('change', (e) => {
                this.backgroundMusicEnabled = e.target.checked;
                if (this.elements.backgroundMusicToggle) {
                    this.elements.backgroundMusicToggle.checked = e.target.checked;
                }
                this.toggleBackgroundMusic();
                this.saveSettings();
                this.playButtonClickSound();
            });
        }
        
        // Close menu on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.slideMenu && this.elements.slideMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        // Calendar functionality
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
        if (this.elements.closeHelp) {
            this.elements.closeHelp.addEventListener('click', () => {
                this.elements.helpModal.style.display = 'none';
            });
        }
        
        // Stats functionality
        if (this.elements.closeStats) {
            this.elements.closeStats.addEventListener('click', () => {
                this.elements.statsModal.style.display = 'none';
            