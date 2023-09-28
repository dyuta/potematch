class ScenePotato extends Phaser.Scene {
    constructor() {
        super('ScenePotato');
    }
    preload ()
    {
        
    }

    create ()
    {
        //background
        this.add.image(400, 300, 'spaceBG');
        
        //StartBGM
        mt.mediaManager.setBGM('bgm_End');

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

        this.btnRestart = new ImageButton(
            {scene:this,isSprite:false,key:'restartbtn',
            event:mt.consts.START_GAME,
            params:this,
            xx:mt.model.btnPosition.btn2.xx,
            yy:mt.model.btnPosition.btn2.yy
            }
        )
        this.btnRestart.back.setScale(0.9,0.9);

        this.btnCredit = new ImageButton(
            {scene:this,isSprite:false,key:'creditbtn',
            event:mt.consts.GO_CREDIT,
            params:this,
            xx:mt.model.btnPosition.btn3.xx,
            yy:mt.model.btnPosition.btn3.yy
            }
        )

        this.btnGoTitle = new ImageButton(
            {scene:this,isSprite:false,key:'titlebtn',
            event:mt.consts.GO_TITLE,
            params:this,
            xx:mt.model.btnPosition.btn4.xx,
            yy:mt.model.btnPosition.btn4.yy
            }
        )
        this.btnGoTitle.back.setScale(0.8,0.8);

        //
        const initXX=this.game.config.width*(1/4-1/36);
        const initYY=this.game.config.height*(1/3-1/40);
        const shiftXX=this.game.config.width/4;
        const shiftYY=this.game.config.height/3;
        //let potatoVarietyArray = mt.consts.potatoVarieties.slice(0,6);
        let potatoVarietyArray = mt.model.potatoVarieties.slice(0,6);
        let xx=initXX;
        let yy=initYY;
        let num=0;
        let potatoPhoto={};
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < 3; j++){
                //a
                // #ToDo Create Card Class
                potatoPhoto=this.setPotato.apply(this,
                    [potatoVarietyArray[num],
                     mt.consts.potatoUrlDict[potatoVarietyArray[num]],
                     {xx:xx,yy:yy}]);
                xx +=shiftXX;
                num++;
            }
            xx=initXX;
            yy +=shiftYY;
            //b
        }


        //this.input.on("gameobjectdown",this.onClick,this);
        console.log("credit Scene");
    }
    setPotato(key,url,position){
        let xx = this.game.config.width/6;
        let yy = this.game.config.height/2;
        let linkUrlStr=url;
        let potato={};
        if(position){
            // keep x as default
            // set y only
            xx=position.xx;
            yy = position.yy;
        }
        //let that=this;
        let callback=function(){
            this.openExternalLink(linkUrlStr);
        };

        potato = this.add.sprite(xx,yy,key).setInteractive();
        potato.on('pointerup',callback, this);
        potato.setOrigin(0.5,0.5);
        potato.name='PotatoLink';
        potato.setFrame(1);
    }
    showText(str,position,color){
        let xx = this.game.config.width/6;
        let yy = this.game.config.height/2;
        let resultTxt = {};
        let style={fontFamily:'Kosugi',fontSize:'28px',align:'center',fontStyle:'bold',color:color};
        if(position){
            // keep x as default
            // set y only
            xx=position.xx;
            yy = position.yy;
        }
        resultTxt = this.add.text(xx,yy,str,style);
        resultTxt.setOrigin(0,0.5);
    }
    onClick(pointer,obj){
        // 
    }
    openExternalLink(url)
    {
        var url = url
    
        var s = window.open(url, '_blank');
    
        if (s && s.focus)
        {
            s.focus();
        }
        else if (!s)
        {
            window.location.href = url;
        }
    }
    update() {
        //constant running loop
    }
}