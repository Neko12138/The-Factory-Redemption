class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("background_img", "bg_01.png");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.image("tilemap_base", "tilemap_packed_base.png");
        this.load.image("tilemap_food", "tilemap_packed_food.png");
        this.load.image("tilemap_rock", "rock_packed.png");
         // Packed tilemap
        this.load.tilemapTiledJSON("platformer-map", "TFR_Map.tmj");   // Tilemap in JSON

        this.load.spritesheet("tilemap_base_sheet", "tilemap_packed_base.png", {
        frameWidth: 18,
        frameHeight: 18  
        });

        this.load.spritesheet("tilemap_base_sheet_2", "tilemap_packed.png", {
        frameWidth: 18,
        frameHeight: 18  
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json");

    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 9,
                end: 10,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0009.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0008.png" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}