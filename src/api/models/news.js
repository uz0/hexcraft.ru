"use strict";

module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define("News", {
    id: DataTypes.INTEGER
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {

    }
  });

  return News;
};