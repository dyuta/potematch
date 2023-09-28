class Controller{
    constructor(){
        mt.emitter.on(mt.consts.START_GAME, this.startGame, this);
        mt.emitter.on(mt.consts.GO_CREDIT, this.goCredit, this);
        mt.emitter.on(mt.consts.GO_POTATO, this.goPotato, this);
        mt.emitter.on(mt.consts.GO_TITLE, this.goTitle, this);
    }
    startGame(scene){
        // scene should be passed as params by emmiter in imageButton
        mt.mediaManager.stopBGM();
        console.log('new btn restart');
        mt.model.isSceneChangeReserved=false;
        scene.scene.start('SceneMain');
    }
    goCredit(scene){
        mt.mediaManager.stopBGM();
        console.log("new go credit");
        mt.model.isSceneChangeReserved=false;
        scene.scene.start('SceneCredit');
    }
    goPotato(scene){
        mt.mediaManager.stopBGM();
        mt.model.isSceneChangeReserved=false;
        scene.scene.start('ScenePotato');
    }
    goTitle(scene){
        mt.mediaManager.stopBGM();
        mt.model.isSceneChangeReserved=false;
        scene.scene.start('SceneTitle');
    }
}