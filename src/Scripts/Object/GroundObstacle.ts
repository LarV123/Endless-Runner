import * as Phaser from "phaser";

export default class GroundObstacle extends Phaser.Physics.Arcade.Image{

  constructor (scene : Phaser.Scene, x : number, y : number){
    super(scene, x, y, "ground_obstacle");
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = "obstacle";
  }

}