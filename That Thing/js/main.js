// Main game initialization
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen and show game
    const loadingScreen = document.getElementById('loading-screen');
    const gameApp = document.getElementById('game-app');
    
    // Simulate loading time for better UX
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        gameApp.style.display = 'block';
        
        // Initialize React app
        const root = ReactDOM.createRoot(gameApp);
        root.render(React.createElement(GameApp));
        
        // Add entrance animation to the game
        window.animationManager.addEntranceAnimation(gameApp, 'fadeInUp');
        
    }, 1500);
});

// Global game utilities
window.gameUtils = {
    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Get ordinal suffix for numbers
    getOrdinal: (num) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    },
    
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },
    
    // Share game results
    shareResults: (gameState) => {
        const { targetWord, guessCount, gameWon } = gameState;
        const result = gameWon ? `Found "${targetWord}" in ${guessCount} guesses!` : `Still hunting for the object...`;
        const text = `Object Hunter 🎯\n${result}\nPlay at: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Object Hunter Game',
                text: text,
                url: window.location.href
            });
        } else {
            window.gameUtils.copyToClipboard(text);
            // Could show a toast notification here
        }
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Ctrl/Cmd + R for new game
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        // Trigger new game if game is loaded
        const newGameButton = document.querySelector('[data-action="new-game"]');
        if (newGameButton) {
            newGameButton.click();
        }
    }
});

// Performance monitoring
window.performance.mark('game-start');

// Error handling
window.addEventListener('error', function(e) {
    console.error('Game error:', e.error);
    // Could implement error reporting here
});

// Visibility change handling (pause/resume)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Game is hidden, could pause timers here
        console.log('Game paused');
    } else {
        // Game is visible again
        console.log('Game resumed');
    }
});

console.log('Object Hunter game initialized! 🎯');