'use strict';
var models = require('./models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    res.send(users);
  });
});

router.post('/', function(req, res) {
  models.User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(user) {
    res.send(user);
  });
});

router.delete('/:userId', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).then(function() {
    res.send('ok');
  });
});

module.exports = router;
