'use strict';

module.exports = function(game, step, emit) {

  let owner = (game.player1.id === step.userId)? 'player1': 'player2';

  // rebuild mapData using step (without checks)
  game.Map.MapData.forEach(hex => {
    if (step.current.i === hex.x && step.current.j === hex.y) {
      hex.cellstate = owner;
    }

    if (step.old.i === hex.x && step.old.j === hex.y) {
      hex.cellstate = 'empty';
    }
  });

  // change owners (find current neighbors)
  // emit({
  //   name: 'owner',
  //   data: [{
  //     x: 1,
  //     y: 1
  //   }, {
  //
  // }]
  // });

  // check if in radius (from old) and create new chip
  // emit({
  //   name: 'chip',
  //   data: {
  //     x: step.old.i,
  //     y: step.old.j
  //   }
  // });

  return game.Map.MapData;
};