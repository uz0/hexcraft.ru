'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV;
const configFile = require(path.join(__dirname, '..', '..', '..', 'config', 'config.json'));
const config = (configFile[env])?configFile[env]:configFile.development;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = module.exports = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;