import * as Phaser from "phaser";
import Player from "../Object/Player";
import Ground from "../Object/Ground";
import Control from "../Control/Control";
import Time from "../Util/Time";
import FpsText from "../Object/FpsText";
import Score from "../Object/Score";
import GameOverMenu from "../Object/GameOverMenu";
import ParallaxBackgroundManager from "../Object/ParallaxBackground/ParallaxBackgroundManager";

export default class GameScene extends Phaser.Scene {

  private ground : Ground;
  private player : Player;

  private controls : Control;

  private fpsText : Phaser.GameObjects.Text;
  private scoreText : Phaser.GameObjects.Text;

  private score : Score;

  private distanceEvent : Phaser.Time.TimerEvent;

  private keyR : Phaser.Input.Keyboard.Key;

  private gameOverMenu : GameOverMenu;

  private parallaxBackgroundManager : ParallaxBackgroundManager;

  private speed : number = -250;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {
    
  }

  create(): void {
    this.ground = new Ground(this, 600, this.speed);
    this.ground.startMoving();
    this.player = new Player(this, 300, 500);
    this.player.addCollision(this.physics.add.collider(this.player, this.ground.getGroundGroup()));
    this.physics.add.overlap(this.player, this.ground.getInteractableGroup(), this.onOverlap, null, this);
    this.controls = new Control(this.input.keyboard.createCursorKeys());
    this.fpsText = new FpsText(this, 0, 0);
    this.scoreText = this.add.text(this.cameras.main.width/2, 100, "0", {fontSize: "60px", color:"#000", align:"center"}).setOrigin(0.5);

    this.score = new Score();
    this.score.addEventOnScoreUpdated(()=>this.updateScoreUI());
    
    this.distanceEvent = this.time.addEvent({callback:this.distanceScore, callbackScope:this, delay:1000, loop:true});

    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R, true, false);

    // this.add.image(512, 380, "background").setDepth(-1).setScale(0.5);
    

    this.parallaxBackgroundManager = new ParallaxBackgroundManager(this, this.speed);
    this.parallaxBackgroundManager.startMoving();

    this.gameOverMenu = new GameOverMenu(this);

  }

  update(): void{
    Time.updateTime();

    if(this.keyR.isDown){
      this.reset();
    }

    if(this.controls.isKeyDown("up")){
      this.player.jump();
    }

    if(this.controls.isKeyDown("down")){
      this.player.duck();
    }

    this.ground.update();
    this.parallaxBackgroundManager.update();
    this.player.update();
    this.controls.update();
  }

  private reset() : void{
    this.scene.start("GameScene");
  }

  distanceScore() : void {
    this.score.addScore(100);
  }

  onOverlap(player : Phaser.GameObjects.GameObject, interactable : Phaser.GameObjects.GameObject) : void {
    if(interactable.type == "obstacle"){
      (player as Player).die();
      this.ground.stopMoving();
      this.parallaxBackgroundManager.stopMoving();
      this.gameOverMenu.show();
      this.distanceEvent.paused = true;
    }else if(interactable.type == "coin"){
      interactable.destroy();
      this.score.addScore(200);
    }
  }

  updateScoreUI() : void{
    this.scoreText.text = "" + this.score.getScore();
  }

}
