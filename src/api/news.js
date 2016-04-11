'use strict';
var models = require('./models');
var express = require('express');

var router = express.Router();

/**
 * @api {get} / Get all news
 * @apiName getAllNews
 * @apiGroup News
 *
 * @apiSuccess (200) {json} news Array of all news   
 */

router.get('/', function(req, res) {
  models.News.findAll().then(function(news) {
    res.staus(200).json(news);
  });
});

/**
 * @api {post} / Create new news story
 * @apiName createNews
 * @apiGroup News
 *
 * @apiParam {String} token User's token 
 * @apiParam {Boolean} admin If user is admin
 *
 * @apiError (400) {Nothing}
 * @apiSuccess (200) {Nothing} 
 */

router.post('/', function(req, res) {
  if (req.body.token !== 0 && req.body.admin == true) {
    console.log(req.body.userId);
    res.status(400).send({ error: 'wrong user token!' });
    return;
  }

  models.News.create({
    title: req.body.title,
    content: req.body.content
  }).then(function() {
    res.status(200).send();
  });
});

/**
 * @api {delete} /:newsId Delete news story
 * @apiName deleteNews
 * @apiGroup News
 *
 * @apiParam {String} token User's token 
 * @apiParam {Boolean} admin If user is admin
 *
 * @apiError (400) {Nothing}
 * @apiSuccess (200) {Nothing} 
 */

router.delete('/:newsId', function(req, res) {
  if (req.body.userId !== '0' && req.body.admin == true) {
    res.status(400).send({ error: 'wrong user Id!' });
    return;
  }

  models.News.destroy({ where: { id: req.params.newsId } }).then(function() {
    res.status(200).send();
  });
});

module.exports = router;
