'use strict';

module.exports = function Hex() {


  this.findNeighbors = function(array, i, j) {

  

    const directions = [
      [
        [+1, 0],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, +1],
        [0, +1]
      ],
      [
        [+1, 0],
        [+1, -1],
        [0, -1],
        [-1, 0],
        [0, +1],
        [+1, +1]
      ]
    ];

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

  this.findNeighborsNeighbors = function(array, x, y) {
    let neighborsNeighbors = [];
    Hex.findNeighbors(array, x, y).forEach(neighbor => {
      let neighbors = Hex.findNeighbors(array, neighbor.x, neighbor.y);
      neighborsNeighbors = neighborsNeighbors.concat(neighbors);
    });

    return neighborsNeighbors;
  };
};
