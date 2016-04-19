'use strict';

import hexcraft from '../app.js';
import Game from './game.js';
import lobbyGui from './lobby.gui.js';

export default class Lobby extends PIXI.Stage {
  constructor() {
    super();

    lobbyGui.forEach(element => {
      this.addChild(EZGUI.create(element, 'kenney'));
    })

    EZGUI.components.gameSubmit.on('click', () => {
      hexcraft.setStage(Game);
    });

    // user list
    // TODO: online user list!
    window.fetch('/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        EZGUI.components.usersList.addChild(EZGUI.create({
          id: user.id,
          text: user.username,
          component: 'Label',
          position: 'left',
          width: 100,
          height: 100
        }, 'kenney'));
      });
    });

    // all games
    // TODO: need label formater
    window.fetch('/games')
    .then(response => response.json())
    .then(games => {
      games.forEach(game => {
        EZGUI.components.gamesList.addChild(EZGUI.create({
          id: game.id,
          text: game.player1,
          component: 'Label',
          position: 'right',
          width: 100,
          height: 100
        }, 'kenney'));
      });
    });

  }

  update(){}

}
