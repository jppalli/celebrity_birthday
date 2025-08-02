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
    HEIGHT: 500,    // Adjusted for better road visibility
    DEPTH: 300      // Controls how far the road stretches into the distance
};

let position = 0;   // Player's Z position along the road
let speed = 0;
let playerX = 0;    // Player's X position (lateral movement)

// Road segments
const segments = [];
const SEGMENT_LENGTH = 200;
const TOTAL_SEGMENTS = 500;

const COLORS = {
    SKY: '#72D7EE',
    HORIZON: '#FF69B4',
    ROAD_DARK: '#6B6B6B',
    ROAD_LIGHT: '#808080',
    GRASS: '#008000',
    RUMBLE: '#FF0000',
    LANE: '#FFFFFF'
};

// Generate road with curves and hills
for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    segments.push({
        index: i,
        z: i * SEGMENT_LENGTH,
        curve: Math.sin(i * 0.05) * 50,
        y: Math.sin(i * 0.02) * 200, // Hills
        color: Math.floor(i / 2) % 2 ? COLORS.ROAD_LIGHT : COLORS.ROAD_DARK,
        rumble: COLORS.RUMBLE,
        grass: COLORS.GRASS,
        sprite: (i % 50 === 0) ? { type: 'tree', x: 800 } : null
    });
}

function projectPoint(x, y, z) {
    // Simplified perspective projection
    const perspective = CAMERA.DEPTH / Math.max(1, z - position); // Avoid division by zero
    const projectedX = canvas.width / 2 + (x + playerX) * perspective; // Include playerX for lateral movement
    const projectedY = canvas.height * 0.8 - (y * perspective); // Road starts higher, stretches down
    const projectedW = ROAD.WIDTH * perspective;
    return { x: projectedX, y: projectedY, w: projectedW, scale: perspective };
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
    gradient.addColorStop(0, COLORS.SKY);
    gradient.addColorStop(1, COLORS.HORIZON);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRoad() {
    drawBackground();

    let basePos = Math.floor(position / SEGMENT_LENGTH) % TOTAL_SEGMENTS;
    let x = 0;
    let dx = 0;

    for (let n = 0; n < 50; n++) { // Reduced render distance for clarity
        const segment = segments[(basePos + n) % TOTAL_SEGMENTS];
        const prevSegment = segments[(basePos + n - 1 + TOTAL_SEGMENTS) % TOTAL_SEGMENTS];

        // Project points relative to player's position
        let p1 = projectPoint(x, prevSegment.y, prevSegment.z);
        let p2 = projectPoint(x + dx, segment.y, segment.z);

        x += dx;
        dx += segment.curve;

        if (p1.y < 0 || p2.y > canvas.height || p1.scale <= 0) continue;

        // Grass
        ctx.fillStyle = COLORS.GRASS;
        ctx.beginPath();
        ctx.moveTo(0, p1.y);
        ctx.lineTo(canvas.width, p1.y);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fill();

        // Road
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
            ctx.moveTo(p1.x - p1.w / 3, p1.y);
            ctx.lineTo(p2.x - p2.w / 3, p2.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p1.x + p1.w / 3, p1.y);
            ctx.lineTo(p2.x + p2.w / 3, p2.y);
            ctx.stroke();
        }

        // Sprites
        if (segment.sprite) {
            const spriteWidth = 100 * p2.scale;
            const spriteHeight = 200 * p2.scale;
            ctx.fillStyle = '#964B00';
            ctx.fillRect(p2.x + segment.sprite.x * p2.scale - spriteWidth / 2, p2.y - spriteHeight, spriteWidth, spriteHeight);
            ctx.fillStyle = '#008000';
            ctx.beginPath();
            ctx.arc(p2.x + segment.sprite.x * p2.scale, p2.y - spriteHeight, spriteWidth, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawCar() {
    // Project the car onto the road's perspective
    const carSegment = segments[Math.floor(position / SEGMENT_LENGTH) % TOTAL_SEGMENTS];
    const perspective = CAMERA.DEPTH / Math.max(1, CAMERA.HEIGHT); // Car at camera height
    const carWidth = 100 * perspective;
    const carHeight = 50 * perspective;
    const carX = canvas.width / 2 + (playerX * perspective) - carWidth / 2;
    const carY = canvas.height * 0.8 - carHeight; // Align with road base

    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(carX, carY + carHeight);
    ctx.lineTo(carX + carWidth / 4, carY);
    ctx.lineTo(carX + 3 * carWidth / 4, carY);
    ctx.lineTo(carX + carWidth, carY + carHeight);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 10 * perspective, carY + carHeight - 10 * perspective, 20 * perspective, 10 * perspective);
    ctx.fillRect(carX + carWidth - 30 * perspective, carY + carHeight - 10 * perspective, 20 * perspective, 10 * perspective);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(carX + carWidth / 2 - 15 * perspective, carY + 10 * perspective, 30 * perspective, 10 * perspective);
}

const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    const maxSpeed = 300;
    const accel = 2;
    const friction = 0.98;
    const turnSpeed = 10;

    if (keys.ArrowUp) speed = Math.min(speed + accel, maxSpeed);
    if (keys.ArrowDown) speed = Math.max(speed - accel, 0);
    speed *= friction;

    if (keys.ArrowLeft) playerX -= turnSpeed;
    if (keys.ArrowRight) playerX += turnSpeed;
    playerX = Math.max(-ROAD.WIDTH / 2, Math.min(ROAD.WIDTH / 2, playerX));

    position += speed;

    let currentSegment = segments[Math.floor(position / SEGMENT_LENGTH) % TOTAL_SEGMENTS];
    playerX += currentSegment.curve * (speed / maxSpeed) * 0.5; // Reduced centrifugal force
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawRoad();
    drawCar();
    requestAnimationFrame(gameLoop);
}

window.onload = () => gameLoop();