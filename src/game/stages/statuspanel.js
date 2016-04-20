'use strict';

import statusPanel from './statuspanel.gui.js';

export default class StatusBar extends PIXI.Stage {
  constructor() {
    super();

    var username = window.localStorage.getItem('user');

    this.guiElt = EZGUI.create(statusPanel, 'kenney');
    EZGUI.components.userName.text = username;

    this.addChild(this.guiElt);

  }

  showExit() {
    EZGUI.components.logoutButton.visible = true;
  }

  showCapitulation() {
    EZGUI.components.surrenderButton.visible = true;
  }

  log(text){
    EZGUI.components.userStatus.text = text;
  }

  update(){}
}
