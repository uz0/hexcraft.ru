'use strict';
// const sequelize = require('sequelize');
const config = require('../../config/config.json');
const env = process.env.NODE_ENV || 'development';
const salt = config[env].salt || process.env.SALT;

const models = require('./models');
const bcrypt = require('bcrypt-nodejs');
const uuid = require('node-uuid');
const express = require('express');
const router = module.exports = express.Router();

/**
 * @api {get} /auth/verify Verify token
 * @apiName verifyToken
 * @apiGroup Auth
 *
 * @apiParam {String} token token
 *
 * @apiSuccess (200) {Object} token Token information
 * @apiError (500) {String} error Error description
 */

router.get('/verify', (req, res) => {
  models.Token.findOne({
    where: {
      token: req.body.token,
      validThrough: {
        $gt: new Date().getTime()
      }
    }
  }).then(token => {
    if(token) {
      res.status(200)
         .send(token);
      return;
    }

    res.status(500)
       .send({
      error: 'invalid token'
    });
  });
});

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiSuccess {Object} user User info
 * @apiSuccess {Object} token User's token
 */

router.post('/login', function(req, res) {
  models.User.findOne({
    where: {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt)
    }
  }).then(function(user) {
    if (!user) {
      res.status(500)
         .send({
        error: 'invalid credentials'
      });

      return;
    }

    models.Token.create({
      token: uuid.v4(),
      validThrough: new Date().getTime() + config[env].validTime
    }).then(token => {
      res.send(token);
    });

  });
});

/**
 * @api {post} /auth/logout Logout
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiParam {String} token user's token
 */

router.post('/logout', function(req, res) {
  const token = req.body.token;

  if (!token) {
    res.status(400).send();
    return;
  }

  models.Token.destroy({
    where: {
      token: token
    }
  }).then(() => {
    res.status(200).send();
  });

});