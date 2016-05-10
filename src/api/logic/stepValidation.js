'use strict';

module.exports = function(game, step) {

  // order check

  if (game.currentPlayer === step.userId) {
    return 'Wrong order';
  }

  // chiip owner check


  game.Map.MapData.forEach(function(hex) {
    if (step.old.i === hex.x && step.old.j === hex.y) {
      if ((hex.cellstate === 'player1' && game.player1.id !== step.userId) || (hex.cellstate === 'player2' && game.player2.id !== step.userId)) {
        return 'Wrong chip';
      }
    }
  });

  // map and position check
  let occurranceStatus = {
    OUTOFBOUNDS: true,
    CELLSTATE: 'empty'
  };
  game.Map.MapData.forEach(function(hex) {
    if (step.current.i === hex.x && step.current.j === hex.y) {
      occurranceStatus.OUTOFBOUNDS = false;
      occurranceStatus.CELLSTATE = hex.cellstate;
    }
  });
  if (occurranceStatus.OUTOFBOUNDS) {
    return 'Out of bounds';
  }
  if (occurranceStatus.CELLSTATE !== 'empty') {
    return 'Cannot step on used cell';
  }

  // Check radius

  let dist = Math.abs(step.old.i - step.current.i) + Math.abs(step.old.j - step.current.j) - 1;
  if (dist > 2) {
    return 'Distance too great';
  }


  // TODO
  // correct step order (player1, player2, player1 ...)
  // chip owner
  // check step with map data
  // step to first radius
  // step to second radius
  // prevent step to another chip position



  return;
};
