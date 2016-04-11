'use strict';
var dcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    online: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    classMethods: {
      validPassword: (password, passwd, done, user) => {
        dcrypt.compare(password, passwd, (err, isMatch) => {
          if (err) {
            console.log(err);
          }

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }

        });
      }
    }
  }, {
    validate: {
      isLongEnough: function(val) {
        if (val.length < 7) {
          throw new Error('Password not long enough');
        }
      }
    }
  });

  return User;
};
