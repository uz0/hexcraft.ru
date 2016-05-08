'use strict';

export default class Chip extends PIXI.Sprite {
  constructor(x, y, field){
    super();

    this.Field = field;

    const textures = [
      '/game/board/chip1.svg',
      '/game/board/chip2.svg',
      '/game/board/chip3.svg'
    ];

    const random = Math.floor(Math.random() * 3) + 0;

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

    let current = this.position;
    let x = Math.round(current.x / 40);
    let y = Math.round((current.y - 80) / 40);

    if (y % 2 !== 0){
      x = Math.round((current.x - 20) / 40);
    }

    this.position.x = this.Field[x][y].x;
    this.position.y = this.Field[x][y].y;

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
