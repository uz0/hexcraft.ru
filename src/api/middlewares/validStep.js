'use strict';



module.exports = function(game, updatedField) {

  if (game.step[0] === updatedField){
    return false;
  }

  return true;
};
