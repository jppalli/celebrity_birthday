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
    DEPTH: 0.2,  // Adjusted for better depth perception
};

let position = 0;
let speed = 0;
let playerX = 0;
let currentCurve = 0;

// Road segments with more properties
const segments = [];
const SEGMENT_LENGTH = 200;
const TOTAL_SEGMENTS = 500;

// Colors for Outrun aesthetic
const COLORS = {
    SKY: '#72D7EE',
    HORIZON: '#FF69B4',
    ROAD_DARK: '#6B6B6B',
    ROAD_LIGHT: '#808080',
    GRASS: '#008000',
    RUMBLE: '#FF0000',
    LANE: '#FFFFFF'
};

// Initialize road with varied terrain
for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    segments.push({
        index: i,
        z: i * SEGMENT_LENGTH,
        curve: Math.sin(i * 0.05) * 50, // More natural curves
        y: Math.sin(i * 0.02) * 200,   // Vertical variation (hills)
        color: Math.floor(i / 2) % 2 ? COLORS.ROAD_LIGHT : COLORS.ROAD_DARK,
        rumble: COLORS.RUMBLE,
        grass: COLORS.GRASS,
        sprite: (i % 50 === 0) ? { type: 'tree', x: 800 } : null // Roadside objects
    });
}

function projectPoint(x, y, z) {
    const perspective = CAMERA.FOV / (z + CAMERA.HEIGHT);
    const projectedX = (canvas.width / 2) + (x * perspective);
    const projectedY = (canvas.height - (y * perspective));
    const projectedW = perspective * ROAD.WIDTH * 0.8;
    return { x: projectedX, y: projectedY, w: projectedW, scale: perspective };
}

function drawBackground() {
    // Gradient sky
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    gradient.addColorStop(0, COLORS.SKY);
    gradient.addColorStop(1, COLORS.HORIZON);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRoad() {
    drawBackground();

    let basePos = Math.floor(position / SEGMENT_LENGTH) % TOTAL_SEGMENTS;
    let playerZ = position - (position % SEGMENT_LENGTH);
    let x = 0;
    let dx = 0;

    for (let n = 0; n < 100; n++) { // Increased render distance
        const segment = segments[(basePos + n) % TOTAL_SEGMENTS];
        const prevSegment = segments[(basePos + n - 1 + TOTAL_SEGMENTS) % TOTAL_SEGMENTS];
        
        let p1 = projectPoint(x, prevSegment.y, prevSegment.z - playerZ);
        let p2 = projectPoint(x + dx, segment.y, segment.z - playerZ);
        
        x += dx;
        dx += segment.curve;

        if (p1.y < 0 || p2.y > canvas.height) continue;

        // Draw grass
        ctx.fillStyle = COLORS.GRASS;
        ctx.beginPath();
        ctx.moveTo(0, p1.y);
        ctx.lineTo(canvas.width, p1.y);
        ctx.lineTo(canvas.width, p2.y);
        ctx.lineTo(0, p2.y);
        ctx.fill();

        // Draw road with rumble strips
        const rumbleWidth = p1.w * 0.1;
        ctx.fillStyle = segment.color;
        ctx.beginPath();
        ctx.moveTo(p1.x - p1.w, p1.y);
        ctx.lineTo(p2.x - p2.w, p2.y);
        ctx.lineTo(p2.x + p2.w, p2.y);
        ctx.lineTo(p1.x + p1.w, p1.y);
        ctx.fill();

        // Rumble strips
        ctx.fillStyle = segment.rumble;
        ctx.beginPath();
        ctx.moveTo(p1.x - p1.w - rumbleWidth, p1.y);
        ctx.lineTo(p2.x - p2.w - rumbleWidth, p2.y);
        ctx.lineTo(p2.x - p2.w, p2.y);
        ctx.lineTo(p1.x - p1.w, p1.y);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(p1.x + p1.w, p1.y);
        ctx.lineTo(p2.x + p2.w, p2.y);
        ctx.lineTo(p2.x + p2.w + rumbleWidth, p2.y);
        ctx.lineTo(p1.x + p1.w + rumbleWidth, p1.y);
        ctx.fill();

        // Lane lines
        if (n % 4 === 0) {
            ctx.strokeStyle = COLORS.LANE;
            ctx.lineWidth = 4 * p1.scale;
            ctx.setLineDash([20 * p1.scale, 20 * p1.scale]);
            ctx.beginPath();
            ctx.moveTo(p1.x - p1.w/3, p1.y);
            ctx.lineTo(p2.x - p2.w/3, p2.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p1.x + p1.w/3, p1.y);
            ctx.lineTo(p2.x + p2.w/3, p2.y);
            ctx.stroke();
        }

        // Draw roadside sprites (simplified)
        if (segment.sprite) {
            const spriteWidth = 100 * p2.scale;
            const spriteHeight = 200 * p2.scale;
            ctx.fillStyle = '#964B00'; // Tree trunk
            ctx.fillRect(p2.x + segment.sprite.x * p2.scale - spriteWidth/2, p2.y - spriteHeight, spriteWidth, spriteHeight);
            ctx.fillStyle = '#008000'; // Tree foliage
            ctx.beginPath();
            ctx.arc(p2.x + segment.sprite.x * p2.scale, p2.y - spriteHeight, spriteWidth, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawCar() {
    const carWidth = 100;
    const carHeight = 50;
    const carX = canvas.width / 2 + playerX - carWidth / 2;
    const carY = canvas.height - carHeight - 20;

    // Retro car design
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(carX, carY + carHeight);
    ctx.lineTo(carX + carWidth/4, carY);
    ctx.lineTo(carX + 3*carWidth/4, carY);
    ctx.lineTo(carX + carWidth, carY + carHeight);
    ctx.fill();

    // Details
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 10, carY + carHeight - 10, 20, 10);
    ctx.fillRect(carX + carWidth - 30, carY + carHeight - 10, 20, 10);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(carX + carWidth/2 - 15, carY + 10, 30, 10);
}

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    const maxSpeed = 300;
    const accel = 2;
    const friction = 0.98;
    const turnSpeed = 10;

    // Player controls
    if (keys.ArrowUp) speed = Math.min(speed + accel, maxSpeed);
    if (keys.ArrowDown) speed = Math.max(speed - accel, 0);
    speed *= friction;

    if (keys.ArrowLeft) playerX -= turnSpeed;
    if (keys.ArrowRight) playerX += turnSpeed;
    playerX = Math.max(-ROAD.WIDTH/2, Math.min(ROAD.WIDTH/2, playerX));

    position += speed;

    // Apply centrifugal force
    let currentSegment = segments[Math.floor(position / SEGMENT_LENGTH) % TOTAL_SEGMENTS];
    playerX += currentSegment.curve * (speed / maxSpeed);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawRoad();
    drawCar();
    requestAnimationFrame(gameLoop);
}

window.onload = () => gameLoop();