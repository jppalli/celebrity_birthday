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

// Create road with curves
for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    segments.push({
        index: i,
        z: i * SEGMENT_LENGTH,
        curve: 0,
        color: (i % 2) ? '#808080' : '#909090'
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
    ctx.fillStyle = '#72D7EE';
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
    
    for(let n = 0; n < 25; n++) {
        const segmentIndex = (basePos + n) % TOTAL_SEGMENTS;
        const segment = segments[segmentIndex];
        
        // Calculate curve offset
        curveX += segment.curve;
        
        let p1 = projectPoint(curveX, 0, segment.z - position);
        let p2 = projectPoint(curveX + segment.curve, 0, segment.z + SEGMENT_LENGTH - position);
        
        // Draw road segment
        ctx.fillStyle = segment.color;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - p1.w/2 + p1.x, p1.y);
        ctx.lineTo(canvas.width/2 - p2.w/2 + p2.x, p2.y);
        ctx.lineTo(canvas.width/2 + p2.w/2 + p2.x, p2.y);
        ctx.lineTo(canvas.width/2 + p1.w/2 + p1.x, p1.y);
        ctx.fill();

        // Road lines
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
            
            // Center line
            ctx.setLineDash([p1.w/10, p1.w/10]);
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

    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX, carY, carWidth, carHeight);
    
    // Windshield
    ctx.fillStyle = '#333';
    ctx.fillRect(carX + 15, carY + 5, 30, 10);
    
    // Wheels
    ctx.fillStyle = '#000';
    ctx.fillRect(carX + 10, carY + carHeight - 8, 20, 8);
    ctx.fillRect(carX + carWidth - 30, carY + carHeight - 8, 20, 8);
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
    // Create a sine wave pattern for the road curves
    currentCurve += 0.01;
    const curve = Math.sin(currentCurve) * 3;
    
    for(let i = 0; i < TOTAL_SEGMENTS; i++) {
        segments[i].curve = curve;
    }
}

function update() {
    // Update speed
    if (keys.ArrowUp) speed = Math.min(speed + 1, 30);
    if (keys.ArrowDown) speed = Math.max(speed - 1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    // Update steering
    if (keys.ArrowLeft) playerX = Math.max(playerX - 5, -ROAD.WIDTH/4);
    if (keys.ArrowRight) playerX = Math.min(playerX + 5, ROAD.WIDTH/4);

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