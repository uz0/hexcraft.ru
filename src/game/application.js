'use strict';

import Load from './application/load/load.js';

class Hexcraft {
  constructor() {
    this.tick = 100;

    this.renderer = new PIXI.WebGLRenderer();
    this.renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(this.renderer.view);

    this.water = this.setupWater();
    this.container = new PIXI.Container();
    this.container.addChild(this.water);

    this.setStage(Load);
    this.loop();

    window.addEventListener('resize', this.updateScale.bind(this));
    window.addEventListener('orientationchange', this.updateScale.bind(this));
  }

  setupWater(){
    let water = new PIXI.Container();
    // water.scale  = {
    //   x: 2,
    //   y: 2
    // };

    let displacementSprite = PIXI.Sprite.fromImage('/images/displacementMap.jpg');
    let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementFilter.scale = {
      x: 100,
      y: 100
    };

    water.bg = PIXI.extras.TilingSprite.fromImage('/images/water.png', window.innerWidth, window.innerHeight);
    water.addChild(water.bg);
    water.filters = [displacementFilter];

    return water;
  }

  updateWater(){
    this.tick += 0.005;

    this.water.bg.tileScale.x = 2 + Math.cos(this.tick);
    this.water.bg.tileScale.y = 4 + Math.sin(this.tick);

    this.water.bg.tilePosition.x += Math.cos(this.tick);
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
    const GAME_HEIGHT = 600;
    const aspectRatio = GAME_WIDTH / GAME_HEIGHT;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    let ratio = Math.min(newWidth / GAME_WIDTH,
                         newHeight / GAME_HEIGHT);

    this.stage.scale.x = this.stage.scale.y = ratio;
    this.renderer.resize(newWidth, newHeight);
    this.water.bg.width = newWidth;
    this.water.bg.height = newHeight;

    let newAspectRatio = newWidth / newHeight;

    this.stage.y = 0;
    this.stage.x = 0;

    // console.group('stage - ', this.stage);
    // console.log('ratio:', ratio, ' : ', newAspectRatio);
    // console.log('width:', newWidth, ' : ', this.stage.width);
    // console.log('height:', newHeight, ' : ', this.stage.height);
    // console.groupEnd();

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

    this.updateWater();

    this.stage.update();
    this.renderer.render(this.container);
  }
}

// initialize
var hexcraft = new Hexcraft();
export default hexcraft;