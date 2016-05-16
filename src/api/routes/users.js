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
 * @api {get} /users Request all users
 * @apiName getUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users All users
 */

router.get('/', function(req, res) {
  models.User.findAll().then(users => {
    res.send(users);
  });
});


/**
 * @api {post} /users Create new user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiSuccess {Object} user User info

 * @apiError (400) {String} error Error info
 */

router.post('/', function(req, res, next) {
  models.User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
  }).then(user => {
    res.send(user);
  }).catch( err => {
      let error = new Error('Wrong username or password');
      error.status = 400;
      next(error);
  });
});


/**
 * @api {get} /users/:id Get user data
 * @apiName getUserData
 * @apiGroup User
 *
 * @apiParam {Number} id User id
 *
 * @apiSuccess {Object} user User data
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
 * @api {delete} /users/:userId Delete this user
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id User id
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
