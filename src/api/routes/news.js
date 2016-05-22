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
 *
 * @apiSuccess {Number}       id
 * @apiSuccess {String}       title
 * @apiSuccess {String}       content
 * @apiSuccess {Date}         createdAt
 * @apiSuccess {Date}         updatedAt
 * @apiSuccessExample{json} Success-Response: 
    [
      {
        "id": 1,
        "title": "С другой стороны рамки.",
        "content": "С другой стороны рамки и место обучения кадров способствует подготовки и реализации новых предложений.\n       Таким образом реализация намеченных плановых заданий требуют определения и уточнения дальнейших направлений развития.\n       Значимость этих проблем настолько очевидна, что рамки и место обучения кадров влечет за собой процесс внедрения и модернизации форм развития.\n       Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач.\n       Идейные соображения высшего порядка, а также консультация с широким активом влечет за собой процесс внедрения и модернизации систем массового участия.\n       Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации модели развития.\n       Товарищи! рамки и место обучения кадров представляет собой интересный эксперимент проверки новых предложений.",
        "createdAt": "2016-05-17T16:04:57.380Z",
        "updatedAt": "2016-05-17T16:04:57.380Z"
      }
    ]

 */

router.get('/', function(req, res) {
  models.News.findAll().then(news => {
    res.send(news);
  });
});


/**
 * @api {post} /news Create new news
 * @apiName createNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} token User's token
 * @apiParam {String} title News title
 * @apiParam {String} [content] News content
 *
 * @apiSuccessExample {json} Success-Response:
    {
        "id":4,
        "title":"test",
        "content":"content",
        "updatedAt":"2016-05-11T21:40:57.876Z",
        "createdAt":"2016-05-11T21:40:57.876Z"
    }
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
 * @api {delete} /news/:id Delete news
 * @apiName deleteNews
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