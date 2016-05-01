'use strict';

const models = require('./models');
const isAuthed = require('./middlewares/isAuthed');
const express = require('express');
const router = module.exports = express.Router();
const NodeCache = require("node-cache");
var cache = new NodeCache({ stdTTL: 86400 });


/**
 * @api {get} /games get list games
 * @apiName getGames
 * @apiGroup Game
 *
 */

router.get('/', function(req, res) {
  models.Game.findAll({ where: { stage: { $ne: 'Over' } } }).then(games => {
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

router.get('/:id', isAuthed, function(req, res) {
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
  let data = cache.get(req.params.id, true);
  if (data == undefined){
    res.send('No game with that id found');
    return;
  }

});
