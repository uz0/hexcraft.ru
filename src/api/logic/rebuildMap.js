'use strict';

module.exports = function(game, step) {

  // TODO
  // rebuild mapData using step (without checks)

  game.Map.MapData.forEach(function(hex, index, data) {
    if (step.current.i === hex.x && step.current.j === hex.y) {
      if (game.player1.id === step.userId) {
        data[index].cellstate = 'player1';
      }
      if (game.player2.id === step.userId) {
        data[index].cellstate = 'player2';
      }
    }
    if (step.old.i === hex.x && step.old.j === hex.y) {
      data[index].cellstate = 'empty';
    }
  });

  game.gameSteps[game.gameSteps.length] = step;

  return game.Map.MapData;
};
