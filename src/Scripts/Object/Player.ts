import * as Phaser from "phaser";
import PlayerStateManager from "../Interfaces/PlayerStateManager";
import PlayerState from "../Interfaces/PlayerState";
import PlayerRunState from "../Object/PlayerState/PlayerRunState";
import PlayerJumpState from "../Object/PlayerState/PlayerJumpState";
import PlayerDuckState from "../Object/PlayerState/PlayerDuckState";
import PlayerDieState from "../Object/PlayerState/PlayerDieState";

export default class Player extends Phaser.Physics.Arcade.Sprite implements PlayerStateManager{

  private curPlayerState : PlayerState;

  private jumpSound : Phaser.Sound.BaseSound;
  private fallSound : Phaser.Sound.BaseSound;
  private hurtSound : Phaser.Sound.BaseSound;

  private colliders : Phaser.Physics.Arcade.Collider[];

  constructor(scene:Phaser.Scene, x:number, y:number){
    super(scene, x, y, "player");
    this.setDepth(1);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setGravityY(1000);
    this.setBounce(0);

    this.jumpSound = this.scene.sound.add("jump_sfx");
    this.fallSound = this.scene.sound.add("fall_sfx");
    this.hurtSound = this.scene.sound.add("hurt_sfx");

    this.setPlayerState(new PlayerRunState(this.body as Phaser.Physics.Arcade.Body, this.anims));

    this.colliders = [];
  }

  setPlayerState(playerState: PlayerState) : void{
    if(this.curPlayerState != null){
      this.curPlayerState.onDisable();
    }
    this.curPlayerState = playerState;
    if(this.curPlayerState != null){
      this.curPlayerState.onEnable();
    }
  }

  addCollision(collider : Phaser.Physics.Arcade.Collider){
    this.colliders.push(collider);
  }

  update() : void{
    this.curPlayerState.update();
  }

  jump() : void{
    if(this.body.touching.down && this.curPlayerState instanceof PlayerRunState){
      this.jumpSound.play();
      this.setPlayerState(new PlayerJumpState(this, this.body as Phaser.Physics.Arcade.Body, this.anims, this.fallSound));
    }
  }

  duck() : void{
    if(this.curPlayerState instanceof PlayerRunState){
      this.setPlayerState(new PlayerDuckState(this, this.body as Phaser.Physics.Arcade.Body, this.anims));
    }
  }

  die() : void{
    if(! (this.curPlayerState instanceof PlayerDieState)){
      this.hurtSound.play();
      this.setPlayerState(new PlayerDieState(this.body as Phaser.Physics.Arcade.Body, this.anims, ()=>this.removeCollision()));
    }
  }

  private removeCollision() : void{
    this.colliders.forEach(collider => {
      collider.destroy();
    });
    this.colliders = [];
  }

}