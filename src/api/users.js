'use strict';
var models = require('./models');
var express = require('express');
var router = express.Router();


/**
 * @api {get} / Request all online users
 * @apiName getOnlineUsers
 * @apiGroup User
 *
 * @apiSuccess {json} allUsers All users' info
 */

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    res.send(users);
  });
});

/**
 * @api {get} /:userId Get this user's data
 * @apiName getUserData
 * @apiGroup User
 *
 * @apiParam {Number} userId User's id
 * @apiSuccess {json} data User's data
 */


router.get('/:userId', function(req, res) {
  res.status(200).send({
    user: {
      id: req.body.id,
      username: 'NYI',
      password: 'NYI',
      createdAt: '2016-04-09T10:44:46.502Z',
      updatedAt: '2016-04-09T10:44:46.502Z'
    }
  });
});

/**
 * @api {post} / Create new user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiSuccess {json} token User's Token
 * @apiSuccess {json} user User info
 */

router.post('/', function(req, res) {

  req.status(200).send({
    user: {
      id: req.params.userId,
      username: req.body.username,
      password: req.body.password,
      createdAt: '2016-04-09T10:44:46.502Z',
      updatedAt: '2016-04-09T10:44:46.502Z'
    },
    token: {
      token: 1875178345,
      validThrough: 17537163513,
      createdAt: '2016-04-09T10:44:46.502Z',
      updatedAt: '2016-04-09T10:44:46.502Z'
    }
  });
  /*
  models.User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(function(user) {
    user.addToken({
        token: 1412512152,
        validThrough: 101240192
    }).then(function(token){
        res.send(token);
    });
  });
  */
});




/**
 * @api {delete} /:userId Delete this user
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id User id
 * @apiSuccess {json} status Operation status
 */


router.delete('/:userId', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).then(function() {
    res.status(200).send();
  });
});

module.exports = router;
