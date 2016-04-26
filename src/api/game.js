'use strict';

  
const models = require('./models'); 
const isAuthed = require('./middlewares/isAuthed'); 
const express = require('express'); 
const router = module.exports = express.Router();


/**
 * @api {get} / get list games
 * @apiName getGames
 * @apiGroup Game
 *
 */

router.get('/', function(req, res) {
  models.Game.findAll().then(games => {
    res.send(games);
  });
});


/**
 * @api {post} / Start game
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

    if (!games.length){
      models.Game.create({
        levelId: 1,
        player1: user.id,
        stage: 'Not started'
      }).then(game => {
        res.send(game);
      });
      return;
    }

    let game = games[0];
    game.player2 = user.id;
    game.stage = 'Started';
    game.save().then(function(){
      res.send({
        'game': game
      });
    });

  });

});


/**
 * @api {get} /:id
 * @apiName gameUpdate
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiSuccess {Object} updatedFields hexes that have changed
 */

router.get('/:id', function(req, res) {
  res.send({
    updatedFields: [{ x: 0, y: 0, v: 1 }]
  });
});

/**
 * @api {post} /:id
 * @apiName gameStep
 * @apiGroup Game
 *
 * @apiParam {Number} id Game's Id
 * @apiParam {Object} updatedFields Fields that have changed
 */

router.post('/:id', function(req, res) {
  res.send();
});