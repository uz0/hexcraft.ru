'use strict';

import Panel from '../panel/panel';
import Splash from '../splash/splash';
import Field from './field';
import Chip from './chip';
import stepValidation from '../../../_shared/game/stepValidation';
import rebuildMap from '../../../_shared/game/rebuildMap';
import Hex from '../../../_shared/game/hex';

export default class Board extends PIXI.Container {
  constructor(game) {
    super();

    game.data.board = this;
    this.game = new game.builder(game.data);

    this.colors = {
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    this.field = new Field();
    this.addChild(this.field);

    this.chips = new PIXI.Container();
    this.addChild(this.chips);

    this.panel = new Panel();
    this.panel.addButton('Сдаться', this.game.surrender.bind(this.game));
    this.addChild(this.panel);

    let text = `${this.game.player1.username}\n\nПРОТИВ\n\n${this.game.player2.username}`;
    let splash = new Splash(text);
    this.addChild(splash);

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
    if(this.game.beforeStep) {
      this.game.beforeStep(current, old);
    }

    rebuildMap(this.game, {
      current: Hex.coordinatesToIndex(current.x, current.y),
      old: Hex.coordinatesToIndex(old.x, old.y),
      userId: this.userId
    }, this.game.mapUpdated.bind(this.game));

    this.game.onStep(current, old);
  }

  changeMode(player) {
    let count = {
      player1: 0,
      player2: 0
    };

    this.chips.children.forEach(chip => {
      let mode = (this.player === player && player === chip.player);
      chip.changeMode(mode);

      count[chip.player]++;
    });

    this.panel.log(`${count.player1}:${count.player2}`);
  }

  update(){}
}