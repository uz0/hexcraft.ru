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

router.get('/map/:id', function(req, res) {
  res.status(200).send({
    mapId: req.params.id,
    map: [
      { x: 0, y: 0, v: 0 },
      { x: 0, y: -1, v: 0 },
      { x: 0, y: 1, v: 0 },
      { x: 1, y: -1, v: 0 },
      { x: 1, y: -1, v: 0 }
    ]
  });
});


/**
 * @api {get} / Start game
 * @apiName getGame
 * @apiGroup Game
 *
 * @apiSuccess {Number} mapId id of map
 * @apiSuccess {json} user your info
 * @apiSuccess {json} enemy opponent's info
 */


router.get('/', function(req, res) {
  res.status(200).send({
    user: {
      id: req.body.id,
      username: req.body.username
    },
    enemy: {
      id: req.body.id + 1,
      username: req.body.username
    },
    mapId: 1
  });
});


/**
 * @api {get} /:gameId 
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiParam {Number} gameId Game's Id
 * @apiSuccess {json} updatedFields hexes that have changed
 */

router.get('/:gameId', function(req, res) {
  res.status(200).send({
    updatedFields: [{ x: 0, y: 0, v: 1 }]
  });
});

//router.post();

module.exports = router;
