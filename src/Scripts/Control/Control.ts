import * as Phaser from "phaser";

export default class Control {

  private control : Phaser.Types.Input.Keyboard.CursorKeys;

  private lastUpState : boolean;
  private lastDownState : boolean;
  private lastRightState : boolean;
  private lastLeftState : boolean;

  constructor(control : Phaser.Types.Input.Keyboard.CursorKeys){
    this.control = control;
  }

  update() : void{
    this.lastUpState = this.control.up.isDown;
    this.lastDownState = this.control.down.isDown;
    this.lastRightState = this.control.right.isDown;
    this.lastLeftState = this.control.left.isDown;
  }

  isKeyDown(key:string) : boolean{
    if(key == "up"){
      return this.control.up.isDown && !this.lastUpState;
    }else if(key == "down"){
      return this.control.down.isDown && !this.lastDownState;
    }else if(key == "right"){
      return this.control.right.isDown && !this.lastRightState;
    }else if(key == "left"){
      return this.control.left.isDown && !this.lastLeftState;
    }
    return false;
  }

  isKeyUp(key:string) : boolean{
    if(key == "up"){
      return !this.control.up.isDown && this.lastUpState;
    }else if(key == "down"){
      return !this.control.down.isDown && this.lastDownState;
    }else if(key == "right"){
      return !this.control.right.isDown && this.lastRightState;
    }else if(key == "left"){
      return !this.control.left.isDown && this.lastLeftState;
    }
    return false;
  }

  isKey(key:string) : boolean{
    if(key == "up"){
      return this.control.up.isDown;
    }else if(key == "down"){
      return this.control.down.isDown;
    }else if(key == "right"){
      return this.control.right.isDown;
    }else if(key == "left"){
      return this.control.left.isDown;
    }
    return false;
  }

}