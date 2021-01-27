import * as Phaser from "phaser";
import ParallaxBackground from "./ParallaxBackground";

export default class ParallaxBackgroundManager {

  visible: boolean;

  private backgrounds : ParallaxBackground[];
  private scene : Phaser.Scene;

  private isMoving : boolean;
  private maxSpeed : number;

  constructor(scene : Phaser.Scene, maxSpeed : number){
    this.scene = scene;
    this.maxSpeed = maxSpeed;
    this.backgrounds = [];

    this.backgrounds.push(new ParallaxBackground(scene, 320, "background2", -2, maxSpeed*0.8, 0.5));
    this.backgrounds.push(new ParallaxBackground(scene, 280, "hill", -3, maxSpeed*0.7, 0.5));
    this.backgrounds.push(new ParallaxBackground(scene, 350, "clouds", -4, maxSpeed*0.3, 0.5));
    this.backgrounds.push(new ParallaxBackground(scene, 370, "clouds2", -5, maxSpeed*0.4, 0.5));

  }

  startMoving() : void{
    this.isMoving = true;
  }

  stopMoving() : void{
    this.isMoving = false;
  }

  update() : void {
    if(this.isMoving){
      this.backgrounds.forEach(background => {
        background.update();
      });
    }
  }

  setVisible(value: boolean): this {
    this.visible = value;
    return this;
  }

}