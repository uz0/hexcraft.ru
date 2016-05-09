'use strict';

import Load from './application/load/load.js';

class Hexcraft {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.setStage(Load);
    this.loop();
  }

  setStage (Stage, argument) {
    this.stage = new Stage(argument);
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