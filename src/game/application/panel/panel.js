'use strict';

import options from './panel.json';
import http from '../http';
import GUI from '../gui';
import Splash from './splash/splash';

export default class Panel extends PIXI.Container {
  constructor() {
    super();
    this.GUI = new GUI(options);
    this.addChild(this.GUI);

    const username = window.localStorage.getItem('username');
    this.GUI.username.text = username || '';
  }

  splash(type, data) {
    let splash = new Splash(type, data);
    this.addChild(splash);

    return splash;
  }

  logout () {
    const token = window.localStorage.getItem('token');

    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    http.post('/api/auth/logout', {
      token: token
    });

    document.location.href = '/';
  }

  showPlayersChips(chiplist) {
    let firstChip = 0;
    let secondChip = 0;

    chiplist.forEach(element => {
      if(element.player === 'player1'){
        firstChip++;
      } else {
        secondChip++;
      }
    });

    this.GUI.redChipAmount.text = firstChip;
    this.GUI.blueChipAmount.text = secondChip;
  }

  showExit() {
    this.GUI.logout.visible = true;
    this.GUI.logout.on('click', this.logout);
    this.GUI.logout.on('touchstart', this.logout);
  }

  showSurrender() {
    this.GUI.surrender.visible = true;
    this.GUI.surrender.on('click', this.surrender);
    this.GUI.surrender.on('touchstart', this.surrender);
  }

  log(text) {
    this.GUI.status.text = text;
  }

  update(){}
}
