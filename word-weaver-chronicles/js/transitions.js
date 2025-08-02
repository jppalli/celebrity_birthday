// Enhanced Transitions and Animations Manager
class TransitionManager {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupWordInputAnimations();
        this.setupLoadingStates();
        this.addPageTransitionClass();
    }

    // Setup smooth page transitions
    setupPageTransitions() {
        // Add transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        document.body.appendChild(overlay);

        // Handle navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes('#')) {
                e.preventDefault();
                this.navigateToPage(link.href);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handlePageLoad();
        });
    }

    // Navigate to a new page with transition
    navigateToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const overlay = document.querySelector('.transition-overlay');
        
        // Show transition overlay
        overlay.classList.add('active');
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // Handle page load animations
    handlePageLoad() {
        // Add page transition class to main container
        const container = document.querySelector('.newspaper-container, .homepage-container');
        if (container) {
            container.classList.add('page-transition');
        }

        // Animate content based on page type
        this.animatePageContent();
    }

    // Animate page content based on current page
    animatePageContent() {
        const path = window.location.pathname;
        
        if (path.includes('index.html') || path === '/') {
            this.animateHomepage();
        } else if (path.includes('game.html')) {
            this.animateGamePage();
        } else if (path.includes('archive.html')) {
            this.animateArchivePage();
        } else if (path.includes('leaderboard.html')) {
            this.animateLeaderboardPage();
        }
    }

    // Animate homepage content
    animateHomepage() {
        const elements = [
            '.title-section',
            '.description',
            '.start-button',
            '.features'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.animationDelay = `${index * 0.2}s`;
                element.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }

    // Animate game page content
    animateGamePage() {
        // Story lines are already animated via CSS
        // Add additional animations for buttons and score display
        const elements = [
            '.story-header',
            '.instructions',
            '.buttons'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }
        });
    }

    // Animate archive page content
    animateArchivePage() {
        const archiveCards = document.querySelectorAll('.archive-card');
        archiveCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInScale 0.4s ease-out forwards';
        });
    }

    // Animate leaderboard page content
    animateLeaderboardPage() {
        const elements = [
            '.leaderboard-header',
            '.stats-summary',
            '.leaderboard-container'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.animationDelay = `${index * 0.2}s`;
                element.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }

    // Setup enhanced word input animations
    setupWordInputAnimations() {
        document.addEventListener('DOMContentLoaded', () => {
            const inputs = document.querySelectorAll('.word-input');
            
            inputs.forEach(input => {
                // Add focus animation
                input.addEventListener('focus', () => {
                    this.animateInputFocus(input);
                });

                // Add blur animation
                input.addEventListener('blur', () => {
                    this.animateInputBlur(input);
                });

                // Add typing animation
                input.addEventListener('input', () => {
                    this.animateInputTyping(input);
                });
            });
        });
    }

    // Animate input focus
    animateInputFocus(input) {
        input.classList.add('focus-animation');
        setTimeout(() => {
            input.classList.remove('focus-animation');
        }, 300);
    }

    // Animate input blur
    animateInputBlur(input) {
        if (input.value.trim()) {
            input.classList.add('success');
            setTimeout(() => {
                input.classList.remove('success');
            }, 800);
        }
    }

    // Animate input typing
    animateInputTyping(input) {
        input.classList.add('typing-animation');
        setTimeout(() => {
            input.classList.remove('typing-animation');
        }, 200);
    }

    // Setup loading states for buttons
    setupLoadingStates() {
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('button');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    if (button.id === 'randomBtn') {
                        this.animateRandomWords(button);
                    } else if (button.id === 'weaveBtn') {
                        this.animateWeaveStory(button);
                    }
                });
            });
        });
    }

    // Animate random words generation
    animateRandomWords(button) {
        const originalText = button.textContent;
        button.textContent = 'Generating...';
        button.disabled = true;
        
        // Add loading spinner
        const spinner = document.createElement('span');
        spinner.className = 'loading-spinner';
        spinner.style.marginLeft = '10px';
        button.appendChild(spinner);

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            if (spinner.parentNode) {
                spinner.remove();
            }
        }, 1000);
    }

    // Animate weave story button
    animateWeaveStory(button) {
        const originalText = button.textContent;
        button.textContent = 'Weaving...';
        button.disabled = true;
        
        // Add loading spinner
        const spinner = document.createElement('span');
        spinner.className = 'loading-spinner';
        spinner.style.marginLeft = '10px';
        button.appendChild(spinner);

        // Simulate processing time
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            if (spinner.parentNode) {
                spinner.remove();
            }
        }, 1500);
    }

    // Add page transition class to body
    addPageTransitionClass() {
        document.body.classList.add('page-transition');
    }

    // Animate word input when random words are generated
    animateRandomWordInput(input, word) {
        input.classList.add('loading');
        input.value = '';
        
        // Type the word character by character
        let index = 0;
        const typeInterval = setInterval(() => {
            input.value += word[index];
            index++;
            
            if (index >= word.length) {
                clearInterval(typeInterval);
                input.classList.remove('loading');
                input.classList.add('success');
                
                setTimeout(() => {
                    input.classList.remove('success');
                }, 800);
            }
        }, 100);
    }

    // Animate score display
    animateScoreDisplay(scoreElement, finalScore) {
        let currentScore = 0;
        const increment = Math.ceil(finalScore / 50);
        
        const scoreInterval = setInterval(() => {
            currentScore += increment;
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                clearInterval(scoreInterval);
            }
            scoreElement.textContent = currentScore;
        }, 50);
    }

    // Animate medal appearance
    animateMedalAppearance(medalElement) {
        medalElement.style.opacity = '0';
        medalElement.style.transform = 'scale(0)';
        
        setTimeout(() => {
            medalElement.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            medalElement.style.opacity = '1';
            medalElement.style.transform = 'scale(1)';
        }, 500);
    }

    // Animate result section appearance
    animateResultSection(resultSection) {
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            resultSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate celebration for high scores
    animateCelebration(score) {
        if (score > 250) {
            // Trigger celebration effects
            this.triggerConfetti();
            this.animateTitleGlow();
        }
    }

    // Trigger confetti effect
    triggerConfetti() {
        const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#8b0000'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }

    // Create individual confetti piece
    createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }

    // Animate title glow for celebrations
    animateTitleGlow() {
        const title = document.querySelector('.main-title, .story-title');
        if (title) {
            title.style.animation = 'titleGlow 0.5s ease-in-out 3';
        }
    }
}

// Create global instance
window.TransitionManager = new TransitionManager();

// Initialize transitions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.TransitionManager.handlePageLoad();
}); 