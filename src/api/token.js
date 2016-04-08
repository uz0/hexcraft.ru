'use strict';
var models = require('./models');
var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();

router.post('/verify', function(req, res) {
  models.Token.find({
    where: {
      userId: req.body.userId,
      token: req.body.token,
      validThrough: { gt: sequelize.fn('NOW') } // if token still valid
    }
  }).then(function(token) {
    if (token) {
      res.status(200).send(token);
    } else {
      res.status(500).send({ error: 'invalid token/user pair or token old' });
    }
  });
});

