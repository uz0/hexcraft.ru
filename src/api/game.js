'use strict';
var models = require('./models');
var express = require('express');
var router = express.Router();

/**
 * @api {get} /map Get all available maps
 * @apiName getMaps
 * @apiGroup Game
 * 
 * @apiSuccess {json} maps Array of all maps
 */

router.get('/map', function(req, res) {
  res.status.send({
    maps: [{
      mapId: 1,
      map: [
        { x: 0, y: 0, v: 0 },
        { x: 0, y: -1, v: 0 },
        { x: 0, y: 1, v: 0 },
        { x: 1, y: -1, v: 0 },
        { x: 1, y: -1, v: 0 }
      ]
    }, {
      mapId: 2,
      map: [
        { x: 0, y: 0, v: 0 },
        { x: 0, y: -1, v: 0 },
        { x: 0, y: 1, v: 0 },
        { x: 1, y: -1, v: 0 },
        { x: 1, y: -1, v: 0 }
      ]
    }]
  });
});


/**
 * @api {get} /map/:id Request map info
 * @apiName getMap
 * @apiGroup Game
 *
 * @apiParam {Number} id Map ID.
 *
 * @apiSuccess {Number} mapId Id of map
 * @apiSuccess {json} map All poins with hex positions.
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
 * @api {post} / Start game
 * @apiName startGame
 * @apiGroup Game
 *
 * @apiSuccess {Number} mapId Id of map
 * @apiSuccess {json} user Your info
 * @apiSuccess {json} enemy Opponent's info
 * @paiSuccess {json} map Game's map
 */


router.post('/', function(req, res) {
  res.status(200).send({
    gameId: 1,
    user: {
      id: req.body.id,
      username: req.body.username
    },
    enemy: {
      id: req.body.id + 1,
      username: req.body.username
    },
    map: {
      mapId: req.params.id,
      map: [
        { x: 0, y: 0, v: 0 },
        { x: 0, y: -1, v: 0 },
        { x: 0, y: 1, v: 0 },
        { x: 1, y: -1, v: 0 },
        { x: 1, y: -1, v: 0 }
      ]
    }
  });
});


/**
 * @api {get} /:gameId 
 * @apiName gameUpdate
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

/**
 * @api {post} /:gameId 
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiParam {Number} gameId Game's Id
 * @apiParam {json} updatedFields Fields that have changed
 * @apiSuccess (200) {Nothing}
 */

router.post('/:gameId', function(req, res) {
  res.status(200).send();
});

module.exports = router;
