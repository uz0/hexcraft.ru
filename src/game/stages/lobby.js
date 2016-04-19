'use strict';

import hexcraft from '../app.js';
import Game from './game.js';
import {gamesListTitle, gamesList, usersListTitle, usersList, gameSubmit} from './lobby.gui.js';

export default class Lobby extends PIXI.Stage {
  constructor() {
    super();

    var users = window.fetch('/users')
    .then(r => r.json())
    .then(users => {
      usersList.children = users.map(user => {
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
      gamesList.children = games.map(game => {
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
      this.guiElt = EZGUI.create(gamesListTitle, 'kenney');
      this.addChild(this.guiElt);

      this.guiElt = EZGUI.create(gamesList, 'kenney');
      this.addChild(this.guiElt);

      this.guiElt = EZGUI.create(usersListTitle, 'kenney');
      this.addChild(this.guiElt);

      this.guiElt = EZGUI.create(usersList, 'kenney');
      this.addChild(this.guiElt);

      this.guiElt = EZGUI.create(gameSubmit, 'kenney');
      this.addChild(this.guiElt);

      EZGUI.components.gameSubmit.on('click', () => {
        hexcraft.setStage(Game);
      });


    });

  }

  update(){}

}
