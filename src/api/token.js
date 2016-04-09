'use strict';
var models = require('./models');
var express = require('express');
//var sequelize = require('sequelize');
var router = express.Router();

/**
* @api {get} users/verify/ Request map info
* @apiName verifyToken
* @apiGroup auth
*
* @apiParam {Number} id User ID
* @apiParam {String} token token
*
* @apiSuccess {json} status success message
*/

router.post('users/verify', function(req, res) {
//{user: req.body.user,token: {token: 1875178345, validThrough: 17537163513} }
  res.status(200).send({status: 'ok'});

 
/*
  models.Token.find({
    where: {
      userId: req.body.userId,
      token: req.body.token,
      validThrough: { gt: sequelize.fn('NOW') } // if token still valid
    }
  }).then(function(token) {
    if (token) {
      res.status(200).send(token);
    } else {
      res.status(500).send({ error: 'invalid token/user pair or token old' });
    }
  });
*/
});

module.exports = router;
