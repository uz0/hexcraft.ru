'use strict';
var models = require('./models');
var express = require('express');
var router = express.Router();

/**
* @api {get} /map/:id Request map info
* @apiName getMap
* @apiGroup Game
*
* @apiParam {Number} id Map ID.
*
* @apiSuccess {Number} mapId id of map
* @apiSuccess {json} map  all poins with hex positions.
*/

router.get('/map/:id', function(req,res){
  res.status(200).send({
    mapId: req.params.id,
    map: [{x:0,y:0,v:0},{x:0,y:-1,v:0},{x:0,y:1,v:0},,{x:1,y:-1,v:0},{x:1,y:-1,v:0}]
  });
});


/**
* @api {get} /battle Start battle
* @apiName getBattle
* @apiGroup Game
*
* @apiSuccess {Number} mapId id of map
* @apiSuccess {json} user your info
* @apiSuccess {json} enemy opponent's info
*/


router.get('/battle', function(req, res){
  res.status(200).send({
    user: {
      id: req.body.id,
      username: req.body.username
    },
    enemy: {
      id: req.body.id+1,
      username: req.body.username
    },
    mapId: 1
  });
});


/**
* @api {get} /battle/:gameId Register action
* @apiName Register
* @apiGroup Auth
*
* @apiParam {String} username Username
* @apiParam {String} password Password
* @apiSuccess {json} status Status of operation
* @apiSuccess {json} user User info (if status ok)
* @apiSuccess {json} token User's token (if status ok)
*/

router.get('/battle/:gameId', function(req, res){
  res.status(200).send({
    updatedFields: [{x:0,y:0,v:1}]
  });
});

//router.post();

module.exports = router;