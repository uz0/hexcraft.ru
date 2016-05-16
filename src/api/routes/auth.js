'use strict';

const config = require('../configuration.json');
const env = process.env.NODE_ENV || 'development';
const salt = config[env].salt || process.env.SALT;

const isAuthed = require('../middlewares/isAuthed');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');
const uuid = require('node-uuid');
const express = require('express');
const router = module.exports = express.Router();


/**
 * @apiDefine UserInfo
 * @apiSuccess {String} username Unique and not empty string
 * @apiSuccess {String} password 
 * @apiSuccess {Boolean} admin True - admin
 * @apiSuccess {Data} createdAt 
 * @apiSuccess {Data} updatedAt 
 */

 /**
 * @apiDefine TokenInfo
 * @apiSuccess {String} id Token id 
 * @apiSuccess {String} token 
 * @apiSuccess {String} UserId Owner of token id 
 * @apiSuccess {String} validThrough Time before expiring
 * @apiSuccess {Data} updatedAt 
 * @apiSuccess {Data} createdAt 
 */

/**
 * @apiDefine UserResponse
 * @apiSuccessExample {json} Success-Response:
 *   [  
 *     {
 *       "id": 2,
 *       "username": "Test",
 *       "password": "",
 *       "admin": null,
 *       "createdAt": "2016-05-16T16:24:35.974Z",
 *       "updatedAt": "2016-05-16T16:24:35.974Z"
 *     }
 *     {
 *       "id": 3,
 *       "token": "Test",
 *       "UserId": "2",
 *       "validThrough": 1463522254.954,
 *       "updatedAt": "2016-05-16T16:24:35.974Z",
 *       "createdAt": "2016-05-16T16:24:35.974Z"
 *     }
 *   ]
 */


/**
 * @api {post} /auth/verify Verify token
 * @apiName verifyToken
 * @apiGroup Auth
 *
 * @apiParam {String} token Token
 *
 * @apiUse TokenInfo
 * @apiSuccessExample Success-Response:
 *     {
 *       "id": 3,
 *       "token": "Test",
 *       "UserId": "2",
 *       "validThrough": 1463522254.954,
 *       "updatedAt": "2016-05-16T16:24:35.974Z",
 *       "createdAt": "2016-05-16T16:24:35.974Z"
 *     }
 * @apiError (400) {String} error Error description
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
 * @apiParam {String} username Unique and not empty string
 * @apiParam {String} password 
 *
 * @apiUse UserInfo
 * @apiUse TokenInfo
 * @apiSuccessExample {json} Success-Response:
 *   [  
 *     {
 *       "id": 2,
 *       "username": "Test",
 *       "password": "",
 *       "admin": null,
 *       "createdAt": "2016-05-16T16:24:35.974Z",
 *       "updatedAt": "2016-05-16T16:24:35.974Z"
 *     }
 *     {
 *       "id": 3,
 *       "token": "Test",
 *       "UserId": "2",
 *       "validThrough": 1463522254.954,
 *       "updatedAt": "2016-05-16T16:24:35.974Z",
 *       "createdAt": "2016-05-16T16:24:35.974Z"
 *     }
 *   ]
 * @apiError (400) {String} error Error description
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
 * @api {destroy} /auth/logout Logout
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