'use strict';

module.exports = class Hex {
  static indexToCoordinates(i, j) {
    return {
      x: (j % 2 === 0) ? i*80 : i*80 + 40,
      y: j*80 + 80
    };
  }

  static coordinatesToIndex(x, y) {
    let i = Math.round(x / 80);
    let j = Math.round((y - 80) / 80);

    if (j % 2 !== 0){
      i = Math.round((x - 40) / 80);
    }

    return {
      i: i,
      j: j
    };
  }

  static findByIndex(array, i, j) {
    let element;
    array.forEach(hex => {
      if(hex.i === i && hex.j === j) {
        element = hex;
      }
    });
    return element;
  }

  static findByCoords(array, x, y) {
    let coordinates = Hex.coordinatesToIndex(x, y);
    return Hex.findByIndex(array, coordinates.i, coordinates.j);
  }

  static findNeighborsByCoords(array, x, y) {
    let index = Hex.coordinatesToIndex(x, y);
    return Hex.findNeighborsByIndex(array, index.i, index.j);
  }

  static findNeighborsByIndex(array, i, j) {

    const directions = [[
      [+1,  0], [ 0, -1], [-1, -1],
      [-1,  0], [-1, +1], [ 0, +1]
    ], [
      [+1,  0], [+1, -1], [ 0, -1],
      [-1,  0], [ 0, +1], [+1, +1]
    ]];

    let parity = j & 1; // jshint ignore:line

    let neighbors = [];
    directions[parity].forEach(coordinates => {
      let field = Hex.findByIndex(array, i+coordinates[0], j+coordinates[1]);

      if(field) {

        // WORKAROUND: ignore unavailable for step field ceils
        if(field.alpha && field.alpha !== 0.75){
          return;
        }

        neighbors.push(field);
      }
    });

    return neighbors;
  }

  static findNeighborsNeighborsByCoords(array, x, y) {
    let index = Hex.coordinatesToIndex(x, y);
    return Hex.findNeighborsNeighborsByIndex(array, index.i, index.j);
  }

  static findNeighborsNeighborsByIndex(array, i, j) {
    let neighborsNeighbors = [];
    Hex.findNeighborsByIndex(array, i, j).forEach(neighbor => {
      let neighbors = Hex.findNeighborsByIndex(array, neighbor.i, neighbor.j);
      neighborsNeighbors = neighborsNeighbors.concat(neighbors);
    });

    return neighborsNeighbors;
  }
}