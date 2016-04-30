const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require("./src/api/models");
const app = module.exports =  express();
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// init routes here
app.use('/api/users', require('./src/api/users'));
app.use('/api/news', require('./src/api/news'));
app.use('/api/auth', require('./src/api/auth'));
app.use('/api/games', require('./src/api/game'));
app.use('/api/maps', require('./src/api/maps'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

models.sequelize.sync().then(() => {
  var port = process.env.PORT || 3000;
  var server = app.listen(port, () => {
    console.log(`Express server http://localhost:${port}/`);
  });
});