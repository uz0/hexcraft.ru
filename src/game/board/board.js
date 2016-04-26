'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';

export default class Board extends PIXI.Stage {
  constructor() {
    super();
    this.Field = [];

    let panel = new Panel();
    panel.log('prepare to die');
    panel.showCapitulation();
    this.addChild(panel);

    this.generateField();

    const id = 1;

    window.fetch(`/api/games/${id}`)
    .then(utils.parseJson)
    .then(game => {
      game.Map.MapData.forEach(element => {
        if(element.cellstate === 'empty') {
          this.Field[element.x][element.y].alpha = 1;
        }
      })
    })

  }

  generateField() {
    for(let i=0; i<20; i++){
      this.Field[i] = [];

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

  update(){}

}