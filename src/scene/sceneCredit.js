class SceneCredit extends Phaser.Scene {
    constructor() {
        super('SceneCredit');
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

        this.btnPotato = new ImageButton(
            {scene:this,isSprite:false,key:'potatobtn',
            event:mt.consts.GO_POTATO,
            params:this,
            xx:mt.model.btnPosition.btn3.xx,
            yy:mt.model.btnPosition.btn3.yy
            }
        )
        this.btnPotato.back.setScale(0.4,0.4);

        this.btnGoTitle = new ImageButton(
            {scene:this,isSprite:false,key:'titlebtn',
            event:mt.consts.GO_TITLE,
            params:this,
            xx:mt.model.btnPosition.btn4.xx,
            yy:mt.model.btnPosition.btn4.yy
            }
        )
        this.btnGoTitle.back.setScale(0.8,0.8);

        this.showHeaderText.apply(this);
        let posXX = this.game.config.width/7;
        let shiftXX=this.game.config.width*4/7;
        let posYY = this.game.config.height*3/11;
        let shiftYY= this.game.config.height/11;
        this.showText.apply(this,['■画像素材',{xx:posXX,yy:posYY},'#ffffff']);
        posYY += shiftYY;
        this.showURLText.apply(this,['いも類研究会','https://www.jrt.gr.jp/',{xx:posXX,yy:posYY}]);
        this.showURLText.apply(this,['北海道農政部生産振興局農産振興課','https://www.pref.hokkaido.lg.jp/ns/nsk/potato/potato-hinsyu.html',
        {xx:posXX*2.5,yy:posYY}]);

        posYY += shiftYY;
        this.showText.apply(this,['■音楽提供',{xx:posXX,yy:posYY},'#ffffff']);
        posYY += shiftYY;
        this.showURLText.apply(this,['Noi Yuhi','https://www.tunecore.co.jp/artists/noiyuhi?lang=ja',{xx:posXX,yy:posYY}]);
        posYY += shiftYY;
        this.showText.apply(this,['■special thanks to',{xx:posXX,yy:posYY},'#ffffff']);
        posYY += shiftYY;
        this.showURLText.apply(this,['浦幌町の農産物','https://www.urahoro.jp/furusatonozei/seido.html',{xx:posXX,yy:posYY}]);
        posYY += shiftYY;
        this.showText.apply(this,['新しいゲームを考える会',{xx:posXX,yy:posYY},'#f6b94c']);
        posYY += shiftYY;
        this.showURLText.apply(this,['山本ぽてと','https://twitter.com/PotatoYamamoto',{xx:posXX,yy:posYY}]);

        // bunfuri
        
        let potegan =this.setURLImage.apply(this,['potatoGannen','https://c.bunfree.net/c/tokyo34/h1/%E3%83%88/7',
            {xx:this.game.config.width*12/16,yy:this.game.config.height*7/11}]);
        potegan.name='PotatoLink';
        potegan.setScale(0.26,0.26);
        let poteganTxt = this.showText.apply(
            this,['5/29 文学フリマ東京\nト-07〜08',{xx:this.game.config.width*12/16,yy:posYY},'#ffffff']
            );
        poteganTxt.setOrigin(0.5,0.5);
        poteganTxt.setFontSize('20px');
        

        //this.input.on("gameobjectdown",this.onClick,this);
        console.log("credit Scene");
    }
    showHeaderText(){
        let style={fontFamily:'Kosugi Maru',fontSize:'48px',align:'center',fontStyle:'normal',color:'#ffffff'};
        let clearTxt ={};
        let clearTxtStr='謝辞';
        clearTxt = this.add.text(
            this.game.config.width/2,this.game.config.height/6,clearTxtStr,
            style
        );
        clearTxt.setOrigin(0.5,0.5);
        // other results

    }
    showURLText(str,url,position){
        let xx = this.game.config.width/6;
        let yy = this.game.config.height/2;
        let style={fontFamily:'Kosugi Maru',fontSize:'24px',align:'center',fontStyle:'bold',color:'#f6b94c'};
        let resultTxt={};
        let resultString=str;
        let linkUrlStr=url;
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

        resultTxt = this.add.text(
            xx,yy,resultString,
            style
        ).setInteractive();
        resultTxt.on('pointerup',callback, this);
        resultTxt.setOrigin(0,0.5);
    }
    showText(str,position,color){
        let xx = this.game.config.width/6;
        let yy = this.game.config.height/2;
        let resultTxt = {};
        let style={fontFamily:'Kosugi Maru',fontSize:'24px',align:'center',fontStyle:'bold',color:color};
        if(position){
            // keep x as default
            // set y only
            xx=position.xx;
            yy = position.yy;
        }
        resultTxt = this.add.text(xx,yy,str,style);
        resultTxt.setOrigin(0,0.5);
        return resultTxt;
    }
    setURLImage(key,url,position){
        let xx = this.game.config.width/6;
        let yy = this.game.config.height/2;
        let linkUrlStr=url;
        if(position){
            xx=position.xx;
            yy = position.yy;
        }
        //let that=this;
        let callback=function(){
            this.openExternalLink(linkUrlStr);
        };
        let resultImg = this.add.image(
            xx,yy,key
        ).setInteractive();
        resultImg.on('pointerup',callback, this);
        resultImg.setOrigin(0.5,0.5);
        return resultImg;
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