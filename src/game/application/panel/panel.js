'use strict';

import panelGui from './panel.json';

export default class Panel extends PIXI.Stage {
  constructor() {
    super();
    this.GUI = [];

    panelGui.forEach(element => {
      this.GUI[element.id] = EZGUI.create(element, 'kenney');
      this.addChild(this.GUI[element.id]);
    });

    const username = window.localStorage.getItem('username');
    this.GUI.userName.text = username;

    //workaround: cant setup visible from config file
    this.GUI.surrenderButton.visible = false;
    this.GUI.logoutButton.visible = false;
    this.GUI.logoutButton.interactive = true;
    this.GUI.logoutButton.buttonMode = true;
  }

  logout () {
    const token = window.localStorage.getItem('token');

    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.fetch('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      })
    });

    document.location.href = '/';
  }


  showExit() {
    this.GUI.logoutButton.visible = true;
    this.GUI.logoutButton.on('click', this.logout);
  }

  showCapitulation() {
    this.GUI.surrenderButton.visible = true;
  }

  log(text){
    this.GUI.userStatus.text = text;
  }

  update(){}
}
