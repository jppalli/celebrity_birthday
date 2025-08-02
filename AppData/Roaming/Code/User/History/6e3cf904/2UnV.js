// Coffee Pour Game - Core Game Logic

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let gameActive = false;
let pouring = false;
let coffeeLevel = 0;
let cupFillLevel = 0;
const cupCapacity = 80;
const pourSpeed = 2;

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

// Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
canvas.addEventListener('mousedown', startPour);
canvas.addEventListener('mouseup', stopPour);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPour();
});
canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopPour();
});

// Initialize the game
function init() {
    // Draw initial game state
    drawGameElements();
    
    // Display instructions
    ctx.fillStyle = '#333';
    ctx.font = '18px Arial';
    ctx.fillText('Press Start to begin!', canvas.width / 2 - 80, 250);
}

function startGame() {
    gameActive = true;
    score = 0;
    coffeeLevel = 0;
    cupFillLevel = 0;
    updateScore();
    gameLoop();
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

function startPour() {
    if (gameActive) {
        pouring = true;
        coffeePot.rotation = 45;
    }
}

function stopPour() {
    pouring = false;
    if (gameActive) {
        coffeePot.rotation = 0;
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function gameLoop() {
    if (!gameActive) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Game logic
    if (pouring) {
        coffeeLevel += pourSpeed;
        
        // Check if coffee is hitting the cup
        if (coffeeLevel >= 150) { // Arbitrary distance from pot to cup
            cupFillLevel += pourSpeed * 0.8; // Not all coffee makes it in the cup
            
            // Create coffee droplet particles
            createCoffeeDroplets();
            
            // Add score while successfully pouring into cup
            if (cupFillLevel < cupCapacity) {
                score += 1;
                updateScore();
            } else {
                // Game over on overflow
                gameActive = false;
                ctx.fillStyle = 'red';
                ctx.font = '24px Arial';
                ctx.fillText('Cup Overflow!', canvas.width / 2 - 80, 250);
                ctx.fillText('Final Score: ' + score, canvas.width / 2 - 70, 280);
                return;
            }
        }
    } else {
        // Coffee level recedes when not pouring
        coffeeLevel = Math.max(0, coffeeLevel - 5);
    }
    
    // Update and draw steam if cup has coffee
    if (cupFillLevel > 0) {
        updateSteam();
    }
    
    // Update coffee droplets
    updateCoffeeDroplets();
    
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

function updateSteam() {
    // Add new steam particles
    if (steamParticles.length < maxSteamParticles && cupFillLevel > 0) {
        if (Math.random() < 0.3) {
            const x = cup.x - 10 + Math.random() * 20;
            const y = cup.y - cup.height/2;
            const size = 2 + Math.random() * 5;
            const speedY = -0.5 - Math.random() * 1;
            const speedX = (Math.random() - 0.5) * 0.3;
            const life = 60 + Math.random() * 60;
            
            steamParticles.push({ x, y, size, speedX, speedY, life, opacity: 0.7 });
        }
    }
    
    // Update existing particles
    for (let i = steamParticles.length - 1; i >= 0; i--) {
        const p = steamParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.opacity = Math.max(0, p.life / 120);
        p.size += 0.05;
        
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

function updateCoffeeDroplets() {
    for (let i = coffeeDroplets.length - 1; i >= 0; i--) {
        const d = coffeeDroplets[i];
        d.x += d.speedX;
        d.y += d.speedY;
        d.life--;
        
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

// Initialize the game on load
window.onload = init;
