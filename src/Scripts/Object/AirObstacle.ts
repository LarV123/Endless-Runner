import * as Phaser from "phaser";

export default class AirObstacle extends Phaser.Physics.Arcade.Image{

  constructor (scene : Phaser.Scene, x : number, y : number){
    super(scene, x, y, "air_obstacle");
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(this.width, this.height+15);

    this.type = "obstacle";
    
    scene.tweens.add({
      targets: this,
      loop: true,
      props : {
        angle : { value: -90, duration: 300, repeat: -1}
      }
    });
  }

}