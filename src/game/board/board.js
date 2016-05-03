'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
import Chip from './chip.js';

export default class Board extends PIXI.Stage {
  constructor() {
    super();
    this.Field = [];
    this.Chips = [];

    this.colors = {
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    let panel = new Panel();
    panel.log('prepare to die');
    panel.showCapitulation();
    this.addChild(panel);

    this.generateField();

    let token = window.localStorage.getItem('token');
    window.fetch('/api/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then(utils.parseJson)
    .then(game => {
      this.initializationMap(game);

      // loop example
      let loop = new EventSource(`/api/games/${game.id}/loop`);

      loop.addEventListener('message', event => {
        let data = JSON.parse(event.data);
        console.log(data);
      });
    });

  }

  generateField() {
    for(let i=0; i<20; i++){
      this.Field[i] = [];
      this.Chips[i] = [];

      for(let j=0; j<13; j++){
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

  initializationMap(game){
    window.fetch(`/api/games/${game.id}`)
    .then(utils.parseJson)
    .then(game => {
      game.Map.MapData.forEach(element => {
        if(element.cellstate === 'empty') {
          this.Field[element.x][element.y].alpha = 1;
        }

        if(element.cellstate === 'player1') {
          const x = (element.y % 2 === 0)? element.x*40 : element.x*40+20;
          const y = element.y*40+80;
          let chip = new Chip(x, y, this.Field);

          chip.onMove = this.onMove.bind(this);
          chip.onStep = this.onStep.bind(this);
          chip.preventStep = this.preventStep.bind(this);

          this.Chips[element.x][element.y] = chip;
          this.addChild(chip);
        }
      });
    })
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

    // проверки

    if(current.x < 0   ||
       current.x > 760 ||
       current.y < 80  ||
       current.y > 560) {

     return true;
    }

  }

  update(){}

}
