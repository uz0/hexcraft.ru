'use strict';

const config = require('../configuration');

const isAuthed = require('../middlewares/isAuthed');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');
const uuid = require('node-uuid');
const express = require('express');
const router = module.exports = express.Router();

/**
 * @apiDefine TokenWithUserDataResponse
 *
 * @apiSuccess {Number}  id
 * @apiSuccess {String}  token
 * @apiSuccess {Number}  validThrough Time before expiring
 * @apiSuccess {Date}    updatedAt
 * @apiSuccess {Date}    createdAt
 * @apiSuccess {Number}  UserId Owner of token
 * @apiSuccess {Object}  User User data
 *
 * @apiSuccessExample Success-Response:
    {
       "id":31,
       "token":"521fe7b1-5af8-4f48-b4ca-584d4f060e88",
       "validThrough":1463517876.142,
       "createdAt":"2016-05-16T20:44:36.144Z",
       "updatedAt":"2016-05-16T20:44:36.144Z",
       "UserId":3,
       "User":{
          "id":3,
          "username":"admin",
          "admin":true,
          "createdAt":"2016-05-11T21:40:57.876Z",
          "updatedAt":"2016-05-11T21:40:57.876Z"
       }
    }
*/

/**
 * @api {post} /auth/verify Verify token
 * @apiName verifyToken
 * @apiDescription Check token status, return token data with user if token valid or error
 *
 * @apiGroup Auth
 *
 * @apiParam {String} token Token
 *
 * @apiUse TokenWithUserDataResponse
 *
 * @apiError (400) {String} error
 */

router.post('/verify', function(req, res, next) {
  models.Token.findOne({
    where: {
      token: req.body.token,
      validThrough: {
        $gt: (new Date().getTime() / 1000)
      }
    },
    include: [ models.User ]
  }).then(token => {
    if(!token) {
      let error = new Error('Неверный токен.');
      error.status = 400;
      return next(error);
    }

    res.send(token);
  });
});


/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiDescription Create and return new user token with user data if credentials valid or error
 *
 * @apiGroup Auth
 *
 * @apiParam {String} username Unique and not empty string
 * @apiParam {String} password
 *
 * @apiUse TokenWithUserDataResponse
 *
 * @apiError (400) {String} error
 */

router.post('/login', function(req, res, next) {
  models.User.findOne({
    where: {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, config.salt)
    }
  }).then(user => {
    if (!user) {
      let error = new Error('Неверная пара логин\\пароль.');
      error.status = 400;
      return next(error);
    }

    models.Token.create({
      token: uuid.v4(),
      UserId: user.id,
      validThrough: (new Date().getTime() / 1000) + config.validTime
    }).then(token => {
      token.dataValues.User = user;
      res.send(token);
    });
  });
});


/**
 * @api {post} /auth/logout Logout
 * @apiName Logout
 * @apiDescription Destroy token
 *
 * @apiGroup Auth
 * @apiPermission user
 *
 * @apiParam {String} token user's token
 */

router.post('/logout', isAuthed, function(req, res) {
  models.Token.destroy({
    where: {
      token: req.body.token
    }
  }).then(() => {
    res.send({});
  });

});