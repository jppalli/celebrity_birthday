const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game settings
const ROAD = {
    WIDTH: 2000,
    LANES: 3
};

const CAMERA = {
    FOV: 100,
    HEIGHT: 1000,
    DEPTH: 0.84
};

let position = 0;
let speed = 0;
let playerX = 0;
let currentCurve = 0;

// Road segments
const segments = [];
const SEGMENT_LENGTH = 200;
const TOTAL_SEGMENTS = 500;

// Create road with curves and colors
for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    segments.push({
        index: i,
        z: i * SEGMENT_LENGTH,
        curve: 0,
        color: (i % 2) ? '#808080' : '#909090',
        grass: (i % 2) ? '#10AA10' : '#008800'
    });
}

function projectPoint(x, y, z) {
    const scale = CAMERA.DEPTH / (z + CAMERA.HEIGHT);
    const projectedX = (canvas.width/2) + (x * scale);
    const projectedY = (canvas.height/2) - (y * scale);
    const projectedW = scale * ROAD.WIDTH;
    return {
        x: projectedX,
        y: projectedY,
        w: projectedW,
        scale: scale
    };
}

function drawRoad() {
    // Draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height/2);
    skyGradient.addColorStop(0, '#72D7EE');
    skyGradient.addColorStop(1, '#FFF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    // Draw background mountains
    ctx.fillStyle = '#005108';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width/4, canvas.height/3);
    ctx.lineTo(canvas.width/2, canvas.height/2.5);
    ctx.lineTo(3*canvas.width/4, canvas.height/3);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.fill();

    // Draw road segments with curves
    let basePos = Math.floor(position / SEGMENT_LENGTH);
    let curveX = 0;
    let clipHeight = canvas.height;
    
    for(let n = 0; n < 25; n++) {
        const segmentIndex = (basePos + n) % TOTAL_SEGMENTS;
        const segment = segments[segmentIndex];
        
        // Calculate curve offset
        curveX += segment.curve;
        
        let p1 = projectPoint(curveX, 0, segment.z - position);
        let p2 = projectPoint(curveX + segment.curve, 0, segment.z + SEGMENT_LENGTH - position);
        
        // Clip segments behind camera
        if (p1.y >= clipHeight) continue;
        clipHeight = p1.y;

        // Draw grass
        ctx.fillStyle = segment.grass;
        ctx.fillRect(0, p1.y, canvas.width, p2.y - p1.y);
        
        // Draw road segment
        ctx.fillStyle = segment.color;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - p1.w/2 + p1.x, p1.y);
        ctx.lineTo(canvas.width/2 - p2.w/2 + p2.x, p2.y);
        ctx.lineTo(canvas.width/2 + p2.w/2 + p2.x, p2.y);
        ctx.lineTo(canvas.width/2 + p1.w/2 + p1.x, p1.y);
        ctx.fill();

        // Road lines with speed-based dash length
        if (n % 2 === 0) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 4 * p1.scale;
            ctx.setLineDash([]);
            
            // Side lines
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - p1.w/2 + p1.x, p1.y);
            ctx.lineTo(canvas.width/2 - p2.w/2 + p2.x, p2.y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 + p1.w/2 + p1.x, p1.y);
            ctx.lineTo(canvas.width/2 + p2.w/2 + p2.x, p2.y);
            ctx.stroke();
            
            // Center line with speed-based dash
            const dashLength = Math.max(10, 20 - speed/2);
            ctx.setLineDash([dashLength * p1.scale, dashLength * p1.scale]);
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 + p1.x, p1.y);
            ctx.lineTo(canvas.width/2 + p2.x, p2.y);
            ctx.stroke();
        }
    }
}

function drawCar() {
    const carWidth = 80;
    const carHeight = 40;
    const carX = (canvas.width/2) + playerX - (carWidth/2);
    const carY = canvas.height - carHeight - 20;

    // Add car bounce based on speed
    const bounce = Math.sin(position * 0.1) * (speed * 0.2);
    
    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX, carY + bounce, carWidth, carHeight);
    
    // Windshield
    ctx.fillStyle = '#333';
    ctx.fillRect(carX + 15, carY + 5 + bounce, 30, 10);
    
    // Wheels with rotation
    ctx.fillStyle = '#000';
    const wheelRotation = (position * 0.1) % (Math.PI * 2);
    drawRotatedWheel(carX + 10, carY + carHeight - 8 + bounce, 20, 8, wheelRotation);
    drawRotatedWheel(carX + carWidth - 30, carY + carHeight - 8 + bounce, 20, 8, wheelRotation);
}

function drawRotatedWheel(x, y, width, height, rotation) {
    ctx.save();
    ctx.translate(x + width/2, y + height/2);
    ctx.rotate(rotation);
    ctx.fillRect(-width/2, -height/2, width, height);
    ctx.restore();
}

// Handle keyboard input
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function updateCurves() {
    currentCurve += speed * 0.0002;
    const curve = Math.sin(currentCurve) * 3;
    
    for(let i = 0; i < TOTAL_SEGMENTS; i++) {
        segments[i].curve = curve;
    }
}

function update() {
    // Update speed with better acceleration/deceleration
    const ACCELERATION = 0.5;
    const DECELERATION = 0.3;
    const MAX_SPEED = 50;
    
    if (keys.ArrowUp) {
        speed = Math.min(speed + ACCELERATION, MAX_SPEED);
    } else if (keys.ArrowDown) {
        speed = Math.max(speed - DECELERATION, 0);
    } else {
        speed *= 0.95; // Natural deceleration
    }

    // Update steering with speed-based sensitivity
    const STEERING_SPEED = 3 * (speed/MAX_SPEED);
    if (keys.ArrowLeft) playerX = Math.max(playerX - STEERING_SPEED, -ROAD.WIDTH/4);
    if (keys.ArrowRight) playerX = Math.min(playerX + STEERING_SPEED, ROAD.WIDTH/4);

    position += speed;
    updateCurves();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    update();
    drawRoad();
    drawCar();
    
    requestAnimationFrame(gameLoop);
}

// Start the game
window.onload = function() {
    console.log('Starting game...');
    gameLoop();
}; 