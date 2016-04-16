'use strict';

import Loader from './loader.js';
import Auth from './stages/auth.js';
// import LOBBY from './stages/lobby.js';
// import GAME from './stages/game.js';
import Demo from './stages/demo.js';

class HC {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    var loader = new Loader();
    loader.once('complete', this.loaded.bind(this));

    EZGUI.Theme.load(['/vendor/ezgui/assets/kenney-theme/kenney-theme.json'], () => {
      loader.load();
    });

    this.loop();
  }

  rescale () {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  loaded (loader, resources) {
    var auth = new Auth(resources);
    this.stage = auth;
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