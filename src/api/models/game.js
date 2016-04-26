'use strict';

module.exports = function(sequelize, DataTypes) {
  let Game = sequelize.define('Game', {
    player1: DataTypes.INTEGER,
    player2: DataTypes.INTEGER,
    stage: DataTypes.ENUM('Not started', 'Started', 'Over')
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.Map, {
          foreignKey: {
            allowNull: false
          }
        });

        Game.hasMany(models.GameData);
      }
    }
  });

  return Game;
};
