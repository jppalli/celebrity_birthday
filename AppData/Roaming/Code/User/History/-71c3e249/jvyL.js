// Celebrity Birthday Challenge Game Engine - Wordle Style
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
        this.currentActiveInput = 1; // Track which input is currently active
        
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
            cluesGrid: document.getElementById('cluesGrid'),
            clueText1: document.getElementById('clueText1'),
            clueText2: document.getElementById('clueText2'),
            clueText3: document.getElementById('clueText3'),
            clueText4: document.getElementById('clueText4'),
            clueText5: document.getElementById('clueText5'),
            clue1: document.getElementById('clue1'),
            clue2: document.getElementById('clue2'),
            clue3: document.getElementById('clue3'),
            clue4: document.getElementById('clue4'),
            clue5: document.getElementById('clue5'),
            
            // Individual input fields for each clue
            guessInput1: document.getElementById('guessInput1'),
            guessInput2: document.getElementById('guessInput2'),
            guessInput3: document.getElementById('guessInput3'),
            guessInput4: document.getElementById('guessInput4'),
            guessInput5: document.getElementById('guessInput5'),
            
            // Failed guess displays
            failedGuess1: document.getElementById('failedGuess1'),
            failedGuess2: document.getElementById('failedGuess2'),
            failedGuess3: document.getElementById('failedGuess3'),
            failedGuess4: document.getElementById('failedGuess4'),
            failedGuess5: document.getElementById('failedGuess5'),
            
            submitGuess: document.getElementById('submitGuess'),
            skipGuess: document.getElementById('skipGuess'),
            guessesLeft: document.getElementById('guessesLeft'),
            previousGuesses: document.getElementById('previousGuesses'),
            successMessage: document.getElementById('successMessage'),
            failureMessage: document.getElementById('failureMessage'),
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
        
        // Start background music when game finishes loading
        setTimeout(() => {
            this.playBackgroundMusic();
        }, 1000);
        
        // Focus on first input
        this.focusCurrentInput();
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
        this.setupClueBoxes();
        this.updateGameDisplay();
    }
    
    setupClueBoxes() {
        // Set all clue texts but don't show them yet
        const clueElements = [
            this.elements.clueText1,
            this.elements.clueText2,
            this.elements.clueText3,
            this.elements.clueText4,
            this.elements.clueText5
        ];
        
        const clueBoxes = [
            this.elements.clue1,
            this.elements.clue2,
            this.elements.clue3,
            this.elements.clue4,
            this.elements.clue5
        ];
        
        // Clear all clue texts initially
        clueElements.forEach(element => {
            if (element) element.textContent = '';
        });
        
        // Reset all clue boxes
        clueBoxes.forEach(box => {
            if (box) {
                box.classList.remove('active', 'filled', 'failed');
            }
        });
        
        // Show first clue and make first input active
        this.revealClue(0);
        this.setActiveInput(1);
    }
    
    revealClue(index) {
        const clueElements = [
            this.elements.clueText1,
            this.elements.clueText2,
            this.elements.clueText3,
            this.elements.clueText4,
            this.elements.clueText5
        ];
        
        const clueBoxes = [
            this.elements.clue1,
            this.elements.clue2,
            this.elements.clue3,
            this.elements.clue4,
            this.elements.clue5
        ];
        
        if (clueElements[index] && this.currentCelebrity.clues[index]) {
            clueElements[index].textContent = this.currentCelebrity.clues[index];
            if (clueBoxes[index]) {
                clueBoxes[index].classList.add('filled');
            }
        }
    }
    
    setActiveInput(inputNumber) {
        // Hide all inputs first
        for (let i = 1; i <= 5; i++) {
            const input = this.elements[`guessInput${i}`];
            const clueBox = this.elements[`clue${i}`];
            if (input) {
                input.style.display = 'none';
                input.value = '';
            }
            if (clueBox) {
                clueBox.classList.remove('active');
            }
        }
        
        // Show and activate the current input
        const currentInput = this.elements[`guessInput${inputNumber}`];
        const currentClueBox = this.elements[`clue${inputNumber}`];
        
        if (currentInput && currentClueBox) {
            currentInput.style.display = 'block';
            currentClueBox.classList.add('active');
            this.currentActiveInput = inputNumber;
            
            // Focus on the input
            setTimeout(() => currentInput.focus(), 100);
        }
    }
    
    focusCurrentInput() {
        const currentInput = this.elements[`guessInput${this.currentActiveInput}`];
        if (currentInput) {
            currentInput.focus();
        }
    }
    
    getCurrentInput() {
        return this.elements[`guessInput${this.currentActiveInput}`];
    }
    
    updateGameDisplay() {
        if (this.elements.guessesLeft) {
            this.elements.guessesLeft.textContent = `${this.guessesRemaining} guesses remaining`;
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
        
        // Mark current clue box as successful
        const currentClueBox = this.elements[`clue${this.currentActiveInput}`];
        if (currentClueBox) {
            currentClueBox.classList.remove('active');
            currentClueBox.classList.add('filled');
        }
        
        // Hide current input
        const currentInput = this.getCurrentInput();
        if (currentInput) {
            currentInput.style.display = 'none';
        }
        
        // Show success message
        this.elements.successMessage.textContent = `🎉 Correct! It's ${this.currentCelebrity.name}!`;
        this.elements.successMessage.style.display = 'block';
        
        // Hide buttons
        this.elements.submitGuess.style.display = 'none';
        this.elements.skipGuess.style.display = 'none';
        this.elements.guessesLeft.style.display = 'none';
        
        // Reveal all remaining clues
        this.revealAllClues();
        
        // Record completion and show stats
        this.recordGameCompletion();
        this.updateCongratsStats();
        setTimeout(() => {
            this.elements.congrats.style.display = 'block';
        }, 2000);
        
        this.playSuccessSound();
    }
    
    handleIncorrectGuess(guess) {
        this.guessesRemaining--;
        this.previousGuesses.push(guess);
        
        // Show failed guess in current clue box
        const failedGuessElement = this.elements[`failedGuess${this.currentActiveInput}`];
        if (failedGuessElement) {
            failedGuessElement.textContent = `❌ ${guess}`;
            failedGuessElement.style.display = 'block';
        }
        
        // Mark current clue box as failed
        const currentClueBox = this.elements[`clue${this.currentActiveInput}`];
        if (currentClueBox) {
            currentClueBox.classList.remove('active');
            currentClueBox.classList.add('failed');
        }
        
        // Hide current input
        const currentInput = this.getCurrentInput();
        if (currentInput) {
            currentInput.style.display = 'none';
        }
        
        // Add to sidebar previous guesses
        const guessElement = document.createElement('div');
        guessElement.className = 'previous-guess';
        guessElement.textContent = guess;
        this.elements.previousGuesses.appendChild(guessElement);
        
        if (this.guessesRemaining <= 0) {
            // Game over
            this.gameComplete = true;
            this.endTime = new Date();
            this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);
            
            this.elements.failureMessage.textContent = `Game Over! It was ${this.currentCelebrity.name}`;
            this.elements.failureMessage.style.display = 'block';
            
            // Hide buttons
            this.elements.submitGuess.style.display = 'none';
            this.elements.skipGuess.style.display = 'none';
            this.elements.guessesLeft.style.display = 'none';
            
            // Reveal all clues
            this.revealAllClues();
            
            this.playFailSound();
        } else {
            // Move to next clue and input
            const nextInputNumber = this.currentActiveInput + 1;
            if (nextInputNumber <= 5) {
                this.revealClue(nextInputNumber - 1); // Reveal next clue (0-indexed)
                this.setActiveInput(nextInputNumber);
            }
            
            this.updateGameDisplay();
            this.playIncorrectSound();
        }
    }
    
    skipGuess() {
        if (this.gameComplete || this.guessesRemaining <= 0) return;
        
        this.guessesRemaining--;
        
        // Mark current clue box as skipped
        const currentClueBox = this.elements[`clue${this.currentActiveInput}`];
        if (currentClueBox) {
            currentClueBox.classList.remove('active');
            currentClueBox.classList.add('filled');
        }
        
        // Hide current input
        const currentInput = this.getCurrentInput();
        if (currentInput) {
            currentInput.style.display = 'none';
        }
        
        if (this.guessesRemaining <= 0) {
            // Game over
            this.gameComplete = true;
            this.endTime = new Date();
            this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);
            
            this.elements.failureMessage.textContent = `Game Over! It was ${this.currentCelebrity.name}`;
            this.elements.failureMessage.style.display = 'block';
            
            // Hide buttons
            this.elements.submitGuess.style.display = 'none';
            this.elements.skipGuess.style.display = 'none';
            this.elements.guessesLeft.style.display = 'none';
            
            // Reveal all clues
            this.revealAllClues();
            
            this.playFailSound();
        } else {
            // Move to next clue and input
            const nextInputNumber = this.currentActiveInput + 1;
            if (nextInputNumber <= 5) {
                this.revealClue(nextInputNumber - 1); // Reveal next clue (0-indexed)
                this.setActiveInput(nextInputNumber);
            }
            
            this.updateGameDisplay();
        }
    }
    
    revealAllClues() {
        for (let i = 0; i < 5; i++) {
            this.revealClue(i);
        }
        
        // Remove active state from all clue boxes
        for (let i = 1; i <= 5; i++) {
            const clueBox = this.elements[`clue${i}`];
            if (clueBox) {
                clueBox.classList.remove('active');
                clueBox.classList.add('filled');
            }
        }
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
            this.currentActiveInput = 1;
            
            // Reset UI
            this.elements.congrats.style.display = 'none';
            this.elements.successMessage.style.display = 'none';
            this.elements.failureMessage.style.display = 'none';
            this.elements.submitGuess.style.display = 'inline-block';
            this.elements.skipGuess.style.display = 'inline-block';
            this.elements.guessesLeft.style.display = 'block';
            this.elements.previousGuesses.innerHTML = '';
            
            // Reset all failed guess displays
            for (let i = 1; i <= 5; i++) {
                const failedGuess = this.elements[`failedGuess${i}`];
                if (failedGuess) {
                    failedGuess.style.display = '