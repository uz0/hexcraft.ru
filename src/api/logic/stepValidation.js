'use strict';

const Hex = require('./hex.js');

module.exports = function(game, step, error) {

  if (game.player1.id !== step.userId && game.player2.id !== step.userId) {
    return error('wrong user');
  }

  // TODO
  // [x] game user
  // [ ] correct step order (player1, player2, player1 ...)
  // [ ] chip owner
  // [ ] check step with map data
  // [ ] step to second radius
  // [ ] prevent step to another chip position




  // let last = this.data.gameSteps.length - 1;
  // this.lastStepUserId = (last<0) ? this.data.gameSteps[last].userId : this.data.player2.id;

  // if (  game.lastStepUserId === step.userId) {
  //   return 'Wrong order';
  // }

  // // chiip owner check

  // let wrongChip = false;

  // game.Map.MapData.forEach(function(hex) {
  //   if (step.old.i === hex.x && step.old.j === hex.y) {
  //     if ((hex.cellstate === 'player1' && game.player1.id !== step.userId) || (hex.cellstate === 'player2' && game.player2.id !== step.userId)) {
  //       wrongChip = true;
  //     }
  //   }
  // });

  // if (wrongChip) {
  //   return 'Wrong chip';
  // }

  // // map and position check
  // let occurranceStatus = {
  //   OUTOFBOUNDS: true,
  //   CELLSTATE: 'empty'
  // };
  // game.Map.MapData.forEach(function(hex) {
  //   if (step.current.i === hex.x && step.current.j === hex.y) {
  //     occurranceStatus.OUTOFBOUNDS = false;
  //     occurranceStatus.CELLSTATE = hex.cellstate;
  //   }
  // });
  // if (occurranceStatus.OUTOFBOUNDS) {
  //   return 'Out of bounds';
  // }
  // if (occurranceStatus.CELLSTATE !== 'empty') {
  //   return 'Cannot step on used cell';
  // }

  // // Check radius

  // let neighborsNeighbors = Hex.findNeighborsNeighbors(game.Map.MapData, step.old.x, step.old.y);
  // let cell = Hex.findByCoords(neighborsNeighbors, step.current.x, step.current.y);
  // if (!cell) {
  //   return 'Distance too long';
  // }



  return;
};
