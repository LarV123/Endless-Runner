import * as Phaser from "phaser";
import PlayerState from "../../Interfaces/PlayerState";
import PlayerStateManager from "../../Interfaces/PlayerStateManager";
import PlayerRunState from "./PlayerRunState";

export default class PlayerJumpState implements PlayerState {

  private playerStateManager : PlayerStateManager;
  private body : Phaser.Physics.Arcade.Body;
  private animationState : Phaser.Animations.AnimationState;
  private fallSound : Phaser.Sound.BaseSound;

  constructor(playerStateManager : PlayerStateManager, body : Phaser.Physics.Arcade.Body, animationState : Phaser.Animations.AnimationState, fallSound : Phaser.Sound.BaseSound){
    this.playerStateManager = playerStateManager;
    this.body = body;
    this.animationState = animationState;
    this.fallSound = fallSound;
  }

  onEnable(): void {
    this.animationState.play("player_jump");
    this.body.setVelocityY(-600);
  }
  
  update(): void {
    if(this.body.touching.down && this.body.velocity.y == 0){
      this.fallSound.play();
      this.playerStateManager.setPlayerState(new PlayerRunState(this.body, this.animationState));
    }
  }

  onDisable(): void {
    
  }

}