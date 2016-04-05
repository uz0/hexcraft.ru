"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: DataTypes.INTEGER
    username: DataTypes.STRING
    password: DataTypes.STRING
  }, {
    classMethods: {

    }
  });

  return User;
};