class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        this.potatoNameTxt="";
    }
    preload ()
    {
        //image
        /*
        this.load.image('spaceBG','/images/space_bg_1_1.png');
        this.load.image('potatoItem','/images/potatos/potato_item_tk.png');
        this.load.image('potatoIcon','/images/potatos/potato_icon_tk.png');
        
        //button
        this.load.spritesheet('soundOnOff','/images/buttons/soundOnOff_color_sprite_mini.png',{frameWidth: 64,frameHeight: 64});
        this.load.image('restartbtn','/images/buttons/icons8-restart-58.png');
        this.load.image('creditbtn','/images/buttons/credits_icon.png');
        this.load.image('titlebtn','/images/buttons/turnback_arrow.png');
        this.load.image('potatobtn','/images/potatos/potato_03_Kitaakari.png');

        //sprites
        this.load.spritesheet('potato00','/images/potatos/potato_01_Danshaku_sprite.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato01','/images/potatos/potato_02_mayqueen_sprite.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato02','/images/potatos/potato_03_kitaakari_sprite.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato03','/images/potatos/potato_04_tooya_sprite.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato04','/images/potatos/potato_05_inkanomezame_sprite.png',{frameWidth: 150,frameHeight: 150});
        this.load.spritesheet('potato05','/images/potatos/potato_06_shadowqueen_sprite.png',{frameWidth: 150,frameHeight: 150});
        
        //audio
        // #Todo move to title
        
        this.load.audio('bgm_Play','/music/PM_02_Play_2022-05-08.mp3');
        this.load.audio('soundTurn','/music/PM_03_Turn_2022-05-08.mp3');
        this.load.audio('soundMatch','/music/PM_04_Match_2022-05-08.mp3');
        this.load.audio('soundNG','/music/PM_05_NG_2022-05-08.mp3');
        this.load.audio('bgm_Clear','/music/PM_06_Clear_2022-05-08.mp3');
        this.load.audio('bgm_End','/music/PM_07_ED_2022-05-08.mp3');
        */
    }

    create ()
    {
        //mt.emitter = new Phaser.Events.EventEmitter();
        //mt.mediaManager = new MediaManager({scene:this});//moved to title
        mt.model.result = {tried:0,miss:0,match:0,time:-1,potatoBasket:[]};

        //background
        this.add.image(400, 300, 'spaceBG');
        
        //StartBGM
        mt.mediaManager.setBGM('bgm_Play');
        
        //for test
        mt.cardGroup = this.add.group();
        
        
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
        this.btnPotato.back.setScale(0.40,0.40);

        this.btnCredit = new ImageButton(
            {scene:this,isSprite:false,key:'creditbtn',
            event:mt.consts.GO_CREDIT,
            params:this,
            xx:mt.model.btnPosition.btn4.xx,
            yy:mt.model.btnPosition.btn4.yy
            }
        )
        //this.btnCredit.back.setScale(1.0,1.0);

        this.btnGoTitle = new ImageButton(
            {scene:this,isSprite:false,key:'titlebtn',
            event:mt.consts.GO_TITLE,
            params:this,
            xx:mt.model.btnPosition.btn5.xx,
            yy:mt.model.btnPosition.btn5.yy
            }
        )
        this.btnGoTitle.back.setScale(0.8,0.8);
        
        // init game condition
        this.openedCard = null;

        //////////////////////////////////
        // #Todo create function for Adding Cards
        // add cards
        let potatoVarietyArray = {};
        if(mt.model.level==1){
            potatoVarietyArray = mt.consts.potatoVarieties.slice(0,6);
        }
        else if(mt.model.level==2){
            potatoVarietyArray = mt.consts.potatoVarietiesColor.slice(0,6);
        }
        else if(mt.model.level==3){
            // no limit
            potatoVarietyArray = mt.consts.potatoVarieties.slice(6,12);
        }
        else{// no limit
            potatoVarietyArray = mt.consts.potatoVarieties.slice();
        }
        this.fisherYatesShuffle(potatoVarietyArray);
        potatoVarietyArray = potatoVarietyArray.slice(0,6);
        mt.model.potatoVarieties = potatoVarietyArray;// for scenePotato

        // shuffle
        var cardArray=[];
        for(var i=0;i<mt.model.numberOfPotatoVariations;i++){
            // 2 same cards
            cardArray.push(potatoVarietyArray[i]);
            cardArray.push(potatoVarietyArray[i]);
        }
        this.fisherYatesShuffle(cardArray);

        const initXX=this.game.config.width*(1/5-1/32);
        const initYY=this.game.config.height/4;
        let xx=initXX;
        let yy=initYY;
        let num=0;
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 4; j++){
                //a
                // #ToDo Create Card Class
                var card = this.add.sprite(0, 0, cardArray[num]);
                //card.setScale(0.8,0.8);
                card.setInteractive();
                
                // #ToDo dont use name. define by class.
                card.name = "PotatoCard";
                card.x = xx;
                card.y = yy;
                card.potatoVariety = cardArray[num];
                card.matched = false;

                xx +=this.game.config.width/5;
                mt.cardGroup.add(card);
                num++;
            }
            xx=initXX;
            yy +=this.game.config.height/4;
            //b

        }
        // #Todo create function for Adding Cards
        //////////////////////////////////

        this.input.on("gameobjectdown",this.onClick,this);
        
        //console debug
        console.log("Ready!");
        console.log(mt.cardGroup.children.entries);
    }

    onClick(pointer,obj){
        if(obj.name=="PotatoCard"){
            if(mt.model.cardClickLock==false){
                this.selectPotato.call(this,pointer,obj);
            }
            else{
                // under lock do nothing
                console.log("clicklock:" + mt.model.cardClickLock)
            }
            
        }
    }

    selectPotato(pointer,card){
        // recieve as function scope var.
        // so that callback func inside settimeout can find openCard
        var openedCard = this.openedCard;        

        if (card.frame.name == 0){
            // Opened as 1st Card
            if (openedCard===null){
                card.setFrame(1);
                this.setOpendCard(card);
                // #ToDo Turn sound
                mt.mediaManager.playSound('soundTurn');
            }
            // Opened as 2nd Card
            else{
                // turn card
                card.setFrame(1);
                mt.model.result.tried++;
                //matched 
                if(card.potatoVariety==openedCard.potatoVariety){
                    // set results on match
                    card.matched=true;// not used
                    openedCard.matched=true;// not used
                    mt.model.result.match++;
                    mt.model.result.potatoBasket.push(card.potatoVariety);
                    
                    // effects
                    console.log("match!!" + card.potatoVariety);
                    mt.mediaManager.playSound('soundMatch');
                    this.showPotatoName(card.potatoVariety);

                    // #ToDo check clear go clear process
                    if(this.isGameClear()==true){
                        this.gameClear.apply(this);
                    }

                }
                //unmatched
                else{
                    // #ToDo stop lock click turn down cards
                    mt.model.cardClickLock=true;
                    //  set results on unmatch
                    mt.model.result.miss++;

                    mt.mediaManager.playSound('soundNG');
                    console.log("uh...unmatch"+card.potatoVariety + openedCard.potatoVariety);
                    setTimeout(function(){
                        // lock release
                        mt.model.cardClickLock=false;
                    },400);
                    setTimeout(function(){
                        card.setFrame(0);
                        openedCard.setFrame(0);                        
                    },500);
                }
                this.clearOpendCard();
            }    
        }
        else{
            // if card is already open then do nothing
        }
        
    }

    showPotatoName(potatoName){
        let potatoNameJP="";
        let potatoNameTxt={};
        potatoNameJP=mt.consts.potatoDict[potatoName];
        let style={fontFamily:'Kosugi',fontSize:'48px',align:'center',fontStyle:'bold',color:'#fde8d3'};
        if(potatoNameJP=="シャドークイーン"){
            style.fontFamily='Kosugi';
            style.color='#f1bcf5';
            style.fontStyle='bold'
        }
        potatoNameTxt = this.add.text(
            this.game.config.width/2,this.game.config.height/15,potatoNameJP,
            style
            //{fontFamily:'Kosugi',fontSize:'40px',align:'center',fontStyle:'bold'}
        );
        potatoNameTxt.setOrigin(0.5,0.5);
        this.tweens.add({
            targets: potatoNameTxt,
            alpha: 0.5,
            duration: 1500,
            ease: 'Power'
        }, this);
        setTimeout(function(){
            potatoNameTxt.destroy();                      
        },1500);
    }

    isGameClear(){
        //check match status
        if(mt.model.numberOfPotatoVariations==mt.model.result.match){
            console.log("isGameClear true");
            return true;
        }
        else{
            return false;
        }
    }

    gameClear(){
        // if clear 
        let that = this;
        let clearText='Clear';
        let style={fontFamily:'Kosugi',fontSize:'128px',align:'center',fontStyle:'bold',color:'#ffffff'};
        if(mt.model.result.miss==0){
            clearText="Perfect!";
        }
        // set cleared level for result scene
        mt.model.clearedLevel = mt.model.level;

        let nextLev =this.levelUp();
        console.log(nextLev);

        let congratTxt = this.add.text(
            this.game.config.width/2,this.game.config.height/3,clearText,
            style
        );
        congratTxt.setOrigin(0.5,0.5);

        mt.mediaManager.stopBGM();
        // go result scene
        mt.model.isSceneChangeReserved=true;
        setTimeout(
            that.goResult, 3000,that
        );

    }

    levelUp(){
        let luck= Math.random()*1.4;
        if(mt.model.result.miss<=1){
            mt.model.level=4;
        }
        else if(mt.model.result.miss<=5){
            mt.model.level=3;
            // set random level
            //if(luck > 1){
            //    mt.model.level=2;
            //}
        }
        else{
            mt.model.level=1;
            // set random level
            if(luck > 1.1){
                mt.model.level=2;
            }
        }
        return mt.model.level;

    }

    goResult(paramscene){
        //for setTimeout, removed "this" dependency
        if(mt.model.isSceneChangeReserved==true){
            // #ToDo refact as emitter version
            let scene = paramscene;
            scene.scene.start('SceneResult');
            mt.model.isSceneChangeReserved=false;
            console.log("reservation cleared");
        }
        else{
            console.log("no reservation");
        }
    }


    clearOpendCard(){
        this.openedCard = null;
    }

    setOpendCard(card){
        this.openedCard = card;
    }

    fisherYatesShuffle(arr){
        for(var i =arr.length-1 ; i>0 ;i--){
            var j = Math.floor( Math.random() * (i + 1) ); //random index
            [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
        }
    }
    update() {
        //constant running loop
    }
}