'use strict';

import hexcraft from '../../application';
import Hex from '../../../_shared/game/hex';

export default class Field extends PIXI.Container {
  constructor() {
    super();

    this.forEach((i, j) => {
      let hex = PIXI.Sprite.fromImage(hexcraft.resources.hex.blobUrl);
      hex.i = i;
      hex.j = j;
      hex.alpha = 0.1;
      hex.scale.set(0.2);
      hex.position = Hex.indexToCoordinates(i, j);

      this.addChild(hex);
    });
  }

  forEach(callback) {
    for(let i=0; i<10; i++) {
      for(let j=0; j<7; j++) {
        if (j % 2 !== 0 && i === 10-1) {
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
    return Hex.findNeighborsByCoords(this.children, x, y);
  }

  findNeighborsNeighbors(x, y) {
    return Hex.findNeighborsNeighborsByCoords(this.children, x, y);
  }
}