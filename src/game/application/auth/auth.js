'use strict';

import options from './auth.json';
import hexcraft from '../../application.js';
import http from '../http.js';
import GUI from '../gui.js';
import Lobby from '../lobby/lobby.js';

export default class Auth extends PIXI.Container {
  constructor() {
    super();
    this.GUI = new GUI(options);
    this.addChild(this.GUI);

    let token = window.localStorage.getItem('token');
    this.verify(token);

    this.GUI.submit.on('click', this.login.bind(this));
    this.GUI.submit.on('touchstart', this.login.bind(this));
  }

  showError(message) {
    this.GUI.error.text = message;
  }

  login() {
    let username = this.GUI.username.value;
    let password = this.GUI.password.value;

    if (!username || !password) {
      this.showError('Пожалуйста заполните все поля.');
      return;
    }

    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();

    http.post('/api/auth/login', {
      username: username,
      password: password
    }).then(response => {
      window.localStorage.setItem('username', response.User.username);
      window.localStorage.setItem('token', response.token);
      hexcraft.setStage(Lobby);
    }).catch(() => {
      this.showError('Неправильная пара логин/пароль');
    });
  }

  verify(token) {
    if(!token) {
      return;
    }

    http.post('/api/auth/verify', {
        token: token
    }).then(() => {
      hexcraft.setStage(Lobby);
    }).catch(() => {
      this.showError('Ваша авторизация устарела. Войдите снова');
    });
  }

  update() {}
}
