'use strict';

const Hex = require('./hex');

module.exports = function(mapData, over) {

  // Map full
  let emptyCells;
  let playerCellCount = 0;
  mapData.forEach(cell => {
    if (cell.cellstate === 'empty') {
      emptyCells = true;
    }

    playerCellCount += (cell.cellstate === 'player1') ? +1 : -1;
  });

  if (!emptyCells) {
    let winner = playerCellCount > 0 ? 'player1' : 'player2';
    over(winner);
    return;
  }

  // Cannot move
  let moveCount = {
    player1: 0,
    player2: 0
  };

  mapData.forEach(cell => {
    Hex.findNeighborsNeighborsByIndex(mapData, cell.i, cell.j).forEach(field => {
      if (field.cellstate === 'empty' && cell.cellstate !== 'empty') {
        moveCount[cell.cellstate]++;
      }
    });
  });

  if (!moveCount.player2) {
    over('player1');
  }

  if (!moveCount.player1) {
    over('player2');
  }
};