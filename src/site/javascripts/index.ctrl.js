'use strict';

export default class indexCtrl {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Stage();

    this.displacementSprite = PIXI.Sprite.fromImage('/images/displacementMap.jpg');
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale = {
      x: 100,
      y: 100
    };

    this.bg = PIXI.TilingSprite.fromImage('/images/water.png', window.innerWidth, window.innerHeight);
    this.stage.addChild(this.bg);
    this.stage.filters = [this.displacementFilter];
    this.tick = 100;
    this.loop();
  }

  loop () {
    this.tick += 0.005;

    this.bg.tileScale.x = 2 + Math.cos(this.tick);
    this.bg.tileScale.y = 3 + Math.sin(this.tick);

    this.bg.tilePosition.x += Math.cos(this.tick);

    window.requestAnimationFrame(this.loop.bind(this));
    this.renderer.render(this.stage);
  }
}