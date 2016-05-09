'use strict';

import Panel from '../panel/panel.js';
import utils from '../utils.js';
import Chip from './chip.js';
import Hex from './hex.js';
import Field from './field.js';

export default class Board extends PIXI.Stage {
  constructor(game) {
    super();
    this.game = game;
    this.chips = [];

    this.username = window.localStorage.getItem('username');

    this.colors = {
      old: '0xFFCCBC',
      r1: '0xFFE0B2',
      r2: '0xFFECB3',
      current: '0xCFD8DC',
      clear: '0xFFFFFF'
    };

    // if(this.username === this.game.player2.username) {
    //   this.panel.log(`Ходит ${this.game.player1.username}`);
    // } else {
    //   this.panel.log('Ваш ход');
    // }


    this.panel = new Panel();
    this.panel.showCapitulation();
    this.addChild(this.panel);

    this.field = new Field();
    this.addChild(this.field);

    this.initialization(game);

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
        chip.preventStep = this.preventStep.bind(this);

        this.chips.push(chip);
        this.addChild(chip);
      }
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

    // console.log('yep1', current, old);
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

    // if(this.panel.GUI.userStatus.text === 'Ваш ход') {
    //   let msg = 'Ходит ' + ((this.username === this.game.player1.username) ? this.game.player2.username : this.game.player1.username);
    //   this.panel.log(msg);
    // }


    // console.log('yep2', current, old);
  }

  preventStep(current, old) {
    // console.log('yep3', current, old);

    // clear field
    this.field.forEach((i, j, hex)=> {
      hex.tint = this.colors.clear;
    })

    // // observe correct step order
    // let last = this.Steps.length-1;
    // let lastUser = (last === -1) ? this.game.player2 : this.Steps[last].user;
    // if(lastUser.username === this.username) {
    //   return true;
    // }

    // // check chip owner
    // let currentChip = this.findChip(current.x, current.y);
    // let playerIndex = (this.username === this.game.player1.username) ? 'player1' : 'player2';
    // if(currentChip.player !== playerIndex) {
    //   return true;
    // }

    // // prevent step to old position
    // if(current.x === old.x && current.y === old.y) {
    //   return true;
    // }

    // let flag = true;
    // let cx = Math.round(current.x / 40);
    // let cy = Math.round((current.y - 80) / 40);
    // if (cy % 2 !== 0){
    //   cx = Math.round((current.x - 20) / 40);
    // }

    // let chip;
    // if(this.Field[cx] && this.Field[cx][cy]) {
    //   chip = this.Field[cx][cy];
    // }

    // // Prevent step out field
    // this.Field.forEach(i => {
    //   i.forEach(element => {

    //     if(chip && element.alpha === 1 && element.position.x === chip.x && element.position.y === chip.y) {
    //       flag = false;
    //     }

    //   });
    // });

    // // Prevent step to other chip
    // this.chips.forEach(element => {

    //   if (chip && chip.x === element.position.x && chip.y === element.position.y){
    //     flag = true;
    //   }

    // });

    // return flag;
  }

  onEvent(event) {
    let data = JSON.parse(event.data);
    this[`${data.event}Event`](data.data, data.user);
  }

  stepEvent(step, user) {
    step.user = user;
    // this.Steps.push(step);
    if(this.username === user.username) {
      return;
    }

    // this.panel.log('Ваш ход');
    let chip = Hex.findByIndex(this.chips, step.old.i, step.old.j);
    chip.i = step.current.i;
    chip.j = step.current.j;
    chip.position = Hex.indexToCoordinates(step.current.i, step.current.j);
  }

  update(){}

}