'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
import Chip from './chip.js';

export default class Board extends PIXI.Stage {
  constructor(game) {
    super();
    this.game = game;
    this.Field = [];
    this.Chips = [];
    this.Steps = [];

    this.username = window.localStorage.getItem('username');

    this.colors = {
      player1: '0xb71c1c',
      player2: '0x0D47A1',
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    this.panel = new Panel();
    this.panel.log('prepare to die');
    this.panel.showCapitulation();
    this.addChild(this.panel);

    this.generateField();

    this.initializationMap(game);

    let loop = new window.EventSource(`/api/games/${game.id}/loop`);
    loop.addEventListener('message', this.onEvent.bind(this));
  }

  generateField() {
    for(let i=0; i<20; i++) {
      this.Field[i] = [];

      for(let j=0; j<13; j++) {
        if (j % 2 !== 0 && i === 19) {
          continue;
        }

        let hex = PIXI.Sprite.fromImage('/game/board/circuit_hex.svg');
        hex.alpha = 0.2;
        hex.position = {
          x: (j % 2 === 0)? i*40 : i*40 + 20,
          y: j*40 + 80
        };

        this.Field[i][j] = hex;
        this.addChild(hex);
      }
    }
  }

  initializationMap(game) {
    game.Map.MapData.forEach(element => {
      this.Field[element.x][element.y].alpha = 1;

      if(element.cellstate !== 'empty') {
        const x = (element.y % 2 === 0)? element.x*40 : element.x*40+20;
        const y = element.y*40+80;
        let chip = new Chip(x, y, this.Field);

        chip.onMove = this.onMove.bind(this);
        chip.onStep = this.onStep.bind(this);
        chip.preventStep = this.preventStep.bind(this);

        chip.tint = this.colors[element.cellstate];
        chip.player = element.cellstate;

        this.Chips.push(chip);
        this.addChild(chip);
      }
    });
  }

  onMove(current, old) {
    for(let i=0; i<20; i++){
      for(let j=0; j<13; j++){
        if (j % 2 !== 0 && i === 19) {
          continue;
        }

        // reset color
        this.Field[i][j].tint = this.colors.clear;

        let x = Math.round(old.x / 40);
        let y = Math.round((old.y - 80) / 40);
        if (y % 2 !== 0){
          x -= 1;
        }


        // find neighbors neighbors chips and set color
        if((i > x-3 && i < x+3) && (j > y-3 && j < y+3) &&
          !(i===x+2 && j===y-2) &&
          !(i===x+2 && j===y+2) &&
          !(i===x-2 && j===y-2) &&
          !(i===x-2 && j===y+2) &&
          !(i===x-2 && j===y-1 && (y % 2 !== 0)) &&
          !(i===x-2 && j===y+1 && (y % 2 !== 0)) &&
          !(i===x+2 && j===y-1 && (y % 2 === 0)) &&
          !(i===x+2 && j===y+1 && (y % 2 === 0))) {

          this.Field[i][j].tint = this.colors.r2;
        }


        // find neighbors chips and set color
        if((i > x-2 && i < x+2) && (j > y-2 && j < y+2) &&
          !(i===x+1 && j===y-1 && (y % 2 === 0)) &&
          !(i===x+1 && j===y+1 && (y % 2 === 0)) &&
          !(i===x-1 && j===y-1 && (y % 2 !== 0)) &&
          !(i===x-1 && j===y+1 && (y % 2 !== 0))) {

          this.Field[i][j].tint = this.colors.r1;
        }


        // find point of reference and set color
        if(i===x && j===y) {
          this.Field[i][j].tint = this.colors.old;
        }


        // find cursor position and set color Field under cursor
        let cx = Math.round(current.x / 40);
        let cy = Math.round((current.y - 80) / 40);
        if (cy % 2 !== 0){
          cx = Math.round((current.x - 20) / 40);
        }

        if(i===cx && j===cy) {
          this.Field[i][j].tint = this.colors.current;
        }
      }
    }

    // console.log('yep1', current, old);
  }

  onStep(current, old) {
    let token = window.localStorage.getItem('token');

    window.fetch(`/api/games/${this.game.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        step: {
          current: current,
          old: old
        },
        token: token
      })
    });

    console.log('yep2', current, old);
  }

  preventStep(current, old) {
    console.log('yep3', current, old);

    // очищаем поле
    for(let i=0; i<20; i++){
      for(let j=0; j<13; j++){
        if (j % 2 !== 0 && i === 19) {
          continue;
        }

        // reset color
        this.Field[i][j].tint = this.colors.clear;
      }
    }

    // observe correct step order
    let last = this.Steps.length-1;
    let lastUser = (last === -1) ? this.game.player2 : this.Steps[last].user;
    if(lastUser.username === this.username) {
      return true;
    }

    // check chip owner
    let currentChip = this.findChip(current.x, current.y);
    let playerIndex = (this.username === this.game.player1.username) ? 'player1' : 'player2';
    if(currentChip.player !== playerIndex) {
      return true;
    }

    // prevent step to old position
    if(current.x === old.x && current.y === old.y) {
      return true;
    }

    let flag = true;
    let cx = Math.round(current.x / 40);
    let cy = Math.round((current.y - 80) / 40);
    if (cy % 2 !== 0){
      cx = Math.round((current.x - 20) / 40);
    }

    let chip;
    if(this.Field[cx] && this.Field[cx][cy]) {
      chip = this.Field[cx][cy];
    }

    // Prevent step out field
    this.Field.forEach(i => {
      i.forEach(element => {

        if(chip && element.alpha === 1 && element.position.x === chip.x && element.position.y === chip.y) {
          flag = false;
        }

      });
    });

    // Prevent step to other chip
    this.Chips.forEach(element => {

      if (chip && chip.x === element.position.x && chip.y === element.position.y){
        flag = true;
      }

    });

    return flag;

  }

  findChip(x, y) {
    let chip;
    this.Chips.forEach(element => {
      if(element.x === x && element.y === y) {
        chip = element;
      }
    });

    return chip;
  }

  onEvent(event) {
    let data = JSON.parse(event.data);
    this[`${data.event}Event`](data.data, data.user);
  }

  stepEvent(step, user) {
    step.user = user;
    this.Steps.push(step);
    if(this.username === user.username) {
      return;
    }

    let chip = this.findChip(step.old.x, step.old.y);
    chip.x = step.current.x;
    chip.y = step.current.y;
  }

  update(){}

}