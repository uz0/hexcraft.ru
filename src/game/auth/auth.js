'use strict';

import authGui from './auth.gui.js';
import hexcraft from '../app.js';
import utils from '../utils.js';
import Demo from '../demo.js';
import Lobby from '../lobby/lobby.js';

export default class Auth extends PIXI.Stage {
  constructor() {
    super();
    this.GUI = [];

    let token = window.localStorage.getItem('token');
    this.verify(token);

    let hex = PIXI.Sprite.fromImage('/game/auth/hex.svg');
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

    this.GUI.ErrorMessage.position.dy = -50;
    this.GUI.authPassword.filters = [pixilate];
    this.GUI.authSubmit.on('click', this.login.bind(this));
    this.GUI.demoBtn.on('click', () => hexcraft.setStage(Demo));
  }

  showError(message) {
    this.GUI.ErrorMessage.position.dy = 50;
    this.GUI.ErrorMessage.text = message;
    window.setTimeout(()=>{
      this.GUI.ErrorMessage.position.dy = -50;
    }, 10000);
  }

  login() {
    var username = this.GUI.authUsername.text;
    var password = this.GUI.authPassword.text;

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
    .then(utils.parseJson)
    .then(response => {
      window.localStorage.setItem('user', response.user.username);
      window.localStorage.setItem('token', response.token.token);
      hexcraft.setStage(Lobby);
    })
    .catch(response => {
      this.showError('Неправильная пара логин\пароль')
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

    // Flash animation!!!111oneone
    const speed = 1;
    let position = this.GUI.ErrorMessage.position;

    if(position.y !== position.dy) {
      let sign = Math.sign(position.dy - position.y);
      position.y += sign*speed;
    }
  }
}