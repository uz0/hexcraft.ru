'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const stepValidation = require('./logic/stepValidation');
const rebuildMap = require('./logic/rebuildMap');
const express = require('express');
const router = module.exports = express.Router();
const events = require('events');
const sse = require('server-sent-events');

var storage = {};
let emitter = new events.EventEmitter();


/**
 * @api {get} /games get list games
 * @apiName getGames
 * @apiGroup Game
 *
 */

router.get('/', function(req, res) {
  models.Game.findAll({
    where: {
      stage: {
        $ne: 'over' // not equals
      }
    }
  }).then(games => {
    res.send(games);
  });
});


/**
 * @api {post} /games Start game
 * @apiName startGame
 * @apiGroup Game
 *
 * @apiSuccess {Number} mapId Id of map
 * @apiSuccess {Object} user Your info
 * @apiSuccess {Object} enemy Opponent's info
 * @paiSuccess {Object} map Game's map
 */

router.post('/', isAuthed, function(req, res) {
  const user = req.user;

  models.Game.findAll({
    include: [{
      model: models.Map,
      include: [ models.MapData ]
    }],
    where: {
      player2: null
    }
  }).then(games => {
    if (!games.length) {
      models.Game.create({
        MapId: 1, // TODO random map from map list
        player1: user.id,
        stage: 'not started'
      }).then(game => {

        // WORKAROUND: include MapData not working in create options
        models.Game.findOne({
          include: [{
            model: models.Map,
            include: [ models.MapData ]
          }],
          where: {
            id: game.id
          }
        }).then(game => {
          game.gameSteps = []; // store game steps
          storage[game.id] = game;
          res.send(game);
        });
      });

      return;
    }

    let game = games[0];
    game.player2 = user.id;
    game.stage = 'started';
    game.save().then(() => {
      storage[game.id] = game;

      emitter.emit(`game${game.id}`, {
        event: 'started',
        player2: user
      });

      res.send(game);
    });
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
  let game = storage[gameId];
  res.send(game);

});


/**
 * @api {post} /games/:id
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiParam {Object} updatedFields Fields that have changed
 */

router.post('/:id', isAuthed, function(req, res, next) {
  const gameId = req.params.id;
  const step = req.body.step;
  let game = storage[gameId];

  if (!game) {
    let error = new Error('game not found');
    error.status = 400;
    return next(error);
  }

  if (game.player1 !== req.user.id && game.player2 !== req.user.id) {
    let error = new Error('wrong user');
    error.status = 400;
    return next(error);
  }

  let stepError = stepValidation(game, step);
  if (stepError) {
    let error = new Error(stepError);
    error.status = 400;
    return next(error);
  }

  game.Map.MapData = rebuildMap(game, step);
  storage[gameId] = game;

  emitter.emit(`game${gameId}`, {
    event: 'step',
    step: step,
    user: req.user
  });

  res.send();
});


/**
 * @api {get} /games/:id/loop
 * @apiName gameLoop
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 */

router.get('/:id/loop', sse, function(req, res) {
  const gameId = req.params.id;

  emitter.on(`game${gameId}`, data => {
    data = JSON.stringify(data);
    res.sse(`data: ${data}\n\n`);
  });
});
