'use strict';
const models = require('./models');
const express = require('express');

const router = module.exports = express.Router();

/**
 * @api {get} / Get all news
 * @apiName getAllNews
 * @apiGroup News
 *
 * @apiSuccess (200) {Object[]} news All news
 */

router.get('/', function(req, res) {
  models.News.findAll().then(news => {
    res.status(200)
       .json(news);
  });
});

/**
 * @api {post} / Create new news story
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

router.post('/', function(req, res) {
  // if (userAdmin) {
  //   return res.status(400)
  //             .send({
  //     error: 'access denied'
  //   });
  // }

  models.News.create({
    title: req.body.title,
    content: req.body.content || ''
  }).then(item => {
    res.status(200)
       .send(item);
  });
});

/**
 * @api {delete} /:id Delete news story
 * @apiName deleteNews
 * @apiGroup News
 *
 * @apiParam {String} token User's token
 * @apiParam {number} id News id
 *
 */

router.delete('/:id', function(req, res) {
  // if (userAdmin) {
  //   return res.status(400)
  //             .send({
  //     error: 'access denied'
  //   });
  // }

  models.News.destroy({
    where: {
      id: req.params.id
      }
    }).then(() => {
      res.status(200)
         .send();
  });
});