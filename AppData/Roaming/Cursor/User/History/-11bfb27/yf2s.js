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

// Road segments
const segments = [];
const SEGMENT_LENGTH = 200;
const TOTAL_SEGMENTS = 50;

for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    segments.push({
        z: i * SEGMENT_LENGTH,
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

    // Draw road segments
    let basePos = position % SEGMENT_LENGTH;
    
    for(let n = 0; n < 25; n++) {
        let z = (n * SEGMENT_LENGTH + basePos);
        
        let p1 = projectPoint(0, 0, z);
        let p2 = projectPoint(0, 0, z + SEGMENT_LENGTH);
        
        // Road
        ctx.fillStyle = (n % 2) ? '#808080' : '#909090';
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - p1.w/2, p1.y);
        ctx.lineTo(canvas.width/2 - p2.w/2, p2.y);
        ctx.lineTo(canvas.width/2 + p2.w/2, p2.y);
        ctx.lineTo(canvas.width/2 + p1.w/2, p1.y);
        ctx.fill();

        // Road lines
        if (n % 2 === 0) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 4 * p1.scale;
            ctx.setLineDash([]);
            
            // Left line
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - p1.w/2, p1.y);
            ctx.lineTo(canvas.width/2 - p2.w/2, p2.y);
            ctx.stroke();
            
            // Right line
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 + p1.w/2, p1.y);
            ctx.lineTo(canvas.width/2 + p2.w/2, p2.y);
            ctx.stroke();
            
            // Center line
            ctx.setLineDash([p1.w/10, p1.w/10]);
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, p1.y);
            ctx.lineTo(canvas.width/2, p2.y);
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

function update() {
    // Update speed
    if (keys.ArrowUp) speed = Math.min(speed + 1, 30);
    if (keys.ArrowDown) speed = Math.max(speed - 1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    // Update steering
    if (keys.ArrowLeft) playerX = Math.max(playerX - 5, -ROAD.WIDTH/4);
    if (keys.ArrowRight) playerX = Math.min(playerX + 5, ROAD.WIDTH/4);

    position += speed;
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