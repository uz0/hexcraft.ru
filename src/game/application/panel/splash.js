'use strict';

import GUI from '../gui.js';
import start from './start.json';
import step from './step.json';
import gameover from './gameover.json';

export default class Splash extends PIXI.Container{
    constructor(type, data){
      super();

      if (type === 'start') {
          this.GUI = new GUI(start);
          this.GUI.player1.text = data.player1;
          this.GUI.player2.text = data.player2;
          this.addChild(this.GUI);

          setTimeout(() => {
            this.parent.removeChild(this);
          }, data.timer);

      } else if (type === 'step') {
          this.GUI = new GUI(step);
          this.GUI.enemyName.text = data;
          this.addChild(this.GUI);
          
      } else if (type === 'gameover') {
          this.GUI = new GUI(gameover);
          this.addChild(this.GUI);
      }

    }

    close() {
      this.parent.removeChild(this);
    }

}
