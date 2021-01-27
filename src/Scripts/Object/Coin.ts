import * as Phaser from "phaser";

export default class Coin extends Phaser.Physics.Arcade.Image{

  constructor (scene : Phaser.Scene, x : number, y : number){
    super(scene, x, y, "coin");
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = "coin";
  }

}