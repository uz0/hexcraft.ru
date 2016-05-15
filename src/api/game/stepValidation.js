'use strict';

const Hex = require('./hex.js');

module.exports = function(game, step, error) {

  if (game.player1.id !== step.userId && game.player2.id !== step.userId) {
    return error('wrong user');
  }

  if(game.gameSteps.length % 2 !== 0 && step.userId === game.player1.id) {
    return error('incorrect step order');
  }

  let user = (game.player1.id === step.userId)? 'player1' : 'player2';
  if(Hex.findByIndex(game.Map.MapData, step.old.i, step.old.j).cellstate !== user) {
    return error('wrong owner');
  }

  let destination = Hex.findByIndex(game.Map.MapData, step.current.i, step.current.j);
  if(destination && destination.cellstate !== 'empty') {
    return error('collision detected!');
  }

  let neighborsNeighbors = Hex.findNeighborsNeighbors(game.Map.MapData, step.old.i, step.old.j);
  if(!Hex.findByIndex(neighborsNeighbors, step.current.i, step.current.j)) {
    return error('distance too long');
  }

};
