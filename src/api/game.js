'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const stepValidation = require('./middlewares/stepValidation');
const rebuildMap = require('./middlewares/rebuildMap');
const express = require('express');
const router = module.exports = express.Router();
const storage = require('memory-store');

const events = require('events');
let emitter = new events.EventEmitter();
let onlineUsers = [];

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
        $ne: 'Over' // not equals
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
    where: {
      player2: null
    },
    include: [{
      model: models.Map,
      include: [{
        model: models.MapData
      }]
    }]
  }).then(games => {
    if (!games.length) {
      models.Game.create({
        mapId: 1,
        player1: user.id,
        stage: 'not started'
      }).then(game => {
        storage.set(game.id, game);
        res.send(game);
      });

      return;
    }

    let game = games[0];
    game.player2 = user.id;
    game.stage = 'started';
    game.save().then(() => {
      storage.set(game.id, game);

      emitter.emit('message', {
        event: 'started',
        user: req.user
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
  let game = storage.get(req.params.id);
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
  let game = storage.get(gameId);

  if (!game) {
    let error = new Error('game not found');
    error.status = 400;
    return next(error);
  }

  if (game.player1 !== req.user.id && game.player2 !== req.user.id){
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
  storage.set(gameId, game);

  emitter.emit('message', {
    event: 'step',
    step: step,
    user: req.user
  });

  res.send();
});

/**
 * @api {get} /games/loop/:id
 * @apiName gameLoop
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 */

router.get('/loop/:id', isAuthed, function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');

  onlineUsers.push(req.user);

  emitter.on('message', data => {
    res.write('id: ' + Date.now() + '\n');
    res.write('data: ' + JSON.stringify(data) + '\n\n');
    res.flushHeaders();
  });

  req.on('close', () => {
    onlineUsers = onlineUsers.filter(user => user !== req.user);
  });
});