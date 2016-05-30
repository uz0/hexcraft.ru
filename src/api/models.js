'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('./configuration');
let sequelize;

if(config.uri) {
  sequelize = new Sequelize(config.uri, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var db = module.exports = {};

fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
  let model = sequelize.import(path.join(__dirname, 'models', file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
