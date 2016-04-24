'use strict';

const models = require('./models');
const isAdmin = require('./middlewares/isAdmin');
const express = require('express');

const router = module.exports = express.Router();

/**
 * @api {get} /news Get all news
 * @apiName getAllNews
 * @apiGroup News
 *
 * @apiSuccess (200) {Object[]} news All news
 */

router.get('/', function(req, res) {
  models.News.findAll().then(news => {
    res.send(news);
  });
});

/**
 * @api {post} /news Create new news story
 * @apiName createNews
 * @apiGroup News
 *
 * @apiParam {String} token User's token
 * @apiParam {String} title News title
 * @apiParam {String} [content] News content
 *
 * @apiSuccess (200) {Object} news Created item
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
 * @api {delete} /news/:id Delete news story
 * @apiName deleteNews
 * @apiGroup News
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