'use strict';

module.exports = function(sequelize, DataTypes) {
  let MapData = sequelize.define('MapData', {
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    cellstate: DataTypes.ENUM('empty', 'player1', 'player2')
  });

  return MapData;
};
