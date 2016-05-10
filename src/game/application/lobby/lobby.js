'use strict';

import hexcraft from '../../application.js';
import utils from '../utils.js';
import GUI from '../gui.js';
import Board from '../board/board.js';
import Panel from '../panel/panel.js';
import options from './lobby.json';

export default class Lobby extends PIXI.Container {
  constructor() {
    super();
    this.GUI = new GUI(options);
    this.GUI.play.on('click', this.startGame.bind(this));
    this.addChild(this.GUI);

    this.panel = new Panel();
    this.panel.log('Нажмите "В БОЙ"');
    this.panel.showExit();
    this.addChild(this.panel);
    this.getUsers();

    }

  getUsers() {
    window.fetch('/api/users')
    .then(utils.parseJson)
    .then(users => {
      this.users = users;
      this.getGames();

      let counter = 0;
      users.forEach(user => {
        counter++;

        let label = new PIXI.Text(user.username, {
          font : '24px Arial',
          fill : '#333',
          align : 'right'
        });

        label.y = 30*counter;
        label.x = 290;
        label.anchor.set(1,0);

        this.GUI.players.addChild(label);
      });
    });
  }

  getGames(){
    window.fetch('/api/games/')
    .then(utils.parseJson)
    .then(games => {
      let counter = 0;
      games.forEach(game => {
        counter++;

        let label = new PIXI.Text(this.labelFormater(game), {
          font : '24px Arial',
          fill : '#333',
          align : 'left'
        });

        label.y = 30*counter;
        label.x = 0;
        label.anchor.set(0);

        this.GUI.games.addChild(label);
      });
    });
  }

  labelFormater(game) {

    let firstPlayer;
    let secondPlayer;

    this.users.forEach(user => {

      if(user.id === game.player1){
        firstPlayer = user.username;
      }

      if(user.id === game.player2){
        secondPlayer = user.username;
      }

    });

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
    let token = window.localStorage.getItem('token');

    window.fetch('/api/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    }).then(utils.parseJson).then(game => {
      if(game.stage === 'not started') {
        this.game = game;
        this.loop = new window.EventSource(`/api/games/${game.id}/loop`);
        this.loop.addEventListener('message', this.waitGame.bind(this));
        this.panel.log('ждем второго игрока');

        return;
      }

      hexcraft.setStage(Board, game);
    });
  }

  waitGame(event) {
    let data = JSON.parse(event.data);
    if(data.event === 'started') {
      this.game.player2 = data.user;
      hexcraft.setStage(Board, this.game);
      this.loop.close();
    }
  }

  update(){}

}
