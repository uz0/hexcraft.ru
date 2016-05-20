'use strict';

export default class Rectangle extends PIXI.Graphics {
  constructor(options) {
    super();

    this.beginFill(options.color, options.alpha);
    this.drawRect(options.x, options.y, options.width, options.height);
    this.endFill();
  }
}