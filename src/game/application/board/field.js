'use strict';

import Hex from './hex.js';

export default class Field extends PIXI.Container {
  constructor() {
    super();

    this.forEach((i, j) => {
      let hex = PIXI.Sprite.fromImage('/game/resources/circuit_hex.svg');
      hex.i = i;
      hex.j = j;
      hex.alpha = 0.2;
      hex.position = Hex.indexToCoordinates(i, j);

      this.addChild(hex);
    });
  }

  forEach(callback) {
    for(let i=0; i<20; i++) {
      for(let j=0; j<13; j++) {
        if (j % 2 !== 0 && i === 20-1) {
          continue;
        }

        callback(i, j, this.findByIndex(i, j));
      }
    }
  }

  // PROXY methods from HEX
  findByIndex(i, j) {
    return Hex.findByIndex(this.children, i, j);
  }

  findByCoords(x, y) {
    return Hex.findByCoords(this.children, x, y);
  }

  findNeighbors(x, y) {
    return Hex.findNeighbors(this.children, x, y);
  }

  findNeighborsNeighbors(x, y) {
    return Hex.findNeighborsNeighbors(this.children, x, y);
  }
}