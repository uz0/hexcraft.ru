'use strict';

import GUI from '../../gui.js';
import startConf from './start.json';
import stepConf from './step.json';
import overConf from './over.json';

export default class Splash extends PIXI.Container{
    constructor(type, data){
      super();

      this[`${type}Init`](data);
      this.timer = 3000;
    }

    startInit(data) {
      this.GUI = new GUI(startConf);
      this.GUI.player1.text = data.player1;
      this.GUI.player2.text = data.player2;
      this.addChild(this.GUI);
      setTimeout(this.close.bind(this), this.timer);
    }

    stepInit(data) {
      this.GUI = new GUI(stepConf);
      this.GUI.enemyName.text = data;
      this.addChild(this.GUI);
    }

    overInit(data) {
      this.GUI = new GUI(overConf);
      this.addChild(this.GUI);
      setTimeout(data, this.timer);
    }

    close() {
      this.parent.removeChild(this);
    }
}
