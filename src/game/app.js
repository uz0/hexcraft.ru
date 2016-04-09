'use strict';

import LOADER from './stages/loader.js';
// import AUTH from './stages/auth.js';
// import LOBBY from './stages/lobby.js';
// import GAME from './stages/game.js';

class HC {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);
  }

  bootstrap() {
    this.stage = new PIXI.Container();

    var loader = new LOADER();
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

var hexcraft = new HC();
hexcraft.bootstrap();