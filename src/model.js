class Model{
    constructor(){
        this.numberOfPotatoVariations=6;
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        // already moved to const
        this.potatoVarieties = ["potato00","potato01","potato02","potato03","potato04","potato05"];
        // this.score=0;
        this.result = {tried:0,miss:0,match:0,time:-1,potatoBasket:[]};
        this.level = 1;
        this.clearedLevel = 1;
        this.cardClickLock = false;
        this.soundConfig ={
            musicOn : true,
            sfxOn : true,
            volumeSound:mt.consts.volumeSound,
            volumeBGM:mt.consts.volumeBGM
        };

        // game desplay size to be set
        this.displayWidth=0;
        this.displayHeight=0;
        this.btnshift={
            xx:0,
            yy:80
        };
        
        this.btnPosition={
            btn1:{xx:750,yy:80},
            btn2:{xx:750,yy:150},
            btn3:{xx:750,yy:220},
            btn4:{xx:750,yy:290},
            btn5:{xx:750,yy:360},
        }
        this._isSceneChangeReserved = false;
    }
    set musicOn(val){
        this.soundConfig.musicOn = val;
        console.log(val);
        //mt.emitter.emit(mt.constants.MUSIC_CHANGED);
    }
    get musicOn(){
        return this.soundConfig.musicOn;
    }
    set sfxOn(val){
        this.soundConfig.sfxOn = val;
        console.log(val);
        //mt.emitter.emit(mt.constants.SOUND_CHANGED);
    }
    get sfxOn(){
        return this.soundConfig.sfxOn;
    }
    set volumeBGM(val){
        this.soundConfig.volumeBGM = val;
    }
    get volumeBGM(){
        return this.soundConfig.volumeBGM;
    }
    set volumeSound(val){
        this.soundConfig.volumeSound = val;
    }
    get volumeSound(){
        return this.soundConfig.volumeSound;
    }

    set isSceneChangeReserved(val){
        this._isSceneChangeReserved = val;
        console.log("set isSceneChangeReserved");
        console.log(this._isSceneChangeReserved);
    }
    get isSceneChangeReserved(){
        console.log("get isSceneChangeReserved");
        console.log(this._isSceneChangeReserved);
        return this._isSceneChangeReserved;
    }

    setButonPosition(scene){
        let w = scene.game.config.width;
        let h = scene.game.config.height;
        let initH=h*(1/6+1/25);
        let shiftH=h/7.5;
        this.btnPosition.btn1.xx=w*15/16;
        this.btnPosition.btn2.xx=w*15/16;
        this.btnPosition.btn3.xx=w*15/16;
        this.btnPosition.btn4.xx=w*15/16;
        this.btnPosition.btn5.xx=w*15/16-w*1/120;

        this.btnPosition.btn1.yy=initH;
        this.btnPosition.btn2.yy=initH+shiftH;
        this.btnPosition.btn3.yy=initH+shiftH*2;
        this.btnPosition.btn4.yy=initH+shiftH*3;
        this.btnPosition.btn5.yy=initH+shiftH*4;
    }
}