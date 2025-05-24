class ini extends Phaser.Scene {
    constructor() {
        super("ini");
    }


    create() {


        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.loadingText = this.add.text(centerX, centerY + 100, 'Press SPACE to Load The Game', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // flash load
        this.tweens.add({
            targets: this.loadingText,
            alpha: { from: 1, to: 0 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("loadScene");
        });

    }
}