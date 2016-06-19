'use strict';

import bot from '../../../../_shared/game/bot';
import Hex from '../../../../_shared/game/hex';
import hexcraft from '../../../application';
import Auth from '../../auth/auth';
import singleMap from './singleMap.json';
import rebuildMap from '../../../../_shared/game/rebuildMap';
import winValidation from '../../../../_shared/game/winValidation';
import Splash from '../../splash/splash';

export default class OfflineVsBot {
  constructor(gameData) {
    this.board = gameData.board;
    this.board.player = 'player1';
    this.board.userId = 1;

    this.player1 = {
      id: 1,
      username: 'Человек'
    };

    this.player2 = {
      id: 2,
      username: 'Робот'
    };

    this.Map = {
      MapData: JSON.parse(JSON.stringify(singleMap))
    };
  }

  surrender() {
    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
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

    this.board.player = 'player2';
    let step = bot(this.Map.MapData, 'player2');

    Hex.findByIndex(this.Map.MapData, step.current.i, step.current.j).cellstate = 'player2';
    let hex = Hex.findByIndex(this.board.chips.children, step.old.i, step.old.j);
    hex.i = step.current.i;
    hex.j = step.current.j;
    hex.position = Hex.indexToCoordinates(step.current.i, step.current.j);

    // mark bot step (tint it)
    this.board.field.findByIndex(step.old.i, step.old.j).tint = this.board.colors.old;
    this.board.field.findByIndex(step.current.i, step.current.j).tint = this.board.colors.current;

    rebuildMap(this, {
      current: step.current,
      old: step.old,
      userId: 2
    }, this.mapUpdated.bind(this));

    this.board.player = 'player1';
    this.board.changeMode('player1');
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