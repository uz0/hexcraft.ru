"use strict";

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    id: DataTypes.
    level_id: DataTypes.INTEGER
    Player1: DataTypes.INTEGER
    Player2: DataTypes.INTEGER
    
  }, {
    classMethods: {

    }
  });

  return Game;
};