'use strict';

const Hex = require('./hex.js');

module.exports = function(game) {

  // Map full
  let emptyCells;
  let playerCellCount = 0;
  game.data.Map.MapData.forEach(cell => {
    if (cell.cellstate === 'empty') {
      emptyCells = true;
    }

    playerCellCount += (cell.cellstate === 'player1') ? +1 : -1;
  });

  if (!emptyCells) {
    game.over(playerCellCount < 0 ? game.data.player1 : game.data.player2);
    return;
  }

  // Cannot move
  let mapData = game.data.Map.MapData;
  let moveCount = {
    player1: 0,
    player2: 0
  };

  mapData.forEach(cell => {
    Hex.findNeighborsNeighbors(mapData, cell.i, cell.j).forEach(field => {
      if (field.cellstate === 'empty' && cell.cellstate !== 'empty') {
        moveCount[cell.cellstate]++;
      }
    });
  });

  if (!moveCount.player1) {
    game.over(game.data.player1);
  }

  if (!moveCount.player2) {
    game.over(game.data.player2);
  }

};