import * as Phaser from "phaser";
import Time from "../Util/Time";

export default class FpsText extends Phaser.GameObjects.Text {

  private fps:number = 60;
  private prefix:string = "FPS : ";

  constructor(scene : Phaser.Scene, x : number, y : number){
    super(scene, x, y, "FPS : 60", {fontSize: "30px", color:"#000", align:"left"});
    this.scene.time.addEvent({callback:this.updateFPS, callbackScope:this, delay:500, loop:true});
    scene.add.existing(this);
  }

  updateFPS() : void {
    this.text = "FPS : " + Math.floor(1/Time.deltaTime);
  }

}