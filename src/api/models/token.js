'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    token: DataTypes.STRING,
    validThrough: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Token;
};
