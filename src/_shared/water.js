'use strict';

class WaterHex extends PIXI.Sprite {
  constructor(texture) {
    super();

    this.filter = new PIXI.filters.BloomFilter();
    this.filter.padding = 100;
    this.filters = [this.filter];

    this.seed = Math.random();
    this.filter.blur = (1 - this.seed) * 100;
    this.alpha = this.seed;
    this.scale.set(1 - this.seed);

    this.texture = PIXI.Texture.fromImage(texture);
    this.reset(true);
  }

  reset(isInital) {
    let x = (Math.random()-0.5) * 2 * window.innerWidth;
    let y = (isInital)? (Math.random()-0.5) * 2 * window.innerHeight : -400;
    this.position.set(x, y);
  }

  renderWebGL(renderer) {
    if(this.y > window.innerHeight) {
      return this.reset();
    }

    super.renderWebGL(renderer);
    this.y += this.seed;
  }
}

export default class WaterField extends PIXI.Container {
  constructor(texture) {
    super();

    this.alpha = 0.3;

    for(let i = 0;i<100;i++) {
      let hex = new WaterHex(texture);
      this.addChild(hex);
    }
  }
}