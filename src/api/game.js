'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const stepValidation = require('./logic/stepValidation');
const rebuildMap = require('./logic/rebuildMap');
const express = require('express');
const router = module.exports = express.Router();
const events = require('events');
const sse = require('server-sent-events');

var storage = require('memory-cache');
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
    },
    limit: 15
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

  // TODO: refactoring
  models.Game.findOne({
    include: [{
      model: models.Map,
      include: [models.MapData]
    }],
    where: {
      player2: null
    }
  }).then(game => {
    if (!game) {
      models.Map.findOne({
        order: [
          models.Sequelize.fn('RANDOM')
        ]
      }).then(result => {
        models.Game.create({
          MapId: result.id,
          player1: user.id,
          stage: 'not started'
        }).then(game => {
          // WORKAROUND: include MapData not working in create options
          models.Game.findOne({
            include: [{
              model: models.Map,
              include: [models.MapData]
            }],
            where: {
              id: game.id
            }
          }).then(game => {
            let pureGame = game.toJSON();

            pureGame.player1 = user;
            pureGame.currentPlayer = user.id;
            pureGame.gameSteps = []; // store game steps
            //pureGame.gameSteps[0] = {"userId":user.id};
            console.log('%j',pureGame);
            storage.put(pureGame.id, pureGame);
            res.send(pureGame);

          });
        });
      });
      return;
    }

    game.player2 = user.id;
    game.stage = 'started';
    game.save().then(() => {
      let storedGame = storage.get(game.id);
      storedGame.player2 = user;
      storedGame.stage = 'started';
      storage.put(storedGame.id, storedGame);

      emitter.emit(`game${storedGame.id}`, {
        event: 'started',
        user: user
      });
      res.send(storedGame);
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
  let game = storage.get(gameId);

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
  step.userId = req.user.id;
  console.log('\n\r\n\r%j\n\r\n\r', game);


  if (!game) {
    let error = new Error('game not found');
    error.status = 400;
    return next(error);
  }

  if (game.player1.id !== req.user.id && game.player2.id !== req.user.id) {
    let error = new Error('wrong user');
    error.status = 400;
    return next(error);
  }
  console.log('\n\r\n\r1\n\r\n\r');
  let last = game.gameSteps.length - 1;
  console.log('%d',last);
  console.log('\n\r\n\r2\n\r\n\r');
  game.lastStepUserId = game.gameSteps[last].userId || game.player2.id;
  console.log('\n\r\n\r3\n\r\n\r');

  let stepError = stepValidation(game, step);
  if (stepError) {
    let error = new Error(stepError);
    error.status = 400;
    return next(error);
  }

  game.Map.MapData = rebuildMap(game, step);
  storage.put(gameId, game);

  emitter.emit(`game${gameId}`, {
    event: 'step',
    data: step,
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
