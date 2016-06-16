'use strict';

const Hex = require('./hex');

module.exports = function(mapData, over) {

  // Map full
  let hasEmptyCells;
  let playerCellCount = 0;
  mapData.forEach(cell => {
    if (cell.cellstate === 'empty') {
      hasEmptyCells = true;
    }

    playerCellCount += (cell.cellstate === 'player1') ? +1 : -1;
  });

  if (!hasEmptyCells) {
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
      if (cell.cellstate !== 'empty' && field.cellstate === 'empty') {
        moveCount[cell.cellstate]++;
      }
    });
  });

  if (moveCount.player2 === 0) {
    over('player1');
  }

  if (moveCount.player1 === 0) {
    over('player2');
  }
};