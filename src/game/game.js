'use strict';

export default class GAME {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    var loader = PIXI.loader;
    loader.add('rabbit', '/game/rabbit.png');
    loader.once('complete', this.onLoaded.bind(this));
    loader.load();
  }

  onLoaded (loader, resources) {
    this.rabbit = new PIXI.Sprite(resources.rabbit.texture);

    this.rabbit.position.x = window.innerWidth/2;
    this.rabbit.position.y = window.innerHeight/2;

    this.rabbit.scale.x = 1;
    this.rabbit.scale.y = 1;

    this.stage.addChild(this.rabbit);

    this.animate();
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this));
    this.rabbit.rotation += 0.01;
    this.renderer.render(this.stage);
  }
}