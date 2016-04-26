'use strict';

module.exports = function(sequelize, DataTypes) {
  let GameData = sequelize.define('GameData', {
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    action: DataTypes.INTEGER
  });

  return GameData;
};
