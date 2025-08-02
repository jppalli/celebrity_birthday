// Pixi.js Effects Manager
class PixiEffectsManager {
    constructor() {
        this.app = null;
        this.floatingTexts = [];
        this.inkSplotches = [];
        this.isInitialized = false;
    }

    // Initialize PixiJS application
    init() {
        if (this.isInitialized) return;

        try {
            this.app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundAlpha: 0,
                antialias: true,
                resolution: window.devicePixelRatio || 1
            });
            
            const pixiCanvas = document.getElementById('pixiCanvas');
            if (pixiCanvas) {
                pixiCanvas.appendChild(this.app.view);
            }
            
            this.createFloatingLetters();
            this.createInkSplotches();
            this.setupAnimationLoop();
            this.setupResizeHandler();
            
            this.isInitialized = true;
        } catch (error) {
            console.warn('PixiJS not available, continuing without visual effects');
        }
    }

    // Create floating letters for background effect
    createFloatingLetters() {
        if (!this.app) return;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        for (let i = 0; i < 15; i++) {
            const style = new PIXI.TextStyle({
                fontFamily: 'Special Elite',
                fontSize: Math.random() * 24 + 16,
                fill: ['#d4c5a3'],
                opacity: 0.3
            });
            
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const text = new PIXI.Text(letter, style);
            text.x = Math.random() * this.app.screen.width;
            text.y = Math.random() * this.app.screen.height;
            text.anchor.set(0.5);
            text.direction = Math.random() > 0.5 ? 1 : -1;
            text.speed = Math.random() * 0.5 + 0.1;
            
            this.app.stage.addChild(text);
            this.floatingTexts.push(text);
        }
    }

    // Create ink splotches using DOM elements
    createInkSplotches() {
        const container = document.querySelector('.newspaper-container');
        if (!container) return;

        for (let i = 0; i < 5; i++) {
            const splotch = document.createElement('div');
            splotch.className = 'ink-splotch';
            splotch.style.top = `${Math.random() * 100}%`;
            splotch.style.left = `${Math.random() * 100}%`;
            splotch.style.opacity = Math.random() * 0.2 + 0.1;
            splotch.style.transform = `scale(${Math.random() * 0.8 + 0.5}) rotate(${Math.random() * 360}deg)`;
            container.appendChild(splotch);
            this.inkSplotches.push(splotch);
        }
    }

    // Setup animation loop for floating letters
    setupAnimationLoop() {
        if (!this.app) return;

        this.app.ticker.add((delta) => {
            this.floatingTexts.forEach(text => {
                text.rotation += 0.01 * text.direction * delta;
                text.y += text.speed * delta;
                
                if (text.y > this.app.screen.height + 50) {
                    text.y = -50;
                }
            });
        });
    }

    // Handle window resize
    setupResizeHandler() {
        if (!this.app) return;

        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }

    // Add particle effect for word input
    addWordParticleEffect(x, y, word) {
        if (!this.app) return;

        const particleCount = 8;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const style = new PIXI.TextStyle({
                fontFamily: 'Special Elite',
                fontSize: 12,
                fill: ['#8b0000'],
                opacity: 0.8
            });

            const particle = new PIXI.Text(word[i % word.length] || '•', style);
            particle.x = x;
            particle.y = y;
            particle.anchor.set(0.5);
            particle.velocity = {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4
            };
            particle.life = 60; // frames

            this.app.stage.addChild(particle);
            particles.push(particle);
        }

        // Animate particles
        const animate = () => {
            particles.forEach((particle, index) => {
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.alpha -= 0.02;
                particle.life--;

                if (particle.life <= 0) {
                    this.app.stage.removeChild(particle);
                    particles.splice(index, 1);
                }
            });

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    // Add celebration effect for high scores
    addCelebrationEffect() {
        if (!this.app) return;

        const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#8b0000'];
        const particles = [];

        for (let i = 0; i < 20; i++) {
            const style = new PIXI.TextStyle({
                fontFamily: 'Special Elite',
                fontSize: Math.random() * 20 + 10,
                fill: [colors[Math.floor(Math.random() * colors.length)]],
                opacity: 0.9
            });

            const symbols = ['⭐', '🎉', '🏆', '✨', '💎', '🌟'];
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            const particle = new PIXI.Text(symbol, style);
            
            particle.x = this.app.screen.width / 2;
            particle.y = this.app.screen.height / 2;
            particle.anchor.set(0.5);
            particle.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            particle.life = 120;

            this.app.stage.addChild(particle);
            particles.push(particle);
        }

        // Animate celebration particles
        const animate = () => {
            particles.forEach((particle, index) => {
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.velocity.y += 0.1; // gravity
                particle.alpha -= 0.01;
                particle.life--;

                if (particle.life <= 0) {
                    this.app.stage.removeChild(particle);
                    particles.splice(index, 1);
                }
            });

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    // Add typing effect for story inputs
    addTypingEffect(input) {
        if (!this.app) return;

        const rect = input.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const style = new PIXI.TextStyle({
            fontFamily: 'Special Elite',
            fontSize: 14,
            fill: ['#8b0000'],
            opacity: 0.7
        });

        const cursor = new PIXI.Text('|', style);
        cursor.x = x;
        cursor.y = y;
        cursor.anchor.set(0.5);

        this.app.stage.addChild(cursor);

        let blinkState = true;
        const blinkInterval = setInterval(() => {
            cursor.alpha = blinkState ? 1 : 0;
            blinkState = !blinkState;
        }, 500);

        // Remove cursor when input loses focus
        input.addEventListener('blur', () => {
            clearInterval(blinkInterval);
            this.app.stage.removeChild(cursor);
        });
    }

    // Cleanup resources
    destroy() {
        if (this.app) {
            this.app.destroy(true);
            this.app = null;
        }
        this.isInitialized = false;
    }
}

// Create global instance
window.PixiEffects = new PixiEffectsManager();

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.PixiEffects.init();
}); 