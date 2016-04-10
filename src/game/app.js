'use strict';

import LOADER from './loader.js';
// import AUTH from './stages/auth.js';
// import LOBBY from './stages/lobby.js';
// import GAME from './stages/game.js';
import DEMO from './stages/demo.js';

class HC {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);

    var loader = new LOADER();
    loader.once('complete', this.loaded.bind(this));
    loader.load();
    window.addEventListener('resize', this.rescale.bind(this), false);
    this.loop();
  }

  rescale () {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  loaded (loader, resources) {
    var demo = new DEMO(resources);
    this.stage = demo;
  }

  loop () {
    window.requestAnimationFrame(this.loop.bind(this));

    if(!this.stage || !this.stage.update) {
      return;
    }

    this.stage.update();
    this.renderer.render(this.stage);
  }
}

export default new HC();