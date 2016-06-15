'use strict';

const stepValidation = require('../_shared/game/stepValidation');
const rebuildMap = require('../_shared/game/rebuildMap');
const winValidation = require('../_shared/game/winValidation');
const models = require('./models');
const uuid = require('node-uuid');
const events = require('events');
var emitter = new events.EventEmitter();
var storage = [];

function Game(user, callback) {
  models.Map.findOne({
    // order: [
    //   models.Sequelize.fn('RANDOM')
    // ],
    include: models.MapData
  }).then(map => {
    this.data = {
      id: uuid.v4(),
      stage: 'not started',
      Map: map.dataValues,
      player1: user,
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
  let game = Game.findOne(element => {
    return !element.data.player2;
  });

  if (!game) {
    game = new Game(user, callback);
  }

  if (game.data && game.data.player1.id !== user.id) {
    game.data.player2 = user;
    game.data.stage = 'started';

    emitter.emit(game.data.id, {
      event: 'started',
      user: user
    });

    callback(game.data);
  }
};

Game.findOne = function(condition) {
  return storage.find(element => {
    return condition(element);
  });
};

Game.findAll = function() {

  let games = [];
  storage.forEach(game => {

    games.push(game.data);

  });

  models.Game.findAll().then(games => {

    let strippedGame = {};
    strippedGame.player1 = games.player1;
    strippedGame.player2 = games.player2;
    strippedGame.stage = games.stage;
    games.push(strippedGame);

  });

  return games;
};

Game.on = function(id, callback) {
  emitter.on(id, callback);
};


Game.prototype.step = function(step, user, errorCallback) {
  step.userId = user.id;
  let player = (this.data.player1.id === user.id) ? 'player1' : 'player2';

  stepValidation(this.data, step, errorCallback);

  emitter.emit(this.data.id, {
    event: 'step',
    data: step,
    user: user,
    player: player
  });

  rebuildMap(this.data, step, event => {
    emitter.emit(this.data.id, {
      event: event.name,
      data: event.data,
      user: user,
      player: player
    });
  });

  winValidation(this.data.Map.MapData, this.over.bind(this));

  this.data.gameSteps.push(step);
  return;
};


Game.prototype.over = function(user) {
  let winner = (this.data.player1.id === user.id) ? 'player1' : 'player2';
  this.data.stage = `over ${winner}`;

  emitter.emit(this.data.id, {
    event: 'over',
    data: winner
  });
};


Game.prototype.surrender = function(user) {
  let winner = (this.data.player1.id === user.id) ? this.data.player2 : this.data.player1;
  this.over(winner);
};
