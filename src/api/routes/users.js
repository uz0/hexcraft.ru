'use strict';

const config = require('../configuration');

const bcrypt = require('bcrypt-nodejs');
const isAdmin = require('../middlewares/isAdmin');
const isAuthed = require('../middlewares/isAuthed');
const models = require('../models');
const express = require('express');
const sse = require('server-sent-events');

const events = require('events');
var emitter = new events.EventEmitter();
var onlineUsers = [];

const router = module.exports = express.Router();


/**
 * @api {get} /users/stream Online users stream
 * @apiName userStream
 * @apiDescription Server Sent Events stream, returns an
 * array of online user names. User is online when listen this stream.
 *
 * @apiGroup User
 * @apiPermission user
 *
 * @apiParam {String} token Token
 *
 * @apiSuccessExample Userlist:
   [
     "versus",
     "acy",
     "test"
   ]
 *
 */

router.get('/stream', sse, isAuthed, function(req, res) {
  let user = req.user.username;
  emitter.on('update', () => {
    let data = JSON.stringify(onlineUsers);
    res.sse(`data: ${data}\n\n`);
  });

  onlineUsers.push(user);
  emitter.emit('update');

  req.on('close', () => {
    let index = onlineUsers.indexOf(user);
    onlineUsers.splice(index, 1);

    emitter.emit('update');
  });
});


/**
 * @apiDefine UserResponse
 *
 * @apiSuccess {Number}  id
 * @apiSuccess {String}  username
 * @apiSuccess {Boolean} admin true if user has admin rights
 * @apiSuccess {Date}    createdAt
 * @apiSuccess {Date}    updatedAt
 *
 * @apiSuccessExample {json} Success-Response:
    {
      "id": 2,
      "username": "User",
      "admin": null,
      "createdAt": "2016-05-16T16:24:35.974Z",
      "updatedAt": "2016-05-16T16:24:35.974Z"
    }
 */


/**
 * @api {get} /users Request all users
 * @apiName getUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]}  users
 * @apiSuccess {Number}    users.id
 * @apiSuccess {String}    users.username
 * @apiSuccess {Boolean}   users.admin true if user has admin rights
 * @apiSuccess {Date}      users.createdAt
 * @apiSuccess {Date}      users.updatedAt
 *
 * @apiSuccessExample {json} Success-Response:
    [
       {
          "id":2,
          "username":"test",
          "admin":null,
          "createdAt":"2016-05-11T21:40:57.876Z",
          "updatedAt":"2016-05-11T21:40:57.876Z"
       }
    ]
 */

router.get('/', function(req, res) {
  models.User.findAll().then(users => {
    res.send(users);
  });
});


/**
 * @api {post} /users Create new user
 * @apiDescription Create new user with username and password and return user data
 *
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {String} username Unique and not empty string
 * @apiParam {String} password Password
 *
 * @apiUse UserResponse
 *
 * @apiError (400) {String} error
 *
 */

router.post('/', function(req, res, next) {
  models.User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, config.salt)
  }).then(user => {
    res.send(user);
  }).catch(error => {
    error.message = 'Неверный логин или пароль.';
    error.status = 400;
    next(error);
  });
});

/**
 * @api {get} /users/:id Get user data
 * @apiName getUserData
 * @apiGroup User
 *
 * @apiUse UserResponse
 *
 * @apiParam {Number} id User id
 *
 */

router.get('/:id', function(req, res, next) {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    if(!user) {
      let error = new Error('Not found.');
      error.status = 404;
      return next(error);
    }
    res.send(user);
  });
});


/**
 * @api {delete} /users/:id Delete user
 * @apiName deleteUser
 *
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {String} token Admin's token
 * @apiParam {Number} id User id
 *
 * @apiError (400) {String} error
 *
 */

router.delete('/:id', isAdmin, function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send();
  });
});
