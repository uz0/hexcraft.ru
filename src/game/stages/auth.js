'use strict';

import authGui from './auth.gui.js';
import hexcraft from '../app.js';
import Demo from './demo.js';
import Lobby from './lobby.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();

    this.guiElt = EZGUI.create(authGui, 'kenney');

    EZGUI.components.authSubmit.on('click', () => {
      var login = EZGUI.components.authLogin.text;
      var password = EZGUI.components.authPass.text;

      if(!login || !password) {
        return false;
      }

      var user = window.fetch('/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: login,
          password: password
        })
      })
      .then(response => response.json())
      .then(user => {
        localStorage.setItem('token', user.token.token);
      })
    });

    EZGUI.components.demo.on('click', () => {
      hexcraft.setStage(Demo);
    });

    EZGUI.components.lobby.on('click', () => {
      hexcraft.setStage(Lobby);
    });

    this.addChild(this.guiElt);
  }

  update(){}
}
