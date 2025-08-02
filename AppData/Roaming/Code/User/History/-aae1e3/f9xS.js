class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        });
    }
    preload() {
        this.load.image('menuBackground', 'https://play.rosebud.ai/assets/backgourndhomepage.png?h8yR');
        this.load.audio('backgroundMusic', 'https://play.rosebud.ai/assets/JAYUS-JAZZ-Hoba.mp3?dWEz');
        this.fontLoaded = true;
    }
    create() {
        // Start background music
        if (!this.sound.get('backgroundMusic')) {
            this.backgroundMusic = this.sound.add('backgroundMusic', {
                loop: true,
                volume: 0.3
            });
            this.backgroundMusic.play();
        }
        const background = this.add.sprite(180, 320, 'menuBackground')
            .setOrigin(0.5)
            .setDisplaySize(360, 640);
        // Add title
        const title = this.add.text(180, 160, 'CAMPARI', {
            fontSize: '64px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 5,
                fill: true
            }
        }).setOrigin(0.5).setAlpha(0);
        const subtitle = this.add.text(180, 200, 'MEZCLA TU ESTILO!', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#000000',
                blur: 3,
                fill: true
            }
        }).setOrigin(0.5).setAlpha(0);
        
        // Create buttons container
        const buttonContainer = this.add.container(0, 0).setAlpha(0);

        // Create Play button (using new method)
        const playButton = this.createButton(180, 410, 'VAMOS!', 180, 60, 24);
        playButton.setPosition(0, 0);
        
        // Create Levels button (using new method)
        const levelsButton = this.createButton(180, 535, 'A LA CARTA', 160, 50, 18);
        levelsButton.setPosition(0, 100);
        
        buttonContainer.add([playButton, levelsButton]);

        // Add animations
        this.tweens.add({
            targets: title,
            alpha: 1,
            y: {
                from: 100,
                to: 160
            },
            duration: 800,
            ease: 'Power2',
            delay: 200
        });
        this.tweens.add({
            targets: subtitle,
            alpha: 1,
            y: {
                from: 260,
                to: 250
            },
            duration: 800,
            ease: 'Power2',
            delay: 600
        });
        this.tweens.add({
            targets: buttonContainer,
            alpha: 1,
            y: {
                from: 50,
                to: 0
            },
            duration: 800,
            ease: 'Power2',
            delay: 1000
        });
        
        // Add button functionality
        playButton.setInteractive().on('pointerdown', () => {
            const gameScene = this.scene.get('BartendingGame');
            gameScene.tutorialShown = false;
            this.scene.start('BartendingGame', {
                fromMainMenu: true
            });
        });
        
        levelsButton.setInteractive().on('pointerdown', () => {
            this.scene.start('LevelSelect');
        });
    }
    
    // Helper function to create consistently styled buttons
    createButton(x, y, text, width, height, fontSize) {
        const container = this.add.container(x, y);
        
        // Create button background as a sprite instead of graphics
        const bg = this.add.rectangle(0, 0, width, height, 0xFFFFFF, 1)
            .setOrigin(0.5)
            .setStrokeStyle(3, 0x000000);
        
        // Round the corners by adding a mask
        const shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.fillRoundedRect(-width/2, -height/2, width, height, 15);
        
        const mask = shape.createGeometryMask();
        bg.setMask(mask);
        
        // Create text
        const buttonText = this.add.text(0, 0, text, {
            fontSize: `${fontSize}px`,
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Add all to container
        container.add([bg, buttonText, shape]);
        
        return container;
    }
}
class BartendingGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'BartendingGame'
        });
        this.fontLoaded = false;
        this.tutorialShown = false;
        // Reorder drinks to match the desired sequence
        this.drinks = {
            'campari tonic': {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 200,
                    yOffset: 0,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    'tónica': {
                        quantity: 0.60,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            },
            negroni: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    ginebra: {
                        quantity: 0.30,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    },
                    vermut: {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    }
                }
            },
            americano: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    vermut: {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    },
                    soda: {
                        quantity: 0.10,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            },
            'campari tonic': {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 200,
                    yOffset: 0,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    'tónica': {
                        quantity: 0.60,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            },
            negroni: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    ginebra: {
                        quantity: 0.30,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    },
                    vermut: {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    }
                }
            },
            americano: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    vermut: {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    },
                    soda: {
                        quantity: 0.10,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            },
            boulevardier: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    'vermut': {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    },
                    'campari': {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    'bourbon': {
                        quantity: 0.30,
                        fillColor: 0xd4a256,
                        lineColor: 0xd4a256
                    }
                }
            },
            'campari spritz': {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 200,
                    yOffset: 0,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    'prosecco': {
                        quantity: 0.45,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    },
                    soda: {
                        quantity: 0.15,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            },
            garibaldi: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 200,
                    yOffset: 0,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    'jugo de naranja': {
                        quantity: 0.60,
                        fillColor: 0xffa500,
                        lineColor: 0xffa500
                    }
                }
            },
            americano: {
                isMixed: true,
                glass: {
                    width: 100,
                    height: 100,
                    yOffset: 50,
                    type: 'regular'
                },
                ingredients: {
                    campari: {
                        quantity: 0.30,
                        fillColor: 0xff2400,
                        lineColor: 0xff2400
                    },
                    vermut: {
                        quantity: 0.30,
                        fillColor: 0x8B4513,
                        lineColor: 0x8B4513
                    },
                    soda: {
                        quantity: 0.10,
                        fillColor: 0xf5f5f5,
                        lineColor: 0xf5f5f5
                    }
                }
            }
        };
        this.bottle = null;
        this.glass = null;
        this.isDragging = false;
        this.startDragY = 0;
        this.interactionEnabled = true;
        this.currentIngredient = null;
        this.switchButton = null;
        this.ingredientFillLevels = {};
        this.dragDistance = 0;
        this.minDragDistance = 10;
        this.fillGraphics = null;
        this.currentDrink = 'campari tonic'; // Set campari tonic as the default drink
        this.fillLevel = 0;
        this.targetLevel = 0;
        this.targetLines = [];
        this.isPouring = false;
        this.drinkNameText = null;
        this.ingredientTargetTexts = [];
        this.dropdownVisible = false;
        this.initialBottleX = 570;
        this.initialBottleY = 150;
        this.initialRotation = -Math.PI / 3;
    }

    // Removed createDropdown method

    animateBottleEntrance() {
        this.tweens.add({
            targets: this.bottle,
            x: 280,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.bottle.setInteractive();
            }
        });
    }

    preload() {
        // Set default font
        this.fontLoaded = true;
        this.load.audio('backgroundMusic', 'https://play.rosebud.ai/assets/JAYUS-JAZZ-Hoba.mp3?dWEz');
        this.load.audio('pourSound', 'https://play.rosebud.ai/assets/pouring-water-313308.mp3?pSzV');
        this.load.audio('failSound', 'https://play.rosebud.ai/assets/timpani-boing-fail-146292.mp3?REmq');
        this.load.audio('successSound', 'https://play.rosebud.ai/assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3?UxCL');
        this.load.image('campariTop', 'https://play.rosebud.ai/assets/campari top.png?qHeX');
        this.load.image('ginTop', 'https://play.rosebud.ai/assets/gin-top.png?oinq');
        this.load.image('vermutTop', 'https://play.rosebud.ai/assets/bermutop.png?ECVQ');
        this.load.image('menuBackground', 'https://play.rosebud.ai/assets/backgourndhomepage.png?h8yR');
        this.load.image('tonicaTop', 'https://play.rosebud.ai/assets/botella-removebg-preview.png?8Vm0');
    }
    create() {
        this.tutorialActive = false;
        this.completedLevels = 0;
        // currentDrink will be set by the level select scene if coming from there
        // Show tutorial if starting from main menu via vamos button
        if (!this.tutorialShown && this.scene.settings.data?.fromMainMenu) {
            this.tutorialActive = true;
            this.showTutorial();
        }
        // Start background music if not already playing
        if (!this.sound.get('backgroundMusic')) {
            this.backgroundMusic = this.sound.add('backgroundMusic', {
                loop: true,
                volume: 0.3
            });
            this.backgroundMusic.play();
        }
        // Add background image with transparency
        const background = this.add.sprite(180, 320, 'menuBackground')
            .setOrigin(0.5)
            .setAlpha(0.85)
            .setDisplaySize(360, 640);
        // Add campari top overlay
        this.campariTopOverlay = this.add.sprite(this.initialBottleX + 150, this.initialBottleY, 'campariTop')
            .setOrigin(0.5)
            .setScale(0.8)
            .setDepth(5)
            .setVisible(this.currentIngredient === 'campari');
        this.campariTopOverlay.rotation = this.initialRotation;

        // Add gin top overlay
        this.ginTopOverlay = this.add.sprite(this.initialBottleX + 150, this.initialBottleY, 'ginTop')
            .setOrigin(0.5)
            .setScale(0.64)
            .setDepth(5)
            .setVisible(this.currentIngredient === 'ginebra');
        this.ginTopOverlay.rotation = this.initialRotation;
        // Add vermut top overlay
        this.vermutTopOverlay = this.add.sprite(this.initialBottleX + 150, this.initialBottleY, 'vermutTop')
            .setOrigin(0.5)
            .setScale(0.64) // Reduced by 20% from 0.8
            .setDepth(5)
            .setVisible(this.currentIngredient === 'vermut');
        this.vermutTopOverlay.rotation = this.initialRotation;
        // Add soda/tonica top overlay
        this.tonicaTopOverlay = this.add.sprite(this.initialBottleX + 150, this.initialBottleY, 'tonicaTop')
            .setOrigin(0.5)
            .setScale(0.64)
            .setDepth(5)
            .setVisible(this.currentIngredient === 'tónica' || this.currentIngredient === 'soda');
        this.tonicaTopOverlay.rotation = this.initialRotation;
        this.pouringGraphics = this.add.graphics();
        this.fillGraphics = this.add.graphics();
        this.glassOutline = this.add.graphics();
        const glassConfig = this.drinks[this.currentDrink].glass;
        this.glass = {
            x: -100,
            y: 500,
            width: glassConfig.width,
            height: glassConfig.height,
            yOffset: glassConfig.yOffset,
            targetX: 180
        };
        this.drawGlassOutline();

        this.tweens.add({
            targets: this.glass,
            x: this.glass.targetX,
            duration: 500,
            ease: 'Back.easeOut',
            onUpdate: () => {
                this.drawGlassOutline();
            },
            onComplete: () => {
                this.tweens.add({
                    targets: this.glass,
                    x: this.glass.targetX + 3,
                    yoyo: true,
                    repeat: 2,
                    duration: 50,
                    ease: 'Sine.easeInOut',
                    onUpdate: () => {
                        this.drawGlassOutline();
                    },
                    onComplete: () => {
                        this.createTargetLines();
                        this.targetLines.forEach(line => {
                            line.setAlpha(0);
                            this.tweens.add({
                                targets: line,
                                alpha: 1,
                                duration: 200,
                                ease: 'Linear'
                            });
                        });
                        if (this.bottle) {
                            this.bottle.x = this.initialBottleX;
                            this.bottle.y = this.initialBottleY;
                            this.bottle.rotation = this.initialRotation;
                            this.animateBottleEntrance();
                        }
                    }
                });
            }
        });

        // Initialize bottle before updating appearance
        this.bottle = this.add.graphics().setDepth(4);
        this.bottle.x = this.initialBottleX;
        this.bottle.y = this.initialBottleY;
        // Check if we should draw the bottle based on current ingredient
        const hasOverlay = this.currentIngredient === 'campari' ||
            this.currentIngredient === 'ginebra' ||
            this.currentIngredient === 'vermut' ||
            this.currentIngredient === 'tónica' ||
            this.currentIngredient === 'soda';
        if (!hasOverlay) {
            this.drawBottleNeck();
        }
        this.bottle.setRotation(this.initialRotation);

        if (this.drinks[this.currentDrink].isMixed) {
            const ingredients = Object.keys(this.drinks[this.currentDrink].ingredients);
            this.currentIngredient = ingredients[0];
            this.targetLevel = this.drinks[this.currentDrink].ingredients[this.currentIngredient].quantity;
            this.updateBottleAppearance(); // Update bottle appearance on level load
            this.createIngredientSwitchButton();
            // Make sure the first button is selected visually
            if (this.switchButton && this.switchButton[0]) {
                const firstButtonGraphics = this.switchButton[0].getAt(0);
                firstButtonGraphics.clear();
                firstButtonGraphics.lineStyle(2, 0x000000);
                firstButtonGraphics.fillStyle(0xaaaaaa);
                firstButtonGraphics.fillRoundedRect(-75, -20, 150, 40, 15);
                firstButtonGraphics.strokeRoundedRect(-75, -20, 150, 40, 15);
            }
        } else {
            this.currentIngredient = null;
            this.targetLevel = this.drinks[this.currentDrink].quantity;
            if (this.switchButton) {
                this.switchButton.destroy();
                this.switchButton = null;
            }
        }

        this.dottedLine = this.add.graphics();

        this.drinkNameText = this.add.text(180, 20, this.currentDrink.toUpperCase(), {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'DM Serif Display',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 5,
                fill: true
            }
        }).setOrigin(0.5);

        this.updateIngredientTargets();

        this.bottle = this.add.graphics().setDepth(4);
        this.bottle.x = this.initialBottleX;
        this.bottle.y = this.initialBottleY;
        this.drawBottleNeck();
        this.bottle.setRotation(this.initialRotation);
        this.bottle.setInteractive(new Phaser.Geom.Rectangle(-120, -90, 240, 180), Phaser.Geom.Rectangle.Contains);

        this.input.on('pointerdown', (pointer) => {
            if (!this.tutorialActive && pointer.x > this.sys.game.config.width / 2 && this.interactionEnabled) {
                this.isDragging = true;
                this.startDragY = pointer.y;
                this.dragDistance = 0;

                // Update campari top overlay position
                if (this.currentIngredient === 'campari' && this.campariTopOverlay && this.bottle) {
                    this.campariTopOverlay.x = this.bottle.x;
                    this.campariTopOverlay.y = this.bottle.y;
                }
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (this.isDragging && pointer.x > this.sys.game.config.width / 2 && this.interactionEnabled) {
                this.dragDistance = Math.abs(pointer.y - this.startDragY);
                const dragY = pointer.y - this.startDragY;
                const maxRotation = -Math.PI / 2;
                const targetRotation = Math.max(maxRotation, Math.min(this.initialRotation, this.initialRotation - dragY / 50));
                this.rotationTween = this.tweens.add({
                    targets: [this.bottle, this.campariTopOverlay, this.ginTopOverlay, this.vermutTopOverlay, this.tonicaTopOverlay],
                    rotation: targetRotation,
                    duration: 100,
                    ease: 'Linear'
                });
                const newY = this.initialBottleY + dragY * 0.5;
                this.bottle.y = newY;

                // Update campari top overlay position
                if (this.currentIngredient === 'campari') {
                    this.campariTopOverlay.y = newY;
                }

                if (this.dragDistance >= this.minDragDistance && targetRotation < -Math.PI / 2.5) {
                    if (!this.isPouring) {
                        this.isPouring = true;
                        // Play pouring sound
                        if (!this.pourSound) {
                            this.pourSound = this.sound.add('pourSound', {
                                loop: true,
                                volume: 0.5
                            });
                        }
                        this.pourSound.play();
                    }

                    const currentColor = this.drinks[this.currentDrink].isMixed ?
                        this.drinks[this.currentDrink].ingredients[this.currentIngredient].fillColor :
                        this.drinks[this.currentDrink].fillColor;

                    const neckAngle = this.bottle.rotation;
                    const neckLength = 70;
                    const bottleNeckX = this.bottle.x - 70 + Math.cos(neckAngle) * neckLength;
                    const bottleNeckY = this.bottle.y - 15 + Math.sin(neckAngle) * neckLength;

                    this.pouringGraphics.setDepth(1);
                    this.fillGraphics.setDepth(2);
                    this.glassOutline.setDepth(3);
                    this.targetLines.forEach(line => line.setDepth(5));

                    this.updatePouringEffect(bottleNeckX, bottleNeckY, currentColor);
                } else if (this.isPouring) {
                    this.isPouring = false;
                    this.pouringGraphics.clear();
                }
            }
        });

        this.input.on('pointerup', () => {
            if (this.isDragging) {
                const wasPouring = this.isPouring && this.dragDistance >= this.minDragDistance;
                this.isDragging = false;
                this.isPouring = false;
                // Stop pouring sound
                if (this.pourSound && this.pourSound.isPlaying) {
                    this.pourSound.stop();
                }
                this.pouringGraphics.clear();
                this.dragDistance = 0;

                if (this.rotationTween && this.rotationTween.isPlaying()) {
                    this.rotationTween.stop();
                }

                this.tweens.add({
                    targets: [this.bottle, this.campariTopOverlay, this.ginTopOverlay, this.vermutTopOverlay, this.tonicaTopOverlay],
                    x: 280,
                    y: this.initialBottleY,
                    rotation: this.initialRotation,
                    duration: 400,
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        if (wasPouring && this.fillLevel > 0) {
                            this.checkScore();
                        }
                    }
                });
            }
        });
    }

    update() {
        this.drawBottleNeck(this.getCurrentColor());

        if (this.bottle) {
            // Update overlays position to match bottle
            if (this.currentIngredient === 'campari' && this.campariTopOverlay) {
                this.campariTopOverlay.x = this.bottle.x;
                this.campariTopOverlay.y = this.bottle.y;
                this.campariTopOverlay.rotation = this.bottle.rotation;
            }

            if (this.currentIngredient === 'ginebra' && this.ginTopOverlay) {
                this.ginTopOverlay.x = this.bottle.x;
                this.ginTopOverlay.y = this.bottle.y;
                this.ginTopOverlay.rotation = this.bottle.rotation;
            }

            if (this.currentIngredient === 'vermut' && this.vermutTopOverlay) {
                this.vermutTopOverlay.x = this.bottle.x;
                this.vermutTopOverlay.y = this.bottle.y;
                this.vermutTopOverlay.rotation = this.bottle.rotation;
            }
            if ((this.currentIngredient === 'tónica' || this.currentIngredient === 'soda') && this.tonicaTopOverlay) {
                this.tonicaTopOverlay.x = this.bottle.x;
                this.tonicaTopOverlay.y = this.bottle.y;
                this.tonicaTopOverlay.rotation = this.bottle.rotation;
            }
        }

        if (this.isPouring && this.interactionEnabled) {
            let isSpilled = false;

            if (this.drinks[this.currentDrink].isMixed) {
                const increment = 0.020;
                this.fillLevel += increment;

                if (!this.ingredientFillLevels[this.currentIngredient]) {
                    this.ingredientFillLevels[this.currentIngredient] = 0;
                }
                this.ingredientFillLevels[this.currentIngredient] = this.fillLevel;

                const totalFillLevel = Object.values(this.ingredientFillLevels)
                    .reduce((sum, level) => sum + level, 0);
                isSpilled = totalFillLevel >= 1;
            } else {
                const maxFill = this.drinks[this.currentDrink].glass.type === 'wine' ? 0.6 : 1;
                const increment = 0.01;
                this.fillLevel = Math.min(this.fillLevel + increment, maxFill);
                isSpilled = this.fillLevel >= 1;
            }

            this.updateFillGraphics();

            if (isSpilled) {
                this.isPouring = false;
                this.isDragging = false;
                this.pouringGraphics.clear();
                this.interactionEnabled = false;
                this.checkScore();
            }
        }
    }

    updatePouringEffect(startX, startY, color) {
        this.pouringGraphics.clear();
        const glassBottom = this.glass.y + this.glass.height / 2 + this.glass.yOffset;
        const currentFillHeight = this.fillLevel * this.glass.height;
        const endY = glassBottom - currentFillHeight;
        const endX = 180;
        const bottleRotation = this.bottle.rotation;
        const pourHoleX = this.bottle.x + Math.cos(bottleRotation) * 0 - Math.sin(bottleRotation) * -85;
        const pourHoleY = this.bottle.y + Math.sin(bottleRotation) * 0 + Math.cos(bottleRotation) * -85;
        const rotationFactor = Math.abs(bottleRotation) / (Math.PI / 2);
        const streamWidth = 6 * rotationFactor;
        this.pouringGraphics.fillStyle(color, 0.9);
        const controlX = pourHoleX - (pourHoleX - endX) * 0.5;
        const controlY = pourHoleY + (endY - pourHoleY) * 0.3;
        const segments = 25;
        for (let i = 0; i < segments; i++) {
            const t1 = i / segments;
            const t2 = (i + 1) / segments;
            const x1 = Phaser.Math.Interpolation.CubicBezier(t1, pourHoleX, controlX, controlX, endX);
            const y1 = Phaser.Math.Interpolation.CubicBezier(t1, pourHoleY, controlY, endY, endY);
            const x2 = Phaser.Math.Interpolation.CubicBezier(t2, pourHoleX, controlX, controlX, endX);
            const y2 = Phaser.Math.Interpolation.CubicBezier(t2, pourHoleY, controlY, endY, endY);
            const width = streamWidth * (1 - t1 * 0.5);
            const waveOffset = Math.sin(t1 * Math.PI * 4 + Date.now() / 100) * width * 0.2;

            this.pouringGraphics.beginPath();
            this.pouringGraphics.moveTo(x1 - width / 2 + waveOffset, y1);
            this.pouringGraphics.lineTo(x2 - width / 2 + waveOffset, y2);
            this.pouringGraphics.lineTo(x2 + width / 2 + waveOffset, y2);
            this.pouringGraphics.lineTo(x1 + width / 2 + waveOffset, y1);
            this.pouringGraphics.closePath();
            this.pouringGraphics.fillPath();
        }
        if (this.fillLevel > 0) {
            this.pouringGraphics.fillStyle(color, 0.8);
            const splashWidth = 15 * rotationFactor;
            const splashHeight = 4 * rotationFactor;
            const time = Date.now() / 150;
            for (let i = 0; i < 3; i++) {
                const scale = 1 + Math.sin(time + i) * 0.2;
                this.pouringGraphics.fillEllipse(
                    endX,
                    endY,
                    splashWidth * scale,
                    splashHeight * scale
                );
            }
        }
    }

    updateFillGraphics() {
        this.fillGraphics.clear();

        if (this.drinks[this.currentDrink].isMixed) {
            const bottomWidth = this.glass.width * 0.8;
            const topWidth = this.glass.width;
            const height = this.glass.height;
            const startY = this.glass.y - height / 2 + this.glass.yOffset;
            const ingredients = Object.entries(this.drinks[this.currentDrink].ingredients);
            let accumulatedHeight = 0;
            ingredients.forEach(([ingredient, data]) => {
                if (this.ingredientFillLevels[ingredient]) {
                    const currentHeight = this.ingredientFillLevels[ingredient] * height;
                    if (currentHeight > 0) {
                        const bottomY = startY + height - accumulatedHeight;
                        const topY = Math.max(startY, bottomY - currentHeight);
                        const bottomLayerWidth = bottomWidth + (topWidth - bottomWidth) * (accumulatedHeight / height);
                        const topLayerWidth = bottomWidth + (topWidth - bottomWidth) * ((accumulatedHeight + currentHeight) / height);

                        this.fillGraphics.fillStyle(data.fillColor, 1);
                        this.fillGraphics.beginPath();
                        this.fillGraphics.moveTo(this.glass.x - bottomLayerWidth / 2, bottomY);
                        this.fillGraphics.lineTo(this.glass.x - topLayerWidth / 2, topY);
                        this.fillGraphics.lineTo(this.glass.x + topLayerWidth / 2, topY);
                        this.fillGraphics.lineTo(this.glass.x + bottomLayerWidth / 2, bottomY);
                        this.fillGraphics.closePath();
                        this.fillGraphics.fillPath();

                        if (ingredient === this.currentIngredient) {
                            const waveAmplitude = 5 * (currentHeight / height);
                            this.fillGraphics.beginPath();
                            this.fillGraphics.moveTo(this.glass.x - topLayerWidth / 2, topY);
                            for (let i = 0; i <= 30; i++) {
                                const segmentRatio = i / 30;
                                const x = this.glass.x - topLayerWidth / 2 + topLayerWidth * segmentRatio;
                                const waveY = Math.sin((segmentRatio * Math.PI * 2) + Date.now() / 200) * waveAmplitude;
                                this.fillGraphics.lineTo(x, topY + waveY);
                            }
                            this.fillGraphics.lineTo(this.glass.x + topLayerWidth / 2, topY);
                            this.fillGraphics.closePath();
                            this.fillGraphics.fillStyle(data.fillColor, 1);
                            this.fillGraphics.fillPath();
                        }
                        accumulatedHeight += currentHeight;
                    }
                }
            });
        } else {
            const fillColor = this.drinks[this.currentDrink].fillColor;
            this.fillGraphics.fillStyle(fillColor, 1);
            const bowlHeight = this.glass.height * 0.6;
            const adjustedFillLevel = Math.min(this.fillLevel, 0.6) / 0.6;
            const fillHeight = adjustedFillLevel * bowlHeight;

            if (this.drinks[this.currentDrink].glass.type === 'wine') {
                const stemWidth = this.glass.width * 0.2;
                const startX = this.glass.x - this.glass.width / 2;
                const startY = this.glass.y - this.glass.height / 2 + this.glass.yOffset;
                if (fillHeight > 0) {
                    this.fillGraphics.beginPath();
                    const fillRatio = fillHeight / bowlHeight;
                    const currentWidth = stemWidth + (this.glass.width - stemWidth) * fillRatio;
                    const fillStartY = startY + bowlHeight - fillHeight;
                    this.fillGraphics.moveTo(startX, fillStartY);
                    this.fillGraphics.lineTo(this.glass.x - currentWidth / 2, fillStartY);
                    this.fillGraphics.lineTo(this.glass.x - stemWidth / 2, startY + bowlHeight);
                    this.fillGraphics.lineTo(this.glass.x + stemWidth / 2, startY + bowlHeight);
                    this.fillGraphics.lineTo(this.glass.x + currentWidth / 2, fillStartY);
                    this.fillGraphics.lineTo(startX + this.glass.width, fillStartY);
                    this.fillGraphics.closePath();
                    this.fillGraphics.fill();
                }
            } else {
                const bottomWidth = this.glass.width * 0.8;
                const topWidth = this.glass.width;
                const height = this.glass.height;
                const fillRatio = this.fillLevel;
                const currentHeight = height * fillRatio;
                const currentTopWidth = bottomWidth + (topWidth - bottomWidth) * fillRatio;
                const startX = this.glass.x - bottomWidth / 2;
                const startY = this.glass.y - height / 2 + this.glass.yOffset;
                const fillY = startY + height - currentHeight;

                if (currentHeight > 0) {
                    this.fillGraphics.beginPath();
                    this.fillGraphics.moveTo(startX, startY + height);
                    this.fillGraphics.lineTo(this.glass.x - currentTopWidth / 2, fillY);
                    this.fillGraphics.lineTo(this.glass.x + currentTopWidth / 2, fillY);
                    this.fillGraphics.lineTo(startX + bottomWidth, startY + height);
                    this.fillGraphics.closePath();
                    this.fillGraphics.fillPath();
                }
            }
        }
    }

    checkScore() {
        if (this.fillLevel === 0) return;
        // Stop pouring sound if it's still playing
        if (this.pourSound && this.pourSound.isPlaying) {
            this.pourSound.stop();
        }
        let isSpilled = false;
        if (this.drinks[this.currentDrink].isMixed) {
            Object.values(this.ingredientFillLevels).forEach(level => {
                if (level >= 1) isSpilled = true;
            });
        } else {
            isSpilled = this.fillLevel >= 1;
        }
        if (isSpilled) {
            this.interactionEnabled = false;
            // Hide target lines with fade out
            this.targetLines.forEach(line => {
                this.tweens.add({
                    targets: line,
                    alpha: 0,
                    duration: 200,
                    ease: 'Linear'
                });
            });

            // Create spill effect
            this.createSpillEffect();

            this.showResult('¡TE PASASTE!', '#ff2400');
            return;
        }
        if (this.drinks[this.currentDrink].isMixed) {
            const ingredients = Object.keys(this.drinks[this.currentDrink].ingredients);
            const allIngredientsPoured = ingredients.every(ing => this.ingredientFillLevels[ing] !== undefined);
            if (!allIngredientsPoured) {
                const remainingIngredients = ingredients.filter(ing => this.ingredientFillLevels[ing] === undefined);
                const nextIngredient = remainingIngredients[0];
                this.fillLevel = 0;
                this.interactionEnabled = true;
                return;
            }
        }
        this.interactionEnabled = false;
        // Ensure pouring sound is stopped
        if (this.pourSound && this.pourSound.isPlaying) {
            this.pourSound.stop();
        }
        let accuracy;
        if (this.drinks[this.currentDrink].isMixed) {
            accuracy = Object.entries(this.drinks[this.currentDrink].ingredients)
                .reduce((maxError, [ing, data]) => {
                    const error = Math.abs(this.ingredientFillLevels[ing] - data.quantity);
                    return Math.max(maxError, error);
                }, 0);
        } else {
            accuracy = Math.abs(this.fillLevel - this.targetLevel);
        }
        let message = accuracy <= 0.07 ? '¡Bien!' : '¡Fallido!';
        let textColor = accuracy <= 0.07 ? '#FFFFFF' : '#FF0000';
        // Hide target lines with fade out
        this.targetLines.forEach(line => {
            this.tweens.add({
                targets: line,
                alpha: 0,
                duration: 200,
                ease: 'Linear'
            });
        });
        if (accuracy > 0.07) {
            // Play fail sound
            this.sound.play('failSound', {
                volume: 0.5
            });
            this.showFailOverlay();
        } else {
            // Play success sound
            this.sound.play('successSound', {
                volume: 0.5
            });
            this.showSuccessOverlay();
        }
    }
    showSuccessOverlay() {
        // Create container for the overlay
        const overlayContainer = this.add.container(180, -480).setDepth(1000);

        // Add the same background as main menu
        const background = this.add.sprite(0, 288, 'menuBackground').setOrigin(0.5);
        background.setAlpha(0.95);

        // Create semi-transparent panel
        const panel = this.add.graphics();
        panel.fillStyle(0x333333, 0.85);
        panel.fillRoundedRect(-140, 0, 280, 576, 20);

        // Add success text
        const successPhrases = [
            '¡Perfecto!',
            '¡Brillante!',
            '¡Salud!',
            '¡Eso es arte!',
            '¡Exquisito!'
        ];
        const randomPhrase = successPhrases[Math.floor(Math.random() * successPhrases.length)];
        const successText = this.add.text(0, 50, randomPhrase, {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'DM Serif Display',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            padding: {
                x: 2,
                y: 2
            }
        }).setOrigin(0.5);

        // Add drink info text based on the current drink
        let infoText = '';
        if (this.currentDrink === 'negroni') {
            infoText = 'El Negroni fue creado en Florencia en 1919 cuando el Conde Camillo Negroni pidió que fortalecieran su Americano con ginebra en lugar de soda.';
        } else if (this.currentDrink === 'americano') {
            infoText = 'El Americano, originalmente llamado "Milano-Torino", fue renombrado debido a su popularidad entre los turistas estadounidenses antes de la prohibición.';
        } else if (this.currentDrink === 'campari tonic') {
            infoText = 'El Campari Tonic es una alternativa refrescante y menos alcohólica al Negroni, perfecta para tardes de verano.';
        }

        const drinkInfo = this.add.text(0, 260, infoText, {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            lineSpacing: 12,
            stroke: '#000000',
            strokeThickness: 2,
            padding: {
                x: 2,
                y: 2
            },
            wordWrap: {
                width: 240
            }
        }).setOrigin(0.5);

        // Create continue button
        const buttonBg = this.add.graphics();
        buttonBg.lineStyle(3, 0x000000);
        buttonBg.fillStyle(0xFFFFFF);
        buttonBg.fillRoundedRect(-90, 480, 180, 60, 15);
        buttonBg.strokeRoundedRect(-90, 480, 180, 60, 15);

        const buttonText = this.add.text(0, 510, 'SIGUIENTE', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Make button interactive
        const buttonHitArea = new Phaser.Geom.Rectangle(-90, 480, 180, 60);
        buttonBg.setInteractive(buttonHitArea, Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                // Get next drink in the list
                // Animate overlay out
                this.tweens.add({
                    targets: overlayContainer,
                    y: -480,
                    duration: 500,
                    ease: 'Back.easeIn',
                    onComplete: () => {
                        overlayContainer.destroy();
                        if (this.currentDrink === 'americano') {
                            // If americano was completed, go to landing page
                            this.scene.start('LandingPage');
                        } else {
                            // For other drinks, continue to next drink
                            const drinks = Object.keys(this.drinks);
                            const currentIndex = drinks.indexOf(this.currentDrink);
                            const nextIndex = (currentIndex + 1) % drinks.length;
                            const nextDrink = drinks[nextIndex];
                            this.currentDrink = nextDrink;
                            this.refreshGlass();
                        }
                    }
                });
            });

        // Add all elements to container
        overlayContainer.add([background, panel, successText, drinkInfo, buttonBg, buttonText]);

        // Animate overlay falling from top
        this.tweens.add({
            targets: overlayContainer,
            y: 32,
            duration: 800,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                // Add a small bounce effect at the end
                this.tweens.add({
                    targets: overlayContainer,
                    y: 42,
                    yoyo: true,
                    duration: 100,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }

    showResult(message, textColor) {
        const resultText = this.add.text(180, 380, message, {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Futura',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            padding: {
                x: 2,
                y: 2
            }
        }).setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: resultText,
                alpha: 0,
                y: 310,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    resultText.destroy();
                    this.refreshGlass();
                }
            });
        });
    }

    updateBottleAppearance() {
        if (!this.bottle || !this.campariTopOverlay || !this.ginTopOverlay || !this.vermutTopOverlay) {
            return;
        }
        const oldX = this.bottle.x || this.initialBottleX;
        const oldY = this.bottle.y || this.initialBottleY;
        const oldRotation = this.bottle.rotation || this.initialRotation;
        // Update overlays visibility and bottle transparency
        const isCampari = this.currentIngredient === 'campari';
        const isGin = this.currentIngredient === 'ginebra';
        const isVermut = this.currentIngredient === 'vermut';
        const isSodaOrTonic = this.currentIngredient === 'tónica' || this.currentIngredient === 'soda';
        this.campariTopOverlay.setVisible(isCampari);
        this.ginTopOverlay.setVisible(isGin);
        this.vermutTopOverlay.setVisible(isVermut);
        this.tonicaTopOverlay.setVisible(isSodaOrTonic);
        // Set bottle transparency based on whether any overlay is visible
        this.bottle.alpha = (isCampari || isGin || isVermut || isSodaOrTonic) ? 0 : 1;
        if (isCampari) {
            this.campariTopOverlay.x = oldX;
            this.campariTopOverlay.y = oldY;
            this.campariTopOverlay.rotation = oldRotation;
        }

        this.bottle.clear();

        let fillColor = this.drinks[this.currentDrink].isMixed && this.currentIngredient ?
            this.drinks[this.currentDrink].ingredients[this.currentIngredient].fillColor :
            this.drinks[this.currentDrink].fillColor;

        this.bottle.x = oldX;
        this.bottle.y = oldY;
        this.bottle.rotation = oldRotation;
        this.drawBottleNeck(fillColor);

        this.bottle.setInteractive(new Phaser.Geom.Rectangle(-120, -90, 240, 180), Phaser.Geom.Rectangle.Contains);
    }

    getCurrentColor() {
        if (this.drinks[this.currentDrink].isMixed) {
            if (this.currentIngredient && this.drinks[this.currentDrink].ingredients[this.currentIngredient]) {
                return this.drinks[this.currentDrink].ingredients[this.currentIngredient].fillColor;
            }
            const firstIngredient = Object.keys(this.drinks[this.currentDrink].ingredients)[0];
            return this.drinks[this.currentDrink].ingredients[firstIngredient].fillColor;
        }
        return this.drinks[this.currentDrink].fillColor;
    }

    drawBottleNeck(color = 0x666666) {
        if (!this.bottle || !(this.bottle instanceof Phaser.GameObjects.Graphics)) {
            this.bottle = this.add.graphics().setDepth(4);
        }
        // Check if we should draw the bottle at all
        const hasOverlay = this.currentIngredient === 'campari' ||
            this.currentIngredient === 'ginebra' ||
            this.currentIngredient === 'vermut' ||
            this.currentIngredient === 'tónica' ||
            this.currentIngredient === 'soda';
        if (hasOverlay) {
            this.bottle.clear();
            return;
        }

        this.bottle.clear();
        const alpha = 0.3;
        this.bottle.fillStyle(0x888888, alpha);
        this.bottle.lineStyle(2, 0xffffff);
        this.bottle.beginPath();
        this.bottle.moveTo(-40, -60);
        this.bottle.lineTo(-60, 40);
        this.bottle.lineTo(-50, 140);
        this.bottle.lineTo(50, 140);
        this.bottle.lineTo(60, 40);
        this.bottle.lineTo(40, -60);
        this.bottle.closePath();
        this.bottle.fillPath();
        this.bottle.strokePath();
        this.bottle.lineStyle(2, 0xffffff, 0.8);
        this.bottle.beginPath();
        this.bottle.moveTo(-10, -60);
        this.bottle.lineTo(-15, -90);
        this.bottle.lineTo(15, -90);
        this.bottle.lineTo(10, -60);
        this.bottle.strokePath();
        this.bottle.fillStyle(color, 0.8);
        this.bottle.lineStyle(1, 0xffffff, 0.5);
        this.bottle.beginPath();
        this.bottle.fillCircle(0, -85, 3);
        this.bottle.strokeCircle(0, -85, 3);
        [-8, 8].forEach(x => {
            this.bottle.beginPath();
            this.bottle.fillCircle(x, -85, 2);
            this.bottle.strokeCircle(x, -85, 2);
        });
        this.bottle.lineStyle(2, 0xffffff, 0.5);
        this.bottle.beginPath();
        this.bottle.moveTo(-40, -60);
        this.bottle.lineTo(-10, -60);
        this.bottle.moveTo(40, -60);
        this.bottle.lineTo(10, -60);
        this.bottle.strokePath();
        this.bottle.lineStyle(2, 0xffffff, 0.5);
        this.bottle.beginPath();
        this.bottle.moveTo(-45, 0);
        this.bottle.lineTo(-48, 80);
        this.bottle.lineTo(48, 80);
        this.bottle.lineTo(45, 0);
        this.bottle.strokePath();
    }

    refreshGlass() {
        this.interactionEnabled = false;
        this.fillLevel = 0;
        this.ingredientFillLevels = {};
        this.fillGraphics.clear();

        this.tweens.add({
            targets: [this.glassOutline, this.fillGraphics],
            alpha: 0,
            duration: 200,
            onComplete: () => {
                if (this.drinks[this.currentDrink].isMixed) {
                    const ingredients = Object.keys(this.drinks[this.currentDrink].ingredients);
                    this.currentIngredient = ingredients[0];
                    this.targetLevel = this.drinks[this.currentDrink].ingredients[this.currentIngredient].quantity;
                    this.createIngredientSwitchButton();
                } else {
                    this.currentIngredient = null;
                    this.targetLevel = this.drinks[this.currentDrink].quantity;
                    if (this.switchButton) {
                        if (Array.isArray(this.switchButton)) {
                            this.switchButton.forEach(btn => btn.destroy());
                        } else {
                            this.switchButton.destroy();
                        }
                        this.switchButton = null;
                    }
                }
                const glassConfig = this.drinks[this.currentDrink].glass;
                this.glass = {
                    x: -100,
                    y: 500,
                    width: glassConfig.width,
                    height: glassConfig.height,
                    yOffset: glassConfig.yOffset,
                    targetX: 180
                };
                this.glassOutline.setAlpha(1);
                this.fillGraphics.setAlpha(1);
                this.drawGlassOutline();
                this.drinkNameText.setText(this.currentDrink.toUpperCase());
                this.updateIngredientTargets();
                this.updateBottleAppearance();

                this.tweens.add({
                    targets: this.glass,
                    x: this.glass.targetX,
                    duration: 500,
                    ease: 'Back.easeOut',
                    onUpdate: () => {
                        this.drawGlassOutline();
                    },
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.glass,
                            x: this.glass.targetX + 3,
                            yoyo: true,
                            repeat: 2,
                            duration: 50,
                            ease: 'Sine.easeInOut',
                            onUpdate: () => {
                                this.drawGlassOutline();
                            },
                            onComplete: () => {
                                this.createTargetLines();
                                this.targetLines.forEach(line => {
                                    line.setAlpha(0);
                                    this.tweens.add({
                                        targets: line,
                                        alpha: 1,
                                        duration: 200,
                                        ease: 'Linear'
                                    });
                                });
                                this.bottle.x = this.initialBottleX;
                                this.bottle.y = this.initialBottleY;
                                this.bottle.rotation = this.initialRotation;
                                this.animateBottleEntrance();
                                this.interactionEnabled = true;
                                this.bottle.setInteractive();
                                this.isPouring = false;
                                this.pouringGraphics.clear();
                            }
                        });
                    }
                });
            }
        });
    }

    resetGame() {
        this.fillLevel = 0;
        this.fillGraphics.clear();
        this.targetLevel = this.drinks[this.currentDrink].quantity;
        this.createTargetLines();
    }

    updateDottedLine() {
        const targetY = this.glass.y + (this.glass.height / 2) - (this.glass.height * this.targetLevel);
        this.dottedLine.clear();
        this.dottedLine.lineStyle(4, 0xffff00);
        const startX = this.glass.x - (this.glass.width / 2);
        const endX = this.glass.x + (this.glass.width / 2);
        const segmentLength = 10;
        const gapLength = 10;

        for (let x = startX; x < endX; x += (segmentLength + gapLength)) {
            this.dottedLine.beginPath();
            this.dottedLine.moveTo(x, targetY);
            this.dottedLine.lineTo(Math.min(x + segmentLength, endX), targetY);
            this.dottedLine.strokePath();
        }
    }

    createIngredientSwitchButton() {
        if (this.switchButton) {
            if (Array.isArray(this.switchButton)) {
                this.switchButton.forEach(btn => btn.destroy());
            } else {
                this.switchButton.destroy();
            }
        }
        if (this.drinks[this.currentDrink].isMixed) {
            this.switchButton = [];
            const ingredients = Object.keys(this.drinks[this.currentDrink].ingredients);
            // Set the first ingredient as current
            this.currentIngredient = ingredients[0];
            this.targetLevel = this.drinks[this.currentDrink].ingredients[this.currentIngredient].quantity;

            ingredients.forEach((ingredient, index) => {
                const buttonY = 220 + (index * 50);
                const ingredientData = this.drinks[this.currentDrink].ingredients[ingredient];
                const button = this.add.container(60, buttonY);
                const buttonGraphics = this.add.graphics();
                buttonGraphics.lineStyle(2, 0x000000);
                buttonGraphics.fillStyle(ingredient === ingredients[0] ? 0xaaaaaa : 0x666666); // Set initial colors
                buttonGraphics.fillRoundedRect(-75, -20, 150, 40, 15);
                buttonGraphics.strokeRoundedRect(-75, -20, 150, 40, 15);
                const text = this.add.text(0, 0, ingredient.toUpperCase(), {
                    fontSize: '20px',
                    fontFamily: 'DM Serif Display',
                    fill: '#' + ingredientData.fillColor.toString(16).padStart(6, '0'),
                    stroke: '#000000',
                    strokeThickness: 1
                }).setOrigin(0.5);
                button.add([buttonGraphics, text]);
                buttonGraphics.setInteractive(new Phaser.Geom.Rectangle(-75, -20, 150, 40), Phaser.Geom.Rectangle.Contains);
                buttonGraphics.on('pointerdown', () => {
                    if (!this.interactionEnabled) return;
                    const canUseIngredient = !this.ingredientFillLevels[ingredient];
                    if (canUseIngredient) {
                        this.currentIngredient = ingredient;
                        this.switchButton.forEach((btn, i) => {
                            const btnGraphics = btn.getAt(0);
                            btnGraphics.clear();
                            btnGraphics.lineStyle(2, 0x000000);
                            btnGraphics.fillStyle(i === index ? 0xaaaaaa : (this.ingredientFillLevels[ingredients[i]] ? 0x444444 : 0x666666));
                            btnGraphics.fillRoundedRect(-75, -20, 150, 40, 15);
                            btnGraphics.strokeRoundedRect(-75, -20, 150, 40, 15);
                        });
                        this.targetLevel = ingredientData.quantity;
                        this.updateBottleAppearance();
                        this.createTargetLines();
                    }
                });

                if (ingredient === this.currentIngredient) {
                    buttonGraphics.clear();
                    buttonGraphics.lineStyle(2, 0x000000);
                    buttonGraphics.fillStyle(0xaaaaaa); // Lighter gray for selected state
                    buttonGraphics.fillRoundedRect(-75, -20, 150, 40, 15);
                    buttonGraphics.strokeRoundedRect(-75, -20, 150, 40, 15);
                }
                this.switchButton.push(button);
            });
        }
    }

    createTargetLines() {
        this.targetLines.forEach(line => line.destroy());
        this.targetLines = [];
        if (this.drinks[this.currentDrink].isMixed) {
            let accumulatedHeight = 0;
            Object.entries(this.drinks[this.currentDrink].ingredients).forEach(([ingredient, data]) => {
                accumulatedHeight += data.quantity;
                const lineColor = data.lineColor || data.fillColor;
                const bottomWidth = this.glass.width * 0.8;
                const topWidth = this.glass.width;
                const height = this.glass.height;
                const targetWidth = bottomWidth + (topWidth - bottomWidth) * accumulatedHeight;
                const line = this.add.graphics().setDepth(5);
                line.lineStyle(3, lineColor, 1);
                const y = (this.glass.y - height / 2 + this.glass.yOffset) + (height * (1 - accumulatedHeight));
                const startX = this.glass.x - targetWidth / 2 + 2;
                const endX = this.glass.x + targetWidth / 2 - 2;
                const segmentLength = 8;
                const gapLength = 8;

                for (let x = startX; x < endX; x += (segmentLength + gapLength)) {
                    line.beginPath();
                    line.moveTo(x, y);
                    line.lineTo(Math.min(x + segmentLength, endX), y);
                    line.strokePath();
                }
                this.targetLines.push(line);
            });
        } else {
            const line = this.add.graphics();
            line.lineStyle(3, this.drinks[this.currentDrink].fillColor, 0.4);
            if (this.drinks[this.currentDrink].glass.type === 'wine') {
                const bowlHeight = this.glass.height * 0.6;
                const stemWidth = this.glass.width * 0.2;
                const startY = this.glass.y - this.glass.height / 2 + this.glass.yOffset;
                const targetBowlHeight = Math.min(this.targetLevel, 0.6) * this.glass.height;
                const y = startY + (bowlHeight * (1 - (targetBowlHeight / bowlHeight)));
                const fillRatio = targetBowlHeight / bowlHeight;
                const currentWidth = stemWidth + (this.glass.width - stemWidth) * fillRatio;
                const startX = this.glass.x - currentWidth / 2;
                const endX = this.glass.x + currentWidth / 2;
                const segmentLength = 10;
                const gapLength = 10;

                for (let x = startX; x < endX; x += (segmentLength + gapLength)) {
                    line.beginPath();
                    line.moveTo(x, y);
                    line.lineTo(Math.min(x + segmentLength, endX), y);
                    line.strokePath();
                }
            } else {
                const targetHeight = this.targetLevel * this.glass.height;
                const y = (this.glass.y - this.glass.height / 2 + this.glass.yOffset) + (this.glass.height * (1 - this.targetLevel));
                const bottomWidth = this.glass.width * 0.8;
                const topWidth = this.glass.width;
                const targetWidth = bottomWidth + (topWidth - bottomWidth) * this.targetLevel;
                const startX = this.glass.x - targetWidth / 2 + 2;
                const endX = this.glass.x + targetWidth / 2 - 2;
                const segmentLength = 8;
                const gapLength = 8;

                for (let x = startX; x < endX; x += (segmentLength + gapLength)) {
                    line.beginPath();
                    line.moveTo(x, y);
                    line.lineTo(Math.min(x + segmentLength, endX), y);
                    line.strokePath();
                }
            }
            this.targetLines.push(line);
        }
    }

    updateIngredientTargets() {
        this.ingredientTargetTexts.forEach(text => text.destroy());
        this.ingredientTargetTexts = [];
    }

    updateGlassProperties() {
        const glassConfig = this.drinks[this.currentDrink].glass;
        this.glass = {
            x: 180,
            y: 500,
            width: glassConfig.width,
            height: glassConfig.height,
            yOffset: glassConfig.yOffset
        };
    }

    drawGlassOutline() {
        const glassType = this.drinks[this.currentDrink].glass.type || 'regular';
        if (glassType === 'wine') {
            this.drawWineGlass();
        } else {
            this.glassOutline.clear();
            this.glassOutline.fillStyle(0xffffff, 0.35);
            this.glassOutline.lineStyle(2, 0xffffff, 0.9);
            const bottomWidth = this.glass.width * 0.8;
            const topWidth = this.glass.width;
            const height = this.glass.height;
            const startY = this.glass.y - height / 2 + this.glass.yOffset;

            this.glassOutline.beginPath();
            this.glassOutline.moveTo(this.glass.x - topWidth / 2, startY);
            this.glassOutline.lineTo(this.glass.x - bottomWidth / 2, startY + height);
            this.glassOutline.lineTo(this.glass.x + bottomWidth / 2, startY + height);
            this.glassOutline.lineTo(this.glass.x + topWidth / 2, startY);
            this.glassOutline.closePath();
            this.glassOutline.fillPath();
            this.glassOutline.strokePath();
        }
    }

    drawWineGlass() {
        this.glassOutline.clear();
        this.glassOutline.fillStyle(0xffffff, 0.35);
        this.glassOutline.lineStyle(2, 0xffffff, 0.9);

        const bowlWidth = this.glass.width;
        const bowlHeight = this.glass.height * 0.6;
        const stemWidth = this.glass.width * 0.2;
        const stemHeight = this.glass.height * 0.3;
        const baseWidth = this.glass.width * 0.5;
        const baseHeight = this.glass.height * 0.1;

        const startX = this.glass.x - bowlWidth / 2;
        const startY = this.glass.y - this.glass.height / 2 + this.glass.yOffset;

        this.glassOutline.beginPath();
        this.glassOutline.moveTo(startX, startY);
        this.glassOutline.lineTo(startX, startY);
        this.glassOutline.lineTo(this.glass.x - stemWidth / 2, startY + bowlHeight);
        this.glassOutline.lineTo(this.glass.x - stemWidth / 2, startY + bowlHeight + stemHeight);
        this.glassOutline.lineTo(this.glass.x - baseWidth / 2, startY + bowlHeight + stemHeight);
        this.glassOutline.lineTo(this.glass.x + baseWidth / 2, startY + bowlHeight + stemHeight);
        this.glassOutline.lineTo(this.glass.x + stemWidth / 2, startY + bowlHeight + stemHeight);
        this.glassOutline.lineTo(this.glass.x + stemWidth / 2, startY + bowlHeight);
        this.glassOutline.lineTo(startX + bowlWidth, startY);
        this.glassOutline.lineTo(startX, startY);
        this.glassOutline.closePath();
        this.glassOutline.fillPath();
        this.glassOutline.strokePath();

        this.glassOutline.beginPath();
        this.glassOutline.moveTo(this.glass.x - stemWidth / 2, startY + bowlHeight);
        this.glassOutline.lineTo(this.glass.x + stemWidth / 2, startY + bowlHeight);
        this.glassOutline.strokePath();
    }
    createSpillEffect() {
        const spillGraphics = this.add.graphics();
        const currentColor = this.getCurrentColor();
        const glassBottom = this.glass.y + this.glass.height / 2 + this.glass.yOffset;
        const glassWidth = this.glass.width;
        const startX = this.glass.x;
        const startY = glassBottom - this.glass.height;
        // Create multiple splash particles
        const particles = [];
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: startX + (Math.random() - 0.5) * glassWidth,
                y: startY,
                velocityX: (Math.random() - 0.5) * 8,
                velocityY: Math.random() * -10,
                size: Math.random() * 8 + 4,
                alpha: 1
            });
        }
        // Animate the particles
        const animateParticles = () => {
            spillGraphics.clear();
            spillGraphics.fillStyle(currentColor, 0.6);
            let allParticlesComplete = true;
            particles.forEach(particle => {
                if (particle.alpha > 0) {
                    allParticlesComplete = false;
                    particle.x += particle.velocityX;
                    particle.y += particle.velocityY;
                    particle.velocityY += 0.5; // Gravity
                    particle.alpha -= 0.02;
                    spillGraphics.fillCircle(particle.x, particle.y, particle.size);
                    // Create splash trail
                    spillGraphics.fillStyle(currentColor, particle.alpha * 0.3);
                    for (let i = 0; i < 3; i++) {
                        const trailSize = particle.size * (1 - i * 0.2);
                        spillGraphics.fillCircle(
                            particle.x - particle.velocityX * i * 1.5,
                            particle.y - particle.velocityY * i * 1.5,
                            trailSize
                        );
                    }
                }
            });
            if (!allParticlesComplete) {
                this.time.delayedCall(16, animateParticles); // Roughly 60 FPS
            } else {
                spillGraphics.destroy();
            }
        };
        animateParticles();
    }
    showFailOverlay() {
        // Create container for the overlay
        const overlayContainer = this.add.container(180, -480).setDepth(1000);
        // Add the same background as main menu
        const background = this.add.sprite(0, 288, 'menuBackground').setOrigin(0.5);
        background.setAlpha(0.95);
        // Create semi-transparent panel
        const panel = this.add.graphics();
        panel.fillStyle(0x333333, 0.85);
        panel.fillRoundedRect(-140, 0, 280, 576, 20);
        // Add failed text
        const failedText = this.add.text(0, 40, '¡Algo Salio mal!', {
            fontSize: '38px',
            fill: '#FFFFFF',
            fontFamily: 'DM Serif Display',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            padding: {
                x: 2,
                y: 2
            }
        }).setOrigin(0.5);
        // Add subtitle
        const subtitleText = this.add.text(0, 100, 'Presta atención a la receta:\n', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'DM Serif Display',
            stroke: '#000000',
            strokeThickness: 2,
            padding: {
                x: 2,
                y: 2
            }
        }).setOrigin(0.5);
        // Add tips based on the current drink
        let tipText = '';
        if (this.currentDrink === 'americano') {
            tipText = 'AMERICANO:\n';
            tipText += '1 PARTE CAMPARI\n';
            tipText += '1 PARTE VERMOUTH ROSSO\n';
            tipText += '1 SPLASH SODA';
        } else if (this.currentDrink === 'negroni') {
            tipText = 'NEGRONI:\n';
            tipText += '1 PARTE CAMPARI\n';
            tipText += '1 PARTE GIN\n';
            tipText += '1 PARTE VERMOUTH ROSSO';
        } else if (this.currentDrink === 'campari tonic') {
            tipText = 'CAMPARI TONIC:\n';
            tipText += '1 PARTE CAMPARI\n';
            tipText += '3 PARTES TONICA';
        }
        const tips = this.add.text(-120, 220, tipText, {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'left',
            lineSpacing: 12,
            stroke: '#000000',
            strokeThickness: 2,
            padding: {
                x: 2,
                y: 2
            },
            wordWrap: {
                width: 240
            }
        }).setOrigin(0, 0.5);
        // Create retry button
        const buttonBg = this.add.graphics();
        buttonBg.lineStyle(3, 0x000000);
        buttonBg.fillStyle(0xFFFFFF);
        buttonBg.fillRoundedRect(-90, 480, 180, 60, 15);
        buttonBg.strokeRoundedRect(-90, 480, 180, 60, 15);
        const buttonText = this.add.text(0, 510, 'PREPARA', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        // Make button interactive
        const buttonHitArea = new Phaser.Geom.Rectangle(-90, 480, 180, 60);
        buttonBg.setInteractive(buttonHitArea, Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                // Animate overlay out
                this.tweens.add({
                    targets: overlayContainer,
                    y: -480,
                    duration: 500,
                    ease: 'Back.easeIn',
                    onComplete: () => {
                        overlayContainer.destroy();
                        this.refreshGlass();
                    }
                });
            });
        // Add all elements to container
        overlayContainer.add([background, panel, failedText, subtitleText, tips, buttonBg, buttonText]);
        // Animate overlay falling from top
        this.tweens.add({
            targets: overlayContainer,
            y: 32,
            duration: 800,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                // Add a small bounce effect at the end
                this.tweens.add({
                    targets: overlayContainer,
                    y: 42,
                    yoyo: true,
                    duration: 100,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }
    showTutorial() {
        // Create tutorial container
        const tutorialContainer = this.add.container(0, 0).setDepth(2000);
        // Add semi-transparent overlay
        const overlay = this.add.rectangle(180, 320, 360, 640, 0x000000, 0.7);
        tutorialContainer.add(overlay);
        // Add tutorial text
        // Right side text for dragging instruction
        const dragText = this.add.text(270, 260, 'ARRASTRA\nPARA\nSERVIR', {
            fontSize: '28px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
            lineSpacing: 15
        }).setOrigin(0.5);

        // Left side text for ingredient switching
        const ingredientText = this.add.text(90, 260, 'TOCA PARA\nCAMBIAR\nINGREDIENTE', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
            lineSpacing: 10
        }).setOrigin(0.5);
        tutorialContainer.add([dragText, ingredientText]);
        // Create finger indicator
        const finger = this.add.graphics();
        finger.fillStyle(0xFFFFFF);
        finger.fillCircle(0, 0, 15);
        finger.fillStyle(0xFFFFFF, 0.6);
        finger.fillCircle(0, 5, 12);
        finger.setPosition(270, 320);
        tutorialContainer.add(finger);
        // Animate the finger
        this.tweens.add({
            targets: finger,
            y: 400,
            duration: 1000,
            ease: 'Power1',
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                // Fade out tutorial
                this.tweens.add({
                    targets: tutorialContainer,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        tutorialContainer.destroy();
                        this.tutorialShown = true;
                        this.tutorialActive = false;
                        this.interactionEnabled = true;
                    }
                });
            }
        });
        // Add skip button
        // Create skip button background
        const skipButtonBg = this.add.graphics();
        skipButtonBg.lineStyle(3, 0x000000);
        skipButtonBg.fillStyle(0xFFFFFF);
        skipButtonBg.fillRoundedRect(90, 520, 180, 60, 15);
        skipButtonBg.strokeRoundedRect(90, 520, 180, 60, 15);

        const skipButton = this.add.text(180, 550, 'ENTENDIDO!', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        skipButtonBg.setInteractive(new Phaser.Geom.Rectangle(90, 520, 180, 60), Phaser.Geom.Rectangle.Contains)
        skipButtonBg.on('pointerdown', () => {
            tutorialContainer.destroy();
            this.tutorialShown = true;
            this.tutorialActive = false;
            this.interactionEnabled = true;
        });
        tutorialContainer.add([skipButtonBg, skipButton]);
    }
}

class LevelSelect extends Phaser.Scene {
    constructor() {
        super({
            key: 'LevelSelect'
        });
    }
    preload() {
        this.load.image('menuBackground', 'https://play.rosebud.ai/assets/backgourndhomepage.png?h8yR');
    }
    create() {
        const background = this.add.sprite(180, 320, 'menuBackground')
            .setOrigin(0.5)
            .setDisplaySize(360, 640);
        // Add title
        const title = this.add.text(180, 60, 'TU CAMPARI,\nTU ELECCION', {
            fontSize: '28px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 5,
                fill: true
            }
        }).setOrigin(0.5);
        // Get available drinks from BartendingGame
        const drinks = Object.keys(new BartendingGame().drinks);
        // Create scrollable container for drink buttons
        const containerHeight = 450;
        const maskGraphics = this.add.graphics()
            .fillStyle(0x000000, 0) // Set fill style with 0 alpha (transparent)
            .fillRect(30, 70, 300, containerHeight);
        const scrollableContainer = this.add.container(0, 130);
        const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
        scrollableContainer.setMask(mask);
        // Create scrollable drink buttons
        drinks.forEach((drink, index) => {
            const y = index * 60;
            const basicDrinks = ['campari tonic', 'negroni', 'americano'];
            const isLocked = !basicDrinks.includes(drink);
            // Create button background
            const buttonBg = this.add.graphics();
            buttonBg.lineStyle(3, isLocked ? 0x666666 : 0x000000);
            buttonBg.fillStyle(isLocked ? 0x999999 : 0xFFFFFF);
            buttonBg.fillRoundedRect(40, y + 10, 280, 40, 15);
            buttonBg.strokeRoundedRect(40, y + 10, 280, 40, 15);
            // Button text
            const buttonText = this.add.text(180, y + 30, drink.toUpperCase(), {
                fontSize: '24px',
                fontFamily: 'DM Serif Display',
                fill: isLocked ? '#666666' : '#000000',
                stroke: isLocked ? '#666666' : '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            // Add lock symbol for locked drinks
            if (isLocked) {
                const lockText = this.add.text(290, y + 30, '🔒', {
                    fontSize: '20px'
                }).setOrigin(0.5);
                scrollableContainer.add(lockText);
            }
            // Make background interactive only for unlocked drinks
            if (!isLocked) {
                buttonBg.setInteractive(new Phaser.Geom.Rectangle(40, y + 10, 280, 40), Phaser.Geom.Rectangle.Contains)
                    .on('pointerdown', () => {
                        // Set the current drink before starting the game scene
                        const gameScene = this.scene.get('BartendingGame');
                        gameScene.currentDrink = drink;
                        gameScene.tutorialShown = true; // Skip tutorial for level select
                        this.scene.start('BartendingGame');
                    });
            }
            scrollableContainer.add([buttonBg, buttonText]);
        });
        // Add back button
        const backButtonBg = this.add.graphics();
        backButtonBg.lineStyle(3, 0x000000);
        backButtonBg.fillStyle(0xFFFFFF);
        backButtonBg.fillRoundedRect(90, 580, 180, 60, 15);
        backButtonBg.strokeRoundedRect(90, 580, 180, 60, 15);
        const backButtonText = this.add.text(180, 610, 'VOLVER', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        backButtonBg.setInteractive(new Phaser.Geom.Rectangle(90, 560, 180, 60), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
        // Add scroll functionality
        let isDragging = false;
        let lastY = 0;

        this.input.on('pointerdown', (pointer) => {
            if (pointer.y > 70 && pointer.y < 70 + containerHeight) {
                isDragging = true;
                lastY = pointer.y;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (isDragging && pointer.y > 70 && pointer.y < 70 + containerHeight) {
                const deltaY = pointer.y - lastY;
                const maxY = 130;
                const minY = Math.min(130, 130 - (drinks.length * 60 - containerHeight + 60));

                scrollableContainer.y = Phaser.Math.Clamp(
                    scrollableContainer.y + deltaY,
                    minY,
                    maxY
                );

                lastY = pointer.y;
            }
        });

        this.input.on('pointerup', () => {
            isDragging = false;
        });

        this.input.on('pointerout', () => {
            isDragging = false;
        });
    }
}
class LandingPage extends Phaser.Scene {
    constructor() {
        super({
            key: 'LandingPage'
        });
    }
    preload() {
        this.load.image('menuBackground', 'https://play.rosebud.ai/assets/backgourndhomepage.png?h8yR');
    }
    create() {
        // Add background
        const background = this.add.sprite(180, 320, 'menuBackground')
            .setOrigin(0.5)
            .setDisplaySize(360, 640)
            .setDisplaySize(360, 640);
        // Add congratulations text
        const congratsText = this.add.text(180, 160, '¡FELICITACIONES!', {
            fontSize: '40px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 5,
                fill: true
            }
        }).setOrigin(0.5);
        // Placeholder for future content
        const promoText = this.add.text(180, 320, 'Mostra este codigo CAMPARI25\nen la barra y obtené un 20% de\ndescuento en tu proximo CAMPARI.\n\n¿Como lo vas a preparar?', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2,
            lineSpacing: 10,
            wordWrap: {
                width: 300
            }
        }).setOrigin(0.5);
        // Add return to menu button
        const buttonBg = this.add.graphics();
        buttonBg.lineStyle(3, 0x000000);
        buttonBg.fillStyle(0xFFFFFF);
        buttonBg.fillRoundedRect(90, 500, 180, 60, 15);
        buttonBg.strokeRoundedRect(90, 500, 180, 60, 15);
        const buttonText = this.add.text(180, 530, 'MENU', {
            fontSize: '24px',
            fontFamily: 'DM Serif Display',
            fill: '#000000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        // Make button interactive
        buttonBg.setInteractive(new Phaser.Geom.Rectangle(90, 500, 180, 60), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
    }
}

// Add CSS to fix the white line issue
(function() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 0;
            background-color: #000000;
            overflow: hidden;
        }
        #renderDiv {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        canvas {
            display: block; /* Removes tiny space at bottom of canvas */
        }
    `;
    document.head.appendChild(style);
})();

// Update game configuration with background color
const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    pixelArt: false,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 360,
        height: 640
    },
    scene: [MainMenu, LevelSelect, BartendingGame, LandingPage]
};

window.phaserGame = new Phaser.Game(config);