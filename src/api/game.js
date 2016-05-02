'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const cache = require('memory-store');

const sse = require('./middlewares/sse');//подключаем нашу минилибу

var buf_games = {id:0, arr: [x:1, y:1, x1:3, y1:3]}; //объект, 1-айди игры, 2-фишки

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
  res.sseSetup();//создание sse соединения при cтарте игры
  const user = req.user;

  models.Game.findAll({
    where: {
      player2: null
    }
  }).then(games => {

    if (!games.length) {
      models.Game.create({
        mapId: 1,
        player1: user.id,
        stage: 'Not started'
      }).then(game => {
        var data = {
          'game': game,
          'p1IP': req.headers['x-forwarded-for']
        };
        cache.set(game.id, data);
        res.send(game);
      });
      return;
    }

    let game = games[0];
    game.player2 = user.id;
    game.stage = 'Started';
    game.save().then(function() {
      var data = cache.get(game.id);
      data.p2IP = req.headers['x-forwarded-for'];
      cache.set(game.id, data);
      res.send({
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
  let data = cache.get(req.params.id);
  if (data === undefined) {
    res.send('No game with that id found');
    return;
  }

});


/**
 * @api {get} /games/loop/:id
 * @apiName gameLoop
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiParam {Object} ??
 */

router.get('/loop/:id', isAuthed, function(req, res) {

  for(let i=0; i<buf_games.length;i++) {
    if(buf_games[i].id===req.params.id) {
      sseSend(buf_games[i].arr);
      delete(buf_games[i]);
    }
  }

});
