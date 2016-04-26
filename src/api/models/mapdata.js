'use strict';

module.exports = function(sequelize, DataTypes) {
  let MapData = sequelize.define('MapData', {
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    cellstate: DataTypes.INTEGER
  });

  return MapData;
};
