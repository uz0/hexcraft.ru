'use strict';

const models = require('../models');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = module.exports = express.Router();


/**
 * @api {get} /maps Get all maps
 * @apiName getAllMaps
 * @apiGroup Map
 *
 * @apiSuccess (200) {Object[]} maps All maps
 */

router.get('/', function(req, res) {
  models.Map.findAll().then(maps => {
    res.send(maps);
  });
});


/**
 * @api {get} /maps/:id Get all maps
 * @apiName getMap
 * @apiGroup Map
 *
 * @apiSuccess (200) {Object} map Map data
 */

router.get('/:id', function(req, res) {
  models.Map.findOne({
    include: [ models.MapData ],
    where: {
      id: req.params.id
    }
  }).then(map => {
    res.send(map);
  });
});


/**
 * @api {post} /maps Create new map
 * @apiName createMap
 * @apiGroup Map
 *
 * @apiParam {String} token User's token
 * @apiParam {String} description Map description
 * @apiParam {Object[]} MapData Map data
 * @apiParam {Number} MapData.x X coord
 * @apiParam {Number} MapData.y Y coord
 * @apiParam {String="empty","player1","player2"} MapData.cellstate Cell type
 *
 * @apiSuccess (200) {Object} map Created item
 *
 */

router.post('/', isAdmin, function(req, res) {
  let map = req.body;
  delete map.token;

  models.Map.create(map, {
    include: [ models.MapData ]
  }).then(item => {
    res.send(item);
  });
});


/**
 * @api {delete} /maps/:id Delete map
 * @apiName deleteMap
 * @apiGroup Map
 *
 * @apiParam {String} token User's token
 * @apiParam {number} id Map id
 *
 */

router.delete('/:id', isAdmin, function(req, res) {
  models.Map.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
      res.send();
  });
});