'use strict';
var models = require('./models');
var express = require('express');
//var sequelize = require('sequelize');
var router = express.Router();


/**
* @api {post} auth/login Login action
* @apiName Login
* @apiGroup Auth
*
* @apiParam {String} username Username
* @apiParam {String} password Password
*
* @apiSuccess {json} user User info
* @apiSuccess {json} token User's token
*/

router.post('/login', function(req, res) {


  req.status(200).send({
    status: 'ok',
    user: {
    "id": req.body.id,
    "username": req.body.username,
    "password": req.body.password,
    "createdAt": "2016-04-09T10:44:46.502Z",
    "updatedAt": "2016-04-09T10:44:46.502Z"
    },
    token:{
      token: 1875178345,
      validThrough: 17537163513,
      "createdAt": "2016-04-09T10:44:46.502Z",
      "updatedAt": "2016-04-09T10:44:46.502Z"
    }
  });

  /*
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

*/
});

/**
* @api {post} auth/register Register action
* @apiName Register
* @apiGroup Auth
*
* @apiParam {String} username Username
* @apiParam {String} password Password
* @apiSuccess {json} status Status of operation
* @apiSuccess {json} user User info (if status ok)
* @apiSuccess {json} token User's token (if status ok)
*/

route.post('/register', function (req, res){
  req.status(200).send({
    status: 'ok',
    user: {
    "id": req.body.id,
    "username": req.body.username,
    "password": req.body.password,
    "createdAt": "2016-04-09T10:44:46.502Z",
    "updatedAt": "2016-04-09T10:44:46.502Z"
    },
    token:{
      token: 1875178345,
      validThrough: 17537163513,
      "createdAt": "2016-04-09T10:44:46.502Z",
      "updatedAt": "2016-04-09T10:44:46.502Z"
    }
  });
});

module.exports = router;
