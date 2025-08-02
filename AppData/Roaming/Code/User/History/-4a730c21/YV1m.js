class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create(){
        this.add.text(20,20,"Playing Game2", {font: "25px Arial", fill: "yellow"});
    }
}