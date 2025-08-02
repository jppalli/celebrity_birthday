// Coffee Pour Game - Core Game Logic

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Make canvas responsive
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Adjust game object positions after resize
    coffeePot.x = canvas.width / 2;
    coffeePot.y = canvas.height * 0.25;
    cup.x = canvas.width / 2;
    cup.y = canvas.height * 0.7;
}

// Initial resize and event listener
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
let score = 0;
let gameActive = false;
let pouring = false;
let coffeeLevel = 0;
let cupFillLevel = 0;
const cupCapacity = 80;
const pourSpeed = 2;
let lastTime = 0;

// Sound effects
const soundEffects = {
    pour: new Audio('sounds/pour.mp3'),
    success: new Audio('sounds/success.mp3'),
    overflow: new Audio('sounds/overflow.mp3')
};

// Mute all sounds initially (uncomment to enable)
// Object.values(soundEffects).forEach(sound => { sound.muted = true; });

// Steam animation variables
let steamParticles = [];
const maxSteamParticles = 20;

// Coffee droplet particles
let coffeeDroplets = [];
const maxCoffeeDroplets = 30;

// Game objects
const coffeePot = {
    x: canvas.width / 2,
    y: 100,
    width: 80,
    height: 120,
    rotation: 0
};

const cup = {
    x: canvas.width / 2,
    y: 350,
    width: 60,
    height: 80
};

// Event listeners with passive option where appropriate
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
canvas.addEventListener('mousedown', startPour);
canvas.addEventListener('mouseup', stopPour);
canvas.addEventListener('touchstart', startPour, {passive: false});
canvas.addEventListener('touchend', stopPour, {passive: false});
document.addEventListener('visibilitychange', handleVisibilityChange);

// Handle page visibility changes
function handleVisibilityChange() {
    if (document.hidden && pouring) {
        stopPour();
    }
}

// Initialize the game
function init() {
    // Draw initial game state
    drawGameElements();
    
    // Display instructions
    ctx.fillStyle = '#333';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to begin!', canvas.width / 2, canvas.height / 2);
}

function startGame() {
    gameActive = true;
    score = 0;
    coffeeLevel = 0;
    cupFillLevel = 0;
    updateScore();
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    gameActive = false;
    pouring = false;
    coffeeLevel = 0;
    cupFillLevel = 0;
    score = 0;
    updateScore();
    coffeePot.rotation = 0;
    drawGameElements();
}

function startPour(e) {
    if (e && e.type === 'touchstart' && e.cancelable) {
        e.preventDefault();
    }
    
    if (gameActive) {
        pouring = true;
        coffeePot.rotation = 45;
        
        // Play pouring sound
        if (soundEffects.pour.paused) {
            soundEffects.pour.currentTime = 0;
            soundEffects.pour.play().catch(e => console.log("Audio play failed:", e));
        }
    }
}

function stopPour(e) {
    if (e && e.type === 'touchend' && e.cancelable) {
        e.preventDefault();
    }
    
    pouring = false;
    if (gameActive) {
        coffeePot.rotation = 0;
        
        // Stop pouring sound
        soundEffects.pour.pause();
        soundEffects.pour.currentTime = 0;
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function gameLoop(timestamp) {
    if (!gameActive) return;
    
    // Calculate delta time for smooth animations
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Game logic
    if (pouring) {
        coffeeLevel += pourSpeed * (deltaTime / 16.67); // Normalize to ~60fps
        
        // Check if coffee is hitting the cup
        const distanceToCup = cup.y - cup.height/2 - coffeePot.y - coffeePot.height/2;
        if (coffeeLevel >= distanceToCup * 0.4) { // Adjust based on distance
            const fillRate = pourSpeed * 0.8 * (deltaTime / 16.67);
            cupFillLevel += fillRate;
            
            // Create coffee droplet particles
            createCoffeeDroplets();
            
            // Add score while successfully pouring into cup
            if (cupFillLevel < cupCapacity) {
                score += Math.round(fillRate);
                updateScore();
            } else {
                // Game over on overflow
                gameActive = false;
                soundEffects.overflow.play().catch(e => console.log("Audio play failed:", e));
                
                ctx.fillStyle = 'red';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Cup Overflow!', canvas.width / 2, canvas.height / 2);
                ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 30);
                return;
            }
        }
    } else {
        // Coffee level recedes when not pouring
        coffeeLevel = Math.max(0, coffeeLevel - 5 * (deltaTime / 16.67));
    }
    
    // Update and draw steam if cup has coffee
    if (cupFillLevel > 0) {
        updateSteam(deltaTime);
    }
    
    // Update coffee droplets
    updateCoffeeDroplets(deltaTime);
    
    // Draw game elements
    drawGameElements();
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

function drawGameElements() {
    // Background
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw coffee pot with better shape
    drawCoffeePot();
    
    // Draw coffee droplets
    drawCoffeeDroplets();
    
    // Draw cup with better shape
    drawCup();
    
    // Draw coffee in cup
    if (cupFillLevel > 0) {
        drawCoffeeInCup();
        
        // Draw steam particles
        drawSteam();
    }
    
    // Display score
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 30);
}

function drawCoffeePot() {
    ctx.save();
    ctx.translate(coffeePot.x, coffeePot.y);
    ctx.rotate(coffeePot.rotation * Math.PI / 180);
    
    // Main pot body
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.ellipse(0, -coffeePot.height/2 + 15, coffeePot.width/2, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Pot body
    ctx.beginPath();
    ctx.moveTo(-coffeePot.width/2, -coffeePot.height/2 + 15);
    ctx.lineTo(-coffeePot.width/2, coffeePot.height/2 - 10);
    ctx.lineTo(coffeePot.width/2, coffeePot.height/2 - 10);
    ctx.lineTo(coffeePot.width/2, -coffeePot.height/2 + 15);
    ctx.fillStyle = '#6f4e37';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Pot bottom
    ctx.beginPath();
    ctx.ellipse(0, coffeePot.height/2 - 10, coffeePot.width/2, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#444';
    ctx.fill();
    
    // Pot handle
    ctx.beginPath();
    ctx.moveTo(coffeePot.width/2, -coffeePot.height/4);
    ctx.lineTo(coffeePot.width/2 + 20, -coffeePot.height/4);
    ctx.lineTo(coffeePot.width/2 + 20, coffeePot.height/4);
    ctx.lineTo(coffeePot.width/2, coffeePot.height/4);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Pot spout
    ctx.beginPath();
    ctx.moveTo(-coffeePot.width/2, 0);
    ctx.lineTo(-coffeePot.width/2 - 20, coffeePot.height/2);
    ctx.lineTo(-coffeePot.width/2 - 10, coffeePot.height/2 + 10);
    ctx.lineTo(-coffeePot.width/2, coffeePot.height/2);
    ctx.fillStyle = '#444';
    ctx.fill();
    
    ctx.restore();
    
    // Draw coffee pour with improved effect
    if (pouring && coffeeLevel > 0) {
        const startX = coffeePot.x - coffeePot.width/2 - 15;
        const startY = coffeePot.y + coffeePot.height/2;
        const endX = cup.x;
        const pourHeight = Math.min(coffeeLevel, cup.y - cup.height/2 - startY);
        
        // Draw main pour stream
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
            startX - 5, startY + pourHeight * 0.33,
            endX + 5, startY + pourHeight * 0.66,
            endX, startY + pourHeight
        );
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#6f4e37';
        ctx.stroke();
        
        // Add some highlights to the pour
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
            startX - 5, startY + pourHeight * 0.33,
            endX + 5, startY + pourHeight * 0.66,
            endX, startY + pourHeight
        );
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#8a6343';
        ctx.stroke();
    }
}

function drawCup() {
    // Cup body
    ctx.beginPath();
    ctx.moveTo(cup.x - cup.width/2, cup.y - cup.height/2);
    ctx.lineTo(cup.x - cup.width/2, cup.y + cup.height/2);
    ctx.bezierCurveTo(
        cup.x - cup.width/2, cup.y + cup.height/2 + 10,
        cup.x + cup.width/2, cup.y + cup.height/2 + 10,
        cup.x + cup.width/2, cup.y + cup.height/2
    );
    ctx.lineTo(cup.x + cup.width/2, cup.y - cup.height/2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Cup handle
    ctx.beginPath();
    ctx.moveTo(cup.x + cup.width/2, cup.y - cup.height/4);
    ctx.bezierCurveTo(
        cup.x + cup.width/2 + 15, cup.y - cup.height/4,
        cup.x + cup.width/2 + 15, cup.y + cup.height/4,
        cup.x + cup.width/2, cup.y + cup.height/4
    );
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Cup rim
    ctx.beginPath();
    ctx.ellipse(cup.x, cup.y - cup.height/2, cup.width/2, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawCoffeeInCup() {
    const coffeeHeight = (cupFillLevel / cupCapacity) * cup.height;
    
    // Coffee surface is elliptical
    ctx.beginPath();
    ctx.ellipse(
        cup.x, 
        cup.y + cup.height/2 - coffeeHeight, 
        cup.width/2 - 2, 
        8, 
        0, 0, Math.PI * 2
    );
    ctx.fillStyle = '#6f4e37';
    ctx.fill();
    
    // Add highlight to coffee
    ctx.beginPath();
    ctx.ellipse(
        cup.x - 10, 
        cup.y + cup.height/2 - coffeeHeight, 
        8, 
        3, 
        0.3, 0, Math.PI * 2
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
}

function updateSteam(deltaTime) {
    // Add new steam particles
    if (steamParticles.length < maxSteamParticles && cupFillLevel > 0) {
        if (Math.random() < 0.3 * (deltaTime / 16.67)) {
            const x = cup.x - 10 + Math.random() * 20;
            const y = cup.y - cup.height/2;
            const size = 2 + Math.random() * 5;
            const speedY = -0.5 - Math.random() * 1;
            const speedX = (Math.random() - 0.5) * 0.3;
            const life = 60 + Math.random() * 60;
            
            steamParticles.push({ x, y, size, speedX, speedY, life, opacity: 0.7 });
        }
    }
    
    // Update existing particles with deltaTime for smooth animation
    const timeScale = deltaTime / 16.67;
    for (let i = steamParticles.length - 1; i >= 0; i--) {
        const p = steamParticles[i];
        p.x += p.speedX * timeScale;
        p.y += p.speedY * timeScale;
        p.life -= timeScale;
        p.opacity = Math.max(0, p.life / 120);
        p.size += 0.05 * timeScale;
        
        if (p.life <= 0) {
            steamParticles.splice(i, 1);
        }
    }
}

function drawSteam() {
    ctx.save();
    steamParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
    });
    ctx.restore();
}

function createCoffeeDroplets() {
    if (coffeeDroplets.length < maxCoffeeDroplets && pouring) {
        if (Math.random() < 0.4) {
            const pourEndX = cup.x;
            const pourEndY = cup.y - cup.height/2;
            
            const x = pourEndX - 15 + Math.random() * 30;
            const y = pourEndY - 10;
            const size = 1 + Math.random() * 2;
            const speedY = 1 + Math.random() * 2;
            const speedX = (Math.random() - 0.5) * 2;
            
            coffeeDroplets.push({ x, y, size, speedX, speedY, life: 20 });
        }
    }
}

function updateCoffeeDroplets(deltaTime) {
    const timeScale = deltaTime / 16.67;
    for (let i = coffeeDroplets.length - 1; i >= 0; i--) {
        const d = coffeeDroplets[i];
        d.x += d.speedX * timeScale;
        d.y += d.speedY * timeScale;
        d.life -= timeScale;
        
        if (d.life <= 0 || d.y > cup.y + cup.height/2) {
            coffeeDroplets.splice(i, 1);
        }
    }
}

function drawCoffeeDroplets() {
    ctx.save();
    coffeeDroplets.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = '#6f4e37';
        ctx.fill();
    });
    ctx.restore();
}

// Handle fullscreen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add fullscreen toggle button event listener
document.getElementById('fullscreenButton')?.addEventListener('click', toggleFullScreen);

// Initialize the game on load
window.addEventListener('load', init);
