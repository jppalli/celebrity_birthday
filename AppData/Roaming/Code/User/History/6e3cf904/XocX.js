document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const scoreElement = document.getElementById('score');

    // Game state
    let gameActive = false;
    let pouring = false;
    let score = 0;
    let cupFillLevel = 0;
    let cupCapacity = 100;
    let pourSpeed = 1;
    let coffeeX = canvas.width / 2;
    let potY = 100;
    
    // Coffee pot position and movement
    let potX = canvas.width / 2;
    let potDirection = 1;
    let potSpeed = 2;
    
    // Cup position
    const cupWidth = 80;
    const cupHeight = 100;
    const cupX = (canvas.width - cupWidth) / 2;
    const cupY = canvas.height - cupHeight - 50;
    
    // Coffee stream properties
    const streamWidth = 10;
    let streamHeight = 0;
    
    // Game initialization
    function init() {
        gameActive = false;
        pouring = false;
        cupFillLevel = 0;
        score = 0;
        potX = canvas.width / 2;
        updateScore();
        drawGame();
    }
    
    // Draw game elements
    function drawGame() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw coffee pot
        drawCoffeePot();
        
        // Draw coffee stream if pouring
        if (pouring) {
            drawCoffeeStream();
        }
        
        // Draw cup
        drawCup();
        
        // Draw fill level indicator
        drawFillLevel();
        
        // Request next frame if game is active
        if (gameActive) {
            requestAnimationFrame(updateGame);
        }
    }
    
    function drawCoffeePot() {
        ctx.fillStyle = '#6f4e37';
        ctx.beginPath();
        ctx.ellipse(potX, potY, 40, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pot handle
        ctx.strokeStyle = '#6f4e37';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(potX + 45, potY, 20, -Math.PI/2, Math.PI/2);
        ctx.stroke();
        
        // Pot spout
        ctx.beginPath();
        ctx.moveTo(potX - 20, potY);
        ctx.lineTo(potX - 40, potY + 30);
        ctx.lineTo(potX - 30, potY + 30);
        ctx.lineTo(potX - 15, potY);
        ctx.fill();
        
        coffeeX = potX - 35;
    }
    
    function drawCoffeeStream() {
        const streamTop = potY + 30;
        streamHeight = Math.min(cupY - streamTop, cupY - streamTop + (pouring ? cupFillLevel : 0));
        
        ctx.fillStyle = '#3e2723';
        ctx.beginPath();
        ctx.rect(coffeeX - streamWidth/2, streamTop, streamWidth, streamHeight);
        ctx.fill();
    }
    
    function drawCup() {
        // Cup body
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // Cup main body (slightly tapered)
        ctx.beginPath();
        ctx.moveTo(cupX, cupY);
        ctx.lineTo(cupX + cupWidth, cupY);
        ctx.lineTo(cupX + cupWidth - 10, cupY + cupHeight);
        ctx.lineTo(cupX + 10, cupY + cupHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Cup handle
        ctx.beginPath();
        ctx.arc(cupX + cupWidth + 10, cupY + 40, 20, -Math.PI/2, Math.PI/2);
        ctx.stroke();
    }
    
    function drawFillLevel() {
        // Calculate fill height based on percentage
        const maxFillHeight = cupHeight - 10;
        const fillHeight = (cupFillLevel / cupCapacity) * maxFillHeight;
        
        if (fillHeight > 0) {
            const fillY = cupY + cupHeight - fillHeight;
            
            // Draw coffee
            ctx.fillStyle = '#3e2723';
            ctx.beginPath();
            ctx.moveTo(cupX + 10, cupY + cupHeight);
            ctx.lineTo(cupX + cupWidth - 10, cupY + cupHeight);
            ctx.lineTo(cupX + cupWidth - 12, fillY);
            ctx.lineTo(cupX + 12, fillY);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Update game state
    function updateGame() {
        // Move coffee pot
        potX += potSpeed * potDirection;
        
        // Reverse direction at edges
        if (potX > canvas.width - 60 || potX < 60) {
            potDirection *= -1;
        }
        
        // Fill cup if pouring and pot is above the cup
        if (pouring) {
            if (coffeeX > cupX && coffeeX < cupX + cupWidth) {
                cupFillLevel += pourSpeed;
                
                // Check for overflow
                if (cupFillLevel > cupCapacity) {
                    gameOver();
                } else if (cupFillLevel === cupCapacity) {
                    perfectFill();
                }
            }
        }
        
        drawGame();
    }
    
    function perfectFill() {
        score += 100;
        updateScore();
        cupFillLevel = 0;
        pourSpeed += 0.2; // Increase difficulty
    }
    
    function gameOver() {
        gameActive = false;
        pouring = false;
        alert(`Game Over! Your final score: ${score}`);
    }
    
    function updateScore() {
        scoreElement.textContent = score;
    }
    
    // Event listeners
    startButton.addEventListener('click', () => {
        if (!gameActive) {
            gameActive = true;
            drawGame();
        }
    });
    
    resetButton.addEventListener('click', () => {
        init();
    });
    
    canvas.addEventListener('mousedown', () => {
        if (gameActive) {
            pouring = true;
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        pouring = false;
    });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (gameActive) {
            pouring = true;
        }
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        pouring = false;
    });
    
    // Initialize the game
    init();
});
