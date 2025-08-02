const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game state
let position = 0;
let speed = 0;
let playerX = 0;
let roadX = 0;

// Constants
const ROAD = {
    WIDTH: 250,
    HEIGHT: 300,
    SEGMENTS: 15
};

function drawRoad() {
    // Clear canvas
    ctx.fillStyle = '#87CEEB';  // Sky
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    ctx.fillStyle = '#2E8B57';  // Ground
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

    // Draw road segments
    let segmentHeight = ROAD.HEIGHT / ROAD.SEGMENTS;
    let roadWidth = ROAD.WIDTH;
    let curve = Math.sin(position/500) * 50; // Road curve calculation

    for(let i = ROAD.SEGMENTS; i > 0; i--) {
        let y = canvas.height - i * segmentHeight;
        let width = roadWidth * (i/ROAD.SEGMENTS);
        let segmentX = curve * (i/ROAD.SEGMENTS);
        
        // Road segment
        ctx.fillStyle = i % 2 === 0 ? '#808080' : '#909090';
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - width + segmentX, y + segmentHeight);
        ctx.lineTo(canvas.width/2 + width + segmentX, y + segmentHeight);
        ctx.lineTo(canvas.width/2 + (width * 1.2) + segmentX, y);
        ctx.lineTo(canvas.width/2 - (width * 1.2) + segmentX, y);
        ctx.closePath();
        ctx.fill();

        // Road lines
        if(i % 2 === 0) {
            // Center line
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 + segmentX, y);
            ctx.lineTo(canvas.width/2 + segmentX, y + segmentHeight);
            ctx.stroke();

            // Side lines
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - width + segmentX, y + segmentHeight);
            ctx.lineTo(canvas.width/2 - (width * 1.2) + segmentX, y);
            ctx.moveTo(canvas.width/2 + width + segmentX, y + segmentHeight);
            ctx.lineTo(canvas.width/2 + (width * 1.2) + segmentX, y);
            ctx.stroke();
        }
    }
}

function drawCar() {
    const carWidth = 60;
    const carHeight = 40;
    const carX = canvas.width/2 - carWidth/2 + playerX;
    const carY = canvas.height - carHeight - 20;

    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX, carY, carWidth, carHeight);
    
    // Windshield
    ctx.fillStyle = '#333333';
    ctx.fillRect(carX + 10, carY + 5, 20, 10);
    
    // Wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 10, carY + carHeight - 8, 15, 8);
    ctx.fillRect(carX + carWidth - 25, carY + carHeight - 8, 15, 8);
}

// Keyboard controls
const keys = {
    ArrowUp: false,
    ArrowDown: false,
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

function update() {
    // Speed control
    if (keys.ArrowUp) speed = Math.min(speed + 1, 20);
    if (keys.ArrowDown) speed = Math.max(speed - 1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    // Steering
    if (keys.ArrowLeft) playerX = Math.max(playerX - 5, -200);
    if (keys.ArrowRight) playerX = Math.min(playerX + 5, 200);

    // Update position
    position += speed;
}

function gameLoop() {
    update();
    drawRoad();
    drawCar();
    
    // Show speed
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Speed: ${Math.round(speed)}`, 20, 40);
    
    requestAnimationFrame(gameLoop);
}

// Start game
window.onload = function() {
    console.log('Game started');
    gameLoop();
};