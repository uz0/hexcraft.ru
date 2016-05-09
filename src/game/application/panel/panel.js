'use strict';

import options from './panel.json';
import GUI from '../gui.js';

export default class Panel extends PIXI.Container {
  constructor() {
    super();
    this.GUI = new GUI(options);
    this.addChild(this.GUI);

    const username = window.localStorage.getItem('username');
    this.GUI.username.text = username;
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
    this.GUI.logout.visible = true;
    this.GUI.logout.on('click', this.logout);
  }

  showCapitulation() {
    this.GUI.surrender.visible = true;
  }

  log(text){
    this.GUI.status.text = text;
  }

  update(){}
}
