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

// Add these new constants
const ROAD = {
    CURVE: 0,      // Current road curve
    CURVE_DELTA: 0.15, // How fast the road curves
    LANES: 3,      // Number of lanes
    COLORS: {
        GRASS: '#10AA10',
        RUMBLE: '#b0a000',
        ROAD: '#6B6B6B'
    }
};

// Improve car physics
const CAR = {
    width: 80,
    height: 40,
    x: 0,
    y: canvas.height - 100,
    speed: 0,
    maxSpeed: 300,
    acceleration: 0.8,
    deceleration: 0.95,
    handling: 3,
    drift: 0
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

// Add this new function for improved road rendering
function drawImprovedRoad() {
    ctx.fillStyle = ROAD.COLORS.GRASS;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let basePos = position % SEGMENT_LENGTH;
    
    for(let n = 0; n < 25; n++) {
        let z = (n * SEGMENT_LENGTH + basePos);
        
        let curve = Math.sin(z/3000) * ROAD.CURVE;
        
        let p1 = project(curve, 0, z);
        let p2 = project(curve, 0, z + SEGMENT_LENGTH);
        
        let width1 = (ROAD_WIDTH * p1.scale);
        let width2 = (ROAD_WIDTH * p2.scale);
        
        let x1 = Math.floor(canvas.width/2 + (p1.x - width1/2));
        let x2 = Math.floor(canvas.width/2 + (p2.x - width2/2));
        let y1 = Math.floor(p1.y);
        let y2 = Math.floor(p2.y);

        // Draw rumble strips
        ctx.fillStyle = ROAD.COLORS.RUMBLE;
        ctx.fillRect(x1 - 20, y1, width1 + 40, y2 - y1);

        // Draw road
        ctx.fillStyle = (n % 2) ? '#696969' : '#7A7A7A';
        ctx.fillRect(x1, y1, width1, y2 - y1);

        // Draw lane markers
        if (n % 2 === 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x1 + width1/3, y1, 5, y2 - y1);
            ctx.fillRect(x1 + (width1/3 * 2), y1, 5, y2 - y1);
        }
    }
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

// Improve car rendering
function drawImprovedCar() {
    const carX = (canvas.width / 2) + playerX - (CAR.width / 2);
    const carY = CAR.y;
    
    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(carX, carY + CAR.height);
    ctx.lineTo(carX + CAR.width, carY + CAR.height);
    ctx.lineTo(carX + CAR.width - 10, carY + 10);
    ctx.lineTo(carX + 10, carY + 10);
    ctx.closePath();
    ctx.fill();

    // Windshield
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.moveTo(carX + 20, carY + 15);
    ctx.lineTo(carX + CAR.width - 20, carY + 15);
    ctx.lineTo(carX + CAR.width - 30, carY + 25);
    ctx.lineTo(carX + 30, carY + 25);
    ctx.closePath();
    ctx.fill();

    // Wheels with suspension effect
    const bounce = Math.sin(position/50) * 2;
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 15, carY + CAR.height - 8 + bounce, 20, 8);
    ctx.fillRect(carX + CAR.width - 35, carY + CAR.height - 8 + bounce, 20, 8);
}

// Improve update function
function improvedUpdate() {
    // Acceleration
    if (keys.ArrowUp) {
        CAR.speed = Math.min(CAR.speed + CAR.acceleration, CAR.maxSpeed);
    } else if (keys.ArrowDown) {
        CAR.speed = Math.max(CAR.speed - CAR.acceleration * 2, 0);
    } else {
        CAR.speed *= CAR.deceleration;
    }

    // Steering with drift effect
    if (keys.ArrowLeft) {
        CAR.drift = Math.max(CAR.drift - 0.1, -1);
    } else if (keys.ArrowRight) {
        CAR.drift = Math.min(CAR.drift + 0.1, 1);
    } else {
        CAR.drift *= 0.95;
    }

    playerX += (CAR.drift * CAR.handling * (CAR.speed/CAR.maxSpeed)) * 5;
    playerX = Math.max(Math.min(playerX, ROAD_WIDTH/2), -ROAD_WIDTH/2);
    
    position += CAR.speed;
}

// Update game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    improvedUpdate();
    drawImprovedRoad();
    drawImprovedCar();
    requestAnimationFrame(gameLoop);
}

// Add this debug code at the start of your file
window.addEventListener('load', () => {
    console.log('Game loaded');
    console.log('Canvas dimensions:', canvas.width, canvas.height);
    console.log('Car settings:', CAR);
});

gameLoop(); 