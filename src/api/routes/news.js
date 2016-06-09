'use strict';

const models = require('../models');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = module.exports = express.Router();


/**
 * @api {get} /news Get all news
 * @apiName getAllNews
 * @apiGroup News
 *
 * @apiSuccess (200) {Object[]} news All news
 * @apiSuccess {Number}         news.id
 * @apiSuccess {String}         news.title
 * @apiSuccess {String}         news.content Full news content (with html)
 * @apiSuccess {Date}           news.createdAt
 * @apiSuccess {Date}           news.updatedAt
 *
 * @apiSuccessExample Success-Response:
    [
      {
        "id": 1,
        "title": "С другой стороны рамки.",
        "content": "С другой стороны рамки и место обучения кадров"
        "createdAt": "2016-05-17T16:04:57.380Z",
        "updatedAt": "2016-05-17T16:04:57.380Z"
      }
    ]
 *
 */

router.get('/', function(req, res) {
  models.News.findAll().then(news => {
    if(!news) {
      let error = new Error('Not found.');
      error.status = 404;
      return next(error);
    }    
    res.send(news);
  });
});


/**
 * @api {post} /news Create new news
 * @apiName createNews
 *
 * @apiGroup News
 * @apiPermission admin
 *
 * @apiParam {String} token User's token
 * @apiParam {String} title News title
 * @apiParam {String} [content] News content
 *
 * @apiSuccess {Number}         id
 * @apiSuccess {String}         title
 * @apiSuccess {String}         content Full news content (with html)
 * @apiSuccess {Date}           createdAt
 * @apiSuccess {Date}           updatedAt
 *
 * @apiSuccessExample Success-Response:
    {
        "id":4,
        "title":"test",
        "content":"content",
        "updatedAt":"2016-05-11T21:40:57.876Z",
        "createdAt":"2016-05-11T21:40:57.876Z"
    }
 *
 */

router.post('/', isAdmin, function(req, res) {
  models.News.create({
    title: req.body.title,
    content: req.body.content || ''
  }).then(item => {
    res.send(item);
  });
});


/**
 * @api {delete} /news/:id Delete news
 * @apiName deleteNews
 *
 * @apiGroup News
 * @apiPermission admin
 *
 * @apiParam {String} token User's token
 * @apiParam {number} id News id
 *
 */

router.delete('/:id', isAdmin, function(req, res) {
  models.News.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send();
  });
});