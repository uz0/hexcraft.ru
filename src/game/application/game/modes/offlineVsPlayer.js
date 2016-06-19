'use strict';

import Hex from '../../../../_shared/game/hex';
import hexcraft from '../../../application';
import Auth from '../../auth/auth';
import singleMap from './singleMap.json';
import winValidation from '../../../../_shared/game/winValidation';
import Splash from '../../splash/splash';

export default class OfflineVsPlayer {
  constructor(gameData) {
    this.board = gameData.board;
    this.board.player = 'player1';
    this.board.userId = 1;

    this.player1 = {
      id: 1,
      username: 'Красные'
    };

    this.player2 = {
      id: 2,
      username: 'Синие'
    };

    this.Map = {
      MapData: JSON.parse(JSON.stringify(singleMap))
    };
  }

  changeUser(player) {
    let user = (player === 'player1') ? 'player2' : 'player1';
    let userId = (player === 'player1') ? 2 : 1;

    this.board.player = user;
    this.board.userId = userId;
    this.board.changeMode(user);
  }

  surrender() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
    this.changeUser(this.board.player);
    this.overEvent(this.board.player);
  }

  beforeStep(current, old) {
    let oldIndex = Hex.coordinatesToIndex(old.x, old.y);
    let index = Hex.coordinatesToIndex(current.x, current.y);
    let player = this.board.player;

    // Update mapData for step validation
    Hex.findByIndex(this.Map.MapData, oldIndex.i, oldIndex.j).cellstate = 'empty';
    Hex.findByIndex(this.Map.MapData, index.i, index.j).cellstate = player;
  }

  onStep() {
    winValidation(this.Map.MapData, this.overEvent.bind(this));
    this.changeUser(this.board.player);

    let text = `Ходит ${this[this.board.player].username}`;
    let splash = new Splash(text);
    this.board.addChild(splash);
  }

  mapUpdated(data) {
    this[`${data.name}Event`](data.data);
  }

  // EVENTS
  chipEvent(coordinates) {
    let player = this.board.player;

    this.board.addChip(coordinates.i, coordinates.j, player);
    Hex.findByIndex(this.Map.MapData, coordinates.i, coordinates.j).cellstate = player;
  }

  ownerEvent(coordinatesArray) {
    let player = this.board.player;

    coordinatesArray.forEach(coordinates => {
      Hex.findByIndex(this.board.chips.children, coordinates.i, coordinates.j).changeOwner(player);
      Hex.findByIndex(this.Map.MapData, coordinates.i, coordinates.j).cellstate = player;
    });
  }

  overEvent(winner) {
    let text = `${this[winner].username} победил`;

    let splash = new Splash(text, () => {
      hexcraft.setStage(Auth);
    });
    this.board.addChild(splash);
  }
}