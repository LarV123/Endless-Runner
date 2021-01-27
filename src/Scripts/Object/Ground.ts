import * as Phaser from "phaser";
import GroundTile from "./GroundTile";
import DirtTile from "./DirtTile";
import TimedObjectSpawner from "../ObjectSpawner/TimedObjectSpawner";
import GroundObstacle from "./GroundObstacle";
import AirObstacle from "./AirObstacle";
import Time from "../Util/Time"
import Coin from "./Coin";

export default class Ground{

  private interactables : Phaser.Physics.Arcade.Image[];
  private groundTiles : GroundTile[];
  private dirtTilesArray : DirtTile[][];

  private height : number;
  private scene : Phaser.Scene;

  private isMoving : boolean;

  private speed : number;

  private groundGroup : Phaser.Physics.Arcade.Group;
  private interactableGroup : Phaser.Physics.Arcade.Group;

  private objectSpawner : TimedObjectSpawner;

  constructor(scene : Phaser.Scene, height : number, speed : number){
    this.height = height;
    this.scene = scene;

    this.interactables = [];
    this.groundTiles = [];
    this.dirtTilesArray = [];

    this.speed = speed;

    this.groundGroup = scene.physics.add.group();
    this.interactableGroup = scene.physics.add.group();

    let gameWidth : number = this.scene.cameras.main.width;
    this.objectSpawner = new TimedObjectSpawner(scene, [(x)=>this.CreateGroundObstacle(x), (x)=>this.CreateAirObstacle(x), (x)=>this.CreateCoin(x)], gameWidth, 4000);

    this.createGround();
  }

  startMoving() : void {
    this.objectSpawner.start();
    this.isMoving = true;
  }

  stopMoving() : void {
    this.objectSpawner.stop();
    this.isMoving = false;
  }

//#region interactable factory
  CreateGroundObstacle(x : number) : void {
    let groundObstacle = new GroundObstacle(this.scene, x, 536);
    this.interactables.push(groundObstacle);
    this.interactableGroup.add(groundObstacle);
  }

  CreateAirObstacle(x : number) : void {
    let airObstacle = new AirObstacle(this.scene, x, 460);
    this.interactables.push(airObstacle);
    this.interactableGroup.add(airObstacle);
  }

  CreateCoin(x : number) : void{
    let coin = new Coin(this.scene, x, 400);
    this.interactables.push(coin);
    this.interactableGroup.add(coin);
  }
//#endregion

//#region create function
  private createGround() : void{
    let gameWidth:number = this.scene.cameras.main.width;
    let gameHeight:number = this.scene.cameras.main.height;

    //add ground layer
    for(let x = 16; x <= gameWidth + GroundTile.WIDTH; x+=GroundTile.WIDTH){
      this.groundTiles.push(this.createGroundTile(x, this.height));
    }
    //add dirt layer
    for(let y = this.height + GroundTile.HEIGHT; y <= gameHeight; y+= DirtTile.HEIGHT){
      let dirtTiles:DirtTile[] = [];
      for(let x = 16; x <= gameWidth + GroundTile.WIDTH; x+=GroundTile.WIDTH){
        dirtTiles.push(new DirtTile(this.scene, x, y));
      }
      this.dirtTilesArray.push(dirtTiles);
    }

  }

  private createGroundTile(x:number, y:number) : GroundTile {
    let groundTile:GroundTile = new GroundTile(this.scene, x, y);
    this.groundGroup.add(groundTile);
    return groundTile;
  }
//#endregion

  update() : void{
    if(this.isMoving){
      this.moveGroundTile();
      this.moveDirtTile();
      this.moveInteractables();
      this.checkIfOutOfBound();
    }
  }

  private moveGroundTile() : void{
    for(let i = 0; i < this.groundTiles.length; i++){
      this.groundTiles[i].x += this.speed * Time.deltaTime;
    }
  }

  private moveDirtTile() : void{
    for(let i = 0; i < this.dirtTilesArray.length; i++){
      let dirtTiles:DirtTile[] = this.dirtTilesArray[i];
      for(let i = 0; i < dirtTiles.length; i++){
        dirtTiles[i].x += this.speed * Time.deltaTime;
      }
    }
  }

  private moveInteractables() : void{
    for(let i = 0; i < this.interactables.length; i++){
      this.interactables[i].x += this.speed * Time.deltaTime;
    }
  }

  private checkIfOutOfBound() : void{

    if(this.groundTiles[0].x < 0 - GroundTile.WIDTH/2){
      this.handleNewGroundTile();
      for(let i:integer = 0; i < this.dirtTilesArray.length; i++){
        this.handleDirtTile(i);
      }
    }

    if(this.interactables.length > 0 && this.interactables[0].x < 0 - this.interactables[0].width/2){
      this.interactables.shift().destroy();
    }

  }

  private handleNewGroundTile() : void{
    let removedTile:GroundTile = this.groundTiles.shift();
    let lastTile:GroundTile = this.groundTiles[this.groundTiles.length-1];
    removedTile.x = lastTile.x + GroundTile.WIDTH;
    this.groundTiles.push(removedTile);
  }

  private handleDirtTile(index:integer) : void{
    let dirtTiles:DirtTile[] = this.dirtTilesArray[index];
    let removedTile = dirtTiles.shift();
    let lastTile:DirtTile = dirtTiles[dirtTiles.length-1];
    removedTile.x = lastTile.x + DirtTile.WIDTH;
    dirtTiles.push(removedTile);
  }

  //#endregion

  // Static group getter
  getGroundGroup() : Phaser.Physics.Arcade.Group{
    return this.groundGroup;
  }

  getInteractableGroup() : Phaser.Physics.Arcade.Group{
    return this.interactableGroup;
  }

}