// Coffee Pour Game - Core Game Logic

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let gameActive = false;
let pouring = false;
let coffeeLevel = 0;
let cupFillLevel = 0;
const cupCapacity = 80;
const pourSpeed = 2;

// Game objects
const coffeePot = {
    x: canvas.width / 2,
    y: 100,
    width: 80,
    height: 120,
    rotation: 0
};

const cup = {
    x: canvas.width / 2,
    y: 350,
    width: 60,
    height: 80
};

// Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
canvas.addEventListener('mousedown', startPour);
canvas.addEventListener('mouseup', stopPour);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPour();
});
canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopPour();
});

// Initialize the game
function init() {
    // Draw initial game state
    drawGameElements();
    
    // Display instructions
    ctx.fillStyle = '#333';
    ctx.font = '18px Arial';
    ctx.fillText('Press Start to begin!', canvas.width / 2 - 80, 250);
}

function startGame() {
    gameActive = true;
    score = 0;
    coffeeLevel = 0;
    cupFillLevel = 0;
    updateScore();
    gameLoop();
}

function resetGame() {
    gameActive = false;
    pouring = false;
    coffeeLevel = 0;
    cupFillLevel = 0;
    score = 0;
    updateScore();
    coffeePot.rotation = 0;
    drawGameElements();
}

function startPour() {
    if (gameActive) {
        pouring = true;
        coffeePot.rotation = 45;
    }
}

function stopPour() {
    pouring = false;
    if (gameActive) {
        coffeePot.rotation = 0;
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function gameLoop() {
    if (!gameActive) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Game logic
    if (pouring) {
        coffeeLevel += pourSpeed;
        
        // Check if coffee is hitting the cup
        if (coffeeLevel >= 150) { // Arbitrary distance from pot to cup
            cupFillLevel += pourSpeed * 0.8; // Not all coffee makes it in the cup
            
            // Add score while successfully pouring into cup
            if (cupFillLevel < cupCapacity) {
                score += 1;
                updateScore();
            } else {
                // Game over on overflow
                gameActive = false;
                ctx.fillStyle = 'red';
                ctx.font = '24px Arial';
                ctx.fillText('Cup Overflow!', canvas.width / 2 - 80, 250);
                ctx.fillText('Final Score: ' + score, canvas.width / 2 - 70, 280);
                return;
            }
        }
    } else {
        // Coffee level recedes when not pouring
        coffeeLevel = Math.max(0, coffeeLevel - 5);
    }
    
    // Draw game elements
    drawGameElements();
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

function drawGameElements() {
    // Background
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw coffee pot
    ctx.save();
    ctx.translate(coffeePot.x, coffeePot.y);
    ctx.rotate(coffeePot.rotation * Math.PI / 180);
    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(-coffeePot.width / 2, -coffeePot.height / 2, coffeePot.width, coffeePot.height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(-coffeePot.width / 2, -coffeePot.height / 2, coffeePot.width, coffeePot.height);
    ctx.restore();
    
    // Draw coffee pour
    if (pouring && coffeeLevel > 0) {
        ctx.beginPath();
        ctx.moveTo(coffeePot.x + 20, coffeePot.y + 30);
        ctx.lineTo(coffeePot.x + 20, coffeePot.y + coffeeLevel);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#6f4e37';
        ctx.stroke();
    }
    
    // Draw cup
    ctx.fillStyle = '#fff';
    ctx.fillRect(cup.x - cup.width / 2, cup.y - cup.height / 2, cup.width, cup.height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(cup.x - cup.width / 2, cup.y - cup.height / 2, cup.width, cup.height);
    
    // Draw coffee in cup
    if (cupFillLevel > 0) {
        const coffeeHeight = (cupFillLevel / cupCapacity) * cup.height;
        ctx.fillStyle = '#6f4e37';
        ctx.fillRect(
            cup.x - cup.width / 2, 
            cup.y + cup.height / 2 - coffeeHeight, 
            cup.width, 
            coffeeHeight
        );
    }
    
    // Display score
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 30);
}

// Initialize the game on load
window.onload = init;
