import CallbackFunc from "../Interfaces/CallbackFunc";
export default class Score {
  
  private events : CallbackFunc[];

  private score : number;

  constructor(){
    this.events = [];
    this.score = 0;
  }

  reset():void{
    this.score = 0;
    this.invokeEvent();
  }

  addScore(score : number) : void{
    this.score += score;
    this.invokeEvent();
  }

  getScore() : number{
    return this.score;
  }

  private invokeEvent() : void{
    for(let i = 0; i < this.events.length; i++){
      this.events[i]();
    }
  }

  addEventOnScoreUpdated(func : CallbackFunc) : void{
    this.events.push(func);
  }

}