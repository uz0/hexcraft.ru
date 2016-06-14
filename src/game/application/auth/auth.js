'use strict';

import options from './auth.json';
import hexcraft from '../../application';
import http from '../http';
import GUI from '../gui';
import Lobby from '../lobby/lobby';

export default class Auth extends PIXI.Container {
  constructor() {
    super();
    this.GUI = new GUI(options);
    this.addChild(this.GUI);

    this.GUI.submit.on('click', this.online.bind(this));
    this.GUI.submit.on('touchstart', this.online.bind(this));

    this.GUI.vsPlayer.on('click', this.offlineVsPlayer.bind(this));
    this.GUI.vsPlayer.on('touchstart', this.offlineVsPlayer.bind(this));

    this.GUI.vsAI.on('click', this.offlineVsAi.bind(this));
    this.GUI.vsAI.on('touchstart', this.offlineVsAi.bind(this));

    let username = window.localStorage.getItem('username');
    if(username) {
      this.GUI.username.value = username;
    }
  }

  online() {
    let username = this.GUI.username.value;

    if (!username) {
      return;
    }

    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();

    http.post('/api/auth/guest', {
      username: username
    }).then(response => {
      window.localStorage.setItem('userId', response.User.id);
      window.localStorage.setItem('username', response.User.username);
      window.localStorage.setItem('token', response.token);
      hexcraft.setStage(Lobby);
    });
  }

  offlineVsPlayer() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
    console.log('vsPlayer');
  }

  offlineVsAi() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
    console.log('offlineVsAi');
  }

  update() {}
}
