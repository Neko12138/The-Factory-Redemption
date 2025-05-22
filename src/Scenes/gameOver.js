class gameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    init(data) {
        
    }

    create() {

        this.add.text(100, 200, "Successful escape!!!", {
            fontSize: '64px',
            fill: '#f00',
            fontFamily: 'Arial'
        });

        this.add.text(390, 300, "", {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        this.add.text(360, 450, "", {
            fontSize: '28px',
            fill: '#FFD700',
            fontFamily: 'Arial'
        });

        this.keys = this.input.keyboard.addKeys({
            restart: 'SPACE'
        });

        this.events.once('shutdown', () => {
            //if (this.endMusic && this.endMusic.isPlaying) {
            //    this.endMusic.stop();
            //}
        });

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
            this.scene.start("loadScene", {
                
            });
        }
    }
}