// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game loop function
function gameLoop() {
    // Clear the canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a neon pink horizon line
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 2);

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop(); 