// Animation management for visual effects
class AnimationManager {
    constructor() {
        this.enabled = GAME_CONFIG.animationsEnabled;
        this.activeAnimations = new Set();
    }

    // Add entrance animation to element
    addEntranceAnimation(element, animationType = 'fadeInUp', delay = 0) {
        if (!this.enabled || !element) return;

        element.style.animationDelay = `${delay}s`;
        element.classList.add(`animate-${animationType}`);
        
        const animationId = `${element.id || 'element'}-${Date.now()}`;
        this.activeAnimations.add(animationId);

        // Clean up after animation
        setTimeout(() => {
            element.classList.remove(`animate-${animationType}`);
            element.style.animationDelay = '';
            this.activeAnimations.delete(animationId);
        }, 1000 + (delay * 1000));

        return animationId;
    }

    // Animate guess card appearance
    animateGuessCard(element, similarity) {
        if (!this.enabled || !element) return;

        // Choose animation based on similarity
        let animationType = 'slideInLeft';
        if (similarity === 100) {
            animationType = 'bounce';
        } else if (similarity >= 80) {
            animationType = 'scaleIn';
        } else if (similarity < 20) {
            animationType = 'shake';
        }

        element.classList.add(`animate-${animationType}`);
        
        setTimeout(() => {
            element.classList.remove(`animate-${animationType}`);
        }, 1000);
    }

    // Create confetti effect for winning
    createConfettiEffect() {
        if (!this.enabled) return;

        const container = document.createElement('div');
        container.className = 'celebration-container';
        document.body.appendChild(container);

        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
        }

        // Clean up after animation
        setTimeout(() => {
            document.body.removeChild(container);
        }, 5000);
    }

    // Create sparkle effect around element
    createSparkleEffect(element) {
        if (!this.enabled || !element) return;

        const rect = element.getBoundingClientRect();
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = rect.top + 'px';
        container.style.left = rect.left + 'px';
        container.style.width = rect.width + 'px';
        container.style.height = rect.height + 'px';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1000';
        
        document.body.appendChild(container);

        // Create sparkles
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 1.5 + 's';
            container.appendChild(sparkle);
        }

        // Clean up
        setTimeout(() => {
            document.body.removeChild(container);
        }, 2000);
    }

    // Animate physical map markers
    animateMapMarkers(targetElement, guessElements) {
        if (!this.enabled) return;

        // Pulse target marker
        if (targetElement) {
            targetElement.classList.add('animate-pulse');
        }

        // Animate guess markers with stagger
        guessElements.forEach((element, index) => {
            if (element) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('animate-scaleIn');
                
                setTimeout(() => {
                    element.classList.remove('animate-scaleIn');
                    element.style.animationDelay = '';
                }, 1000);
            }
        });
    }

    // Animate similarity bar
    animateSimilarityBar(element, similarity) {
        if (!this.enabled || !element) return;

        element.style.width = '0%';
        element.style.transition = 'width 1s ease-out';
        
        setTimeout(() => {
            element.style.width = similarity + '%';
        }, 100);
    }

    // Shake element (for errors)
    shakeElement(element) {
        if (!this.enabled || !element) return;

        element.classList.add('animate-shake');
        setTimeout(() => {
            element.classList.remove('animate-shake');
        }, 500);
    }

    // Glow effect for important elements
    addGlowEffect(element) {
        if (!this.enabled || !element) return;

        element.classList.add('animate-glow');
        return () => {
            element.classList.remove('animate-glow');
        };
    }

    // Floating animation for decorative elements
    addFloatingAnimation(element) {
        if (!this.enabled || !element) return;

        element.classList.add('animate-float');
        return () => {
            element.classList.remove('animate-float');
        };
    }

    // Staggered animation for lists
    animateList(elements, animationType = 'fadeInUp', staggerDelay = 0.1) {
        if (!this.enabled || !elements.length) return;

        elements.forEach((element, index) => {
            if (element) {
                this.addEntranceAnimation(element, animationType, index * staggerDelay);
            }
        });
    }

    // Toggle animations on/off
    toggleAnimations() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Clear all active animations
    clearAllAnimations() {
        this.activeAnimations.forEach(id => {
            // Animation cleanup is handled in individual methods
        });
        this.activeAnimations.clear();
    }

    // Get current settings
    getSettings() {
        return {
            enabled: this.enabled,
            activeCount: this.activeAnimations.size
        };
    }
}

// Initialize animation manager
window.animationManager = new AnimationManager();