// main.js for Morpheus game

document.addEventListener('DOMContentLoaded', async () => {
    // Try to initialize Arkadium SDK (optional)
    try {
        if (window.ArkadiumGameSDK) {
            const sdk = await window.ArkadiumGameSDK.getInstance();
            if (sdk.env === 'arkadium' || sdk.env === 'local') {
                sdk.lifecycle.onTestReady();
            }
        }
    } catch (e) {
        // SDK initialization failed - this is fine for local development
        console.log('Arkadium SDK not available (this is normal for local development)');
    }

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
    // challengeDate element removed for cleaner UI
    const gameGrid = document.getElementById('game-grid');
    const keyboardContainer = document.getElementById('keyboard');
    // submitBtn removed - using Enter key and virtual keyboard instead
    const resetBtn = document.getElementById('reset-btn');
    const letterHintBtn = document.getElementById('letter-hint-btn');
    const definitionHintBtn = document.getElementById('definition-hint-btn');
    const counterDotsContainer = document.getElementById('counter-dots');
    const hintPanel = document.getElementById('hint-panel');
    const hintText = document.getElementById('hint-text');
    const currentDateDisplay = document.getElementById('current-date');
    
    // Get challenges from the external challenges.js file
    const challenges = window.ChallengeManager.generateCurrentChallenges();
    
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
    
    // Utility functions
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    function formatDateForDisplay(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    function getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    
    function getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
    
    // Create calendar
    function createCalendar() {
        calendar.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendar.appendChild(header);
        });
        
        // Get current month info
        const firstDay = getFirstDayOfMonth(today);
        const daysInMonth = getDaysInMonth(today);
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayDate = new Date(today.getFullYear(), today.getMonth(), day);
            const dayStr = formatDate(dayDate);
            const isFuture = dayDate > today;
            const isToday = day === today.getDate();
            
            // Check if it's today
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            // Check if it's a future date
            if (isFuture) {
                dayElement.classList.add('locked');
                dayElement.innerHTML = `${day}<i class="fas fa-lock"></i>`;
                dayElement.style.cursor = 'not-allowed';
            } else {
                dayElement.textContent = day;
                
                // Check if challenge exists for this day (past or today)
                if (challenges[dayStr]) {
                    dayElement.classList.add('completed');
                    dayElement.addEventListener('click', () => loadChallenge(dayStr));
                    dayElement.style.cursor = 'pointer';
                }
            }
            
            calendar.appendChild(dayElement);
        }
    }
    
    // Load a specific challenge
    function loadChallenge(dateStr) {
        if (!challenges[dateStr]) return;
        
        currentChallenge = challenges[dateStr];
        
        // Update UI
        startWord.textContent = currentChallenge.start;
        targetWord.textContent = currentChallenge.target;
        // challengeDate removed for cleaner UI
        
        // Reset game state
        resetGame();
        
        // Hide header and show game screen
        const header = document.querySelector('header');
        if (header) header.classList.add('header-hidden');
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    }
    
    // Show menu screen
    function showMenu() {
        // Show header and return to menu
        const header = document.querySelector('header');
        if (header) header.classList.remove('header-hidden');
        gameScreen.style.display = 'none';
        menuScreen.style.display = 'block';
    }
    
    // Create game grid
    function createGrid() {
        gameGrid.innerHTML = '';
        gameState.grid = [];
        
        const maxAttempts = 6;
        
        for (let row = 0; row < maxAttempts; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            rowElement.id = `row-${row + 1}`;
            
            const rowData = [];
            
            for (let col = 0; col < 4; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${row + 1}-${col + 1}`;
                cell.addEventListener('click', () => selectCell(row + 1, col + 1));
                rowElement.appendChild(cell);
                rowData.push('');
            }
            
            gameGrid.appendChild(rowElement);
            gameState.grid.push(rowData);
        }
        
        // Set first row as the start word
        const startWordLetters = currentChallenge.start.split('');
        startWordLetters.forEach((letter, index) => {
            const cell = document.getElementById(`cell-1-${index + 1}`);
            cell.textContent = letter;
            cell.classList.add('filled', 'correct');
            gameState.grid[0][index] = letter;
        });
    }
    
    // Create keyboard
    function createKeyboard() {
        keyboardContainer.innerHTML = '';
        
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
        ];
        
        rows.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('div');
                keyElement.className = 'key';
                keyElement.textContent = key;
                
                if (key === 'ENTER') {
                    keyElement.classList.add('enter');
                } else if (key === 'DELETE') {
                    keyElement.classList.add('delete');
                }
                
                keyElement.addEventListener('click', () => handleKeyClick(key));
                rowElement.appendChild(keyElement);
            });
            
            keyboardContainer.appendChild(rowElement);
        });
    }
    
    // Handle key clicks
    function handleKeyClick(key) {
        if (gameState.gameOver) return;
        
        if (key === 'ENTER') {
            submitAttempt();
        } else if (key === 'DELETE') {
            deleteLetter();
        } else {
            addLetter(key);
        }
    }
    
    // Handle keyboard input
    function handleKeyPress(event) {
        if (gameState.gameOver) return;
        
        const key = event.key.toUpperCase();
        
        if (key === 'ENTER') {
            submitAttempt();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            addLetter(key);
        }
    }
    
    // Add letter to current cell
    function addLetter(letter) {
        if (gameState.currentCell >= 4) return;
        
        const cell = document.getElementById(`cell-${gameState.currentRow}-${gameState.currentCell + 1}`);
        cell.textContent = letter;
        cell.classList.add('filled');
        
        gameState.grid[gameState.currentRow - 1][gameState.currentCell] = letter;
        gameState.currentCell++;
    }
    
    // Delete letter from current cell
    function deleteLetter() {
        if (gameState.currentCell <= 0) return;
        
        gameState.currentCell--;
        const cell = document.getElementById(`cell-${gameState.currentRow}-${gameState.currentCell + 1}`);
        cell.textContent = '';
        cell.classList.remove('filled');
        
        gameState.grid[gameState.currentRow - 1][gameState.currentCell] = '';
    }
    
    // Select a specific cell
    function selectCell(row, col) {
        if (row !== gameState.currentRow || gameState.gameOver) return;
        gameState.currentCell = col - 1;
    }
    
    // Submit current attempt
    function submitAttempt() {
        if (gameState.gameOver) return;
        
        const currentWord = gameState.grid[gameState.currentRow - 1].join('');
        
        if (currentWord.length !== 4) {
            showMessage('Word must be 4 letters long!');
            return;
        }
        
        // Check if word is valid
        if (!currentChallenge.validWords.includes(currentWord)) {
            showMessage('Not a valid word!');
            animateInvalidWord();
            return;
        }
        
        // Check if it's only one letter different from previous word
        const previousWord = gameState.currentRow === 2 ? 
            currentChallenge.start : 
            gameState.grid[gameState.currentRow - 2].join('');
        
        if (!isOneLetterDifferent(previousWord, currentWord)) {
            showMessage('Word must differ by exactly one letter!');
            animateInvalidWord();
            return;
        }
        
        // Mark word as valid
        animateValidWord();
        
        // Check if target reached
        if (currentWord === currentChallenge.target) {
            gameState.gameWon = true;
            gameState.gameOver = true;
            showWinMessage();
            updateCounterDots();
            return;
        }
        
        // Move to next row
        gameState.currentRow++;
        gameState.currentCell = 0;
        updateCounterDots();
        
        // Check if game over
        if (gameState.currentRow > 6) {
            gameState.gameOver = true;
            showMessage(`Game Over! The solution was: ${currentChallenge.solution.join(' → ')}`);
        }
    }
    
    // Check if two words differ by exactly one letter
    function isOneLetterDifferent(word1, word2) {
        if (word1.length !== word2.length) return false;
        
        let differences = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) {
                differences++;
            }
        }
        
        return differences === 1;
    }
    
    // Animate valid word
    function animateValidWord() {
        for (let i = 0; i < 4; i++) {
            const cell = document.getElementById(`cell-${gameState.currentRow}-${i + 1}`);
            cell.classList.add('valid');
            setTimeout(() => cell.classList.remove('valid'), 1000);
        }
    }
    
    // Animate invalid word
    function animateInvalidWord() {
        for (let i = 0; i < 4; i++) {
            const cell = document.getElementById(`cell-${gameState.currentRow}-${i + 1}`);
            cell.classList.add('incorrect');
            setTimeout(() => cell.classList.remove('incorrect'), 500);
        }
    }
    
    // Update counter dots
    function updateCounterDots() {
        const dots = counterDotsContainer.querySelectorAll('.counter-dot');
        dots.forEach((dot, index) => {
            if (index < gameState.currentRow - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Show win message
    function showWinMessage() {
        const message = document.createElement('div');
        message.className = 'win-message';
        message.textContent = `Congratulations! You solved it in ${gameState.currentRow} steps!`;
        gameGrid.appendChild(message);
        
        // Add confetti effect
        createConfetti();
    }
    
    // Create confetti effect
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)];
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 100);
        }
    }
    
    // Get word definitions from the external challenges.js file
    const wordDefinitions = window.ChallengeManager.WORD_DEFINITIONS;
    
    // Get the next word to guess
    function getNextWord() {
        if (!currentChallenge || gameState.gameOver) return null;
        
        // currentRow starts at 2 (row 1 has start word, row 2 is first guess)
        // We want the word at index (currentRow - 1) in the solution array
        const targetIndex = gameState.currentRow - 1;
        if (targetIndex >= currentChallenge.solution.length) return null;
        
        return currentChallenge.solution[targetIndex];
    }
    
    // Get the current word (what player should be building from)
    function getCurrentWord() {
        if (gameState.currentRow === 2) {
            return currentChallenge.start;
        } else {
            return gameState.grid[gameState.currentRow - 2].join('');
        }
    }
    
    // Letter hint - highlights the position that needs to change
    function showLetterHint() {
        if (!currentChallenge || gameState.gameOver) return;
        
        const nextWord = getNextWord();
        const currentWord = getCurrentWord();
        
        if (!nextWord || !currentWord) {
            showMessage('No more hints available!');
            return;
        }
        
        // Clear any existing hints
        clearHints();
        
        // Find the position that's different and highlight it
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] !== nextWord[i]) {
                const cell = document.getElementById(`cell-${gameState.currentRow}-${i + 1}`);
                if (cell) {
                    cell.classList.add('hint-letter');
                }
                break;
            }
        }
        
        hintText.textContent = 'The highlighted letter needs to change';
        hintPanel.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hintPanel.style.display = 'none';
            clearHints();
        }, 5000);
    }
    
    // Definition hint - shows the definition of the target word
    function showDefinitionHint() {
        if (!currentChallenge || gameState.gameOver) return;
        
        const nextWord = getNextWord();
        
        if (!nextWord) {
            showMessage('No more hints available!');
            return;
        }
        
        // Clear any existing hints
        clearHints();
        
        const definition = wordDefinitions[nextWord] || 'A valid English word';
        hintText.textContent = `Definition: ${definition}`;
        hintPanel.style.display = 'block';
        
        // Auto-hide after 6 seconds (longer for reading)
        setTimeout(() => {
            hintPanel.style.display = 'none';
        }, 6000);
    }
    
    // Clear all hint highlights
    function clearHints() {
        const hintCells = document.querySelectorAll('.hint-letter');
        hintCells.forEach(cell => {
            cell.classList.remove('hint-letter');
        });
    }
    
    // Show message
    function showMessage(text) {
        // Remove existing message
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'game-message';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    // Reset game
    function resetGame() {
        gameState = {
            currentAttempt: 1,
            currentRow: 2, // Start from row 2 since row 1 has the start word
            currentCell: 0,
            gameWon: false,
            gameOver: false,
            grid: []
        };
        
        createGrid();
        createKeyboard();
        updateCounterDots();
        hintPanel.style.display = 'none';
        clearHints();
        
        // Remove any existing messages
        const existingMessage = document.querySelector('.win-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    
    // Initialize the game
    function initGame() {
        console.log('Initializing game...');
        console.log('Today:', todayStr);
        console.log('Available challenges:', Object.keys(challenges).length);
        
        // Set current date
        currentDateDisplay.textContent = formatDateForDisplay(today);
        console.log('Date display set to:', formatDateForDisplay(today));
        
        // Check if today's challenge exists, if not create one
        if (!challenges[todayStr]) {
            console.log('No challenge for today, creating one...');
            const keys = Object.keys(challenges);
            const randomChallenge = challenges[keys[Math.floor(Math.random() * keys.length)]];
            challenges[todayStr] = randomChallenge;
        }
        
        // Set today's challenge
        const todayChallengeData = challenges[todayStr];
        console.log('Today\'s challenge:', todayChallengeData);
        
        if (todayStart && todayTarget && todaySteps) {
            todayStart.textContent = todayChallengeData.start;
            todayTarget.textContent = todayChallengeData.target;
            todaySteps.textContent = todayChallengeData.optimal;
            console.log('Challenge UI updated');
        } else {
            console.error('Challenge UI elements not found');
        }
        
        // Create calendar
        createCalendar();
        console.log('Calendar created');
        
        // Set event listeners
        if (todayChallenge) {
            todayChallenge.addEventListener('click', () => {
                console.log('Today challenge clicked');
                loadChallenge(todayStr);
            });
        }
        
        if (backBtn) backBtn.addEventListener('click', showMenu);
        if (submitBtn) submitBtn.addEventListener('click', submitAttempt);
        if (resetBtn) resetBtn.addEventListener('click', resetGame);
        if (letterHintBtn) letterHintBtn.addEventListener('click', showLetterHint);
        if (definitionHintBtn) definitionHintBtn.addEventListener('click', showDefinitionHint);
        
        // Keyboard event listener
        document.addEventListener('keydown', handleKeyPress);
        
        console.log('Game initialization complete');
    }

    // Initialize the game
    initGame();
}); 