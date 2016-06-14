'use strict';

import WaterField from '../../_shared/water';

export default class WaterDirective {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0x0B91A9;
    this.renderer.view.classList.add('water-canvas');
    document.body.appendChild(this.renderer.view);

    this.waterField = new WaterField('/images/hex.svg');

    this.loop();
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize(){
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  loop () {
    window.requestAnimationFrame(this.loop.bind(this));
    this.renderer.render(this.waterField);
  }
}