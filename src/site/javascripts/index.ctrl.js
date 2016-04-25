'use strict';

export default class indexCtrl {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Stage();

    this.displacementSprite = PIXI.Sprite.fromImage('/images/displacementMap.jpg');
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

    const bg = PIXI.Sprite.fromImage('/images/background.jpg');
    this.stage.addChild(bg);
    this.stage.filters = [this.displacementFilter];
    this.stage.interactive = true;
    this.stage.on('mousemove', this.onMove.bind(this));
    this.tick = 30;
    this.loop();
  }

  onMove() {
    this.tick -= 2;
  }

  loop () {
    this.tick += 0.5;
    this.displacementFilter.scale.x = this.tick;
    this.displacementFilter.scale.y = this.tick;

    window.requestAnimationFrame(this.loop.bind(this));
    this.renderer.render(this.stage);
  }
}