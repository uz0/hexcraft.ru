'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
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
      this.field.findByIndex(element.x, element.y).alpha = 1;

      if(element.cellstate !== 'empty') {
        let chip = new Chip(element.x, element.y, element.cellstate);

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
    })

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
    })

    // Prevent step out field
    let field = this.field.findByCoords(current.x, current.y);
    if(!field || field.alpha !== 1) {
      this.panel.log('Выход за пределы поля!');
      return true;
    }

    // Prevent step to other chip
    // prevent step to old position
    let chip = Hex.findByCoords(this.chips, current.x, current.y);
    if(chip) {
      this.panel.log('Коллизии детектед!');
      return true;
    }

    // prevent step out neighbors neighbors
    let neighborsNeighbors = this.field.findNeighborsNeighbors(old.x, old.y);
    let cell = Hex.findByCoords(neighborsNeighbors, current.x, current.y);
    if(!cell) {
      this.panel.log('Ограничение по радиусу!');
      return true;
    }
  }

  onStep(current, old) {
    let token = window.localStorage.getItem('token');
    let index = Hex.coordinatesToIndex(current.x, current.y);
    let oldIndex = Hex.coordinatesToIndex(old.x, old.y);

    window.fetch(`/api/games/${this.game.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        step: {
          current: index,
          old: oldIndex
        },
        token: token
      })
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

  update(){}
}