var mt;
var game;

window.onload=function(){
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: [SceneTitle,SceneMain,SceneResult,SceneCredit,ScenePotato]
        //scene: [SceneTitle]
        //scene: {
        //    preload: preload,
        //    create: create
        //}
    };
    mt={};
    mt.consts = new Constants();
    mt.model = new Model();
    mt.emitter = new Phaser.Events.EventEmitter();
    mt.controller = new Controller();
    game = new Phaser.Game(config);
    mt.game = game;
    
}