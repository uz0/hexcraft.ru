'use strict';

import options from './panel.json';
import hexcraft from '../../application';
import http from '../http';
import GUI from '../gui';
import Splash from './splash/splash';

export default class Panel extends PIXI.Container {
  constructor(gameId) {
    super();
    this.GUI = new GUI(options);
    this.addChild(this.GUI);

    this.gameId = gameId;

    const username = window.localStorage.getItem('username');
    this.GUI.username.text = username;
  }

  splash(type, data) {
    let splash = new Splash(type, data);
    this.addChild(splash);

    return splash;
  }

  logout () {
    const token = window.localStorage.getItem('token');

    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    http.post('/api/auth/logout', {
      token: token
    });

    document.location.href = '/';
  }

  showExit() {
    this.GUI.logout.visible = true;
    this.GUI.logout.on('click', this.logout);
    this.GUI.logout.on('touchstart', this.logout);
  }

  showCapitulation() {
    this.GUI.surrender.visible = true;
    this.GUI.surrender.on('click', this.surrender.bind(this));
    this.GUI.surrender.on('touchstart', this.surrender.bind(this));
  }

  surrender() {
    const token = window.localStorage.getItem('token');
    http.post(`/api/games/${this.gameId}/surrender`, {
      token: token
    });

    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
  }

  log(text) {
    this.GUI.status.text = text;
  }

  update(){}
}
