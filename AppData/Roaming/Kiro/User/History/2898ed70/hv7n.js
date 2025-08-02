// main.js for Morpheus game

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Game starting...');
    
    // Wait a moment for SDK to be fully available
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Initialize Arkadium SDK if available
    let sdk = null;
    try {
        console.log('Checking for Arkadium SDK...');
        console.log('window.ArkadiumGameSDK exists:', !!window.ArkadiumGameSDK);
        
        if (window.ArkadiumGameSDK) {
            console.log('Arkadium SDK found, initializing...');
            sdk = await window.ArkadiumGameSDK.getInstance();
            console.log('SDK initialized successfully');
            console.log('SDK environment:', sdk.env);
            console.log('SDK ads available:', !!sdk.ads);
            
            // Enable debug mode for better logging
            if (sdk.debugMode) {
                sdk.debugMode(true);
                console.log('SDK debug mode enabled');
            }
            
            // Signal that game is loading
            if (sdk.lifecycle && sdk.lifecycle.onLoading) {
                sdk.lifecycle.onLoading();
                console.log('SDK lifecycle onLoading called');
            }
        } else {
            console.log('Arkadium SDK not found - running in standalone mode');
        }
    } catch (e) {
        console.error('SDK initialization error:', e);
        console.log('Continuing without SDK...');
    }
    
    // Store SDK reference globally for use in other functions
    window.gameSDK = sdk;
    console.log('SDK stored globally:', !!window.gameSDK);

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
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'];

        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                // Random position across the screen
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';

                // Random size for variety
                const size = Math.random() * 8 + 6; // 6-14px
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';

                // Random color
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                // Random rotation
                const rotation = Math.random() * 360;
                confetti.style.transform = `rotate(${rotation}deg)`;

                // Random animation duration
                const duration = Math.random() * 2 + 3; // 3-5 seconds
                confetti.style.animationDuration = duration + 's';

                // Random horizontal drift
                const drift = (Math.random() - 0.5) * 200; // -100px to +100px
                confetti.style.setProperty('--drift', drift + 'px');

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), duration * 1000 + 500);
            }, i * 50); // Faster spawn rate
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

    // Show ad for hint
    function showAdForHint(hintType) {
        console.log('showAdForHint called with type:', hintType);
        console.log('SDK available:', !!window.gameSDK);
        console.log('SDK ads available:', !!(window.gameSDK && window.gameSDK.ads));
        
        // Check if we have the SDK available
        if (window.gameSDK && window.gameSDK.ads) {
            console.log('SDK ads object:', window.gameSDK.ads);
            console.log('Available ad methods:', Object.keys(window.gameSDK.ads));
            try {
                const adButton = document.createElement('div');
                adButton.className = 'ad-button';
                adButton.innerHTML = `
                    <div class="ad-button-content">
                        <i class="fas fa-video"></i>
                        <span>Watch an ad to get a hint</span>
                    </div>
                `;
                document.body.appendChild(adButton);
                
                adButton.addEventListener('click', async () => {
                    console.log('Ad button clicked');
                    adButton.remove();
                    
                    try {
                        // Show loading indicator
                        showMessage('Loading ad...');
                        console.log('Attempting to show rewarded ad...');
                        
                        // Show rewarded ad using the correct Arkadium SDK v2 API
                        console.log('Available ad methods:', Object.keys(window.gameSDK.ads || {}));
                        
                        // Try to show rewarded ad
                        let result;
                        try {
                            if (window.gameSDK.ads.showRewarded) {
                                result = await window.gameSDK.ads.showRewarded();
                            } else {
                                // Simulate successful ad for testing
                                console.log('Simulating ad for testing');
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                result = { completed: true };
                            }
                        } catch (adError) {
                            console.log('Ad error, simulating success:', adError);
                            result = { completed: true };
                        }
                        
                        console.log('Ad result:', result);
                        
                        if (result && result.completed) {
                            // Ad was successfully watched
                            console.log('Ad completed successfully');
                            showMessage('Thanks for watching! Here\'s your hint.');
                            
                            // Show the appropriate hint
                            if (hintType === 'letter') {
                                showLetterHintImpl();
                            } else {
                                showDefinitionHintImpl();
                            }
                        } else {
                            // Ad was not completed
                            console.log('Ad not completed');
                            showMessage('Ad not completed. Try again for a hint.');
                        }
                    } catch (error) {
                        console.error('Error showing ad:', error);
                        
                        // If ad fails, still give the hint (for better user experience)
                        showMessage('Ad couldn\'t be loaded. Here\'s your hint anyway!');
                        
                        if (hintType === 'letter') {
                            showLetterHintImpl();
                        } else {
                            showDefinitionHintImpl();
                        }
                    }
                });
                
                // Auto-remove button after 10 seconds if not clicked
                setTimeout(() => {
                    if (document.body.contains(adButton)) {
                        adButton.remove();
                        console.log('Ad button auto-removed after timeout');
                    }
                }, 10000);
            } catch (error) {
                console.error('Error setting up ad:', error);
                
                // Fallback to showing hint directly
                if (hintType === 'letter') {
                    showLetterHintImpl();
                } else {
                    showDefinitionHintImpl();
                }
            }
        } else {
            // No SDK available, show hint directly
            console.log('No SDK available, showing hint directly');
            if (hintType === 'letter') {
                showLetterHintImpl();
            } else {
                showDefinitionHintImpl();
            }
        }
    }
    
    // Letter hint - highlights the position that needs to change
    function showLetterHint() {
        showAdForHint('letter');
    }
    
    // Implementation of letter hint after ad is watched
    function showLetterHintImpl() {
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
        showAdForHint('definition');
    }
    
    // Implementation of definition hint after ad is watched
    function showDefinitionHintImpl() {
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
        if (resetBtn) resetBtn.addEventListener('click', resetGame);
        if (letterHintBtn) letterHintBtn.addEventListener('click', showLetterHint);
        if (definitionHintBtn) definitionHintBtn.addEventListener('click', showDefinitionHint);

        // Keyboard event listener
        document.addEventListener('keydown', handleKeyPress);

        console.log('Game initialization complete');
        
        // CRITICAL: Signal to Arkadium that the game is ready to be shown
        // This must be called AFTER all game elements are initialized
        if (window.gameSDK && window.gameSDK.lifecycle && window.gameSDK.lifecycle.onTestReady) {
            console.log('Calling onTestReady() to remove loading overlay...');
            window.gameSDK.lifecycle.onTestReady();
            console.log('onTestReady() called successfully - game should now be visible');
        } else {
            console.log('SDK or onTestReady not available - running in standalone mode');
        }
    }

    // Initialize the game
    console.log('About to call initGame()...');
    initGame();
    
    // Check if game UI is visible after initialization and force it to show
    setTimeout(() => {
        try {
            console.log('Attempting to force game visibility...');
            
            // Get references to key elements
            const menuScreen = document.getElementById('menu-screen');
            const gameScreen = document.getElementById('game-screen');
            const gameContainer = document.querySelector('.container');
            const body = document.body;
            
            console.log('Element check:');
            console.log('- Body:', !!body);
            console.log('- Container:', !!gameContainer);
            console.log('- Menu screen:', !!menuScreen);
            console.log('- Game screen:', !!gameScreen);
            
            // Force body and html to be visible and take full space
            document.documentElement.style.height = '100%';
            document.documentElement.style.width = '100%';
            document.documentElement.style.overflow = 'visible';
            document.documentElement.style.display = 'block';
            
            body.style.height = '100%';
            body.style.width = '100%';
            body.style.margin = '0';
            body.style.padding = '0';
            body.style.overflow = 'visible';
            body.style.display = 'block';
            body.style.visibility = 'visible';
            body.style.opacity = '1';
            body.style.position = 'static';
            
            // Force container to be visible
            if (gameContainer) {
                gameContainer.style.display = 'block';
                gameContainer.style.visibility = 'visible';
                gameContainer.style.opacity = '1';
                gameContainer.style.position = 'static';
                gameContainer.style.zIndex = '9999';
                gameContainer.style.width = '100%';
                gameContainer.style.height = 'auto';
                gameContainer.style.minHeight = '100vh';
                gameContainer.style.overflow = 'visible';
                console.log('Container styles applied');
            }
            
            // Force menu screen to be visible
            if (menuScreen) {
                menuScreen.style.display = 'block';
                menuScreen.style.visibility = 'visible';
                menuScreen.style.opacity = '1';
                console.log('Menu screen forced visible');
            }
            
            // Try to remove any loading screens or overlays
            const possibleOverlays = document.querySelectorAll('.loading, .overlay, .loader, [id*="loading"], [class*="loading"]');
            console.log('Found', possibleOverlays.length, 'possible overlays');
            possibleOverlays.forEach(overlay => {
                overlay.style.display = 'none';
                overlay.style.visibility = 'hidden';
                console.log('Hiding overlay:', overlay.className || overlay.id);
            });
            
            // Try to find the parent iframe and communicate with it
            try {
                if (window.parent && window.parent !== window) {
                    console.log('Found parent window, attempting to communicate');
                    window.parent.postMessage('gameReady', '*');
                }
            } catch (e) {
                console.log('Could not communicate with parent frame:', e);
            }
            
            console.log('Visibility enforcement complete');
        } catch (e) {
            console.error('Error during visibility enforcement:', e);
        }
    }, 1000);
    
    console.log('Game initialization completed');
}); 