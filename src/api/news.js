'use strict';
var models = require('./models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  models.News.findAll().then(function(news) {
    res.json(news);
  });
});

router.post('/', function(req, res) {
  if (req.body.userId !== 0) {
    console.log(req.body.userId);
    res.status(500).send({ error: 'wrong user Id!' });
    return;
  }

  models.News.create({
    title: req.body.title,
    content: req.body.content
  }).then(function() {
    res.status(200).send('done');
  });
});

router.delete('/:newsId', function(req, res) {
  if (req.body.userId !== '0') {
    res.status(500).send({ error: 'wrong user Id!' });
    return;
  }

  models.News.destroy({ where: { id: req.params.newsId } }).then(function() {
    res.status(200).send('done');
  });
});

module.exports = router;
