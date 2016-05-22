'use strict';

const models = require('../models');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = module.exports = express.Router();

/**
 * @apiDefine mapFullInfo
 *
 * @apiSuccess {Number}       id
 * @apiSuccess {String}       description
 * @apiSuccess {Date}         createdAt
 * @apiSuccess {Date}         updatedAt
 * @apiSuccess {Object[]}     MapData
 * @apiSuccess {Number}       MapData.id
 * @apiSuccess {String}       MapData.cellstate
 * @apiSuccess {Number}       MapData.i
 * @apiSuccess {Number}       MapData.j
 * @apiSuccess {Date}         MapData.createdAt
 * @apiSuccess {Date}         MapData.updatedAt
 * @apiSuccess {Number}       MapData.MapId

 */





/**
 * @api {get} /maps Get all maps
 * @apiName getAllMaps
 * @apiGroup Map
 * @apiDescription Returns all available maps with brief information about them.
 *
 * @apiSuccess (200) {Object[]} maps All maps
 * @apiUse mapFullInfo
 * @apiSuccessExample{Object[]} Brief info 
 [
  {
    "id": 2,
    "description": "test",
    "createdAt": "2016-05-17T16:04:57.914Z",
    "updatedAt": "2016-05-17T16:04:57.914Z"
  },
  {
    "id": 1,
    "description": "secondMap",
    "createdAt": "2016-05-17T16:04:57.596Z",
    "updatedAt": "2016-05-17T16:04:57.596Z"
  }
 ]

 */

router.get('/', function(req, res) {
  models.Map.findAll().then(maps => {
    res.send(maps);
  });
});


/**
 * @api {get} /maps/:id Get one map
 * @apiName getMap
 * @apiGroup Map
 * @apiDescription Returns all information about map.
 *
 * @apiSuccess (200) {Object} map Map data
 *
 * @apiSuccessExample{Object []} Map info
 {
  "id": 3,
  "description": "secondMap",
  "createdAt": "2016-05-17T16:39:46.653Z",
  "updatedAt": "2016-05-17T16:39:46.653Z",
  "MapData": [
    {
      "id": 114,
      "i": 0,
      "j": 3,
      "cellstate": "empty",
      "createdAt": "2016-05-17T16:39:46.749Z",
      "updatedAt": "2016-05-17T16:39:46.749Z",
      "MapId": 3
    },
    {
      "id": 167,
      "i": 7,
      "j": 4,
      "cellstate": "empty",
      "createdAt": "2016-05-17T16:39:46.750Z",
      "updatedAt": "2016-05-17T16:39:46.750Z",
      "MapId": 3
    }
  ]
 }
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