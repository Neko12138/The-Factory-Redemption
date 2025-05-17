class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 1500;
        this.DRAG = 2000;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -365;
        this.SCALE = 2.0;
        this.canDoubleJump = false;
    }

    create() {
        this.bg = this.add.image(100, 150, "background_img").setOrigin(0).setScrollFactor(0);
        this.bg.setDisplaySize(this.scale.width / 1.5, this.scale.height / 1.6);
        this.map = this.make.tilemap({ key: "platformer-map" });


        let tileset1 = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");
        let tileset2 = this.map.addTilesetImage("tilemap_packed_base", "tilemap_base");
        let tileset3 = this.map.addTilesetImage("tilemap_packed_food", "tilemap_food");
        let tileset4 = this.map.addTilesetImage("rock_packed", "tilemap_rock");

        let tilesets = [tileset1, tileset2, tileset3, tileset4];

        // Create a layer
        this.groundLayer = this.map.createLayer("Layer_1", tilesets, 0, 0);
        //this.groundLayer.setScale(2.0);
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.backgroundLayer = this.map.createLayer("Layer_0", tilesets, 0, 0);
        //this.backgroundLayer.setScale(2.0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(game.config.width/8, game.config.height/4, "platformer_characters", "tile_0000.png").setScale(1)
        my.sprite.player.setCollideWorldBounds(true);

        my.sprite.player.body.setMaxVelocity(150, 500); 

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // cam edge
        this.cameras.main.setZoom(this.SCALE);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 1.0, this.map.heightInPixels * 1.0);
        this.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.1);

        // world edge
        this.physics.world.setBounds(0, 0, this.map.widthInPixels * 2.0, this.map.heightInPixels * 2.0);

        this.diamond = this.map.createFromObjects("obj", {
            name: "di",
            key: "tilemap_base_sheet",
            frame: 67
        });
        this.physics.world.enable(this.diamond, Phaser.Physics.Arcade.STATIC_BODY);

        this.mushroom = this.map.createFromObjects("obj", {
            name: "mr",
            key: "tilemap_base_sheet",
            frame: 128
        });
        this.physics.world.enable(this.mushroom, Phaser.Physics.Arcade.STATIC_BODY);

        this.key = this.map.createFromObjects("obj", {
            name: "key",
            key: "tilemap_base_sheet",
            frame: 27
        });
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);

        this.door = this.map.createFromObjects("obj", {
            name: "door",
            key: "tilemap_base_sheet_2",
            frame: 28
        });
        this.physics.world.enable(this.door, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.physics.add.overlap(my.sprite.player, this.diamond, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
        this.physics.add.overlap(my.sprite.player, this.mushroom, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
        this.physics.add.overlap(my.sprite.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });

        this.spawnPoint = { x: game.config.width/8, y: game.config.height/4 };

        this.pWaterTiles = [];

        this.backgroundLayer.forEachTile(tile => {
            if (tile.properties.pWater) {
                this.pWaterTiles.push(tile);
            }
        });




    }

    update() {
        if(cursors.left.isDown) {

            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {

            my.sprite.player.body.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if (my.sprite.player.body.blocked.down) {
            this.canDoubleJump = true; // reset doubleJump
        }


        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if (my.sprite.player.body.blocked.down) {
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            } else if (this.canDoubleJump) {
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
                this.canDoubleJump = false;
            }
        }


        // check play if on water
        let playerBottom = my.sprite.player.getBottomCenter();
        let playerTile = this.backgroundLayer.getTileAtWorldXY(playerBottom.x, playerBottom.y + 1, true);

        //move player back to respawn
        if (playerTile && playerTile.properties.pWater) {
            my.sprite.player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
            my.sprite.player.body.setVelocity(0, 0); 
        }


    }
}