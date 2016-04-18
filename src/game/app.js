'use strict';

import Loader from './loader.js';
import Auth from './stages/auth.js';
// import LOBBY from './stages/lobby.js';
// import GAME from './stages/game.js';
// import Demo from './stages/demo.js';

class Hexcraft {
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

  loaded (loader, resources) {
    this.resources = resources;

    this.setStage(Auth);
  }

  setStage (Stage) {
    this.stage = new Stage();
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

// initialize
var hexcraft = new Hexcraft();
export default hexcraft;