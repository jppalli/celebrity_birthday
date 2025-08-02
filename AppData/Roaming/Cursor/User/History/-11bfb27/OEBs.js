const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game state
let position = 0;
let speed = 0;
let playerX = 0;

// Constants
const ROAD = {
    WIDTH: 2000,
    SEGMENTS: 16,
    LENGTH: 200,
    CURVE: 0
};

const CAMERA = {
    HEIGHT: 1000,
    DEPTH: 0.84,
    FIELD_OF_VIEW: 100
};

function project(point, cameraX, cameraY, cameraZ) {
    // Translate to camera view
    const transX = point.x - cameraX;
    const transZ = point.z - cameraZ;

    // Perspective projection
    const scale = CAMERA.DEPTH / (transZ + CAMERA.HEIGHT);
    const projectedX = (canvas.width/2) + (transX * scale);
    const projectedY = (canvas.height/2) - (point.y * scale);

    return {
        x: projectedX,
        y: projectedY,
        w: scale * ROAD.WIDTH,
        scale: scale
    };
}

function drawSegment(x1, y1, w1, x2, y2, w2, color) {
    ctx.fillStyle = color.road;
    ctx.beginPath();
    ctx.moveTo(x1 - w1, y1);
    ctx.lineTo(x2 - w2, y2);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(x1 + w1, y1);
    ctx.closePath();
    ctx.fill();

    // Draw grass
    ctx.fillStyle = color.grass;
    ctx.beginPath();
    ctx.moveTo(0, y1);
    ctx.lineTo(x1 - w1, y1);
    ctx.lineTo(x2 - w2, y2);
    ctx.lineTo(0, y2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width, y1);
    ctx.lineTo(x1 + w1, y1);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(canvas.width, y2);
    ctx.closePath();
    ctx.fill();

    // Road lines
    if (color.lane) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        
        // Center line
        ctx.setLineDash([w1/20, w1/20]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Side lines
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x1 - w1, y1);
        ctx.lineTo(x2 - w2, y2);
        ctx.moveTo(x1 + w1, y1);
        ctx.lineTo(x2 + w2, y2);
        ctx.stroke();
    }
}

function drawRoad() {
    // Clear canvas and draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height/2);
    skyGradient.addColorStop(0, '#72D7EE');
    skyGradient.addColorStop(1, '#FFF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize road segments
    let segments = [];
    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        segments.push({
            point: {
                x: 0,
                y: 0,
                z: n * ROAD.LENGTH
            },
            color: {
                road: n % 2 ? '#808080' : '#909090',
                grass: n % 2 ? '#10AA10' : '#009900',
                lane: n % 2
            }
        });
    }

    const baseSegment = Math.floor(position / ROAD.LENGTH) % ROAD.SEGMENTS;
    const curve = Math.sin(position / 1000) * 200;
    let x = 0;

    // Draw road segments
    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        const segment = segments[(baseSegment + n) % ROAD.SEGMENTS];
        const segmentCurve = curve * (n/ROAD.SEGMENTS);
        
        // Project points
        const p1 = project(segment.point, playerX + segmentCurve, 0, position);
        const p2 = project({
            x: segment.point.x,
            y: segment.point.y,
            z: segment.point.z + ROAD.LENGTH
        }, playerX + segmentCurve, 0, position);

        // Draw segment
        drawSegment(
            p1.x, p1.y, p1.w,
            p2.x, p2.y, p2.w,
            segment.color
        );
    }
}

function drawCar() {
    const carWidth = 80;
    const carHeight = 40;
    const carX = (canvas.width/2) - (carWidth/2);
    const carY = canvas.height - carHeight - 20;

    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX, carY, carWidth, carHeight);
    
    // Windshield
    ctx.fillStyle = '#333333';
    ctx.fillRect(carX + 15, carY + 5, 30, 10);
    
    // Wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 10, carY + carHeight - 8, 20, 8);
    ctx.fillRect(carX + carWidth - 30, carY + carHeight - 8, 20, 8);
}

// Keyboard controls
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    // Speed control
    const acceleration = 0.5;
    const deceleration = 0.3;
    const maxSpeed = 300;

    if (keys.ArrowUp) {
        speed = Math.min(speed + acceleration, maxSpeed);
    } else if (keys.ArrowDown) {
        speed = Math.max(speed - deceleration, 0);
    } else {
        speed *= 0.95; // Natural deceleration
    }

    // Steering
    const steering = 3 * (speed/maxSpeed);
    if (keys.ArrowLeft) playerX = Math.max(playerX - steering, -ROAD.WIDTH/4);
    if (keys.ArrowRight) playerX = Math.min(playerX + steering, ROAD.WIDTH/4);

    position += speed;
}

function gameLoop() {
    update();
    drawRoad();
    drawCar();
    
    // Debug info
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