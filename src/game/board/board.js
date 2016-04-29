'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
import Chip from './chip.js';

export default class Board extends PIXI.Stage {
  constructor() {
    super();
    this.Field = [];
    this.Chips = [];

    let panel = new Panel();
    panel.log('prepare to die');
    panel.showCapitulation();
    this.addChild(panel);

    this.generateField();

    const id = 1;

    window.fetch(`/api/games/${id}`)
    .then(utils.parseJson)
    .then(game => {
      this.initializationMap(game.Map.MapData);
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
          x: (j % 2 === 0)? i*40 : i*40+20,
          y: j*40+80
        };

        this.Field[i][j] = hex;
        this.addChild(hex);
      }
    }
  }

  initializationMap(mapData){
    mapData.forEach(element => {
      if(element.cellstate === 'empty') {
        this.Field[element.x][element.y].alpha = 1;
      }

      if(element.cellstate === 'player1') {
        const x = (element.y % 2 === 0)? element.x*40 : element.x*40+20;
        const y = element.y*40+80;
        let chip = new Chip(x, y);

        chip.onMove = this.onMove;
        chip.onStep = this.onStep;
        chip.preventStep = this.preventStep;

        this.Chips[element.x][element.y] = chip;
        this.addChild(chip);
      }
    });
  }

  onMove(current, old) {
    console.log('yep1', current, old);
  }

  onStep(current, old) {
    console.log('yep2', current, old);
  }

  preventStep(current, old) {
    console.log('yep3', current, old);
  }

  update(){}

}