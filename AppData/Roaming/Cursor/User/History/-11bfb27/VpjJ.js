const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Make sure canvas is properly sized
canvas.width = 800;
canvas.height = 600;

function drawBasicScene() {
    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky (light blue)
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);

    // Draw ground (green)
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

    // Draw road (grey)
    ctx.fillStyle = '#808080';
    const roadWidth = 300;
    const roadLeft = (canvas.width - roadWidth) / 2;
    ctx.fillRect(roadLeft, canvas.height/2, roadWidth, canvas.height/2);

    // Draw road lines (white)
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 20]); // Create dashed line
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

function gameLoop() {
    drawBasicScene();
    requestAnimationFrame(gameLoop);
}

// Start the game when page loads
window.onload = function() {
    console.log('Starting game...');
    gameLoop();
}; 