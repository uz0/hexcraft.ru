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

    /*
    * Если вызывать как EZGUI.components.authSubmit.on('click', this.login), то
    * из this.login, при попытке вызова методов класса Auth через this, выдает ошибку, т.к.
    * в этом случае this-ом является кнопка входа. Поэтому вызываю так
    */
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
      this.createErrorMessage('Заполните все поля');
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
    .then((data) => {

      if (data.ok){
        hexcraft.setStage(Lobby); 
      } else {
        this.createErrorMessage('Ваша авторизация устарела. Войдите снова');
      }

    })
    .catch((error) => {
      console.log('Error: ' + error);
    });
  }

  createErrorMessage(text) {
    if (EZGUI.components.ErrorMessage) {
      EZGUI.components.ErrorMessage.text = text;
    } else {
      EZGUI.components.authBg.addChild(EZGUI.create({
        id: 'ErrorMessage',
        text: text,
        font: {
          size: '15px',
          color: '#000'
        },
        component: 'Label',
        position: {
          x: 100,
          y: 350
        },
        width: 200,
        height: 50
      }, 'kenney'));
    }
  }

  update() {}
}