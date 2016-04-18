'use strict';

// import hexcraft from '../app.js';
import lobbyGui from './lobby.gui.js';

export default class Lobby extends PIXI.Stage {
  constructor() {
    super();

    var users = window.fetch('/users')
    .then(r => r.json())
    .then(users => {
      lobbyGui.children = users.map(user => {
        return {
          id: 'lvl6',
          text: user.username,
          userData: 'level 6',
          component: 'Button',
          position: 'right',
          width: 100,
          height: 100
        };
      });
    });

    var games = window.fetch('/games')
    .then(r => r.json())
    .then(games => {
      lobbyGui.children = games.map(game => {
        return {
          id: 'lvl6',
          text: game.player1,
          userData: 'level 6',
          component: 'Button',
          position: 'right',
          width: 100,
          height: 100
        };
      });
    });

    Promise.all([games, users]).then(() => {
      this.guiElt = EZGUI.create(lobbyGui, 'kenney');
      this.addChild(this.guiElt);
    });

  }

  update(){}

}
