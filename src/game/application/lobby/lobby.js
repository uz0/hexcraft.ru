'use strict';

import hexcraft from '../../application';
import http from '../http';
import GUI from '../gui';
import Panel from '../panel/panel';
import options from './lobby.json';
import Board from '../game/board';
import Online from '../game/modes/online';

export default class Lobby extends PIXI.Container {
  constructor(message) {
    super();
    this.GUI = new GUI(options);
    this.GUI.play.on('click', this.startGame.bind(this));
    this.GUI.play.on('touchstart', this.startGame.bind(this));
    this.addChild(this.GUI);

    this.panel = new Panel();
    this.panel.log(message || 'Нажмите "В БОЙ"');
    this.panel.showExit();
    this.addChild(this.panel);
    this.getUsers();
    this.getGames();

    // WORKAROUND: remove input, to prevent show keyboard on mobile
    let input = document.getElementsByTagName('input')[0];
    if(input) {
      input.remove();
    }
  }

  getUsers() {
    http.get('/api/users').then(users => {
      let counter = 0;
      users.forEach(user => {
        counter++;

        let label = new PIXI.Text(user.username, {
          font : '24px Arial',
          fill : '#fff',
          align : 'right'
        });

        label.y = 30*counter;
        label.x = 284;
        label.anchor.set(1,0);

        this.GUI.players.addChild(label);
      });
    });
  }

  getGames(){
    http.get('/api/games/').then(games => {
      let counter = 0;
      games.forEach(game => {
        counter++;

        let label = new PIXI.Text(this.labelFormater(game), {
          font : '24px Arial',
          fill : '#fff',
          align : 'left'
        });

        label.y = 30*counter;
        label.x = 16;
        label.anchor.set(0);

        this.GUI.games.addChild(label);
      });
    });
  }

  labelFormater(game) {
    let firstPlayer = game.player1.username;
    let secondPlayer = game.player2 && game.player2.username;

    if(game.stage === 'started'){
      return `${firstPlayer} играет с ${secondPlayer}`;
    }

    if(game.stage === 'not started'){
      return `${firstPlayer} ожидает игру`;
    }

    if(game.stage === 'over player1'){
      return `${firstPlayer} победил ${secondPlayer}`;
    }

    if(game.stage === 'over player2'){
      return `${secondPlayer} победил ${firstPlayer}`;
    }

  }

  startGame() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
    let token = window.localStorage.getItem('token');

    http.post('/api/games', {
        token: token
    }).then(game => {
      if(game.stage === 'not started') {
        this.game = game;
        this.loop = new window.EventSource(`/api/games/${game.id}/loop`);
        this.loop.addEventListener('message', this.waitGame.bind(this));
        this.panel.log('ждем второго игрока');

        return;
      }

      hexcraft.setStage(Board, {
        builder: Online,
        data: game
      });
    });
  }

  waitGame(event) {
    let data = JSON.parse(event.data);

    if(data.event === 'started') {
      this.game.player2 = data.user;

      this.loop.close();
      hexcraft.setStage(Board, {
        builder: Online,
        data: this.game
      });
    }
  }

  update(){}

}