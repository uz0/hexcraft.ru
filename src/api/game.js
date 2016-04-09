'use strict';
var models = require('./models');
var express = require('express');
var router = express.Router();

/**
* @api {get} game/map/:id Request map info
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
        status: 'ok',
    mapId: req.params.id,
    map: [{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:1,y:-1},{x:1,y:-1}]
  });
});


/**
* @api {get} game/battle start battle
* @apiName getBattle
* @apiGroup Game
*
* @apiSuccess {Number} mapId id of map
* @apiSuccess {json} user your info
* @apiSuccess {json} enemy opponent's info
*/


router.get('/battle', function(req, res){
  res.status(200).send({
    status: 'ok',
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

//router.post();

module.exports = router;