// Leaderboard Manager
class LeaderboardManager {
    constructor() {
        this.playerData = {
            totalScore: 0,
            storiesCompleted: 0,
            medals: {
                bronze: 0,
                silver: 0,
                gold: 0
            },
            playerName: "WordSmith"
        };
    }

    // Initialize leaderboard page
    init() {
        this.loadPlayerData();
        this.setCurrentDate();
        this.generateStats();
        this.generateLeaderboard();
        this.createInkSplotches();
    }

    // Load player data from localStorage
    loadPlayerData() {
        const savedData = localStorage.getItem('playerData');
        if (savedData) {
            this.playerData = JSON.parse(savedData);
        }
    }

    // Set current date
    setCurrentDate() {
        const now = new Date();
        const currentDateEl = document.getElementById('currentDate');
        if (currentDateEl) {
            currentDateEl.textContent = now.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    }

    // Generate player statistics
    generateStats() {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;

        const totalMedals = this.playerData.medals.gold + this.playerData.medals.silver + this.playerData.medals.bronze;
        
        statsGrid.innerHTML = `
            <div class="stat-item">
                <div class="stat-value">${this.playerData.totalScore}</div>
                <div class="stat-label">Total Score</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${this.playerData.storiesCompleted}</div>
                <div class="stat-label">Stories Completed</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${totalMedals}</div>
                <div class="stat-label">Medals Earned</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${this.playerData.medals.gold}🥇 ${this.playerData.medals.silver}🥈 ${this.playerData.medals.bronze}🥉</div>
                <div class="stat-label">Medal Breakdown</div>
            </div>
        `;
    }

    // Generate leaderboard
    generateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;

        leaderboardList.innerHTML = '';
        
        // Sample leaderboard data
        const leaderboard = [
            { name: "WordMaster", score: 1250, stories: 15, medals: { gold: 8, silver: 4, bronze: 3 } },
            { name: "LexiLegend", score: 980, stories: 12, medals: { gold: 5, silver: 4, bronze: 3 } },
            { name: "VocabVictor", score: 875, stories: 10, medals: { gold: 4, silver: 3, bronze: 3 } },
            { name: this.playerData.playerName, score: this.playerData.totalScore, stories: this.playerData.storiesCompleted, medals: this.playerData.medals },
            { name: "GrammarGuru", score: 650, stories: 8, medals: { gold: 2, silver: 3, bronze: 3 } },
            { name: "StorySmith", score: 580, stories: 7, medals: { gold: 1, silver: 3, bronze: 3 } },
            { name: "TaleTeller", score: 520, stories: 6, medals: { gold: 1, silver: 2, bronze: 3 } },
            { name: "NarrativeNinja", score: 480, stories: 5, medals: { gold: 0, silver: 2, bronze: 3 } }
        ];
        
        // Sort by score
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Display all entries
        leaderboard.forEach((player, index) => {
            const entry = this.createLeaderboardEntry(player, index);
            leaderboardList.appendChild(entry);
        });
    }

    // Create individual leaderboard entry
    createLeaderboardEntry(player, index) {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        
        if (player.name === this.playerData.playerName) {
            entry.classList.add('player-you');
        }
        
        const totalMedals = player.medals.gold + player.medals.silver + player.medals.bronze;
        
        entry.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-stats">${player.stories} stories • ${totalMedals} medals</div>
            </div>
            <div class="player-score">${player.score}</div>
        `;
        
        return entry;
    }

    // Create ink splotches
    createInkSplotches() {
        const container = document.querySelector('.newspaper-container');
        if (!container) return;

        for (let i = 0; i < 5; i++) {
            const splotch = document.createElement('div');
            splotch.className = 'ink-splotch';
            splotch.style.top = `${Math.random() * 100}%`;
            splotch.style.left = `${Math.random() * 100}%`;
            splotch.style.opacity = Math.random() * 0.2 + 0.1;
            splotch.style.transform = `scale(${Math.random() * 0.8 + 0.5}) rotate(${Math.random() * 360}deg)`;
            container.appendChild(splotch);
        }
    }

    // Add player to leaderboard
    addPlayerToLeaderboard(playerData) {
        const leaderboard = this.getLeaderboard();
        leaderboard.push(playerData);
        leaderboard.sort((a, b) => b.score - a.score);
        this.saveLeaderboard(leaderboard);
    }

    // Get leaderboard from localStorage
    getLeaderboard() {
        return JSON.parse(localStorage.getItem('leaderboard') || '[]');
    }

    // Save leaderboard to localStorage
    saveLeaderboard(leaderboard) {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    // Update player statistics
    updatePlayerStats(newStats) {
        this.playerData = { ...this.playerData, ...newStats };
        localStorage.setItem('playerData', JSON.stringify(this.playerData));
        this.generateStats();
        this.generateLeaderboard();
    }

    // Get player rank
    getPlayerRank() {
        const leaderboard = this.getLeaderboard();
        const playerEntry = leaderboard.find(player => player.name === this.playerData.playerName);
        if (playerEntry) {
            return leaderboard.indexOf(playerEntry) + 1;
        }
        return null;
    }

    // Get top players
    getTopPlayers(count = 10) {
        const leaderboard = this.getLeaderboard();
        return leaderboard.slice(0, count);
    }

    // Calculate player level based on score
    calculatePlayerLevel(score) {
        if (score >= 1000) return { level: 10, title: "Word Master" };
        if (score >= 800) return { level: 9, title: "Lexi Legend" };
        if (score >= 600) return { level: 8, title: "Vocab Victor" };
        if (score >= 400) return { level: 7, title: "Grammar Guru" };
        if (score >= 300) return { level: 6, title: "Story Smith" };
        if (score >= 200) return { level: 5, title: "Tale Teller" };
        if (score >= 100) return { level: 4, title: "Narrative Ninja" };
        if (score >= 50) return { level: 3, title: "Word Weaver" };
        if (score >= 25) return { level: 2, title: "Story Starter" };
        return { level: 1, title: "Word Novice" };
    }

    // Get achievement badges
    getAchievementBadges() {
        const badges = [];
        
        if (this.playerData.storiesCompleted >= 10) {
            badges.push({ name: "Story Collector", icon: "📚", description: "Completed 10 stories" });
        }
        
        if (this.playerData.medals.gold >= 5) {
            badges.push({ name: "Golden Wordsmith", icon: "🏆", description: "Earned 5 gold medals" });
        }
        
        if (this.playerData.totalScore >= 500) {
            badges.push({ name: "Score Champion", icon: "⭐", description: "Reached 500 total score" });
        }
        
        if (this.playerData.storiesCompleted >= 5 && this.playerData.medals.silver >= 3) {
            badges.push({ name: "Consistent Creator", icon: "🎯", description: "Consistent high performance" });
        }
        
        return badges;
    }

    // Export leaderboard data
    exportLeaderboard() {
        const leaderboard = this.getLeaderboard();
        const dataStr = JSON.stringify(leaderboard, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'word-weaver-leaderboard.json';
        link.click();
    }

    // Import leaderboard data
    importLeaderboard(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const leaderboard = JSON.parse(e.target.result);
                this.saveLeaderboard(leaderboard);
                this.generateLeaderboard();
            } catch (error) {
                console.error('Error importing leaderboard:', error);
            }
        };
        reader.readAsText(file);
    }
}

// Create global instance
window.LeaderboardManager = new LeaderboardManager();

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('leaderboard.html')) {
        window.LeaderboardManager.init();
    }
}); 