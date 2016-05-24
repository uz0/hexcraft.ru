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
  let placesToMovePlayer1 = 0;
  let placerToMovePlayer2 = 0;
  let player1Cells = 0;
  let player2Cells = 0;
  game.data.Map.MapData.forEach(cell => {

    if (cell.cellstate === 'player1') {
      player1Cells++;
      let cellsteps = Hex.findNeighborsNeighbors(game.data.Map.MapData, cell.i, cell.j);
      cellsteps.forEach(steps => {
        if (steps.cellstate === 'empty') {
          placesToMovePlayer1++;
        }
      });
    }

    if (cell.cellstate === 'player2') {
      player2Cells++;
      let cellsteps = Hex.findNeighborsNeighbors(game.data.Map.MapData, cell.i, cell.j);
      cellsteps.forEach(steps => {
        if (steps.cellstate === 'empty') {
          placerToMovePlayer2++;
        }
      });

    }

  });

  if (placesToMovePlayer1 === 0) {
    game.over(game.data.player1);
  }
  if (player1Cells === 0) {
    game.over(game.data.player1);
  }

  if (placerToMovePlayer2 === 0) {
    game.over(game.data.player2);
  }
  if (player2Cells === 0) {
    game.over(game.data.player2);
  }


};
