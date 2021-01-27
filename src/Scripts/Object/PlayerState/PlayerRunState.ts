import * as Phaser from "phaser";
import PlayerState from "../../Interfaces/PlayerState";
import PlayerStateManager from "../../Interfaces/PlayerStateManager";

export default class PlayerRunState implements PlayerState {

  private body : Phaser.Physics.Arcade.Body;
  private animationState : Phaser.Animations.AnimationState;

  constructor(body : Phaser.Physics.Arcade.Body, animationState : Phaser.Animations.AnimationState){
    this.body = body;
    this.animationState = animationState;
  }

  onEnable(): void {
    this.animationState.play("player_run");
    this.body.setSize(60, 70, true);
    this.body.setOffset(18, 26);
  }
  
  update(): void {
    
  }

  onDisable(): void {
    
  }

}