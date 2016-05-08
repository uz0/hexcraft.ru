'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
import Chip from './chip.js';

export default class Board extends PIXI.Stage {
  constructor(game) {
    super();
    this.Field = [];
    this.Chips = [];

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

    this.game = game;
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

        // сбросить цвет
        this.Field[i][j].tint = this.colors.clear;

        let x = Math.round(old.x / 40);
        let y = Math.round((old.y - 80) / 40);
        if (y % 2 !== 0){
          x -= 1;
        }


        // найти соседние соседних точек и задать им цвет
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


        // найти соседние ей точки и задать им цвет
        if((i > x-2 && i < x+2) && (j > y-2 && j < y+2) &&
          !(i===x+1 && j===y-1 && (y % 2 === 0)) &&
          !(i===x+1 && j===y+1 && (y % 2 === 0)) &&
          !(i===x-1 && j===y-1 && (y % 2 !== 0)) &&
          !(i===x-1 && j===y+1 && (y % 2 !== 0))) {

          this.Field[i][j].tint = this.colors.r1;
        }


        // найти исходную точку и задать ей цвет
        if(i===x && j===y) {
          this.Field[i][j].tint = this.colors.old;
        }


        // найти позицию курсора и задать цвет клетки под курсором
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

        // сбросить цвет
        this.Field[i][j].tint = this.colors.clear;
      }
    }

    let flag = true;

    // Prevent step out field
    this.Field.forEach(i => {
      i.forEach(element => {

        if(element.alpha === 1 && element.position.x === current.x && element.position.y === current.y) {
          flag = false;
        }

      });
    });

    // Prevent step to other chip
    this.Chips.forEach(element => {

      if (current.x === element.position.x && current.y === element.position.y){
        flag = true;
      }

    });

    return flag;

  }

  findChip(x,y) {
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

    if(this.username === data.user.username) {
      return;
    }

    this[`${data.event}Event`](data.data);
  }

  stepEvent(step) {
    let chip = this.findChip(step.old.x, step.old.y);
    chip.x = step.current.x;
    chip.y = step.current.y;
  }

  update(){}

}