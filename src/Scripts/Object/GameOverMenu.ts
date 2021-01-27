import * as Phaser from "phaser";

export default class GameOverMenu{

  private gameObjects : Phaser.GameObjects.Components.Visible[];

  constructor(scene : Phaser.Scene){
    this.gameObjects = [];
    this.gameObjects.push(scene.add.text(scene.cameras.main.width/2, scene.cameras.main.height/2-50, "GAME OVER",
     {fontSize: "80px", color:"#000", align:"center"}).setOrigin(0.5).setDepth(10));
    this.gameObjects.push(scene.add.text(scene.cameras.main.width/2, scene.cameras.main.height/2+50, "Press R - to Restart",
     {fontSize: "40px", color:"#000", align:"center"}).setOrigin(0.5).setDepth(10));
    this.hide();
  }

  show() : void{
    this.gameObjects.forEach(gameObject => {
      gameObject.setVisible(true);
    });
  }

  hide() : void{
    this.gameObjects.forEach(gameObject => {
      gameObject.setVisible(false);
    });
  }

}