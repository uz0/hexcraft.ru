'use strict';

module.exports = function(sequelize, DataTypes) {
  let Game = sequelize.define('Game', {
    // player1: DataTypes.INTEGER,
    // player2: DataTypes.INTEGER,
    stage: DataTypes.ENUM('not started', 'started', 'over')
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.Map, {
          foreignKey: {
            allowNull: false
          }
        });

        Game.belongsTo(models.User, {
          foreignKey: 'player1'
        });

        Game.belongsTo(models.User, {
          foreignKey: 'player2'
        });
      }
    }
  });

  return Game;
};
