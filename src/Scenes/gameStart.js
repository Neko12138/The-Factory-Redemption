class gameStart extends Phaser.Scene {
    constructor() {
        super("gameStart");
    }

    preload() {

    }

    create() {

        this.bgm = this.sound.add("opening", { loop: true });
        this.bgm.play();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        let player = this.add.sprite(600, 250, 'platformer_characters');
        player.setScale(4);
        player.setOrigin(0.5);
        player.play('idle');
        player.setFlipX(true); 

        // title
        this.titleHunt = this.add.text(centerX - 250, centerY - 190, 'The Fact    ry', {
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '120px',
            color: '#808080', 
            align: 'center'
        });
        this.titleDuck = this.add.text(centerX - 110, centerY - 60, 'Redemption', {
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '100px',
            color: '#DAA520', 
            align: 'center'
        });


        this.events.on('shutdown', () => {
            if (this.bgm && this.bgm.isPlaying) {
                this.bgm.stop();
            }
        });

        // start game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("platformerScene"); 
        });

        // "start" text
        this.add.text(centerX, centerY + 300, 'Press SPACE to Start', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);

        
    }
}