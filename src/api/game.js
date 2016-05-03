'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const cache = require('memory-store');

const events = require('events');
const emitter = new events.EventEmitter();

const sse = require('server-sent-events');

const validStep = require('./middlewares/validStep');

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

router.post('/', isAuthed, sse, function(req, res) {

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
        stage: 'Not started'
      }).then(game => {
        var gameData = {
          'game': game,
          'p1': req.body.token
        };
        cache.set(game.id, gameData);
        res.sse(game);
      });
      return;
    }

    let game = games[0];
    game.player2 = user.id;
    game.stage = 'Started';
    game.save().then(function() {
      var gameData = cache.get(game.id);
      gameData.p2 = req.body.token;
      cache.set(game.id, gameData);
      res.sse({
        'game': game
      });
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
  models.Game.findOne({
    include: [{
      model: models.Map,
      include: [models.MapData]
    }],
    where: {
      id: req.params.id
    }
  }).then(game => {
    res.send(game);
  });
});

/**
 * @api {post} /games/:id
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiParam {Object} updatedFields Fields that have changed
 */

router.post('/:id', isAuthed, function(req, res) {
  var gameData = cache.get(req.params.id);
  
  if (gameData === undefined) {
    res.send('No game with that id found');
    return;
  }
  
  if (! (gameData.p1 === req.body.token || gameData.p2 === req.body.token)){
    return;
  }

  if (validStep(gameData.game, req.body.updatedField)) {
    gameData.game.step.unshift(req.body.updatedField);
    cache.set(req.params.id, gameData);
    emitter.emit('game' + req.params.id, req.body.updatedField);
  }

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

  emitter.on('message', data => {
    data.user = req.user;

    res.write('id: ' + Date.now() + '\n');
    res.write('data: ' + JSON.stringify(data) + '\n\n');
    res.flushHeaders();
  });
});

/**
 * @api {get} /games/:id/stream
 * @apiName gameStream
 * @apiGroup Game
 * 
 * 
 * @apiParam {Number} id Game's Id
 *
 */

router.get('/:id/stream', isAuthed, sse, function(req, res) {

  emitter.on('game' + req.params.id, emmitterData => {
    var gameData = cache.get(req.params.id);
    if (gameData === undefined) {
      return;
    }

    res.sse(gameData.game.step[0]);

  });

});