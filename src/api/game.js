'use strict';

var models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
var express = require('express');
var router = express.Router();

/**
 * @api {get} /map Get all available maps
 * @apiName getMaps
 * @apiGroup Game
 *
 * @apiSuccess {Object} maps Array of all maps
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
 * @apiSuccess {Object} map All poins with hex positions.
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
 * @api {get} / get list games
 * @apiName getGame
 * @apiGroup Game
 *
 */

router.get('/', isAuthed, function(req, res) {
  models.Game.findAll().then(function(games) {
    res.send(games);
  });
});


/**
 * @api {post} / Start game
 * @apiName startGame
 * @apiGroup Game
 *
 * @apiSuccess {Number} mapId Id of map
 * @apiSuccess {Object} user Your info
 * @apiSuccess {Object} enemy Opponent's info
 * @paiSuccess {Object} map Game's map
 */


router.post('/', isAuthed, function(req, res) {

  models.Token.findOne({
    include: [models.User],
    where: {
      token: token
    }
  }).then(result => {
    var user = result.User;
    models.Game.findAll({where: {player2: null}}).then(games => {
    if (!games){
      models.Game.create({
        levelId:1,
        player1: user.id,
        stage:'Not started'
      }).then(game => {

        res.send({
        'game':game
        });
      });
      }
    else{
        var g = games[0];
        g.player2 = user.id;
        g.stage = 'Started';
        g.save().then(function(){
          res.send({
            'game':g
          });
        });
      }
    });
  });
});


/**
 * @api {get} /:gameId
 * @apiName gameUpdate
 * @apiGroup Game
 *
 * @apiParam {Number} gameId Game's Id
 * @apiSuccess {Object} updatedFields hexes that have changed
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
 * @apiParam {Object} updatedFields Fields that have changed
 */

router.post('/:gameId', function(req, res) {
  res.status(200).send();
});

module.exports = router;
