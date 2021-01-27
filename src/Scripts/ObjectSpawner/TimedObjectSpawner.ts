import * as Phaser from "phaser";
import ObjectSpawner from "./ObjectSpawner";
import CreateFunc from "../Interfaces/CreateFunc";

export default class TimedObjectSpawner extends ObjectSpawner{

  private interval : number;

  private timedEvent : Phaser.Time.TimerEvent;

  constructor(scene : Phaser.Scene, objects : CreateFunc[], minX : number, interval : number, maxX? : number){
    super(objects, minX, maxX);
    this.timedEvent = scene.time.addEvent({
      delay : interval,
      loop : true,
      callback : this.spawnObject,
      callbackScope : this,
      startAt : interval - 1
    });
    this.timedEvent.paused = true;
  }

  start() : void {
    this.timedEvent.paused = false;
    // this.spawnObject();
  }

  stop() : void {
    this.timedEvent.paused = true;
  }

  dispose() : void {
    this.timedEvent.destroy();
  }

}