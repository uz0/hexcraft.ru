'use strict';

import Load from './load/load.js';

class Hexcraft {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.setStage(Load);
    this.loop();
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