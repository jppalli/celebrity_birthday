// Audio management for game sounds
class AudioManager {
    constructor() {
        this.sounds = {};
        this.enabled = GAME_CONFIG.soundEnabled;
        this.volume = 0.5;
        this.initializeSounds();
    }

    // Initialize audio elements
    initializeSounds() {
        this.sounds = {
            correct: document.getElementById('correct-sound'),
            close: document.getElementById('close-sound'),
            wrong: document.getElementById('wrong-sound')
        };

        // Set initial volume
        Object.values(this.sounds).forEach(sound => {
            if (sound) {
                sound.volume = this.volume;
            }
        });
    }

    // Play sound based on similarity score
    playGuessSound(similarity) {
        if (!this.enabled) return;

        let soundKey;
        if (similarity === 100) {
            soundKey = 'correct';
        } else if (similarity >= 60) {
            soundKey = 'close';
        } else {
            soundKey = 'wrong';
        }

        this.playSound(soundKey);
    }

    // Play specific sound
    playSound(soundKey) {
        if (!this.enabled || !this.sounds[soundKey]) return;

        const sound = this.sounds[soundKey];
        sound.currentTime = 0;
        
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    }

    // Create synthetic sounds using Web Audio API
    createSyntheticSounds() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log('Web Audio API not supported');
            return;
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Success sound
        this.createSuccessSound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        };

        // Close sound
        this.createCloseSound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
            oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1); // C#5
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        };

        // Wrong sound
        this.createWrongSound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
            oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1); // G3
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        };
    }

    // Play synthetic sound if audio files not available
    playSyntheticSound(similarity) {
        if (!this.enabled) return;

        try {
            if (similarity === 100 && this.createSuccessSound) {
                this.createSuccessSound();
            } else if (similarity >= 60 && this.createCloseSound) {
                this.createCloseSound();
            } else if (this.createWrongSound) {
                this.createWrongSound();
            }
        } catch (error) {
            console.log('Synthetic sound failed:', error);
        }
    }

    // Toggle sound on/off
    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Set volume (0-1)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            if (sound) {
                sound.volume = this.volume;
            }
        });
    }

    // Get current settings
    getSettings() {
        return {
            enabled: this.enabled,
            volume: this.volume
        };
    }
}

// Initialize audio manager
window.audioManager = new AudioManager();

// Create synthetic sounds as fallback
window.audioManager.createSyntheticSounds();