'use strict';

import hexcraft from '../app.js';
import utils from '../utils.js';
import Board from '../board/board.js';
import Panel from '../panel/panel.js';
import lobbyGui from './lobby.gui.js';

export default class Lobby extends PIXI.Stage {
  constructor() {
    super();
    this.GUI = [];

    let hex = PIXI.Sprite.fromImage('/game/auth/hex.svg');
    hex.position = {
      x: 355,
      y: 250
    };
    hex.interactive = true;
    hex.buttonMode = true;
    hex._width = 100;
    hex._height = 100;
    this.addChild(hex);

    lobbyGui.forEach(element => {
      this.GUI[element.id] = EZGUI.create(element, 'kenney');
      this.addChild(this.GUI[element.id]);
    });

    this.panel = new Panel();
    this.panel.log('боль и страдание1');
    this.panel.showExit();
    this.addChild(this.panel);

    hex.on('click', this.startGame.bind(this));

    // user list
    // TODO: online user list!
    window.fetch('/api/users')
    .then(utils.parseJson)
    .then(users => {
      users.forEach(user => {
        this.GUI.usersList.addChild(EZGUI.create({
          id: user.id,
          text: user.username,
          component: 'Label',
          position: 'right',
          width: 100,
          height: 20
        }, 'kenney'));
      });
    });

    // all games
    // TODO: need label formater
    window.fetch('/api/games')
    .then(utils.parseJson)
    .then(games => {
      games.forEach(game => {
        this.GUI.gamesList.addChild(EZGUI.create({
          id: game.id,
          text: this.labelFormater(game),
          component: 'Label',
          position: 'left',
          width: 100,
          height: 20
        }, 'kenney'));
      });
    });

  }

  labelFormater(game) {
    return game.id;
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
