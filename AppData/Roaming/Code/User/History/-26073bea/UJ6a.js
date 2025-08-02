window.onload = function(){
    var game = new Phaser.Game();
}
class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('orchard', `https://play.rosebud.ai/assets/orchard.png?51Lv`);
        this.load.image('apple', `https://play.rosebud.ai/assets/apple.png?Hy4W`);
        this.load.image('red', `https://play.rosebud.ai/assets/red.png?G6RF`);
    }

    create ()
    {
        // Add the new orchard background
        const background = this.add.image(400, 300, 'orchard');
        
        // Scale the background to fit the game width while maintaining aspect ratio
        const scaleX = 800 / background.width;
        const scaleY = 600 / background.height;
        const scale = Math.max(scaleX, scaleY);
        
        // Make the background a little smaller by reducing the scale
        const smallerScale = scale * 1; 
        background.setScale(smallerScale);

        // Center the background
        background.setPosition(400, 300);

        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            tint: 0x42e0f5 // Set the tint to light blue color (#42e0f5)
        });

        const apple = this.physics.add.image(400, 100, 'apple');

        // Make the apple 20% smaller than its previous size
        apple.setScale(0.2 * 0.8);

        // Remove the line that sets the initial velocity
        // apple.setVelocity(100, 200);

        apple.setBounce(0.8, 0.8);
        apple.setCollideWorldBounds(true);

        emitter.startFollow(apple);

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                // this.scene.start('new-scene');
                // this.switchScene();
            },
        });
    }
}

const container = document.getElementById('renderDiv');
const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: Example
};

window.phaserGame = new Phaser.Game(config);