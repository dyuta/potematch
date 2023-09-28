class OnOffButton extends UIBlock{
    constructor(config){
        super();
        this.scene=config.scene;
        this.key=config.key;
        this.isOn=false;
                
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

        // set callback on and off function
        if(config.callbackOn){
            this.callbackOn = config.callbackOn;
            if(config.callbackScope){
                this.callbackScope = config.callbackScope
            }
        }
        if(config.callbackOff){
            this.callbackOff = config.callbackOff;
            if(config.callbackScope){
                this.callbackScope = config.callbackScope
            }
        }
        if(config.isOn){
            this.isOn=config.isOn;
        }
        
        this.back.setInteractive();
        this.back.on('pointerdown',this.pressed,this);

        this.add(this.back);
    }
    pressed(){
        console.log('pressed');
        // turn image sprite
        if(this.isSprite==true){
            if(this.back.frame.name == 0){
                this.back.setFrame(1);
            }
            else{
                this.back.setFrame(0);
            }
        }
        // call callbackOn, Off function
        if(this.isOn){
            if(this.callbackOn){
                if(this.callbackScope){
                    this.callbackOn.apply(this.callbackScope);
                }
                else{
                    this.callbackOn.apply();
                }
            }
        }
        else{
            if(this.callbackOff){
                if(this.callbackScope){
                    this.callbackOff.apply(this.callbackScope);
                }
                else{
                    this.callbackOff.apply();
                }
            }
        }
    }
}