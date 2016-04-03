var models  = require('./models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.News.findAll().then(function(news) {
    res.json(news);
  });
});

module.exports = router;