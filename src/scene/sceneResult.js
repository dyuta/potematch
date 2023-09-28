class SceneResult extends Phaser.Scene {
    constructor() {
        super('SceneResult');
        this.timeoutResult=7000;
        this.timeoutGoCredit=10000;
        this.i = 0;
        this.resultPotatoString = '';
        this.clearTitle = {};
        this.resultTxt = {};
        this.snsShareString = '';
    }
    preload ()
    {

    }

    create ()
    {
        //background
        this.add.image(400, 300, 'spaceBG');
        
        //StartBGM
        mt.mediaManager.playSound('bgm_Clear');

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

        this.btnPotato = new ImageButton(
            {scene:this,isSprite:false,key:'potatobtn',
            event:mt.consts.GO_POTATO,
            params:this,
            xx:mt.model.btnPosition.btn4.xx,
            yy:mt.model.btnPosition.btn4.yy
            }
        )
        this.btnPotato.back.setScale(0.4,0.4);

        this.btnGoTitle = new ImageButton(
            {scene:this,isSprite:false,key:'titlebtn',
            event:mt.consts.GO_TITLE,
            params:this,
            xx:mt.model.btnPosition.btn5.xx,
            yy:mt.model.btnPosition.btn5.yy
            }
        )
        this.btnGoTitle.back.setScale(0.8,0.8);

        // display text

        this.clearTitle = this.showHeaderText.apply(this);
        this.resultTxt = this.showResultText.apply(this);

        // Tap To Go Credits
        let callbackCredit=function(){
            this.goCreditEvent(this);
        };
        let tapLinkStyle = {fontFamily:'Mulish',fontSize:'36px',align:'center',fontStyle:'normal'};
        let creditsText = this.createTapLink.apply(this,
            [{xx:this.game.config.width*1/3,yy:this.game.config.height*7/8},
             'credits', tapLinkStyle, callbackCredit]
            );

        //let creditsText = this.add.text(
        //    this.game.config.width/3,this.game.config.height*7/8,"credits",
        //    {fontFamily:'Mulish',fontSize:'40px',align:'center',fontStyle:'normal'}
        //).setInteractive();
        //creditsText.setOrigin(0.5,0.5);
        //
        //creditsText.on('pointerup',callbackCredit, this);

        // twitter
        this.snsShareString = this.createSNSShareString();
        this.snsShareString +='\n' + mt.consts.appURL; 
        let tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.snsShareString);
        let callbackTweet=function(){
            this.openExternalLink(tweetUrl);
        };

        let tweetText = this.createTapLink.apply(this,
            [{xx:this.game.config.width*2/4,yy:this.game.config.height*7/8},
             'tweet', tapLinkStyle, callbackTweet]
            );
        
        // retry
        let callbackRetry=function(){
            this.startGameEvent(this);
        };

        let retryText = this.createTapLink.apply(this,
            [{xx:this.game.config.width*2/3,yy:this.game.config.height*7/8},
             'retry!', tapLinkStyle, callbackRetry]
            );
        

        //let tweetText = this.add.text(
        //    this.game.config.width*2/3,this.game.config.height*7/8,"tweet",
        //    {fontFamily:'Mulish',fontSize:'40px',align:'center',fontStyle:'normal'}
        //).setInteractive();
        //tweetText.setOrigin(0.5,0.5);
        //
        //tweetText.on('pointerup',callbackTweet, this);;


        // rainbow
        if(mt.model.clearedLevel == 2){
            this.clearTitle.setStroke('#00f', 16);
            this.clearTitle.setShadow(2, 2, "#333333", 2, true, true);
            this.resultTxt.setStroke('#00f', 1);
            this.resultTxt.setShadow(1, 1, "#333333", 1, false, false);
        }

        
        this.input.on("gameobjectdown",this.onClick,this);
        console.log("result Scene");

        /* stop automatically going to credit
        let timeaoutTotal = this.timeoutResult + this.timeoutGoCredit;

        // go Credit
        
        let that = this;
        mt.model.isSceneChangeReserved=true;
        setTimeout(
            that.goCredit, timeaoutTotal,that
        );
        */

    }
    showHeaderText(){
        let style={fontFamily:'Kosugi Maru',fontSize:'80px',align:'center',fontStyle:'bold',color:'#ffffff'};
        let clearTxt = this.add.text(
            this.game.config.width/2,this.game.config.height/6,"結果発表!",
            style
        );
        clearTxt.setOrigin(0.5,0.5);
        setTimeout(function(){
            clearTxt.destroy();                      
        },this.timeoutResult);
        // other results
        return clearTxt;

    }
    showResultText(){
        let style={fontFamily:'Kosugi Maru',fontSize:'44px',align:'center',fontStyle:'bold',color:'#ffffff'};
        let resultTxt={};
        let resultString='';
        let resultPotatoString='';
        let that=this;

        resultString = this.createResultScoreString.apply(this);
        resultPotatoString = this.createResultPotatoString.apply(this)+'\n';


        resultTxt = this.add.text(
            this.game.config.width/2,this.game.config.height*1/2,resultString,
            style
        );

        resultTxt.setOrigin(0.5,0.5);

        // other results
        // #Todo change settimeout -> tap trigger
        setTimeout(function(that,resultPotatoString){
            resultTxt.setText(resultPotatoString);

        },this.timeoutResult,that,resultPotatoString);

        return resultTxt;
    }
    createTapLink(position,str,style,callback){
        /* call with context this */
        let tapLink = this.add.text(
            position.xx, position.yy, str, style
        ).setInteractive();
        tapLink.setOrigin(0.5,0.5);
        
        tapLink.on('pointerup',callback, this);

        return tapLink;
    }

    createResultPotatoString(){
        let resultPotatoString='みつけたポテト\n\n';
        resultPotatoString+=this.createFoundPotatoString('\n');
        
        return resultPotatoString;
    }
    createFoundPotatoString(separater){
        let foundPotatoString='';
        //mt.model.result.potatoBasket.forEach(element => {
        //    foundPotatoString+=mt.consts.potatoDict[element]+separater;
        //});

        for(let i = 0; i < mt.model.result.potatoBasket.length; i++){
            foundPotatoString+=mt.consts.potatoDict[mt.model.result.potatoBasket[i]];
            if(i==mt.model.result.potatoBasket.length-1){
                //
            }
            else{
                foundPotatoString+=separater;
            }

        }

        return foundPotatoString;
    }
    createResultScoreString(){
        let resultString='';
        resultString='めくった回数： '+ mt.model.result.tried
            +'\nあたり回数： '+ mt.model.result.match
            +'\nはずれ回数： '+ mt.model.result.miss;
        
        return resultString;
    }
    createSNSShareString(){
        let snsShareString = "";
        if(mt.model.clearedLevel==2){
            snsShareString ="Match Potato +\n" 
        }
        else if(mt.model.clearedLevel==3){
            snsShareString ="Match Potato ++\n" 
        }
        else if(mt.model.clearedLevel==4){
            snsShareString ="Match Potato +++\n" 
        }
        else{
            snsShareString ="Match Potato\n" 
        }
        snsShareString +=this.createResultScoreString()
        if(mt.model.result.miss == 0){
            snsShareString +="\nperfect!"
        }
        snsShareString +="\nみつけたポテト: "+ this.createFoundPotatoString('  ');
        return snsShareString;
    }


    onClick(pointer,obj){
        // 
    }

    goCreditEvent(scene){
        mt.emitter.emit(mt.consts.GO_CREDIT,scene);
    }

    startGameEvent(scene){
        mt.emitter.emit(mt.consts.START_GAME,scene);
    }

    goCredit(paramscene){
        //for setTimeout, removed "this" dependency
        console.log("reserved go credit");
        if(mt.model.isSceneChangeReserved==true){
            console.log("yes reserved");
            // #ToDo refact as emitter version
            let scene = paramscene;
            scene.scene.start('SceneCredit');
            mt.model.isSceneChangeReserved=false;
            console.log("reservation cleared");
        }
        else{
            console.log("no reservation");
        }
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
        const top = mt.model.hsv[this.i].color;
        const bottom = mt.model.hsv[359 - this.i].color;
        if(mt.model.clearedLevel==2){
            this.clearTitle.setTint(top, bottom, top, bottom);
            this.resultTxt.setTint(top, top, bottom, bottom);
    
            this.i++;
    
            if (this.i === 360)
            {
                this.i = 0;
            }
        }
        else{
            //
        }

    }
}