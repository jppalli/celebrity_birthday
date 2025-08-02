const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const ROAD = {
    WIDTH: 2000,
    SEGMENTS: 500,
    LENGTH: 200,
    CURVES: 3
};

const CAMERA = {
    HEIGHT: 1000,
    DEPTH: 0.84,
    FIELD_OF_VIEW: 100
};

const COLORS = {
    SKY: '#72D7EE',
    TREE: '#005108',
    FOG: '#544C8C',
    LIGHT: { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#FFFFFF' },
    DARK: { road: '#696969', grass: '#009A00', rumble: '#BBBBBB' }
};

// Game state
let position = 0;
let playerX = 0;
let speed = 0;
let currentCurve = 0;

// Road segments
const segments = [];
for(let i = 0; i < ROAD.SEGMENTS; i++) {
    segments.push({
        index: i,
        p1: { world: { z: i * ROAD.LENGTH }, camera: {}, screen: {} },
        p2: { world: { z: (i + 1) * ROAD.LENGTH }, camera: {}, screen: {} },
        curve: 0,
        color: Math.floor(i/3)%2 ? COLORS.LIGHT : COLORS.DARK
    });
}

function project(point, cameraX, cameraY, cameraZ) {
    // Translate point to camera view
    const transX = point.world.x || 0;
    const transZ = point.world.z - cameraZ;
    
    // Project to camera space
    point.camera.x = (transX || 0) * CAMERA.FIELD_OF_VIEW / transZ;
    point.camera.y = (point.world.y || 0) * CAMERA.FIELD_OF_VIEW / transZ;
    point.camera.z = transZ;
    
    // Project to screen space
    const scale = CAMERA.DEPTH / transZ;
    point.screen.x = Math.round((canvas.width/2) + (point.camera.x * scale));
    point.screen.y = Math.round((canvas.height/2) - (point.camera.y * scale));
    point.screen.w = Math.round(scale * ROAD.WIDTH * canvas.width/2);
}

function drawSegment(segment) {
    const p1 = segment.p1;
    const p2 = segment.p2;
    
    // Sky
    ctx.fillStyle = COLORS.SKY;
    ctx.fillRect(0, 0, canvas.width, p1.screen.y);
    
    // Ground
    ctx.fillStyle = segment.color.grass;
    ctx.fillRect(0, p1.screen.y, canvas.width, p2.screen.y - p1.screen.y);
    
    // Road
    const x1 = p1.screen.x - p1.screen.w;
    const x2 = p2.screen.x - p2.screen.w;
    const w1 = p1.screen.w * 2;
    const w2 = p2.screen.w * 2;
    
    ctx.fillStyle = segment.color.road;
    ctx.beginPath();
    ctx.moveTo(x1, p1.screen.y);
    ctx.lineTo(x2, p2.screen.y);
    ctx.lineTo(x2 + w2, p2.screen.y);
    ctx.lineTo(x1 + w1, p1.screen.y);
    ctx.closePath();
    ctx.fill();
    
    // Road lines
    if(segment.color === COLORS.LIGHT) {
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.setLineDash([p1.screen.w/5, p1.screen.w/5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, p1.screen.y);
        ctx.lineTo(canvas.width/2, p2.screen.y);
        ctx.stroke();
        ctx.setLineDash([]);
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

function update() {
    const playerSegment = segments[Math.floor((position/ROAD.LENGTH)%ROAD.SEGMENTS)];
    
    // Update player position
    if(keys.ArrowUp) speed = Math.min(speed + 0.4, 15);
    if(keys.ArrowDown) speed = Math.max(0, speed - 0.2);
    if(keys.ArrowLeft) playerX = Math.max(playerX - 5, -ROAD.WIDTH/4);
    if(keys.ArrowRight) playerX = Math.min(playerX + 5, ROAD.WIDTH/4);
    
    position += speed * 30;
    currentCurve += 0.01;
    
    // Add curves to road
    const curve = Math.sin(currentCurve) * 300;
    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        segments[n].curve = curve;
    }
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function gameLoop() {
    update();
    
    // Project all segments
    let cameraX = playerX * 0.5;
    let x = 0;
    let dx = 0;

    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        const segment = segments[n];
        x += dx;
        dx += segment.curve;
        
        segment.p1.world.x = x;
        segment.p2.world.x = x + dx;
        
        project(segment.p1, cameraX, CAMERA.HEIGHT, position);
        project(segment.p2, cameraX, CAMERA.HEIGHT, position);
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw road
    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        drawSegment(segments[n]);
    }
    
    drawCar();
    
    requestAnimationFrame(gameLoop);
}

// Start game
window.onload = function() {
    canvas.width = 800;
    canvas.height = 600;
    gameLoop();
}; 