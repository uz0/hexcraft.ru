'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    token: DataTypes.STRING,
    guestName: DataTypes.STRING,
    validThrough: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User, {
          foreignKey: {
            allowNull: true
          }
        });
      }
    }
  });

  return Token;
};
