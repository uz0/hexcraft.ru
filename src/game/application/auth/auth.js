'use strict';

import authGui from './auth.json';
import hexcraft from '../../application.js';
import utils from '../utils.js';
import Lobby from '../lobby/lobby.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();
    this.GUI = [];


    let token = window.localStorage.getItem('token');
    this.verify(token);

    let hex = PIXI.Sprite.fromImage('/game/resources/hex.svg');
    hex.position = {
      x: 225,
      y: 100
    };
    this.addChild(hex);

    authGui.forEach(element => {
      this.GUI[element.id] = EZGUI.create(element, 'kenney');
      this.addChild(this.GUI[element.id]);
    });

    let pixilate = new PIXI.filters.PixelateFilter();
    pixilate.size = {
      x: 4,
      y: 5
    };

    this.GUI.ErrorMessageBg.position.dy = -50;
    this.GUI.authPassword.filters = [pixilate];
    this.GUI.authSubmit.on('click', this.login.bind(this));
  }

  showError(message) {
    this.GUI.ErrorMessageBg.position.dy = 20;
    this.GUI.ErrorMessageBg.children[2].children[0].text = message;

    window.setTimeout(()=>{
      this.GUI.ErrorMessageBg.position.dy = -50;
    }, 10000);
  }

  login() {
    let username = this.GUI.authUsername.text;
    let password = this.GUI.authPassword.text;

    if (!username || !password) {
      this.showError('Заполните все поля');
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

  update() {
    // Flash animation
    const speed = 1;
    let position = this.GUI.ErrorMessageBg.position;

    if(position.y !== position.dy) {
      let sign = Math.sign(position.dy - position.y);
      position.y += sign*speed;
      this.GUI.ErrorMessageBg.position.y += sign*speed;
    }
  }
}
