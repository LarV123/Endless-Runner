import * as Phaser from "phaser";
export default class GroundTile extends Phaser.Physics.Arcade.Image{

  static WIDTH:number = 64;
  static HEIGHT:number = 64;

  constructor(scene : Phaser.Scene, x : number, y : number){
    super(scene, x, y, "ground_tile");
    this.scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setPushable(false);
  }
  
}