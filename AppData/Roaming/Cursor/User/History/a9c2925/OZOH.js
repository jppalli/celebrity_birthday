// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game state
const gameState = {
    player: {
        x: canvas.width / 2,  // Start in center
        y: canvas.height - 100,
        width: 40,
        height: 80,
        speed: 5
    },
    keys: {
        left: false,
        right: false
    }
};

// Input handling
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = true;
    if (e.key === 'ArrowRight') gameState.keys.right = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = false;
    if (e.key === 'ArrowRight') gameState.keys.right = false;
});

// Update game state
function update() {
    // Update player position based on input
    if (gameState.keys.left && gameState.player.x > 0) {
        gameState.player.x -= gameState.player.speed;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width) {
        gameState.player.x += gameState.player.speed;
    }
}

// Render game state
function render() {
    // Clear the canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the horizon line
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 2);

    // Draw the player car
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        gameState.player.x,
        gameState.player.y - gameState.player.height,
        gameState.player.width,
        gameState.player.height
    );
}

// Game loop function
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function gameLoop(currentTime) {
    // Calculate delta time
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Update and render if enough time has passed
    if (deltaTime >= frameInterval) {
        update();
        render();
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop); 