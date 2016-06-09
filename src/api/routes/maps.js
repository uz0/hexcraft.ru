'use strict';

const models = require('../models');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = module.exports = express.Router();


/**
 * @api {get} /maps Get all maps
 * @apiName getAllMaps
 * @apiDescription Returns all available maps with brief information about them.
 *
 * @apiGroup Map
 *
 * @apiSuccess (200) {Object[]} maps All maps
 *
 * @apiSuccess {Number}       id
 * @apiSuccess {String}       description
 * @apiSuccess {Date}         createdAt
 * @apiSuccess {Date}         updatedAt
 *
 * @apiSuccessExample{json} Success-Response:
 [
  {
    "id": 2,
    "description": "test",
    "createdAt": "2016-05-17T16:04:57.914Z",
    "updatedAt": "2016-05-17T16:04:57.914Z"
  }
 ]
 *
 */

router.get('/', function(req, res) {
  models.Map.findAll().then(maps => {
    res.send(maps);
  });
});


/**
 * @api {get} /maps/:id Get one map
 * @apiName getMap
 * @apiDescription Returns all information about map.
 *
 * @apiGroup Map
 *
 * @apiParam {Number} id User id
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
 *
 * @apiSuccessExample{json} Map info
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
    }
  ]
 }
 *
 */

router.get('/:id', function(req, res, next) {
  models.Map.findOne({
    include: [ models.MapData ],
    where: {
      id: req.params.id
    }
  }).then(map => {
    if(!map) {
      let error = new Error('Not found.');
      error.status = 404;
      return next(error);
    } 
       
    res.send(map);
  });
});


/**
 * @api {post} /maps Create new map
 * @apiName createMap
 * @apiGroup Map
 * @apiDescription Create a new map.
 *
 * @apiPermission admin
 *
 * @apiParam {String} token User's token
 * @apiParam {String} description Map description
 * @apiParam {Object[]} MapData Map data
 * @apiParam {Number} MapData.i X coord
 * @apiParam {Number} MapData.j Y coord
 * @apiParam {String="empty","player1","player2"} MapData.cellstate Cell type
 *
 * @apiSuccess (200) {Object} map Created item
 * @apiSuccess {Number}       id
 * @apiSuccess {String}       description
 * @apiSuccess {Number} id
 * @apiSuccess {Object[]} MapData Map data
 * @apiSuccess {Number} MapData.id
 * @apiSuccess {Number} MapData.i X coord
 * @apiSuccess {Number} MapData.j Y coord
 * @apiSuccess {Number} MapData.cellstate
 * @apiSuccess {Number} MapData.MapId
 * @apiSuccess {Date}         createdAt
 * @apiSuccess {Date}         updatedAt
 *
 * @apiSuccessExample{json} Map info
 {
  "id": 8,
  "description": " test",
  "MapData": [
    {
      "id": 169,
      "i": 0,
      "j": 3,
      "cellstate": "empty",
      "MapId": 8,
      "updatedAt": "2016-05-22T14:09:07.731Z",
      "createdAt": "2016-05-22T14:09:07.731Z"
    }
  ],
  "updatedAt": "2016-05-22T14:09:07.636Z",
  "createdAt": "2016-05-22T14:09:07.636Z"
}
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
 * @apiDescription Delete a map.
 *
 * @apiPermission admin
 *
 * @apiParam {String} token User's token
 * @apiParam {number} id Map id
 *
 * @apiError (400) {String} error
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