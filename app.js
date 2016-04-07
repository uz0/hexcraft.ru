var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var models = require("./src/api/models");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// init routes here
app.use('/users', require('./src/api/users'));
app.use('/news', require('./src/api/news'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

models.sequelize.sync().then(() => {
  var port = process.env.PORT || 3000;
  var server = app.listen(port, () => {
    console.log(`Express server http://localhost:${port}/`);
  });
});

module.exports = app;