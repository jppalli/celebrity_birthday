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
    LENGTH: 200,
    SEGMENTS: 20,
    WIDTH: 1500,
    FOG_DENSITY: 5
};

function project3D(x, y, z) {
    const cameraDepth = 0.84;
    const cameraHeight = 1000;
    const scale = cameraDepth / (z + cameraHeight);
    return {
        x: Math.round((canvas.width/2) + (x * scale)),
        y: Math.round((canvas.height/2) - (y * scale)),
        w: scale * ROAD.WIDTH
    };
}

function drawSegment(x1, y1, w1, x2, y2, w2, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1 - w1, y1);
    ctx.lineTo(x2 - w2, y2);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(x1 + w1, y1);
    ctx.closePath();
    ctx.fill();
}

function drawRoad() {
    // Clear canvas and draw sky
    ctx.fillStyle = '#87CEEB';  // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#2E8B57';  // Forest green
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

    // Draw road segments
    let basePos = position % ROAD.LENGTH;
    
    for(let n = 0; n < ROAD.SEGMENTS; n++) {
        // Project road segments
        let z1 = n * ROAD.LENGTH - basePos;
        let z2 = (n+1) * ROAD.LENGTH - basePos;
        
        let p1 = project3D(0, 0, z1);
        let p2 = project3D(0, 0, z2);

        // Alternate road colors
        let color = (n % 2) ? '#808080' : '#909090';
        
        // Draw road segment
        drawSegment(
            p1.x, p1.y, p1.w,
            p2.x, p2.y, p2.w,
            color
        );

        // Draw road lines if segment is even
        if (n % 2 === 0) {
            // Center line
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.setLineDash([p1.w/5, p1.w/5]);
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, p1.y);
            ctx.lineTo(canvas.width/2, p2.y);
            ctx.stroke();
            ctx.setLineDash([]);

            // Side lines
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(p1.x - p1.w, p1.y);
            ctx.lineTo(p2.x - p2.w, p2.y);
            ctx.moveTo(p1.x + p1.w, p1.y);
            ctx.lineTo(p2.x + p2.w, p2.y);
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
    if (keys.ArrowUp) {
        speed = Math.min(speed + 2, 200);
    } else if (keys.ArrowDown) {
        speed = Math.max(speed - 2, 0);
    } else {
        speed *= 0.95; // Natural deceleration
    }

    // Steering
    const steeringSensitivity = 5 * (speed/200); // Speed-based steering
    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - steeringSensitivity, -ROAD.WIDTH/4);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + steeringSensitivity, ROAD.WIDTH/4);
    }

    // Update position
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