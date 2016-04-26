'use strict';

module.exports = function(sequelize, DataTypes) {
  let Map = sequelize.define('Map', {
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Map.hasMany(models.MapData, {foreignKey: 'mapId'});
      }
    }
  });

  return Map;
};
