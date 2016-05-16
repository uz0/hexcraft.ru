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
 * @apiDefine UserInfo
 * @apiSuccess {String} username Unique and not empty string
 * @apiSuccess {String} password 
 * @apiSuccess {Boolean} admin True - admin
 * @apiSuccess {Data} createdAt 
 * @apiSuccess {Data} updatedAt 
 */

/**
 * @apiDefine UserResponse
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "id": 2,
 *       "username": "User",
 *       "password": "",
 *       "admin": null,
 *       "createdAt": "2016-05-16T16:24:35.974Z",
 *       "updatedAt": "2016-05-16T16:24:35.974Z"
 *     }
 */

/**
 * @api {get} /users Request all users
 * @apiName getUsers
 * @apiGroup User
 * @apiExample Example usage:
 *     /api/users
 * @apiSuccessExample {json} Success-Response:
 *   [
 *     {
 *       "id": 2,
 *       "username": "User",
 *       "password": "",
 *       "admin": null,
 *       "createdAt": "2016-05-16T16:24:35.974Z",
 *       "updatedAt": "2016-05-16T16:24:35.974Z"
 *     }
 *     {
 *       "id": 3,
 *       "username": "User1",
 *       "password": "",
 *       "admin": null,
 *       "createdAt": "2016-05-16T17:13:48.548Z",
 *       "updatedAt": "2016-05-16T17:13:48.548Z"
 *     }
 *   ]
 * @apiSuccess {Object[]} users Contain info about all users
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
 * @apiParam {String} username Unique and not empty string
 * @apiParam {String} password Password
 *
 * @apiUse UserInfo
 * @apiUse UserResponse
 * @apiError (400) {String} error Error info
 */

router.post('/', function(req, res, next) {
  models.User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
  }).then(user => {
    res.send(user);
  }).catch(error => {
    error.message = "Неверный логин или пароль.";
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
 * @apiUse UserResponse
 * @apiUse UserInfo
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
 * @api {delete} /users/:id Delete this user
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
