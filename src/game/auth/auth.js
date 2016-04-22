'use strict';

import authGui from './auth.gui.js';
import hexcraft from '../app.js';
import Demo from '../demo.js';
import Lobby from '../lobby/lobby.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();

    var token = window.localStorage.getItem('token');

    if(token){
      this.verify(token);
    }

    this.guiElt = EZGUI.create(authGui, 'kenney');

    var pixilate = new PIXI.filters.PixelateFilter();

    EZGUI.components.authPassword.filters = [pixilate];

    EZGUI.components.authPassword._filters[0].size = {
      x: 3,
      y: 3
    };

    EZGUI.components.authSubmit.on('click', this.login.bind(this));

    EZGUI.components.authSubmit.on('click', () => {
      this.login();
    });

    EZGUI.components.demo.on('click', () => {
      hexcraft.setStage(Demo);
    });

    this.addChild(this.guiElt);
  }

  login() {
    var username = EZGUI.components.authUsername.text;
    var password = EZGUI.components.authPassword.text;

    if (!username || !password) {
      EZGUI.components.ErrorMessage.text = 'Заполните все поля';
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
      hexcraft.setStage(Lobby);
    });
  }

  verify(token) {
    window.fetch('/auth/verify', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: JSON.stringify({
        token: token
      })
    })
    .then(response => { 

      if (response.status === 200){
        hexcraft.setStage(Lobby); 
      } else {
        EZGUI.components.ErrorMessage.text = 'Ваша авторизация устарела. Войдите снова';
      }

    }, error => {
      console.log('Error: ' + error);
    });
  }

  update() {}
}