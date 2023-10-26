class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
        this.i = 0;
        this.versionStr='ver.1.02';
    }
    preload ()
    {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.game.config.width;
        let height = this.game.config.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Loading...',
            style: {
                fontSize:20,
                fontFamily:'Zen Maru Gothic',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let loadingfileText = this.make.text({
            x: width / 2,
            y: height / 2 + 80,
            text: 'files',
            style: {
                fontSize:20,
                fontFamily:'Zen Maru Gothic',
                fill: '#ffffff'
            }
        });
        loadingfileText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            loadingfileText.setText(file.src);
        });
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        //image
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
        this.load.image('potato_icon','/images/potatos/potato_photo.gif');

        this.load.image('spaceBG','/images/space_bg_1_1.png');
        this.load.image('potatoItem','/images/potatos/potato_item_tk.png');
        this.load.image('potatoIcon','/images/potatos/potato_icon_tk.png');
        this.load.image('potato00img','/images/potatos/potato_01_Danshaku.png');
        this.load.image('potato01img','/images/potatos/potato_02_mayqueen.png');
        this.load.image('potato02img','/images/potatos/potato_03_Kitaakari.png');
        this.load.image('potato03img','/images/potatos/potato_04_tooya.png');
        this.load.image('potato04img','/images/potatos/potato_05_incanomezame.png');
        this.load.image('potato05img','/images/potatos/potato_06_shadowQueen.png');

        this.load.image('potatoGannen','/images/potatoGannen_title.jpg');
        this.load.image('odorenaiGirl','/images/odorenaigirl.jpg');
        
        //button
        /*
        this.load.spritesheet('soundOnOff','/images/buttons/soundOnOff_color_sprite_mini.png',{frameWidth: 64,frameHeight: 64});
        this.load.image('restartbtn','/images/buttons/icons8-restart-58.png');
        this.load.image('creditbtn','/images/buttons/credits_icon.png');
        this.load.image('titlebtn','/images/buttons/turnback_arrow.png');
        */
        this.load.spritesheet('soundOnOff','/images/buttons/soundOnnOff_sprite_hand.png',{frameWidth: 64,frameHeight: 64});
        this.load.image('restartbtn','/images/buttons/restart_btn_hand.png');
        this.load.image('creditbtn','/images/buttons/credit_hand.png');
        this.load.image('titlebtn','/images/buttons/titleback_hand.png');
        this.load.image('potatobtn','/images/potatos/potato_03_Kitaakari.png');

        //sprites
        this.load.spritesheet('potato00','/images/potatos/potato_01_Danshaku_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato01','/images/potatos/potato_02_mayqueen_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato02','/images/potatos/potato_03_kitaakari_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato03','/images/potatos/potato_04_tooya_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato04','/images/potatos/potato_05_inkanomezame_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato05','/images/potatos/potato_06_shadowqueen_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato06','/images/potatos/potato_07_toyoshiro_sprite3.png',{frameWidth: 150,frameHeight: 150});
        // lv2
        this.load.spritesheet('potato07','/images/potatos/potato_08_snowden_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato08','/images/potatos/potato_09_kitahime_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato09','/images/potatos/potato_10_hokkaikogane_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato10','/images/potatos/potato_11_sayaka_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato11','/images/potatos/potato_12_konafubuki_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato12','/images/potatos/potato_13_earlystarch_sprite3.png',{frameWidth: 150,frameHeight: 150});
        // color
        this.load.spritesheet('potato13','/images/potatos/potato_14_kitamurasaki_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato14','/images/potatos/potato_15_NorthernRuby_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato15','/images/potatos/potato_16_StarRuby_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato16','/images/potatos/potato_17_hokkai98go_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato17','/images/potatos/potato_18_incanohitomi_sprite3.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato18','/images/potatos/potato_19_Redmoon_sprite3.png',{frameWidth: 150,frameHeight: 150});

        //audio
        this.load.audio('bgm_Title','/music/PM_01_OP_2022-05-08.mp3');
        this.load.audio('bgm_Play','/music/PM_02_Play_2022-05-08.mp3');
        this.load.audio('soundTurn','/music/PM_03_Turn_2022-05-08.mp3');
        this.load.audio('soundMatch','/music/PM_04_Match_2022-05-08.mp3');
        this.load.audio('soundNG','/music/PM_05_NG_2022-05-08.mp3');
        this.load.audio('bgm_Clear','/music/PM_06_Clear_2022-05-08.mp3');
        this.load.audio('bgm_End','/music/PM_07_ED_2022-05-08.mp3');
    }

    create ()
    {
        //mt.emitter = new Phaser.Events.EventEmitter();
        mt.mediaManager = new MediaManager({scene:this});
        //StartBGM
        mt.mediaManager.setBGM('bgm_Title');
        
        mt.model.setButonPosition(this);

        // set random level
        let luck= Math.random()*1.4;
        if(luck > 1){
            mt.model.level=2;
        }
        else{
            mt.model.level=1;
        }

        //background
        this.add.image(400, 300, 'sky');

        //buttons
        this.btnSoundOn = new SoundButton(
            {scene:this,isSprite:true,
            defaultFrame:Number(mt.model.soundConfig.musicOn),
            key:'soundOnOff',
            xx:mt.model.btnPosition.btn1.xx,
            yy:mt.model.btnPosition.btn1.yy
            }
        );
        this.btnSoundOn.back.setScale(0.9,0.9);

        //let particles = this.add.particles('red');
        let emitterConfig={
            speed: 400,
            frequency:250,
            scale: { start: 0.8, end: 0.15 },
            blendMode: Phaser.BlendModes.SCREEN
        };

        let particles00 = this.add.particles('potato00img');
        let emitter00 = particles00.createEmitter(this.randomizeEmitter(emitterConfig));

        let particles01 = this.add.particles('potato01img');
        let emitter01 = particles01.createEmitter(this.randomizeEmitter(emitterConfig));
        
        let particles02 = this.add.particles('potato02img');
        let emitter02 = particles02.createEmitter(this.randomizeEmitter(emitterConfig));

        let particles03 = this.add.particles('potato03img');
        let emitter03 = particles03.createEmitter(this.randomizeEmitter(emitterConfig));

        let particles04 = this.add.particles('potato04img');
        let emitter04 = particles04.createEmitter(this.randomizeEmitter(emitterConfig));

        let particles05 = this.add.particles('potato05img');
        let emitter05 = particles05.createEmitter(this.randomizeEmitter(emitterConfig));
        
        let logo = this.physics.add.image(400, 100, 'potato_icon');
        logo.scaleX=0.35;
        logo.scaleY=logo.scaleX;
        
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter00.startFollow(logo);
        emitter01.startFollow(logo);
        emitter02.startFollow(logo);
        emitter03.startFollow(logo);
        emitter04.startFollow(logo);
        emitter05.startFollow(logo);

        // Title Text
        //mt.hsv = Phaser.Display.Color.HSVColorWheel(); moved to model
        this.titleText = this.add.text(
            this.game.config.width/2,this.game.config.height*4/11,"Match Potato",
            {fontFamily:'Zen Maru Gothic',fontSize:'80px',align:'center',fontStyle:'bold'}
        );
        this.titleText.setOrigin(0.5,0.5);
        if(mt.model.level==1){
            //
        }
        else{
            if(mt.model.level==2){
                this.titleText.setStroke('#00f', 16);
                this.titleText.setShadow(2, 2, "#333333", 2, true, true);
            }
        }

        // Tap To Start
        let tapStartText = this.add.text(
            this.game.config.width/2,this.game.config.height*6/11,"tap to start",
            {fontFamily:'Zen Maru Gothic',fontSize:'64px',align:'center',fontStyle:'normal'}
        ).setInteractive();
        tapStartText.setOrigin(0.5,0.5);

        let callback=function(){
            this.startGame(this);
        };
        tapStartText.on('pointerup',callback, this);

        // version
        let verText = this.add.text(
            this.game.config.width*3/4,this.game.config.height*8/11,
            this.versionStr,
            {fontFamily:'Zen Maru Gothic',fontSize:'24px',fontStyle:'normal'}
        ).setOrigin(0.5,0.5);

        console.log("Ready!");

        // start Game
    }
    
    update() {
        //constant running loop
        const top = mt.model.hsv[this.i].color;
        const bottom = mt.model.hsv[359 - this.i].color;
        if(mt.model.level==1){
            //
        }
        else{
            if(mt.model.level==2){
                this.titleText.setTint(top, bottom, top, bottom);
        
                this.i++;
        
                if (this.i === 360)
                {
                    this.i = 0;
                }
            }
        }

    }

    startGame(scene){
        // event:mt.consts.START_GAME,params:this
        mt.emitter.emit(mt.consts.START_GAME,scene);
    }
    randomizeEmitter(emitterConfig){
        let num = 0;
        num = (Math.round(Math.random() * 100)+350)/400;
        emitterConfig.speed = emitterConfig.speed*num;

        num = (Math.round(Math.random() * 100)+450)/500;
        emitterConfig.frequency = emitterConfig.frequency*num;

        num = (Math.round(Math.random() * 100)+450)/500;
        emitterConfig.scale.start = emitterConfig.scale.start*num;

        return emitterConfig;
    }
}