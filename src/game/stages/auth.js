'use strict';

import authGui from './auth.gui.js';
import hexcraft from '../app.js';
import Demo from './demo.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();

    this.guiElt = EZGUI.create(authGui, 'kenney');

    EZGUI.components.demo.on('click', () => {
      hexcraft.setStage(Demo);
    });

    this.addChild(this.guiElt);
  }

  update(){}
}