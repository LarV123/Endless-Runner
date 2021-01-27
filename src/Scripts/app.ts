import "phaser";
import {config,PhaserConfig } from "./Config/PhaserConfig";
export class EndlessRunnerGame extends Phaser.Game {
  constructor(config: PhaserConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new EndlessRunnerGame(config);
};