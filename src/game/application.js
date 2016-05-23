'use strict';

import Load from './application/load/load.js';
import WaterField from '../_shared/water.js';

class Hexcraft {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer();
    this.renderer.backgroundColor = 0x0B91A9;
    document.body.appendChild(this.renderer.view);

    this.container = new PIXI.Container();

    let water = new WaterField('/game/resources/hex.svg');
    this.container.addChild(water);

    this.setStage(Load);
    this.loop();

    window.addEventListener('resize', this.updateScale.bind(this));
    window.addEventListener('orientationchange', this.updateScale.bind(this));
  }

  setStage (Stage, argument) {
    if(this.stage) {
      this.container.removeChildren(1);
    }

    this.stage = new Stage(argument);
    this.container.addChildAt(this.stage, 1);
    this.updateScale();
  }

  updateScale(){
    const GAME_WIDTH = 800;
    const GAME_HEIGHT = 640;
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
    this.renderer.render(this.container);
  }
}

// initialize
var hexcraft = new Hexcraft();
export default hexcraft;