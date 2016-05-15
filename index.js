'use strict';

const express = require('express');
const app = module.exports =  express();
const api = require('./src/api/application');

app.use(express.static('./public'));
api.init(app, function() {
  let port = process.env.PORT || 3000;
  let server = app.listen(port, () => {
    console.log(`Express server http://localhost:${port}/`);
  });
});

// catch 404
app.use(function(req, res) {
  res.status(404)
     .sendFile('public/error.html');
});