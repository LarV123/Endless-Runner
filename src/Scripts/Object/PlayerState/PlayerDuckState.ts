import * as Phaser from "phaser";
import PlayerState from "../../Interfaces/PlayerState";
import PlayerStateManager from "../../Interfaces/PlayerStateManager";
import PlayerRunState from "../PlayerState/PlayerRunState";

export default class PlayerDuckState implements PlayerState {

  private playerStateManager : PlayerStateManager;
  private body : Phaser.Physics.Arcade.Body;
  private animationState : Phaser.Animations.AnimationState;

  private static DUCK_TIME : number = 1.5;

  private duckStartTime : number;

  constructor(playerStateManager : PlayerStateManager, body : Phaser.Physics.Arcade.Body, animationState : Phaser.Animations.AnimationState){
    this.playerStateManager = playerStateManager;
    this.body = body;
    this.animationState = animationState;
  }

  onEnable(): void {
    this.animationState.play("player_duck");
    this.duckStartTime = new Date().getTime();
    this.body.setSize(60, 60, true);
    this.body.setOffset(18, 36);
  }
  
  update(): void {
    if((this.getCurrentTime() - this.duckStartTime)/1000 > PlayerDuckState.DUCK_TIME){
      this.playerStateManager.setPlayerState(new PlayerRunState(this.body, this.animationState));
    }
  }

  private getCurrentTime() : number {
    return new Date().getTime();
  }

  onDisable(): void {
    
  }

}