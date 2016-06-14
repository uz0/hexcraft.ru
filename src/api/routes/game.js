'use strict';

const Game = require('../game');
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
 * @apiSuccess {Object}       player2             Depending on situation, can be second player details or Null (if game not started)
 * @apiSuccess {Object}       Map                 Game's map data, including MapData (array of valid cells in the map).
 * @apiSuccess {Number}       Map.id
 * @apiSuccess {String}       Map.description
 * @apiSuccess {Date}         Map.createdAt
 * @apiSuccess {Date}         Map.updatedAt
 * @apiSuccess {Object[]}     Map.MapData
 * @apiSuccess {Number}       Map.MapData.id
 * @apiSuccess {String}       Map.MapData.cellstate
 * @apiSuccess {Number}       Map.MapData.i
 * @apiSuccess {Number}       Map.MapData.j
 * @apiSuccess {Date}         Map.MapData.createdAt
 * @apiSuccess {Date}         Map.MapData.updatedAt
 * @apiSuccess {Number}       Map.MapData.MapId
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
 * @apiDescription Gets an array with object, that contain
 * data about all finished and unfinished games.
 *
 * @apiGroup Game
 *
 * @apiSuccess {Object[]} All games
 */

router.get('/', function(req, res) {
  let games = Game.findAll();
  res.send(games);
});


/**
 * @api {post} /games Start game
 * @apiName startGame
 * @apiDescription Starts a game for the user. Finds games that don't have
 * a second player or if none were found, creates a new one and returns the instance.
 *
 * @apiGroup Game
 * @apiPermission user
 *
 * @apiParam {String} token Token
 *
 * @apiUse gameDetails
 */

router.post('/', isAuthed, function(req, res) {
  Game.create(req.user, game => {
    res.send(game);
  });
});


/**
 * @api {get} /games/:id Get game details
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
 * @apiDescription Send updated fields. Updates will be SSE'd at /games/:id/loop
 *
 * @apiGroup Game
 * @apiPermission user
 *
 * @apiParam {String} token Token
 * @apiParam {Number} id Game's Id
 *
 * @apiError (400) {String} error Error description
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

  game.step(step, req.user, message => {
    let error = new Error(message);
    error.status = 400;
    next(error);
  });

  res.send({});
});


/**
 * @api {get} /games/:id/loop Game loop
 * @apiName gameLoop
 * @apiDescription This loop uses Server Sent Events to push updates to all clients
 * when a move happens. Only valid moves are pushed. Several events can happen during
 * one move, i.e. step, chip, owner or over action. All will be sent seperately: one action, one event.
 *
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 *
 * @apiSuccessExample Step (chip move):
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
 *
 * @apiSuccessExample Chip (new chip on field):
  {
    "event": "chip",
    "data":{
      "i":4,
      "j":2
    },
    "user":{
      "id":6,
      "username":"asd",
      "admin":null,
      "createdAt":"2016-05-16T18:28:29.456Z",
      "updatedAt":"2016-05-16T18:28:29.456Z"
    }
  }
 *
 * @apiSuccessExample Owner (change owner):
  {
    "event":"owner",
    "data":[
      {
        "id":346,
        "i":3,
        "j":2,
        "cellstate": "player1",
        "createdAt": "2016-05-14T20:41:02.031Z",
        "updatedAt": "2016-05-14T20:41:02.031Z",
        "MapId":5
      }
    ],
    "user":{
      "id":6,
      "username":"asd",
      "admin":null,
      "createdAt":"2016-05-16T18:28:29.456Z",
      "updatedAt":"2016-05-16T18:28:29.456Z"
    }
  }
 *
 * @apiSuccessExample Started (second player connection):
  {
    "event": "started",
    "user":{
      "id":2,
      "username":
      "test",
      "admin":null,
      "createdAt":"2016-05-11T21:40:57.876Z",
      "updatedAt":"2016-05-11T21:40:57.876Z"
    }
  }
 *
 * @apiSuccessExample Over (game over):
  {
    "event":"over"
  }
 */

router.get('/:id/loop', sse, function(req, res) {
  const gameId = req.params.id;
  Game.on(gameId, data => {
    data = JSON.stringify(data);
    res.sse(`data: ${data}\n\n`);
  });
});


/**
 * @api {post} /games/:id/surrender Surrender
 * @apiName surrender
 * @apiDescription To quit the game, post to here, and you will surrender and the game will end
 *
 * @apiGroup Game
 * @apiPermission user
 *
 * @apiParam {String} token Token
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
