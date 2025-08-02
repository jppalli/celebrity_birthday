class BlockBlast {
    constructor() {
        this.gridSize = 8;
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        this.score = 0;
        this.grid = [];
        this.pieces = [];
        this.selectedPiece = null;
        this.gameBoard = document.getElementById('game-board');
        this.piecesContainer = document.getElementById('pieces');
        this.scoreElement = document.getElementById('score');
        this.restartButton = document.getElementById('restart-button');

        this.pieceShapes = [
            // L shape
            [[1, 0], [1, 0], [1, 1]],
            // T shape
            [[1, 1, 1], [0, 1, 0]],
            // Square
            [[1, 1], [1, 1]],
            // Line
            [[1, 1, 1]],
            // Z shape
            [[1, 1, 0], [0, 1, 1]],
            // Corner
            [[1, 0], [1, 0], [1, 1]]
        ];

        this.init();
    }

    init() {
        this.createGrid();
        this.generateNewPieces();
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
                block.className = 'block';
                block.dataset.row = i;
                block.dataset.col = j;
                this.gameBoard.appendChild(block);
                this.grid[i][j] = {
                    element: block,
                    filled: false,
                    color: null
                };
            }
        }
    }

    generateNewPieces() {
        this.piecesContainer.innerHTML = '';
        this.pieces = [];

        for (let i = 0; i < 3; i++) {
            const shape = this.pieceShapes[Math.floor(Math.random() * this.pieceShapes.length)];
            const color = this.getRandomColor();
            const piece = {
                shape,
                color,
                element: this.createPieceElement(shape, color)
            };
            this.pieces.push(piece);
            this.piecesContainer.appendChild(piece.element);
        }
    }

    createPieceElement(shape, color) {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = 'piece';
        pieceDiv.style.gridTemplateColumns = `repeat(${shape[0].length}, 1fr)`;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                const block = document.createElement('div');
                block.className = 'block';
                block.style.backgroundColor = shape[i][j] ? color : 'transparent';
                pieceDiv.appendChild(block);
            }
        }

        return pieceDiv;
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    setupEventListeners() {
        this.gameBoard.addEventListener('click', (e) => {
            const block = e.target;
            if (block.classList.contains('block') && this.selectedPiece) {
                const row = parseInt(block.dataset.row);
                const col = parseInt(block.dataset.col);
                this.handleBlockClick(row, col);
            }
        });

        this.piecesContainer.addEventListener('click', (e) => {
            const pieceElement = e.target.closest('.piece');
            if (pieceElement) {
                const index = Array.from(this.piecesContainer.children).indexOf(pieceElement);
                this.selectPiece(index);
            }
        });

        this.restartButton.addEventListener('click', () => {
            this.score = 0;
            this.updateScore();
            this.init();
        });
    }

    selectPiece(index) {
        // Deselect previous piece
        if (this.selectedPiece !== null) {
            this.pieces[this.selectedPiece].element.classList.remove('selected');
        }

        this.selectedPiece = index;
        this.pieces[index].element.classList.add('selected');
        this.showGhostPiece();
    }

    showGhostPiece() {
        // Remove previous ghost pieces
        this.gameBoard.querySelectorAll('.ghost').forEach(block => {
            block.classList.remove('ghost');
        });

        // Show new ghost piece
        const piece = this.pieces[this.selectedPiece];
        const shape = piece.shape;
        const color = piece.color;

        for (let i = 0; i < this.gridSize - shape.length + 1; i++) {
            for (let j = 0; j < this.gridSize - shape[0].length + 1; j++) {
                if (this.canPlacePiece(shape, i, j)) {
                    this.placeGhostPiece(shape, i, j, color);
                }
            }
        }
    }

    canPlacePiece(shape, startRow, startCol) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const row = startRow + i;
                    const col = startCol + j;
                    if (this.grid[row][col].filled) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placeGhostPiece(shape, startRow, startCol, color) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const block = this.grid[startRow + i][startCol + j].element;
                    block.style.backgroundColor = color;
                    block.classList.add('ghost');
                }
            }
        }
    }

    handleBlockClick(row, col) {
        const piece = this.pieces[this.selectedPiece];
        if (this.canPlacePiece(piece.shape, row, col)) {
            this.placePiece(piece.shape, row, col, piece.color);
            piece.element.remove();
            this.pieces.splice(this.selectedPiece, 1);
            this.selectedPiece = null;

            if (this.pieces.length === 0) {
                this.generateNewPieces();
                if (!this.hasValidMoves()) {
                    alert('Game Over! Your score: ' + this.score);
                }
            } else {
                this.selectPiece(0);
            }
        }
    }

    placePiece(shape, startRow, startCol, color) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const block = this.grid[startRow + i][startCol + j];
                    block.filled = true;
                    block.color = color;
                    block.element.style.backgroundColor = color;
                    block.element.classList.add('placed');
                }
            }
        }

        this.checkLines();
    }

    checkLines() {
        let linesCleared = 0;

        // Check rows
        for (let i = 0; i < this.gridSize; i++) {
            if (this.grid[i].every(cell => cell.filled)) {
                this.clearRow(i);
                linesCleared++;
            }
        }

        // Check columns
        for (let j = 0; j < this.gridSize; j++) {
            if (this.grid.every(row => row[j].filled)) {
                this.clearColumn(j);
                linesCleared++;
            }
        }

        if (linesCleared > 0) {
            this.score += linesCleared * 100;
            this.updateScore();
        }
    }

    clearRow(row) {
        for (let j = 0; j < this.gridSize; j++) {
            this.grid[row][j].filled = false;
            this.grid[row][j].color = null;
            this.grid[row][j].element.style.backgroundColor = '';
            this.grid[row][j].element.classList.remove('placed');
        }
    }

    clearColumn(col) {
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i][col].filled = false;
            this.grid[i][col].color = null;
            this.grid[i][col].element.style.backgroundColor = '';
            this.grid[i][col].element.classList.remove('placed');
        }
    }

    hasValidMoves() {
        for (const piece of this.pieces) {
            for (let i = 0; i < this.gridSize - piece.shape.length + 1; i++) {
                for (let j = 0; j < this.gridSize - piece.shape[0].length + 1; j++) {
                    if (this.canPlacePiece(piece.shape, i, j)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new BlockBlast();
}); 