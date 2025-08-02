class BlockBlast {
    constructor() {
        this.gridSize = 8;
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        this.score = 0;
        this.grid = [];
        this.pieces = [];
        this.draggedPiece = null;
        this.gameBoard = document.getElementById('game-board');
        this.piecesContainer = document.getElementById('pieces');
        this.scoreElement = document.getElementById('score');

        this.pieceShapes = [
            [[1, 0], [1, 0], [1, 1]],        // L shape
            [[1, 1, 1], [0, 1, 0]],          // T shape
            [[1, 1], [1, 1]],                // Square
            [[1, 1, 1, 1]],                  // Long line
            [[1, 1, 0], [0, 1, 1]],         // Z shape
            [[1], [1], [1]],                 // Vertical line
            [[1, 1]]                         // Small line
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
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
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
                element: this.createPieceElement(shape, color),
                placed: false
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
        pieceDiv.style.gridTemplateRows = `repeat(${shape.length}, 1fr)`;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                const block = document.createElement('div');
                block.className = 'piece-block';
                if (shape[i][j]) {
                    block.style.backgroundColor = color;
                    block.style.border = '1px solid rgba(255,255,255,0.3)';
                }
                pieceDiv.appendChild(block);
            }
        }

        return pieceDiv;
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    setupEventListeners() {
        this.piecesContainer.addEventListener('dragstart', (e) => {
            const pieceElement = e.target.closest('.piece');
            if (pieceElement) {
                const index = Array.from(this.piecesContainer.children).indexOf(pieceElement);
                this.draggedPiece = this.pieces[index];
                pieceElement.classList.add('dragging');
            }
        });

        this.piecesContainer.addEventListener('dragend', (e) => {
            const pieceElement = e.target.closest('.piece');
            if (pieceElement) {
                pieceElement.classList.remove('dragging');
                this.draggedPiece = null;
                this.clearGhostPieces();
            }
        });

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

        this.gameBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            const block = e.target.closest('.block');
            if (block && this.draggedPiece) {
                const row = parseInt(block.dataset.row);
                const col = parseInt(block.dataset.col);
                this.handlePieceDrop(row, col);
            }
        });

        // Optional: Add keyboard shortcut for restart
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.score = 0;
                this.updateScore();
                this.init();
            }
        });
    }

    clearGhostPieces() {
        this.gameBoard.querySelectorAll('.block.ghost').forEach(block => {
            block.classList.remove('ghost');
            block.style.backgroundColor = this.grid[block.dataset.row][block.dataset.col].filled ? 
                this.grid[block.dataset.row][block.dataset.col].color : '';
            block.style.opacity = '1';
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
                        block.style.opacity = '0.5';
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
            
            if (this.pieces.length === 0) {
                this.generateNewPieces();
            }
            
            if (!this.hasValidMoves()) {
                setTimeout(() => {
                    alert(`Game Over! Score: ${this.score}`);
                    this.init();
                }, 500);
            }
        }
        this.clearGhostPieces();
    }

    canPlacePiece(shape, startRow, startCol) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const row = startRow + i;
                    const col = startCol + j;
                    if (row >= this.gridSize || col >= this.gridSize || 
                        (row >= 0 && col >= 0 && this.grid[row][col].filled)) {
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
        const rowsToClear = [];
        const colsToClear = [];

        for (let i = 0; i < this.gridSize; i++) {
            if (this.grid[i].every(cell => cell.filled)) {
                rowsToClear.push(i);
                linesCleared++;
            }
        }

        for (let j = 0; j < this.gridSize; j++) {
            if (this.grid.every(row => row[j].filled)) {
                colsToClear.push(j);
                linesCleared++;
            }
        }

        if (linesCleared > 0) {
            this.animateClearing(rowsToClear, colsToClear);
            this.score += linesCleared * 100;
            setTimeout(() => this.updateScore(), 300);
        }
    }

    animateClearing(rows, cols) {
        rows.forEach(row => {
            this.grid[row].forEach(cell => {
                cell.element.classList.add('clearing');
            });
        });

        cols.forEach(col => {
            this.grid.forEach(row => {
                row[col].element.classList.add('clearing');
            });
        });

        setTimeout(() => {
            rows.forEach(row => this.clearRow(row));
            cols.forEach(col => this.clearColumn(col));
            this.gameBoard.querySelectorAll('.clearing').forEach(el => 
                el.classList.remove('clearing'));
        }, 300);
    }

    clearRow(row) {
        this.grid[row].forEach(cell => {
            cell.filled = false;
            cell.color = null;
            cell.element.style.backgroundColor = '';
            cell.element.classList.remove('placed');
        });
    }

    clearColumn(col) {
        this.grid.forEach(row => {
            row[col].filled = false;
            row[col].color = null;
            row[col].element.style.backgroundColor = '';
            row[col].element.classList.remove('placed');
        });
    }

    hasValidMoves() {
        for (const piece of this.pieces) {
            for (let i = 0; i < this.gridSize; i++) {
                for (let j = 0; j < this.gridSize; j++) {
                    if (this.canPlacePiece(piece.shape, i, j)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }
}

window.addEventListener('load', () => {
    new BlockBlast();
});