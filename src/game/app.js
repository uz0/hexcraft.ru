'use strict';

class GAME {
  rabbit;
  stage;
  renderer;

  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    this.loader = PIXI.loader;
    this.loader.add('rabbit', '/game/rabbit.png');
    this.loader.once('complete', this.onLoaded)
    this.loader.load();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.rabbit.rotation += 0.01;
    this.renderer.render(this.stage);
  }

  onLoaded = (loader, resources) =>  {
    this.rabbit = new PIXI.Sprite(resources.rabbit.texture);

    this.rabbit.position.x = window.innerWidth/2;
    this.rabbit.position.y = window.innerHeight/2;

    this.rabbit.scale.x = 1;
    this.rabbit.scale.y = 1;

    this.stage.addChild(this.rabbit);

    this.animate();
  }
}

new GAME();