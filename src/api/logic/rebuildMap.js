'use strict';

const Hex = require('./hex');

module.exports = function(game, step, emit) {
  let owner = (game.player1.id === step.userId) ? 'player1' : 'player2';

  // rebuild mapData using step (without checks)

  let neighbors = Hex.findNeighbors(game.Map.MapData, step.current.i, step.current.j);

  Hex.findByIndex(game.Map.MapData, step.current.i, step.current.j).cellstate = owner;
  Hex.findByIndex(game.Map.MapData, step.old.i, step.old.j).cellstate = 'empty';

  // Check to see if moved by one
  let inRadius = Hex.findByIndex(neighbors, step.old.i, step.old.j);

  // If moved by one, capture the sorrounding enemy cells and copy to origin cell
  let changed = [];
  if (!inRadius) {
    neighbors.forEach(cell => {
      if (cell.cellstate !== 'empty' && cell.cellstate !== owner) {
        cell.cellstate = owner;
        changed.push(cell);
      }
    });
  } else {
    Hex.findByIndex(game.Map.MapData, step.old.i, step.old.j).cellstate = owner;
    emit({
      name: 'chip',
      data: {
        i: step.old.i,
        j: step.old.j
      }
    });
  }

  if (changed) {
    emit({
      name: 'owner',
      data: changed
    });
  }

  // change owners (find current neighbors)
  // emit({
  //   name: 'owner',
  //   data: [{
  //     i: 1,
  //     j: 1
  //   }, {
  //
  // }]
  // });

  // check if in radius (from old) and create new chip
  // emit({
  //   name: 'chip',
  //   data: {
  //     i: step.old.i,
  //     j: step.old.j
  //   }
  // });

  return game.Map.MapData;
};
