'use strict';

import Panel from '../panel/panel';
import Field from './field';
import Chip from './chip';
import Online from './online';
import stepValidation from '../../../_shared/game/stepValidation';
import rebuildMap from '../../../_shared/game/rebuildMap';
import Hex from '../../../_shared/game/hex';

export default class Board extends PIXI.Container {
  constructor(gameData) {
    super();
    this.game = new Online(gameData, this);

    this.field = new Field();
    this.addChild(this.field);

    this.chips = new PIXI.Container();
    this.addChild(this.chips);

    this.panel = new Panel(this.game.id);
    this.panel.showCapitulation();
    this.panel.splash('start', {
      player1: this.game.player1.username,
      player2: this.game.player2.username
    });
    this.addChild(this.panel);

    this.userId = window.localStorage.getItem('userId');
    this.userId = parseInt(this.userId);
    this.player = (this.game.player1.id === this.userId)? 'player1' : 'player2';

    this.colors = {
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    this.game.Map.MapData.forEach(element => {
      this.field.findByIndex(element.i, element.j).alpha = 0.75;

      if(element.cellstate !== 'empty') {
        this.addChip(element.i, element.j, element.cellstate);
      }
    });

    this.changeMode('player1');
  }

  addChip(i, j, owner) {
    let chip = new Chip(i, j, owner);

    chip.onMove = this.onMove.bind(this);
    chip.beforeStep = this.beforeStep.bind(this);
    chip.onStep = this.onStep.bind(this);

    this.chips.addChild(chip);
  }

  onMove(current, old) {
    // clear field
    this.field.forEach((i, j, hex)=> {
      hex.tint = this.colors.clear;
    });

    // find neighbors neighbors and set color
    this.field.findNeighborsNeighbors(old.x, old.y).forEach(hex => {
      hex.tint = this.colors.r2;
    });

    // find neighbors and set color
    this.field.findNeighbors(old.x, old.y).forEach(hex => {
      hex.tint = this.colors.r1;
    });

    // find point of reference and set color
    this.field.findByCoords(old.x, old.y).tint = this.colors.old;

    // find cursor position and set color Field under cursor
    try {
      this.field.findByCoords(current.x, current.y).tint = this.colors.current;
    } catch (error) {}
  }

  beforeStep(current, old) {
    // clear field
    this.field.forEach((i, j, hex) => {
      hex.tint = this.colors.clear;
    });

    return stepValidation(this.game, {
      current: Hex.coordinatesToIndex(current.x, current.y),
      old: Hex.coordinatesToIndex(old.x, old.y),
      userId: this.userId
    }, error => {
      this.panel.log(error);
      return true;
    });
  }

  onStep(current, old) {
    rebuildMap(this.game, {
      current: Hex.coordinatesToIndex(current.x, current.y),
      old: Hex.coordinatesToIndex(old.x, old.y),
      userId: this.userId
    }, this.game.mapUpdated);

    this.game.onStep(current, old);
  }

  changeMode(player) {
    const log = `Ходит ${this.game[player].username}`;

    if(this.splash) {
      this.splash.close();
      delete this.splash;
    }

    if(this.player !== player) {
      this.splash = this.panel.splash('step', log);
    }

    this.panel.log(log);

    this.chips.children.forEach(chip => {
      let mode = (this.player === player && player === chip.player);
      chip.changeMode(mode);
    });
  }

  update(){}
}