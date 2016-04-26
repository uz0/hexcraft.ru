'use strict';

module.exports = function(sequelize, DataTypes) {
  let GameData = sequelize.define('GameData', {
    gameId: DataTypes.INTEGER,
    x1: DataTypes.INTEGER,
    y1: DataTypes.INTEGER,
    x2: DataTypes.INTEGER,
    y2: DataTypes.INTEGER,
    action: DataTypes.INTEGER
  });
  return GameData;
};
