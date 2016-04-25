'use strict';

import panelGui from './panel.gui.js';

export default class Panel extends PIXI.Stage {
  constructor() {
    super();

    var username = window.localStorage.getItem('user');

    this.guiElt = EZGUI.create(panelGui, 'kenney');
    EZGUI.components.userName.text = username;

    //workaround: cant setup visible from config file
    EZGUI.components.surrenderButton.visible = false;
    EZGUI.components.logoutButton.visible = false;

    this.addChild(this.guiElt);
  }

  logout () {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.fetch('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({
        token: ''
      })
    });
    document.location.href = '/';
  }


  showExit() {
    EZGUI.components.logoutButton.visible = true;
    EZGUI.components.logoutButton.on('click', this.logout);
  }

  showCapitulation() {
    EZGUI.components.surrenderButton.visible = true;
  }

  log(text){
    EZGUI.components.userStatus.text = text;
  }

  update(){}
}
