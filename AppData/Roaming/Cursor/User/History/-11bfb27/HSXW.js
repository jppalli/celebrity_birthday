const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants for the scene
const ROAD = {
    width: 2000,
    segmentLength: 200,
    rumbleWidth: 10,
    lanes: 3
};

const COLORS = {
    sky: '#72D7EE',
    grass: '#10AA10',
    road: '#696969',
    rumble: '#555555',
    lane: '#FFFFFF'
};

// Add some clouds
const clouds = [
    { x: 100, y: 100, width: 120, height: 40 },
    { x: 400, y: 50, width: 180, height: 50 },
    { x: 700, y: 150, width: 150, height: 45 }
];

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

// Add these constants for the car
const CAR = {
    width: 80,
    height: 40,
    x: 0,      // x offset from center
    y: 500     // y position from top
};

function drawSky() {
    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height/2);
    gradient.addColorStop(0, '#6BB5FF');    // Light blue
    gradient.addColorStop(1, '#AAD6FF');    // Lighter blue at horizon
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    // Draw clouds
    ctx.fillStyle = '#FFFFFF';
    clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.height/2, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.height/2, cloud.y - cloud.height/4, cloud.height/3, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.height, cloud.y, cloud.height/2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawGround() {
    // Draw grass gradient
    const gradient = ctx.createLinearGradient(0, canvas.height/2, 0, canvas.height);
    gradient.addColorStop(0, '#10AA10');    // Lighter grass
    gradient.addColorStop(1, '#008000');    // Darker grass
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
}

function drawRoad() {
    // Road base
    ctx.fillStyle = COLORS.road;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
    
    // Road lines
    ctx.strokeStyle = COLORS.lane;
    ctx.lineWidth = 5;
    ctx.setLineDash([40, 40]); // Create dashed line
    
    // Draw three lane lines
    for(let i = 1; i < ROAD.lanes; i++) {
        const x = canvas.width * (i/ROAD.lanes);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height/2);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    ctx.setLineDash([]); // Reset line dash
    
    // Road edges
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();
}

function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw scene elements
    drawSky();
    drawGround();
    drawRoad();
    
    // Move clouds
    clouds.forEach(cloud => {
        cloud.x = (cloud.x + 0.5) % (canvas.width + 200) - 100;
    });
}

function drawCar() {
    // Position car in center-bottom of screen
    const carX = (canvas.width / 2) + playerX - (CAR.width / 2);
    const carY = CAR.y;

    // Draw car body
    ctx.fillStyle = 'red';
    ctx.fillRect(carX, carY, CAR.width, CAR.height);
    
    // Draw windshield
    ctx.fillStyle = '#333';
    ctx.fillRect(carX + 15, carY + 5, 30, 10);
    
    // Draw wheels
    ctx.fillStyle = 'black';
    ctx.fillRect(carX + 10, carY + CAR.height - 8, 20, 8);  // left wheel
    ctx.fillRect(carX + CAR.width - 30, carY + CAR.height - 8, 20, 8);  // right wheel
}

function update() {
    // Handle player input
    if (keys.ArrowUp) speed = Math.min(speed + ACCELERATION, MAX_SPEED);
    if (keys.ArrowDown) speed = Math.max(speed - DECELERATION, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95; // Natural deceleration
    
    // Make steering more responsive
    const STEERING_SPEED = 7;  // Adjust this value to change steering sensitivity
    if (keys.ArrowLeft) playerX = Math.max(playerX - STEERING_SPEED, -ROAD.width/2);
    if (keys.ArrowRight) playerX = Math.min(playerX + STEERING_SPEED, ROAD.width/2);
    
    position += speed;
}

function drawTestScene() {
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#654321';
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
    
    // Draw test car (bright red rectangle)
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(canvas.width/2 - 40, canvas.height - 100, 80, 40);
}

function gameLoop() {
    drawScene();
    requestAnimationFrame(gameLoop);
}

// Start the game
window.onload = function() {
    console.log('Game starting...');
    gameLoop();
}; 