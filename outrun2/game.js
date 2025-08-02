// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Road configuration
const roadConfig = {
    segmentHeight: 100,
    baseWidth: 2000,
    curveIntensity: 0.5,
    curveSpeed: 0.002,
    numSegments: 20,
    time: 0,
    horizonY: 200  // Y position of the horizon
};

// Game state
const gameState = {
    player: {
        x: canvas.width / 2,  // Start in center
        y: canvas.height - 100,
        width: 40,
        height: 80,
        speed: 5
    },
    keys: {
        left: false,
        right: false
    },
    road: []
};

// Initialize road segments
function initRoad() {
    gameState.road = [];
    for (let i = 0; i < roadConfig.numSegments; i++) {
        gameState.road.push({
            y: i * roadConfig.segmentHeight,
            curve: 0
        });
    }
}

// Input handling
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = true;
    if (e.key === 'ArrowRight') gameState.keys.right = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = false;
    if (e.key === 'ArrowRight') gameState.keys.right = false;
});

// Update game state
function update() {
    // Update player position based on input
    if (gameState.keys.left && gameState.player.x > 0) {
        gameState.player.x -= gameState.player.speed;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width) {
        gameState.player.x += gameState.player.speed;
    }

    // Update road
    roadConfig.time += roadConfig.curveSpeed;
    
    // Shift road segments down
    for (let i = gameState.road.length - 1; i > 0; i--) {
        gameState.road[i].y = gameState.road[i - 1].y;
    }
    
    // Add new segment at top
    gameState.road[0] = {
        y: -roadConfig.segmentHeight,
        curve: Math.sin(roadConfig.time) * roadConfig.curveIntensity
    };

    // Remove segments that are off screen
    while (gameState.road[gameState.road.length - 1].y > canvas.height + roadConfig.segmentHeight) {
        gameState.road.pop();
    }
}

// Draw sky and ground
function drawBackground() {
    // Draw sky (dark blue gradient)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, roadConfig.horizonY);
    skyGradient.addColorStop(0, '#000033');
    skyGradient.addColorStop(1, '#000066');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, roadConfig.horizonY);

    // Draw ground (dark gradient)
    const groundGradient = ctx.createLinearGradient(0, roadConfig.horizonY, 0, canvas.height);
    groundGradient.addColorStop(0, '#111111');
    groundGradient.addColorStop(1, '#000000');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, roadConfig.horizonY, canvas.width, canvas.height - roadConfig.horizonY);

    // Draw horizon line
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, roadConfig.horizonY);
    ctx.lineTo(canvas.width, roadConfig.horizonY);
    ctx.stroke();
}

// Draw road segment
function drawRoadSegment(segment, nextSegment) {
    if (!nextSegment) return;

    // Calculate segment width based on y position
    const perspective = 1 - (segment.y / (canvas.height + roadConfig.segmentHeight));
    const width = roadConfig.baseWidth * perspective;

    // Calculate segment position with curve
    const curveOffset = segment.curve * width;
    const nextCurveOffset = nextSegment.curve * width * 0.8;

    // Draw road segment
    ctx.beginPath();
    ctx.moveTo(
        canvas.width / 2 + curveOffset - width / 2,
        segment.y
    );
    ctx.lineTo(
        canvas.width / 2 + curveOffset + width / 2,
        segment.y
    );
    ctx.lineTo(
        canvas.width / 2 + nextCurveOffset + width * 0.8 / 2,
        nextSegment.y
    );
    ctx.lineTo(
        canvas.width / 2 + nextCurveOffset - width * 0.8 / 2,
        nextSegment.y
    );
    ctx.closePath();

    // Draw road with gradient
    const gradient = ctx.createLinearGradient(
        canvas.width / 2 - width / 2,
        segment.y,
        canvas.width / 2 + width / 2,
        segment.y
    );
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(0.5, '#00cccc');
    gradient.addColorStop(1, '#00ffff');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw road lines
    if (segment.y > roadConfig.horizonY) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + curveOffset, segment.y);
        ctx.lineTo(canvas.width / 2 + nextCurveOffset, nextSegment.y);
        ctx.stroke();
    }
}

// Render game state
function render() {
    // Clear the canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background (sky and ground)
    drawBackground();

    // Draw road segments
    for (let i = 0; i < gameState.road.length - 1; i++) {
        drawRoadSegment(gameState.road[i], gameState.road[i + 1]);
    }

    // Draw the player car
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        gameState.player.x,
        gameState.player.y - gameState.player.height,
        gameState.player.width,
        gameState.player.height
    );
}

// Game loop function
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function gameLoop(currentTime) {
    // Calculate delta time
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Update and render if enough time has passed
    if (deltaTime >= frameInterval) {
        update();
        render();
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Initialize and start the game
initRoad();
requestAnimationFrame(gameLoop); 