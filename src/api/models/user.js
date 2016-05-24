'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', { 
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    admin: DataTypes.BOOLEAN
  }, {
    instanceMethods: {
      objectize: function(){
        let res = this.dataValues;
        delete res.password;
        return res;
      },
      toJSON: function(){
        let res = this.objectize();
        return res;
      }
    }
  });

  return User;
};
