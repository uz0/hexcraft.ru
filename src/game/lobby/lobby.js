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

    let panel = new Panel();
    panel.log('боль и страдание');
    panel.showExit();
    this.addChild(panel);

    hex.on('click', this.startGame);
    // user list
    // TODO: online user list!
    window.fetch('/api/users')
    .then(utils.parseJson)
    .then(users => {
      let posY = 10;
      users.forEach(user => {
        this.GUI.usersList.addChild(EZGUI.create({
          id: user.id,
          text: user.username,
          component: 'Label',
          position: {
            x: 0,
            y: posY
          },
          width: 100,
          height: 20
        }, 'kenney'));
        posY += 30;
      });
    });

    // all games
    // TODO: need label formater
    window.fetch('/api/games')
    .then(utils.parseJson)
    .then(games => {
      let posY = 10;
      games.forEach(game => {
        this.GUI.gamesList.addChild(EZGUI.create({
          id: game.id,
          text: this.labelFormater(game),
          component: 'Label',
          position: {
            x: 110,
            y: posY
          },
          width: 100,
          height: 20
        }, 'kenney'));
        posY += 30;
      });
    });

  }

  labelFormater(game) {
    return game.id;
  }

  startGame() {
    hexcraft.setStage(Board);
  }

  update(){}

}
