'use strict';

module.exports = function(sequelize, DataTypes) {
  let Game = sequelize.define('Game', {
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    stage: DataTypes.ENUM('not started', 'started', 'over player1', 'over player2')
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.Map, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Game;
};
