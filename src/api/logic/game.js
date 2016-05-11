'use strict';

const stepValidation = require('./stepValidation');
const rebuildMap = require('./rebuildMap');
const models = require('../models');
const uuid = require('node-uuid');
const events = require('events');
var emitter = new events.EventEmitter();
var storage = [];

function Game(user, callback) {
  console.log('>3');
  models.Map.findOne({
    order: [
      models.Sequelize.fn('RANDOM')
    ],
    include: models.MapData
  }).then(map => {
    this.data = {
      id: uuid.v4(),
      stage: 'not started',
      Map: map.dataValues,
      player1: user.dataValues,
      player2: null,
      gameSteps: []
    };

    storage.push(this);
    callback(this.data);
  });
}

module.exports = Game;

// static methods
Game.create = function(user, callback) {
  console.log('>2');
  let game = Game.findOne(element => {
    return !element.data.player2;
  });

  if(!game) {
    game = new Game(user, callback);
  } else {
    game.data.player2 = user.dataValues;
    game.data.stage = 'started';

    emitter.emit(game.data.id, {
      event: 'started',
      user: user
    });

    callback(game.data);
  }
}

Game.findOne = function(condition) {
  return storage.find(element => {
    return condition(element);
  });
}

Game.findAll = function() {
  let games = [];
  storage.forEach(game => {
    games.push(game.data);
  })

  return games;
}

Game.on = function(id, callback) {
  emitter.on(id, callback);
}


Game.prototype.step = function(step, user, errorCallback) {
  step.userId = user.id;

  stepValidation(this.data, step, errorCallback);

  rebuildMap(this.data, step, event => {
    emitter.emit(this.data.id, {
      event: event.name,
      data: event.data,
      user: user
    });
  });


  this.data.gameSteps.push(step);

  emitter.emit(this.data.id, {
    event: 'step',
    data: step,
    user: user
  });

  return;
};