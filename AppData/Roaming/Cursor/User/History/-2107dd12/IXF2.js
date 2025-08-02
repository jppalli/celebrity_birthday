// Game constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    '#FF0D72', // I
    '#0DC2FF', // J
    '#0DFF72', // L
    '#F538FF', // O
    '#FF8E0D', // S
    '#FFE138', // T
    '#3877FF'  // Z
];

// Tetromino shapes
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]]  // Z
];

// Game state
let canvas, ctx;
let board = [];
let currentPiece = null;
let currentPiecePosition = { x: 0, y: 0 };
let score = 0;
let level = 1;
let gameLoop = null;
let dropCounter = 0;
let dropInterval = 1000;

// Initialize the game
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    
    // Initialize board
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    
    // Start game
    spawnPiece();
    updateScore();
    gameLoop = setInterval(update, 1000 / 60);
}

// Spawn a new piece
function spawnPiece() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    currentPiece = {
        shape: SHAPES[randomIndex],
        color: COLORS[randomIndex]
    };
    currentPiecePosition = {
        x: Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2),
        y: 0
    };
    
    if (checkCollision()) {
        gameOver();
    }
}

// Check for collisions
function checkCollision() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardX = currentPiecePosition.x + x;
                const boardY = currentPiecePosition.y + y;
                
                if (boardX < 0 || boardX >= COLS || 
                    boardY >= ROWS ||
                    (boardY >= 0 && board[boardY][boardX])) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Merge piece with board
function merge() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardY = currentPiecePosition.y + y;
                if (boardY >= 0) {
                    board[boardY][currentPiecePosition.x + x] = currentPiece.color;
                }
            }
        }
    }
    clearLines();
    spawnPiece();
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        score += linesCleared * 100 * level;
        updateScore();
    }
}

// Update game state
function update() {
    dropCounter += 1000 / 60;
    
    if (dropCounter > dropInterval) {
        moveDown();
        dropCounter = 0;
    }
    
    draw();
}

// Draw game state
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                ctx.fillStyle = board[y][x];
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
            }
        }
    }
    
    // Draw current piece
    if (currentPiece) {
        ctx.fillStyle = currentPiece.color;
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    ctx.fillRect(
                        (currentPiecePosition.x + x) * BLOCK_SIZE,
                        (currentPiecePosition.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE - 1,
                        BLOCK_SIZE - 1
                    );
                }
            }
        }
    }
}

// Move piece down
function moveDown() {
    currentPiecePosition.y++;
    if (checkCollision()) {
        currentPiecePosition.y--;
        merge();
    }
}

// Move piece left
function moveLeft() {
    currentPiecePosition.x--;
    if (checkCollision()) {
        currentPiecePosition.x++;
    }
}

// Move piece right
function moveRight() {
    currentPiecePosition.x++;
    if (checkCollision()) {
        currentPiecePosition.x--;
    }
}

// Rotate piece
function rotate() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );
    
    const previousShape = currentPiece.shape;
    currentPiece.shape = rotated;
    
    if (checkCollision()) {
        currentPiece.shape = previousShape;
    }
}

// Drop piece instantly
function drop() {
    while (!checkCollision()) {
        currentPiecePosition.y++;
    }
    currentPiecePosition.y--;
    merge();
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    alert('Game Over! Score: ' + score);
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    dropInterval = 1000;
    updateScore();
    gameLoop = setInterval(update, 1000 / 60);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: // Left arrow
            moveLeft();
            break;
        case 39: // Right arrow
            moveRight();
            break;
        case 40: // Down arrow
            moveDown();
            break;
        case 38: // Up arrow
            rotate();
            break;
        case 32: // Space
            drop();
            break;
    }
});

// Start the game
init(); 