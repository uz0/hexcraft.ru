'use strict';

import hexcraft from '../../application.js';
import GUI from '../gui.js';
import options from './splash.json';

export default class Splash extends PIXI.Container{
    constructor(){
      super();
      this.GUI = new GUI(options);
      this.addChild(this.GUI);
    }

    startSplash(player1, player2) {
      this.GUI.player1.text = player1;
      this.GUI.player2.text = player2;
      new window.Audio(hexcraft.resources.fightBegin.blobUrl).play();
    }

}
