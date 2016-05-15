'use strict';

// const Hex = require('./hex.js');

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
};