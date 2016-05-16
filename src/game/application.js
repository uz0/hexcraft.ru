'use strict';

import Load from './application/load/load.js';

class Hexcraft {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer();
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.setStage(Load);
    this.loop();

    window.addEventListener('resize', this.updateScale.bind(this));
    window.addEventListener('orientationchange', this.updateScale.bind(this));
  }

  setStage (Stage, argument) {
    this.stage = new Stage(argument);
    this.stage.originalWidth = this.stage.width;
    this.stage.originalHeight = this.stage.height;
    this.updateScale();
  }

  updateScale(){
    const GAME_WIDTH = 800;
    const GAME_HEIGHT = 600;
    const aspectRatio = GAME_WIDTH / GAME_HEIGHT;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    let ratio = Math.min(newWidth / GAME_WIDTH,
                         newHeight / GAME_HEIGHT);

    this.stage.scale.x = this.stage.scale.y = ratio;
    this.renderer.resize(newWidth, newHeight);


    let newAspectRatio = newWidth / newHeight;

    this.stage.y = 0;
    this.stage.x = 0;

    console.group('stage - ', this.stage);
    console.log('ratio:', ratio, ' : ', newAspectRatio);
    console.log('width:', newWidth, ' : ', this.stage.width);
    console.log('height:', newHeight, ' : ', this.stage.height);
    console.groupEnd();

    if (newAspectRatio > aspectRatio) {
      this.stage.x = (newWidth - this.stage.width) / 2;
    } else {
      this.stage.y = (newHeight - this.stage.height) / 2;
    }
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