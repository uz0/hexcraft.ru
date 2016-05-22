'use strict';

const config = require('../configuration.json');
const env = process.env.NODE_ENV || 'development';
const salt = config[env].salt || process.env.SALT;

const bcrypt = require('bcrypt-nodejs');
const isAdmin = require('../middlewares/isAdmin');
const models = require('../models');
const express = require('express');
const router = module.exports = express.Router();


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
 * @apiSuccess (200) {Object[]} users

 * @apiSuccess {Number}         id
 * @apiSuccess {String}         username
 * @apiSuccess {Boolean}        admin true if user has admin rights
 * @apiSuccess {Date}           createdAt
 * @apiSuccess {Date}           updatedAt
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
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {String} username Unique and not empty string
 * @apiParam {String} password Password
 *
 * @apiUse UserResponse
 *
 * @apiError (400) {String} error
 */

router.post('/', function(req, res, next) {
  models.User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
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
 */

router.get('/:id', function(req, res) {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    res.send(user);
  });
});


/**
 * @api {delete} /users/:id Delete user
 * @apiName deleteUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {String} token Admin's token
 * @apiParam {Number} id User id
 *
 * @apiError (400) {String} error
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
