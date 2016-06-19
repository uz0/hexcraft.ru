'use strict';

import GUI from '../gui';
// import startConf from './start.json';
// import stepConf from './step.json';
// import overConf from './over.json';
import options from './splash.json';

export default class Splash extends PIXI.Container {
  constructor(text, callback) {
    super();

    this.callback = callback;
    this.close = this.close.bind(this);

    this.GUI = new GUI(options);
    this.GUI.splash.text = text;
    this.addChild(this.GUI);

    this.timer = setTimeout(this.close, 3000);
    setTimeout(() => {
      window.addEventListener('touchend', this.close);
      window.addEventListener('click', this.close);
    }, 100)
  }

  close() {
    if(this.timer) {
      clearTimeout(this.timer);
    }

    window.removeEventListener('touchend', this.close);
    window.removeEventListener('click', this.close);

    this.parent.removeChild(this);

    if(this.callback) {
      this.callback();
    }
  }
}
