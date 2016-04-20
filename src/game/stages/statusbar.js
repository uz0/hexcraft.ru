'use strict';

import statusPanel from './statusbar.gui.js';

export default class StatusBar extends PIXI.Stage {
  constructor() {
    super();

    var username = window.localStorage.getItem('user');

    this.guiElt = EZGUI.create(statusPanel, 'kenney');
    EZGUI.components.userName.text = username;

    this.addChild(this.guiElt);

  }

  showExit() {
    EZGUI.components.surrenderButton.visible = false;
    EZGUI.components.logoutButton.visible = true;
  }

  showCapitulation() {
    EZGUI.components.surrenderButton.visible = true;
    EZGUI.components.logoutButton.visible = false;
  }

  statusLog(){
    EZGUI.components.userStatus.text = 'Нам нужно больше минералов';
  }

  update(){}
}
