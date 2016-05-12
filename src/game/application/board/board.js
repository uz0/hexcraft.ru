'use strict';

import Panel from '../panel/panel.js';
import http from '../http.js';
import Chip from './chip.js';
import Hex from './hex.js';
import Field from './field.js';

export default class Board extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;
    this.chips = [];

    this.username = window.localStorage.getItem('username');
    this.user = (game.player1.username === this.username)? 'player1' : 'player2';

    this.colors = {
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    this.panel = new Panel();
    this.panel.showCapitulation();
    this.addChild(this.panel);

    this.field = new Field();
    this.addChild(this.field);

    this.initialization(game);
    this.changeMode('player1');

    let loop = new window.EventSource(`/api/games/${game.id}/loop`);
    loop.addEventListener('message', this.onEvent.bind(this));
  }

  initialization(game) {
    game.Map.MapData.forEach(element => {
      this.field.findByIndex(element.i, element.j).alpha = 1;

      if(element.cellstate !== 'empty') {
        let chip = new Chip(element.i, element.j, element.cellstate);

        chip.onMove = this.onMove.bind(this);
        chip.onStep = this.onStep.bind(this);
        chip.beforeStep = this.beforeStep.bind(this);

        this.chips.push(chip);
        this.addChild(chip);
      }
    });
  }

  changeMode(player) {
    const yourStep = `Ваш ход`;
    const enemyName = (this.user === 'player1')? this.game.player1.username : this.game.player2.username;
    const enemyStep = `Ходит ${enemyName}`;

    let status = (this.user === player)? yourStep : enemyStep;
    this.panel.log(status);

    this.chips.forEach(chip => {
      let mode = (this.user === player && chip.player ===  player);
      chip.changeMode(mode);
    });
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
    this.field.findByCoords(current.x, current.y).tint = this.colors.current;
  }

  beforeStep(current, old) {

    // clear field
    this.field.forEach((i, j, hex) => {
      hex.tint = this.colors.clear;
    });

    // Prevent step out field
    let field = this.field.findByCoords(current.x, current.y);
    if(!field || field.alpha !== 1) {
      this.panel.log('Выход за пределы поля!');
      return true;
    }

    // Prevent step to other chip
    // prevent step to old position
    if(Hex.findByCoords(this.chips, current.x, current.y)) {
      this.panel.log('Коллизии детектед!');
      return true;
    }

    // prevent step out neighbors neighbors
    let neighborsNeighbors = this.field.findNeighborsNeighbors(old.x, old.y);
    if(!Hex.findByCoords(neighborsNeighbors, current.x, current.y)) {
      this.panel.log('Ограничение по радиусу!');
      return true;
    }
  }

  onStep(current, old) {
    let token = window.localStorage.getItem('token');
    let index = Hex.coordinatesToIndex(current.x, current.y);
    let oldIndex = Hex.coordinatesToIndex(old.x, old.y);

    http.post(`/api/games/${this.game.id}`, {
      step: {
        current: index,
        old: oldIndex
      },
      token: token
    }).catch(err => {
      // rollback chip, after failure request
      let hex = Hex.findByIndex(this.chips, index.i, index.j);

      hex.i = oldIndex.i;
      hex.j = oldIndex.j;
      hex.position = Hex.indexToCoordinates(oldIndex.i, oldIndex.j);
      hex.updateOldPosition();
    });
  }

  onEvent(event) {
    let data = JSON.parse(event.data);
    this[`${data.event}Event`](data.data, data.user);
  }

  stepEvent(step, user) {
    let nextUserStep = (this.game.player1.username === user.username)? 'player2' : 'player1';
    this.changeMode(nextUserStep);

    if(this.username === user.username) {
      return;
    }

    let chip = Hex.findByIndex(this.chips, step.old.i, step.old.j);
    chip.i = step.current.i;
    chip.j = step.current.j;
    chip.position = Hex.indexToCoordinates(step.current.i, step.current.j);
  }

  chipEvent(coordinates, user) {
    let owner = (this.game.player1.username === user.username)? 'player1' : 'player2';
    let chip = new Chip(coordinates.i, coordinates.j, owner);

    chip.onMove = this.onMove.bind(this);
    chip.onStep = this.onStep.bind(this);
    chip.beforeStep = this.beforeStep.bind(this);

    this.chips.push(chip);
    this.addChild(chip);
  }

  ownerEvent(coordinatesArray, user) {
    let owner = (this.game.player1.username === user.username)? 'player1' : 'player2';

    coordinatesArray.forEach(coordinates => {
      Hex.findByIndex(this.chips, coordinates.i, coordinates.j).changeOwner(owner);
    });
  }

  update(){}
}