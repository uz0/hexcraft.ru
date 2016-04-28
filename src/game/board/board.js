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

    this.generatePlayersChips();

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

  generatePlayersChips() {

      let chip1 = PIXI.Sprite.fromImage('/game/board/chip1.svg');
      chip1.alpha = 1;
      chip1.position = {
        x: 40+20,
        y: 40+80
      };
      let chip2 = PIXI.Sprite.fromImage('/game/board/chip2.svg');
      chip2.alpha = 1;
      chip2.position = {
        x: 100,
        y: 60+60
      };
      let chip3 = PIXI.Sprite.fromImage('/game/board/chip3.svg');
      chip3.alpha = 1;
      chip3.position = {
        x: 140,
        y: 40+80
      };

      chip1.interactive = true;
      chip1.buttonMode = true;

      chip2.interactive = true;
      chip2.buttonMode = true;

      chip3.interactive = true;
      chip3.buttonMode = true;


      chip1
          .on('mousedown', this.onDragStart)
          .on('touchstart', this.onDragStart)
          .on('mouseup', this.onDragEnd)
          .on('mouseupoutside', this.onDragEnd)
          .on('touchend', this.onDragEnd)
          .on('touchendoutside', this.onDragEnd)
          .on('mousemove', this.onDragMove)
          .on('touchmove', this.onDragMove);
      chip2
          .on('mousedown', this.onDragStart)
          .on('touchstart', this.onDragStart)
          .on('mouseup', this.onDragEnd)
          .on('mouseupoutside', this.onDragEnd)
          .on('touchend', this.onDragEnd)
          .on('touchendoutside', this.onDragEnd)
          .on('mousemove', this.onDragMove)
          .on('touchmove', this.onDragMove);
      chip3
          .on('mousedown', this.onDragStart)
          .on('touchstart', this.onDragStart)
          .on('mouseup', this.onDragEnd)
          .on('mouseupoutside', this.onDragEnd)
          .on('touchend', this.onDragEnd)
          .on('touchendoutside', this.onDragEnd)
          .on('mousemove', this.onDragMove)
          .on('touchmove', this.onDragMove);

      this.addChild(chip1);
      this.addChild(chip2);
      this.addChild(chip3);
  }

  onDragStart(event) {
    this.alpha = 1;
    this.scale.set(1);
    this.dragging = true;
    this.data = event.data;
  }

  onDragEnd() {
    this.alpha = 1;
    this.scale.set(1);
    this.dragging = false;
    this.data = null;
    this.position.x = Math.round(this.position.x / 40) * 40;
    this.position.y = Math.round(this.position.y / 40) * 40;
    if (this.position.y % 40 !== 0){
     this.position.x = Math.round(this.position.x / 40) * 40 + 20;
    }
    console.log(this.position.x);
    console.log(this.position.y);

  }

  onDragMove() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }

  update(){}

}
