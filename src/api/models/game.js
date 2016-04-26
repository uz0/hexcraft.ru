'use strict';

module.exports = function(sequelize, DataTypes) {
  let Game = sequelize.define('Game', {
    levelId: DataTypes.INTEGER,
    player1: DataTypes.INTEGER,
    player2: DataTypes.INTEGER,
    stage: DataTypes.ENUM('Not started', 'Started', 'Over')
  }, {
    classMethods: {
      associate: function(models) {
        Game.hasMany(models.GameData, { foreignKey: 'gameId' });
      }
    }
  })
;
  return Game;
};
