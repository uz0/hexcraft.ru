'use strict';

const config = require('../../config/config.json');
const env = process.env.NODE_ENV || 'development';
const salt = config[env].salt || process.env.SALT;

const isAuthed = require('./middlewares/isAuthed');
const models = require('./models');
const bcrypt = require('bcrypt-nodejs');
const uuid = require('node-uuid');
const express = require('express');
const router = module.exports = express.Router();


/**
 * @api {post} /auth/verify Verify token
 * @apiName verifyToken
 * @apiGroup Auth
 *
 * @apiParam {String} token token
 *
 * @apiSuccess (200) {Object} token Token information
 * @apiError (500) {String} error Error description
 */

router.post('/verify', function(req, res, next) {
  models.Token.findOne({
    where: {
      token: req.body.token,
      validThrough: {
        $gt: (new Date().getTime() / 1000)
      }
    }
  }).then(token => {
    if(!token) {
      let error = new Error('invalid token');
      error.status = 400;
      return next(error);
    }

    res.send(token);
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

router.post('/login', function(req, res, next) {
  models.User.findOne({
    where: {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt)
    }
  }).then(user => {
    if (!user) {
      let error = new Error('invalid credentials');
      error.status = 400;
      return next(error);
    }

    models.Token.create({
      token: uuid.v4(),
      UserId: user.id,
      validThrough: (new Date().getTime() / 1000) + config[env].validTime
    }).then(token => res.send({
      user: user,
      token: token
    }));

  });
});

/**
 * @api {post} /auth/logout Logout
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiParam {String} token user's token
 */

router.post('/logout', isAuthed, function(req, res) {
  models.Token.destroy({
    where: {
      token: req.body.token
    }
  }).then(() => {
    res.send();
  });

});