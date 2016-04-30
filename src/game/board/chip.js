'use strict';

export default class Chip extends PIXI.Sprite {
  constructor(x, y){
    super();

    const textures = [
      '/game/board/chip1.svg',
      '/game/board/chip2.svg',
      '/game/board/chip3.svg'
    ]

    const random = Math.floor(Math.random() * 2) + 0;

    this.texture = PIXI.Texture.fromImage(textures[random]);
    this.alpha = 1;
    this.position = {
      x: x,
      y: y
    };

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

    this.oldPosition = null;

    this.position.x = Math.round(this.position.x / 40) * 40;
    this.position.y = Math.round(this.position.y / 40) * 40;

    if ((this.position.y/40) % 2 !== 0){
      this.position.x = Math.round(this.position.x / 40 - 1) * 40 + 20;
    }

    if(this.onStep) {
      this.onStep(this.position, this.oldPosition);
    }
  }

  onDragMove() {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x + 20;
      this.position.y = newPosition.y + 20;
    }

    if(this.data && this.onMove) {
      this.onMove(this.position, this.oldPosition)
    }

  }

}
