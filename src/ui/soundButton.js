
class SoundButton extends UIBlock{
    constructor(config){
        super();
        this.scene=config.scene;
        this.key=config.key;
                
        // position
        if(config.xx && config.yy){
            this.xx=config.xx;
            this.yy=config.yy;
        }
        else{
            this.xx=0;
            this.yy=0;
        }

        // sprite or image
        if(config.isSprite && config.isSprite==true){
            this.back=this.scene.add.sprite(this.xx,this.yy,this.key);
            if(config.defaultFrame){
                this.back.setFrame(config.defaultFrame);
            }
        }
        else{
            this.back=this.scene.add.image(this.xx,this.yy,this.key);
        }
        
        this.back.setInteractive();
        this.back.on('pointerdown',this.pressed,this);

        this.add(this.back);
    }
    pressed(){
        console.log('pressed');
        if(this.back.frame.name == 0){
            this.back.setFrame(1);
            //mt.mediaManager.setBGM('bgm_Play');
            mt.mediaManager.onVolume();
        }
        else{
            this.back.setFrame(0);
            //mt.mediaManager.stopBGM();
            mt.mediaManager.offVolume();
        }
        
    }
}