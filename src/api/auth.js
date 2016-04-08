'use strict';
var models = require('./models');
var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();


router.post('/login', function(req, res) {

  models.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user) {
    if (user) { // valid

      models.Token.findOne({ where: { UserId: user.id } }).then(function(token) {
        if (token) {
          token.upsert({ id: token.id, validThrough: sequelize.fn('NOW') + 100000 }).then(function(token) {
            res.send(token);
          });
        } else {
          var vt = sequelize.fn('NOW') + 100000;
          models.Token.create({
            token: sequelize.fn('NOW') % 21,
            validThrough: vt
          }).then(function(token) {
            res.send(token);
          });
        }
      });
    } else {
      res.status(500).send({ error: 'invalid credentials' });
    }
  });
});

//router.post('/register');
module.exports = router;
