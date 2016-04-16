'use strict';

import authGui from './auth.gui.js';

export default class Auth extends PIXI.Stage {
  constructor(resourses) {
    super();

    this.guiElt = EZGUI.create(authGui, 'kenney');
    this.addChild(this.guiElt);

  }

  update(){}
}