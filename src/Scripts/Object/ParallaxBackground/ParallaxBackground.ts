import * as Phaser from "phaser";
import Time from "../../Util/Time";

export default class ParallaxBackground {
  
  private scene : Phaser.Scene;
  private y : number;
  private imageName : string;
  private depth : number;
  private speed : number;
  private scale : number;

  private gameWidth : number;

  private images : Phaser.GameObjects.Image[];

  constructor(scene : Phaser.Scene, y : number, image : string, depth : number, speed : number, scale : number){
    this.scene = scene;
    this.y = y;
    this.imageName = image;
    this.depth = depth;
    this.scale = scale;

    this.speed = speed;

    this.images = [];

    this.gameWidth = scene.cameras.main.width;
    this.createImages();
  }

  private createImages(){
    let newImage : Phaser.GameObjects.Image;
    let curX : number = 0;
    do{
      newImage = this.scene.add.image(curX, this.y, this.imageName).setDepth(this.depth).setScale(this.scale);
      this.images.push(newImage);
      curX += newImage.displayWidth;
    }while(curX <= this.gameWidth * 2);
  }

  update() : void{
    this.moveImages();
    this.checkIfOutOfBound();
  }

  private moveImages() : void {
    this.images.forEach(image => {
      image.x += this.speed * Time.deltaTime;
    });
  }

  private checkIfOutOfBound() : void {
    if(this.images[0].x + this.images[0].displayWidth/2 < 0){
      let removeImage : Phaser.GameObjects.Image = this.images.shift();
      let lastImage : Phaser.GameObjects.Image = this.images[this.images.length-1];
      removeImage.x = lastImage.x + lastImage.displayWidth;
      this.images.push(removeImage);
    }
  }



}