// Core game logic functions
class GameLogic {
    constructor() {
        this.targetWord = '';
        this.guesses = [];
        this.gameWon = false;
        this.guessCount = 0;
        this.gameStats = this.loadStats();
        this.hintsUsed = 0;
    }

    // Initialize a new game
    startNewGame() {
        this.targetWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
        this.guesses = [];
        this.gameWon = false;
        this.guessCount = 0;
        this.hintsUsed = 0;
        
        console.log('New game started. Target word:', this.targetWord); // Debug only
        return this.targetWord;
    }

    // Calculate similarity between guess and target
    calculateSimilarity(guessWord, target = this.targetWord) {
        if (guessWord === target) return 100;

        const targetData = PHYSICAL_ATTRIBUTES[target];
        const guessData = PHYSICAL_ATTRIBUTES[guessWord];

        // If target doesn't exist in our data, return random low score
        if (!targetData) return Math.floor(Math.random() * 20) + 5;

        // If guess doesn't exist in our data, return very low similarity
        if (!guessData) {
            return Math.floor(Math.random() * 15) + 5;
        }

        // Calculate physical attribute similarity
        const sizeDiff = Math.abs(targetData.size - guessData.size);
        const hardnessDiff = Math.abs(targetData.hardness - guessData.hardness);
        const weightDiff = Math.abs(targetData.weight - guessData.weight);
        const temperatureDiff = Math.abs(targetData.temperature - guessData.temperature);

        const physicalSimilarity = 100 - ((sizeDiff + hardnessDiff + weightDiff + temperatureDiff) / 4);

        // Category and attribute bonuses
        const categoryBonus = targetData.category === guessData.category ? 25 : 0;
        const materialBonus = targetData.material === guessData.material ? 15 : 0;
        const shapeBonus = targetData.shape === guessData.shape ? 10 : 0;
        const locationBonus = targetData.location === guessData.location ? 10 : 0;
        const functionBonus = targetData.function === guessData.function ? 15 : 0;

        const totalSimilarity = physicalSimilarity + categoryBonus + materialBonus + 
                               shapeBonus + locationBonus + functionBonus;

        return Math.min(95, Math.max(5, Math.round(totalSimilarity)));
    }

    // Process a new guess
    processGuess(guessWord) {
        if (!guessWord.trim() || this.gameWon) return null;

        const cleanGuess = guessWord.toLowerCase().trim();
        
        // Check if already guessed
        if (this.guesses.find(g => g.word === cleanGuess)) {
            return { error: 'Already guessed!' };
        }

        const similarity = this.calculateSimilarity(cleanGuess);
        const newGuess = {
            word: cleanGuess,
            similarity,
            id: Date.now(),
            attributes: PHYSICAL_ATTRIBUTES[cleanGuess] || null,
            guessNumber: this.guessCount + 1
        };

        this.guesses.push(newGuess);
        this.guesses.sort((a, b) => b.similarity - a.similarity);
        this.guessCount++;

        // Check if won
        if (similarity === 100) {
            this.gameWon = true;
            this.updateStats(true);
        }

        return newGuess;
    }

    // Get similarity level info
    getSimilarityLevel(similarity) {
        for (const [key, level] of Object.entries(SIMILARITY_LEVELS)) {
            if (similarity >= level.min && similarity <= level.max) {
                return { ...level, key };
            }
        }
        return SIMILARITY_LEVELS.different;
    }

    // Get hint for current target
    getHint() {
        if (!this.targetWord || this.hintsUsed >= 3) return null;

        const targetData = PHYSICAL_ATTRIBUTES[this.targetWord];
        if (!targetData) return null;

        const hints = [
            `Material: ${targetData.material}`,
            `Category: ${targetData.category}`,
            `Used for: ${targetData.function}`,
            `Location: ${targetData.location}`,
            `Shape: ${targetData.shape}`
        ];

        const hint = hints[this.hintsUsed];
        this.hintsUsed++;
        return hint;
    }

    // Load game statistics
    loadStats() {
        try {
            const saved = localStorage.getItem('objectHunterStats');
            return saved ? JSON.parse(saved) : { ...DEFAULT_STATS };
        } catch (error) {
            console.error('Error loading stats:', error);
            return { ...DEFAULT_STATS };
        }
    }

    // Save game statistics
    saveStats() {
        try {
            localStorage.setItem('objectHunterStats', JSON.stringify(this.gameStats));
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }

    // Update statistics after game
    updateStats(won) {
        this.gameStats.gamesPlayed++;
        this.gameStats.totalGuesses += this.guessCount;

        if (won) {
            this.gameStats.gamesWon++;
            this.gameStats.winStreak++;
            this.gameStats.maxWinStreak = Math.max(this.gameStats.maxWinStreak, this.gameStats.winStreak);
            
            if (!this.gameStats.bestGame || this.guessCount < this.gameStats.bestGame) {
                this.gameStats.bestGame = this.guessCount;
            }
        } else {
            this.gameStats.winStreak = 0;
        }

        this.gameStats.averageGuesses = Math.round(this.gameStats.totalGuesses / this.gameStats.gamesPlayed);
        this.saveStats();
    }

    // Get current game state
    getGameState() {
        return {
            targetWord: this.targetWord,
            guesses: this.guesses,
            gameWon: this.gameWon,
            guessCount: this.guessCount,
            hintsUsed: this.hintsUsed,
            stats: this.gameStats
        };
    }

    // Reset all statistics
    resetStats() {
        this.gameStats = { ...DEFAULT_STATS };
        this.saveStats();
    }
}

// Export for use in other files
window.GameLogic = GameLogic;