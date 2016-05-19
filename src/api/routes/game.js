'use strict';

const Game = require('../game/game.class');
const isAuthed = require('../middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const sse = require('server-sent-events');

/**
 * @apiDefine gameDetails
 *
 * @apiSuccess {String}       id                  UUID of game.
 * @apiSuccess {String}       stage               Stage the game is in. Can be "not started", "started", "over player1" and "over player2".
 * @apiSuccess {Object}       player1             First player details
 * @apiSuccess {Object} player2             Depending on situation, can be second player details or Null (if game not started)
 * @paiSuccess {Object}       map                 Game's map data, including MapData (array of valid cells in the map).
 * @paiSuccess {Number}       map.id
 * @paiSuccess {String}       map.description
 * @paiSuccess {Date}         map.createdAt
 * @paiSuccess {Date}         map.updatedAt
 * @paiSuccess {Object[]}     map.MapData
 * @paiSuccess {Number}       map.MapData.id
 * @paiSuccess {String}       map.MapData.cellstate
 * @paiSuccess {Number}       map.MapData.i
 * @paiSuccess {Number}       map.MapData.j
 * @paiSuccess {Date}         map.MapData.createdAt
 * @paiSuccess {Date}         map.MapData.updatedAt
 * @paiSuccess {Number}       map.MapData.MapId
 * @apiSuccess {Object[]}     gameSteps           Contain all game steps with player id
 * @apiSuccess {Object}       gameSteps.current
 * @apiSuccess {Number}       gameSteps.current.i
 * @apiSuccess {Number}       gameSteps.current.j
 * @apiSuccess {Object}       gameSteps.old
 * @apiSuccess {Number}       gameSteps.old.i
 * @apiSuccess {Number}       gameSteps.old.j
 *
 * @apiSuccessExample Without second player
    {

      "id": "630444ed-037e-43b0-a558-32eb8c5a7278",
      "stage": "not started",
      "Map": {
        "id": 3,
        "description": "11111",
        "MapData": [{
          "i": 4,
          "j": 0,
          "cellstate": "empty",
          "MapId": 3
        }]
      },
      "player1": {
        "id": 3,
        "username": "admin",
        "admin": true
      },
      "player2": null,
      "gameSteps": []
    }
 *
 * @apiSuccessExample With second player and game steps
    {
      "id": "630444ed-037e-43b0-a558-32eb8c5a7278",
      "stage": "started",
      "Map": {
        "id": 3,
        "description": "11111",
        "MapData": [{
          "i": 4,
          "j": 0,
          "cellstate": "empty",
          "MapId": 3
        }]
      },
      "player1": {
        "id": 3,
        "username": "admin",
        "admin": true
      },
      "player2": {
        "id": 2,
        "username": "test",
        "admin": null
      }
      "gameSteps":[{
          "current":{
             "i":2,
             "j":0
          },
          "old":{
             "i":1,
             "j":0
          },
          "userId":2
       }]
    }
 */

/**
 * @api {get} /games All games
 * @apiName getGames
 * @apiGroup Game
 *
 */

router.get('/', function(req, res) {
  let games = Game.findAll();
  res.send(games);
});


/**
 * @api {post} /games Start game
 * @apiName startGame
 * @apiGroup Game
 *
 * @apiDescription Starts a game for the user. Finds games that don't have
 * a second player or if none were found, creates a new one and returns the instance.
 *
 * @apiUse gameDetails
 */

router.post('/', isAuthed, function(req, res) {
  Game.create(req.user, game => {
    res.send(game);
  });
});


/**
 * @api {get} /games/:id Get game
 * @apiName getGame
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 *
 * @apiUse gameDetails
 */

router.get('/:id', function(req, res) {
  const gameId = req.params.id;
  let game = Game.findOne(element => {
    return element.data.id === gameId;
  });

  res.send(game);
});


/**
 * @api {post} /games/:id Game step
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiDescription Send updeted fields. Updates will be SSE'd at /games/:id/loop
 * @apiParam {Number} id Game's Id
 */

router.post('/:id', isAuthed, function(req, res, next) {
  const gameId = req.params.id;
  const step = req.body.step;

  let game = Game.findOne(element => {
    return element.data.id === gameId;
  });

  if (!game) {
    let error = new Error('game not found');
    error.status = 400;
    return next(error);
  }

  game.step(step, req.user, stepError => {
    let error = new Error(stepError);
    error.status = 400;
    next(error);
  });

  res.send({});
});


/**
 * @api {get} /games/:id/loop Game loop
 * @apiName gameLoop
 * @apiGroup Game
 *
 * @apiDescription This loop uses Server Sent Events to push updates to both clients
 * when a move happens. Only valid moves are pushed. Several events can happen during
 * one move, i.e. move, clone, capture action. All will be sent seperately:
 * one action, one event.
 *
 * @apiParam {Number} id Game's Id
 *
 * @apiSuccessExample Step:
 {
   "event": "step",
   "data": {
     "current": {
       "i": 7,
       "j": 1
     },
     "old": {
       "i": 8,
       "j": 1
     },
     "userId": 1
   },
   "user": {
     "id": 1,
     "username": "test",
     "admin": null
   }
 }
 */

router.get('/:id/loop', sse, function(req, res) {
  const gameId = req.params.id;
  Game.on(gameId, data => {
    console.log("%j", data);
    data = JSON.stringify(data);
    res.sse(`data: ${data}\n\n`);
  });
});


/**
 * @api {post} /games/:id/surrender Surrender
 * @apiName surrender
 * @apiGroup Game
 *
 * @apiDescription To quit the game, post to here, and you will surrender and the game will end
 *
 * @apiParam {Number} id Game's Id
 */

router.post('/:id/surrender', isAuthed, function(req, res, next) {
  const gameId = req.params.id;

  let game = Game.findOne(element => {
    return element.data.id === gameId;
  });

  if (!game) {
    let error = new Error('game not found');
    error.status = 400;
    return next(error);
  }

  game.over(req.user);

  res.send({});
});
