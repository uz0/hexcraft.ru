'use strict';

const Game = require('../game/game.class');
const isAuthed = require('../middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const sse = require('server-sent-events');


/**
 * @api {get} /games get list games
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
 * @apiSuccess {Number} mapId Id of map
 * @apiSuccess {Object} user Your info
 * @apiSuccess {Object} enemy Opponent's info
 * @paiSuccess {Object} map Game's map
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
 * @apiParam {Number} id Game's Id
 */

router.get('/:id/loop', sse, function(req, res) {
  const gameId = req.params.id;

  Game.on(gameId, data => {
    data = JSON.stringify(data);
    res.sse(`data: ${data}\n\n`);
  });
});


/**
 * @api {post} /games/:id/surrender
 * @apiName surrender
 * @apiGroup Game
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
