const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Make sure canvas is properly sized
canvas.width = 800;
canvas.height = 600;

// Car properties
let playerX = canvas.width / 2; // Car's horizontal position
const CAR = {
    width: 80,
    height: 40,
    y: canvas.height - 100 // Position car near bottom of screen
};

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
    ctx.setLineDash([]); // Reset line dash
}

function drawCar() {
    // Calculate car position (center on road)
    const carX = playerX - CAR.width / 2;
    
    // Draw car body (red)
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX, CAR.y, CAR.width, CAR.height);
    
    // Draw windshield (blue)
    ctx.fillStyle = '#000099';
    ctx.fillRect(carX + 15, CAR.y + 5, 30, 10);
    
    // Draw wheels (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 10, CAR.y + CAR.height - 8, 20, 8);  // left wheel
    ctx.fillRect(carX + CAR.width - 30, CAR.y + CAR.height - 8, 20, 8);  // right wheel
}

// Handle keyboard input
const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
    }
});

function updateCarPosition() {
    const SPEED = 5;
    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - SPEED, CAR.width/2);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + SPEED, canvas.width - CAR.width/2);
    }
}

function gameLoop() {
    updateCarPosition();
    drawBasicScene();
    drawCar();
    requestAnimationFrame(gameLoop);
}

// Start the game when page loads
window.onload = function() {
    console.log('Starting game...');
    gameLoop();
}; 