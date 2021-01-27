export default class Time {

  static deltaTime : number;
  private static oldTime : number;

  static initTime(){
    this.oldTime = this.getTime();
  }

  static updateTime() : void{
    let curTime : number = this.getTime();
    let delta = curTime - this.oldTime;
    this.deltaTime = delta / 1000.0;
    this.oldTime = curTime;
  }

  static getTime() : number{
    return new Date().getTime();
  }

}