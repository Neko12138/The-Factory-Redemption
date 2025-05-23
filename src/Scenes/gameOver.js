class gameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    init(data) {
    this.hasDiamond = data.hasDiamond || false;
    this.hasMushroom = data.hasMushroom || false;
}

    create() {
        //music
        this.endingMusic = this.sound.add('ending');
        this.endingMusic.play();

        //add player
        let player = this.add.sprite(400, 380, 'platformer_characters');
        player.setScale(4);
        player.setOrigin(0.5);
        player.play('walk');
        player.setFlipX(true); 

        this.add.text(100, 200, "Successful Escape!!!", {
            fontSize: '64px',
            fill: '#f00',
            fontFamily: 'Arial',
            fontStyle: 'italic'
        });

        this.add.text(20, 650, "Press SPACE to title screen", {
            fontSize: '23px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        
        if (this.hasDiamond) {
            this.add.text(300, 450, "Shining bright, Kohinoor big diamond!!!", {
                fontSize: '28px',
                fill: '#1E90FF',
                fontFamily: 'Arial'
            });
        }

        if (this.hasMushroom) {
            this.add.text(300, 500, "Ew, how did you eat that mushroom?", {
                fontSize: '28px',
                fill: '#8B4513',
                fontFamily: 'Arial'
            });
            this.add.text(300, 528, "No one said we were playing Mario.", {
                fontSize: '28px',
                fill: '#8B4513',
                fontFamily: 'Arial'
            });
        }

        this.keys = this.input.keyboard.addKeys({
            restart: 'SPACE'
        });

        this.events.once('shutdown', () => {
            this.sound.stopAll();
        });
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
            this.scene.start("platformerScene", {
                
            });
        }
    }
}