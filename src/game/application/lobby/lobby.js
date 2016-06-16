
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
    let token = window.localStorage.getItem('token');
    let users = [];

    this.usersStream = new window.EventSource(`/api/users/stream?token=${token}`);
    this.usersStream.addEventListener('message', event => {
      users = JSON.parse(event.data);

      // clear container
      while(this.GUI.players.children.length > 0){
        let child = this.GUI.players.getChildAt(0);
        this.GUI.players.removeChild(child);
      }

      // fill container
      users.forEach((user, index) => {
        let label = new PIXI.Text(user, {
          font : '24px Arial',
          fill : '#fff',
          align : 'right'
        });

        label.y = 30 * (index + 1);
        label.x = 284;
        label.anchor.set(1,0);

        this.GUI.players.addChild(label);
      });
    });
  }

  getGames(){
    let token = window.localStorage.getItem('token');
    let games = [];

    this.gamesStream = new window.EventSource(`/api/games/stream?token=${token}`);
    this.gamesStream.addEventListener('message', event => {
      games = JSON.parse(event.data);

      // clear container
      while(this.GUI.games.children.length > 0){
        let child = this.GUI.games.getChildAt(0);
        this.GUI.games.removeChild(child);
      }

      // fill container
      games.forEach((game, index) => {
        let label = new PIXI.Text(this.labelFormater(game), {
          font : '24px Arial',
          fill : '#fff',
          align : 'left'
        });

        label.y = 30 * (index + 1);
        label.x = 0;
        label.anchor.set(0,0);

        this.GUI.games.addChild(label);
      });
    });
  }

  labelFormater(game) {
    let firstPlayer = (game.player1 && game.player1.username) ? game.player1.username : game.player1;
    let secondPlayer = (game.player2 && game.player2.username) ? game.player2.username : game.player2;

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

      this.usersStream.close();
      this.gamesStream.close();
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
      this.usersStream.close();
      this.gamesStream.close();
      hexcraft.setStage(Board, {
        builder: Online,
        data: this.game
      });
    }
  }

  update(){}

}