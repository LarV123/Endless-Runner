import * as Phaser from "phaser";
import Random from "../Util/Random";
import CreateFunc from "../Interfaces/CreateFunc";
export default class ObjectSpawner {

  private createFuncs : CreateFunc[];

  private minX : number;
  private maxX : number;

  constructor(objects : CreateFunc[], minX : number, maxX? : number){
    this.createFuncs = objects;
    this.minX = minX;
    if(maxX){
      this.maxX  = maxX;
    }else{
      this.maxX = minX;
    }
  }

  spawnObject() : void {
    let spawnIndex : number = Random.getRandomInteger(0, this.createFuncs.length);
    let x : number;
    if(this.minX != this.maxX){
      x = Random.getRandomInteger(this.minX, this.maxX);
    }else{
      x = this.minX;
    }
    this.createFuncs[spawnIndex](x);
  }

}