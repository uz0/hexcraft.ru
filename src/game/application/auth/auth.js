'use strict';

import options from './auth.json';
import hexcraft from '../../application';
import http from '../http';
import GUI from '../gui';
import Lobby from '../lobby/lobby';
import Board from '../game/board';
import OfflineVsPlayer from '../game/modes/offlineVsPlayer';
import OfflineVsBot from '../game/modes/offlineVsBot';

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
    if (username) {
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

    this.clearInput();
  }

  offlineVsPlayer() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();

    hexcraft.setStage(Board, {
      builder: OfflineVsPlayer,
      data: {}
    });

    this.clearInput();
  }

  offlineVsAi() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();

    hexcraft.setStage(Board, {
      builder: OfflineVsBot,
      data: {}
    });

    this.clearInput();
  }

  clearInput() {
    // WORKAROUND: remove input, to prevent show keyboard on mobile
    let input = document.getElementsByTagName('input')[0];

    if(input) {
      input.remove();
    }
  }

  update() {}
}
