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

  // TODO: Cannot move


  let moveCount = {
    player1: 0,
    player2: 0
  }

  game.data.Map.MapData.forEach(cell => {
    if (cell.cellstate === 'player1') {
      let cellsteps = Hex.findNeighborsNeighbors(game.data.Map.MapData, cell.i, cell.j);
      cellsteps.forEach(steps => {
        if (steps.cellstate === 'empty') {
          moveCount.player1++;
        }
      });
    }
    if (cell.cellstate === 'player2') {
      let cellsteps = Hex.findNeighborsNeighbors(game.data.Map.MapData, cell.i, cell.j);
      cellsteps.forEach(steps => {
        if (steps.cellstate === 'empty') {
          moveCount.player2++;
        }
      });
    }
  });

  if (moveCount.player1 === 0) {
    game.over(game.data.player1);
  }

  if (moveCount.player2 === 0) {
    game.over(game.data.player2);
  }

};
