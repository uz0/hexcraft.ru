'use strict';

function Hex() {}

Hex.findByIndex = function(array, i, j) {
  let element;
  array.forEach(hex => {
    if(hex.i === i && hex.j === j) {
      element = hex;
    }
  });
  return element;
};

Hex.findNeighbors = function(array, i, j) {
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
    let field = Hex.findByIndex(array, i + coordinates[0], j + coordinates[1]);

    if (field) {
      neighbors.push(field);
    }
  });

  return neighbors;
};

Hex.findNeighborsNeighbors = function(array, i, j) {
  let neighborsNeighbors = [];
  Hex.findNeighbors(array, i, j).forEach(neighbor => {
    let neighbors = Hex.findNeighbors(array, neighbor.i, neighbor.j);
    neighborsNeighbors = neighborsNeighbors.concat(neighbors);
  });

  return neighborsNeighbors;
};

module.exports = Hex;