'use strict';

const Game = require('../game/game.class');
const isAuthed = require('../middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const sse = require('server-sent-events');


/**
 * @api {get} /games get List all games
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
 * @apiDescription Starts a game for the user. Finds games that don't have a second player, or, if none were found, creates a new one and returns the instance. 
 * @apiSuccess {Number} id UUID of game.
 * @apiSuccess {String} stage Staage the game is in. Can be "not started", "started", "over".
 * @apiSuccess {Object} player1 Depending on situation, can be either your info or your oponent's.
 * @apiSuccess {Object} player2 Depending on situation, can be either your info or your oponent's.
 * @paiSuccess {Object} map Game's map data, including MapData (array of valid cells in the map).
 * @apiSuccess {Array} gameSteps steps that were already taken in the game. Used to recreate the map.
 * @apiSuccessExample Create game:
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
          },
          ...
        ]
      },
      "player1": {
        "id": 3,
        "username": "admin",
        "admin": true
      },
      "player2": null,
      "gameSteps": []
    }
 * @apiSuccessExample Connect to a game:
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
          },
          ...
        ]
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
      "gameSteps": []
    }
 */

router.post('/', isAuthed, function(req, res) {
  Game.create(req.user, game => {
    res.send(game);
  });
});


/**
 * @api {get} /games/:id
 * @apiName gameUpdate
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiSuccess {Object} updatedFields hexes that have changed
 */

router.get('/:id', function(req, res) {
  const gameId = req.params.id;
  let game = Game.findOne(element => {
    return element.data.id === gameId;
  });

  res.send(game);
});


/**
 * @api {post} /games/:id
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiDescription Send updeted fields. Only a 400 status will always return. Updates will be SSE'd at /games/:id/loop
 * @apiParam {Number} id Game's Id
 * @apiParam {Object} updatedFields Fields that have changed
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
 * @api {get} /games/:id/loop
 * @apiName gameLoop
 * @apiGroup Game
 *
 * @apiDescription This loop uses Server Sent Events to push updates to both clients when a move happens. Only valid moves are pushed. Several events can happen during one move, i.e. move, clone, capture action. All will be sent seperately: one action, one event.
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
 * @apiParam {Number} id Game's Id
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
 * @api {post} /games/:id/surrender
 * @apiName surrender
 * @apiGroup Game
 *
 * @apiDescription To quit the game, post to here, and you will surrender and the game will end
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
