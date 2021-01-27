import * as Phaser from "phaser";
import Time from "../Util/Time";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
    this.load.setPath("src/Assets");
    this.load.image("ground_tile", 'Tile/platformPack_tile001.png');
    this.load.image("dirt_tile", 'Tile/platformPack_tile004.png');
    this.load.image("air_obstacle", 'Tile/platformPack_tile024.png');
    this.load.image("ground_obstacle", 'Tile/platformPack_tile038.png');
    this.load.image("coin", 'Item/platformPack_item004.png');
    this.load.spritesheet("player", "Character/platformerPack_character.png", {frameWidth :96, frameHeight:96});

    this.load.audio("jump_sfx", "Audio/422426__behansean__jumps-start.wav");
    this.load.audio("fall_sfx", "Audio/469155__hawkeye-sprout__grass-step.wav");
    this.load.audio("hurt_sfx", "Audio/515624__mrickey13__playerhurt2.wav");

    this.load.image("background", "Background/02_trees and bushes.png");
    this.load.image("background2", "Background/03_distant_trees.png");
    this.load.image("hill", "Background/05_hill1.png");
    this.load.image("hill2", "Background/06_hill2.png");
    this.load.image("clouds", "Background/07_huge_clouds.png");
    this.load.image("clouds2", "Background/08_clouds.png");
    this.load.image("clouds3", "Background/09_distant_clouds1.png");
  }

  create(): void {

    this.anims.create({
      key: 'player_run',
      frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key: 'player_duck',
      frames: this.anims.generateFrameNumbers('player', {start: 6, end: 6}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key: 'player_die',
      frames: this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
      frameRate:10,
      repeat:-1
    });
    Time.initTime();
    this.scene.start("GameScene");
  }
}
