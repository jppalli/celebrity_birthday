const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const ROAD_WIDTH = 2000;
const SEGMENTS_PER_ROAD = 500;
const SEGMENT_LENGTH = 200;
const CAMERA_HEIGHT = 1000;
const CAMERA_DEPTH = 0.84;

// Player state
let playerX = 0;
let speed = 0;
const MAX_SPEED = 300;
const ACCELERATION = 0.5;
const DECELERATION = 0.3;

// Road state
let position = 0;

// Key states
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

// Handle keyboard input
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Modify the CAR constants to ensure visibility
const CAR = {
    width: 80,
    height: 40,
    x: 0,
    y: canvas.height - 100  // Position car higher up from bottom
};

function drawRoad() {
    ctx.fillStyle = '#87CEEB'; // Sky
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#654321'; // Ground
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

    // Draw road segments
    let basePos = position % SEGMENT_LENGTH;
    
    for(let n = 0; n < 25; n++) {
        let z = (n * SEGMENT_LENGTH + basePos);
        
        let p1 = project(0, 0, z);
        let p2 = project(0, 0, z + SEGMENT_LENGTH);
        
        let width1 = (ROAD_WIDTH * p1.scale);
        let width2 = (ROAD_WIDTH * p2.scale);
        
        let x1 = Math.floor(canvas.width/2 + (p1.x - width1/2));
        let x2 = Math.floor(canvas.width/2 + (p2.x - width2/2));
        let y1 = Math.floor(p1.y);
        let y2 = Math.floor(p2.y);

        // Draw road segment
        ctx.fillStyle = (n % 2) ? '#808080' : '#909090';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + width1, y1);
        ctx.lineTo(x2 + width2, y2);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
    }
}

function project(x, y, z) {
    let scale = CAMERA_DEPTH / (z + CAMERA_HEIGHT);
    let projX = x * scale;
    let projY = (canvas.height/2) + (y * scale);
    return {
        x: projX,
        y: projY,
        scale: scale
    };
}

function drawCar() {
    // Add debug rectangle to verify drawing position
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, CAR.y, 50, 50); // Debug square

    // Draw car with absolute positioning
    const carX = (canvas.width / 2) + playerX - (CAR.width / 2);
    const carY = CAR.y;

    // Make car bigger and brighter
    ctx.fillStyle = '#FF0000'; // Bright red
    ctx.fillRect(carX, carY, CAR.width, CAR.height);
    
    // Draw windshield
    ctx.fillStyle = '#000000'; // Black
    ctx.fillRect(carX + 15, carY + 5, 30, 10);
    
    // Draw wheels
    ctx.fillStyle = '#000000'; // Black
    ctx.fillRect(carX + 10, carY + CAR.height - 8, 20, 8);  // left wheel
    ctx.fillRect(carX + CAR.width - 30, carY + CAR.height - 8, 20, 8);  // right wheel

    // Debug info
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Car Position: ${carX}, ${carY}`, 10, 30);
    ctx.fillText(`Player X: ${playerX}`, 10, 60);
}

function update() {
    // Handle player input
    if (keys.ArrowUp) speed = Math.min(speed + ACCELERATION, MAX_SPEED);
    if (keys.ArrowDown) speed = Math.max(speed - DECELERATION, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95; // Natural deceleration
    
    // Make steering more responsive
    const STEERING_SPEED = 7;  // Adjust this value to change steering sensitivity
    if (keys.ArrowLeft) playerX = Math.max(playerX - STEERING_SPEED, -ROAD_WIDTH/2);
    if (keys.ArrowRight) playerX = Math.min(playerX + STEERING_SPEED, ROAD_WIDTH/2);
    
    position += speed;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas first
    update();
    drawRoad();
    drawCar();  // Draw car last
    requestAnimationFrame(gameLoop);
}

// Add this debug code at the start of your file
window.addEventListener('load', () => {
    console.log('Game loaded');
    console.log('Canvas dimensions:', canvas.width, canvas.height);
    console.log('Car settings:', CAR);
});

gameLoop(); 