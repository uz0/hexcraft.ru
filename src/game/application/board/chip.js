'use strict';

import hexcraft from '../../application.js';
import Hex from './hex.js';

export default class Chip extends PIXI.Sprite {
  constructor(i, j, player){
    super();

    this.colors = {
      player1: '0xb71c1c',
      player2: '0x0D47A1'
    };

    const textures = [
      hexcraft.resources.chip1.blobUrl,
      hexcraft.resources.chip2.blobUrl,
      hexcraft.resources.chip3.blobUrl
    ];

    const random = Math.floor(Math.random() * 3) + 0;
    this.texture = PIXI.Texture.fromImage(textures[random]);

    this.i = i;
    this.j = j;
    this.position = Hex.indexToCoordinates(i, j);
    this.updateOldPosition();
    this.changeOwner(player);

    this.on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
  }

  chipSound() {
    const sounds = [
      hexcraft.resources.laugh.blobUrl,
      hexcraft.resources.fight.blobUrl,
      hexcraft.resources.fight1.blobUrl,
      hexcraft.resources.victory.blobUrl,
      hexcraft.resources.good.blobUrl,
    ];

    const random = Math.floor(Math.random() * 6) + 0;

    new window.Audio(sounds[random]).play();
  }

  changeOwner(player) {
    this.tint = this.colors[player];
    this.player = player;
  }

  changeMode(mode) {
    this.interactive = mode;
    this.buttonMode = mode;
  }

  updateOldPosition() {
    this.oldPosition = {
      x: this.position.x,
      y: this.position.y
    };
  }

  onDragStart(event) {
    this.chipSound();

    this.data = event.data;
    this.updateOldPosition();
  }

  onDragMove() {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x - 40;
      this.position.y = newPosition.y - 40;
    }

    if(this.data && this.onMove) {
      this.onMove(this.position, this.oldPosition);
    }
  }

  onDragEnd() {

    new window.Audio(hexcraft.resources.endStep.blobUrl).play();

    this.data = null;

    if(this.beforeStep && this.beforeStep(this.position, this.oldPosition)) {
      this.position.x = this.oldPosition.x;
      this.position.y = this.oldPosition.y;

      return;
    }

    let index = Hex.coordinatesToIndex(this.position.x, this.position.y);
    this.i = index.i;
    this.j = index.j;
    this.position = Hex.indexToCoordinates(index.i, index.j);

    if(this.onStep) {
      this.onStep(this.position, this.oldPosition);
    }

    this.updateOldPosition();
  }
}