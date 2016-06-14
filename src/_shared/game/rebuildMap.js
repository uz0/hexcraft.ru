'use strict';

const Hex = require('./hex');

module.exports = function(game, step, emit) {
  let owner = (game.player1.id === step.userId) ? 'player1' : 'player2';

  // rebuild mapData using step
  Hex.findByIndex(game.Map.MapData, step.current.i, step.current.j).cellstate = owner;
  Hex.findByIndex(game.Map.MapData, step.old.i, step.old.j).cellstate = 'empty';

  let neighbors = Hex.findNeighborsByIndex(game.Map.MapData, step.current.i, step.current.j);
  let inRadius = Hex.findByIndex(neighbors, step.old.i, step.old.j);
  if (inRadius) {
    Hex.findByIndex(game.Map.MapData, step.old.i, step.old.j).cellstate = owner;
    emit({
      name: 'chip',
      data: step.old
    });
  }

  let changed = [];
  neighbors.forEach(cell => {
    if (cell.cellstate !== 'empty' && cell.cellstate !== owner) {
      cell.cellstate = owner;
      changed.push(cell);
    }
  });

  if (changed.length) {
    emit({
      name: 'owner',
      data: changed
    });
  }

};
