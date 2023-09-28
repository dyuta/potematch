class TextButton extends UIBlock{
    constructor(config){
        super();
        this.scene=config.scene;
        if(config.xx && config.yy){
            this.xx=config.xx;
            this.yy=config.yy;
        }
        else{
            this.xx=0;
            this.yy=0;
        }
        this.back=this.scene.add.image(this.xx,this.yy,config.key);
        this.add(this.back);
        console.log(this.back);
    }
}
class ImageButton extends UIBlock{
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
        }
        else{
            this.back=this.scene.add.image(this.xx,this.yy,this.key);
        }

        // callback
        if(config.callback){
            this.callback = config.callback;
            if(config.callbackScope){
                this.callbackScope = config.callbackScope
            }
        }
        if(config.event){
            this.event = config.event;
        }
        if(config.params){
            this.params = config.params;
        }

        this.back.setInteractive();
        this.back.on('pointerdown',this.pressed,this);

        this.add(this.back);
    }
    pressed(){
        console.log('pressed');
        if(this.callback){
            if(this.callbackScope){
                this.callback.apply(this.callbackScope);
            }
            else{
                this.callback.apply();
            }
        }
        if(this.event){
            if(this.params){
                mt.emitter.emit(this.event,this.params);
            }
            else{
                mt.emitter.emit(this.event);
            }
        }
        /*
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
        */
    }
}