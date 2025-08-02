class BlockBlast {
    constructor() {
        this.gridSize = 8;
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        this.score = 0;
        this.grid = [];
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score');
        this.restartButton = document.getElementById('restart-button');

        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
        this.updateScore();
    }

    createGrid() {
        this.gameBoard.innerHTML = '';
        this.grid = [];

        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                const block = document.createElement('div');
                const color = this.getRandomColor();
                block.className = 'block';
                block.style.backgroundColor = color;
                block.dataset.row = i;
                block.dataset.col = j;
                this.gameBoard.appendChild(block);
                this.grid[i][j] = {
                    element: block,
                    color: color
                };
            }
        }
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    setupEventListeners() {
        this.gameBoard.addEventListener('click', (e) => {
            const block = e.target;
            if (block.classList.contains('block')) {
                const row = parseInt(block.dataset.row);
                const col = parseInt(block.dataset.col);
                this.handleBlockClick(row, col);
            }
        });

        this.restartButton.addEventListener('click', () => {
            this.score = 0;
            this.updateScore();
            this.createGrid();
        });
    }

    handleBlockClick(row, col) {
        const matches = this.findMatches(row, col);
        if (matches.length >= 3) {
            this.removeMatches(matches);
        }
    }

    findMatches(row, col) {
        const matches = [];
        const visited = new Set();
        const color = this.grid[row][col].color;

        const checkNeighbor = (r, c) => {
            const key = `${r}-${c}`;
            if (
                r < 0 || r >= this.gridSize ||
                c < 0 || c >= this.gridSize ||
                visited.has(key)
            ) {
                return;
            }

            if (this.grid[r][c].color === color) {
                matches.push({ row: r, col: c });
                visited.add(key);
                checkNeighbor(r + 1, c);
                checkNeighbor(r - 1, c);
                checkNeighbor(r, c + 1);
                checkNeighbor(r, c - 1);
            }
        };

        checkNeighbor(row, col);
        return matches;
    }

    removeMatches(matches) {
        matches.forEach(({ row, col }) => {
            const newColor = this.getRandomColor();
            this.grid[row][col].color = newColor;
            this.grid[row][col].element.style.backgroundColor = newColor;
        });

        this.score += matches.length * 10;
        this.updateScore();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new BlockBlast();
}); 