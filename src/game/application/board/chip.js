'use strict';

import Hex from './hex.js';

export default class Chip extends PIXI.Sprite {
  constructor(i, j, player){
    super();

    const colors = {
      player1: '0xb71c1c',
      player2: '0x0D47A1'
    };

    const textures = [
      '/game/resources/chip1.svg',
      '/game/resources/chip2.svg',
      '/game/resources/chip3.svg'
    ];

    const random = Math.floor(Math.random() * 3) + 0;
    this.texture = PIXI.Texture.fromImage(textures[random]);
    this.tint = colors[player];

    this.player = player;
    this.i = i;
    this.j = j;
    this.position = Hex.indexToCoordinates(i, j);

    this.interactive = true;
    this.buttonMode = true;

    this.on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
  }

  onDragStart(event) {
    this.data = event.data;
    this.oldPosition = {
      x: this.position.x,
      y: this.position.y
    };
  }

  onDragEnd() {
    this.data = null;

    if(this.preventStep && this.preventStep(this.position, this.oldPosition)) {
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

    this.oldPosition = null;
  }

  onDragMove() {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x - 20;
      this.position.y = newPosition.y - 20;
    }

    if(this.data && this.onMove) {
      this.onMove(this.position, this.oldPosition);
    }

  }

}
