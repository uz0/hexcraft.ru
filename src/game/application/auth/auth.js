'use strict';

import options from './auth.json';
import hexcraft from '../../application.js';
import utils from '../utils.js';
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

    window.fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(utils.handleErrors)
    .then(utils.parseJson)
    .then(response => {
      window.localStorage.setItem('username', response.user.username);
      window.localStorage.setItem('token', response.token.token);
      hexcraft.setStage(Lobby);
    }).catch(err => {
      console.error(err);
      this.showError('Неправильная пара логин/пароль');
    });
  }

  verify(token) {
    if(!token) {
      return;
    }

    window.fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then(utils.handleErrors)
    .then(() => hexcraft.setStage(Lobby))
    .catch(() => this.showError('Ваша авторизация устарела. Войдите снова'));
  }

  update() {}
}
