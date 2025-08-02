class BlockBlast {
    constructor() {
        this.gridSize = 8;
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        this.score = 0;
        this.grid = [];
        this.pieces = [];
        this.selectedPiece = null;
        this.draggedPiece = null;
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
        pieceDiv.draggable = true;
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
        // Drag and drop events for pieces
        this.piecesContainer.addEventListener('dragstart', (e) => {
            const pieceElement = e.target.closest('.piece');
            if (pieceElement) {
                const index = Array.from(this.piecesContainer.children).indexOf(pieceElement);
                this.draggedPiece = this.pieces[index];
                e.dataTransfer.setData('text/plain', index);
                pieceElement.style.opacity = '0.4';
            }
        });

        this.piecesContainer.addEventListener('dragend', (e) => {
            const pieceElement = e.target.closest('.piece');
            if (pieceElement) {
                pieceElement.style.opacity = '1';
            }
        });

        // Drag over and drop events for the game board
        this.gameBoard.addEventListener('dragover', (e) => {
            e.preventDefault();
            const block = e.target.closest('.block');
            if (block && this.draggedPiece) {
                this.clearGhostPieces();
                const row = parseInt(block.dataset.row);
                const col = parseInt(block.dataset.col);
                if (this.canPlacePiece(this.draggedPiece.shape, row, col)) {
                    this.showGhostPiece(row, col);
                }
            }
        });

        this.gameBoard.addEventListener('dragleave', () => {
            this.clearGhostPieces();
        });

        this.gameBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            this.clearGhostPieces();
            
            const block = e.target.closest('.block');
            if (block && this.draggedPiece) {
                const row = parseInt(block.dataset.row);
                const col = parseInt(block.dataset.col);
                this.handlePieceDrop(row, col);
            }
        });

        // Restart button
        this.restartButton.addEventListener('click', () => {
            this.score = 0;
            this.updateScore();
            this.init();
        });
    }

    clearGhostPieces() {
        this.gameBoard.querySelectorAll('.block').forEach(block => {
            block.classList.remove('ghost');
            block.style.backgroundColor = '';
        });
    }

    showGhostPiece(startRow, startCol) {
        const shape = this.draggedPiece.shape;
        const color = this.draggedPiece.color;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const row = startRow + i;
                    const col = startCol + j;
                    if (row < this.gridSize && col < this.gridSize) {
                        const block = this.grid[row][col].element;
                        block.style.backgroundColor = color;
                        block.style.opacity = '0.3';
                        block.classList.add('ghost');
                    }
                }
            }
        }
    }

    handlePieceDrop(row, col) {
        if (this.canPlacePiece(this.draggedPiece.shape, row, col)) {
            this.placePiece(this.draggedPiece.shape, row, col, this.draggedPiece.color);
            this.draggedPiece.element.remove();
            this.pieces = this.pieces.filter(p => p !== this.draggedPiece);
            this.draggedPiece = null;

            if (this.pieces.length === 0) {
                this.generateNewPieces();
                if (!this.hasValidMoves()) {
                    alert('Game Over! Your score: ' + this.score);
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
                    if (row >= this.gridSize || col >= this.gridSize || this.grid[row][col].filled) {
                        return false;
                    }
                }
            }
        }
        return true;
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