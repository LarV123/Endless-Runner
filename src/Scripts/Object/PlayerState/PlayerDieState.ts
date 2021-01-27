import * as Phaser from "phaser";
import PlayerState from "../../Interfaces/PlayerState";
import CallbackFunc from "../../Interfaces/CallbackFunc";

export default class PlayerDieState implements PlayerState {

  private body : Phaser.Physics.Arcade.Body;
  private animationState : Phaser.Animations.AnimationState;
  private callbackFunction:CallbackFunc;

  constructor(body : Phaser.Physics.Arcade.Body, animationState : Phaser.Animations.AnimationState, callbackFunction:CallbackFunc){
    this.body = body;
    this.animationState = animationState;
    this.callbackFunction = callbackFunction;
  }

  update(): void {
    
  }

  onEnable(): void {
    this.animationState.play("player_die");
    this.body.setVelocityY(-500);
    this.callbackFunction();
  }

  onDisable(): void {
    
  }

}