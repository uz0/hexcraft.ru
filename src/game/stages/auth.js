'use strict';

import authGui from './auth.gui.js';
import hexcraft from '../app.js';
import Demo from './demo.js';
import Lobby from './lobby.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();

    this.guiElt = EZGUI.create(authGui, 'kenney');

    EZGUI.components.authSubmit.on('click', this.login);

    EZGUI.components.demo.on('click', () => {
      hexcraft.setStage(Demo);
    });

    EZGUI.components.lobby.on('click', () => {
      hexcraft.setStage(Lobby);
    });

    this.addChild(this.guiElt);
  }

  login() {
    var username = EZGUI.components.authUsername.text;
    var password = EZGUI.components.authPassword.text;

    if(!username || !password) {
      return false;
    }

    window.fetch('/auth/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(response => {
      window.localStorage.setItem('user', response.user.username);
      window.localStorage.setItem('token', response.token.token);
    });
  }

  update(){}
}
