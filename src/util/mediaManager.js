class MediaManager{
    constructor(config){
        if(config.scene){
            this.scene = config.scene;
        }
        else{
            this.scene = {};
        }
        this.backGroundMusic={};
        this.sound={};
    }
    playSound(key){
        let volumeTmp=mt.model.soundConfig.volumeSound;
        if(mt.model.soundConfig.sfxOn==false){
            volumeTmp=0;
        }
        this.sound = this.scene.sound.add(key,{volume:volumeTmp});
        this.sound.play();
    }
    setBGM(key){
        this.stopBGM();
        this.stopPlaingSound();
        let volumeTmp=mt.model.soundConfig.volumeBGM;
        if(mt.model.soundConfig.musicOn==false){
            volumeTmp=0;
        }
        this.backGroundMusic = this.scene.sound.add(key,{volume:volumeTmp,loop:true});
        this.backGroundMusic.play();
    }
    offVolume(){
        mt.model.soundConfig.musicOn=false;
        mt.model.soundConfig.sfxOn=false;
        
        //setting change
        mt.model.soundConfig.volumeBGM=0;
        mt.model.soundConfig.volumeSound=0;
        // existing sounds change
        // #Todo condition check sound exists or not
        this.backGroundMusic.volume=0;
        this.sound.volume=0;
    }
    onVolume(){
        mt.model.soundConfig.musicOn=true;
        mt.model.soundConfig.sfxOn=true;
        
        //setting change
        mt.model.soundConfig.volumeBGM=mt.consts.volumeBGM;
        mt.model.soundConfig.volumeSound=mt.consts.volumeSound;
        // existing sounds change
        this.backGroundMusic.volume=mt.consts.volumeBGM;
    }
    stopBGM(){
        if(typeof this.backGroundMusic.key === "undefined"){
            // do nothing
        }
        else{
            if(this.backGroundMusic.key!=''){
                this.backGroundMusic.stop();
                this.backGroundMusic.destroy();
            }
        }
    }
    stopPlaingSound(){
        if(typeof this.sound.key === "undefined"){
            // do nothing
        }
        else{
            if(this.sound.key!=''){
                this.sound.stop();
                this.sound.destroy();
            }
        }
    }
}