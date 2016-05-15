'use strict';

const bodyParser = require('body-parser');
const models = require('./models');
const api = module.exports;

api.init = function(app, ready) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // init routes here
  app.use('/api/users', require('./routes/users'));
  app.use('/api/news', require('./routes/news'));
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/games', require('./routes/game'));
  app.use('/api/maps', require('./routes/maps'));

  // catch 404 and forward to error handler
  app.use('/api/*', function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use('/api/*', function(err, req, res, next) { // jshint ignore:line
    res.status(err.status || 500).send({
      error: err.message
    });
  });

  models.sequelize.sync().then(ready);
};