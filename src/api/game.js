'use strict';

const stepValidation = require('../_shared/game/stepValidation');
const rebuildMap = require('../_shared/game/rebuildMap');
const winValidation = require('../_shared/game/winValidation');
const models = require('./models');
const uuid = require('node-uuid');
const events = require('events');
var emitter = new events.EventEmitter();
var storage = [];

module.exports = class Game {
  constructor(user, callback) {
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

      storage.unshift(this);
      callback(this.data);
    });
  }

  static create(user, callback) {
    let game = Game.findOne(element => !element.data.player2);

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
  }

  static findOne(condition) {
    return storage.find(element => condition(element));
  }

  static findAll(callback) {
    let gameList = [];
    models.Game.findAll({
      order: 'id DESC'
    }).then(games => {
      storage.forEach(game => {
        if(!(game.data.stage.indexOf('over')+1)) { // jshint ignore:line
          gameList.push(game.data);
        }
      });
      games.forEach(game => gameList.push(game));

      callback(gameList);
    });
  }

  static onUpdate(id, callback) {
    emitter.on(id, callback);
  }

  step(step, user, errorCallback) {
    step.userId = user.id;
    let player = (this.data.player1.id === user.id) ? 'player1' : 'player2';

    stepValidation(this.data, step, errorCallback);

    rebuildMap(this.data, step, event => {
      emitter.emit(this.data.id, {
        event: event.name,
        data: event.data,
        user: user,
        player: player
      });
    });

    emitter.emit(this.data.id, {
      event: 'step',
      data: step,
      user: user,
      player: player
    });

    winValidation(this.data.Map.MapData, this.over.bind(this));

    this.data.gameSteps.push(step);
    return;
  }

  over(winner) {
    this.data.stage = `over ${winner}`;

    models.Game.create({
      MapId: this.data.Map.id,
      stage: this.data.stage,
      player1: this.data.player1.username,
      player2: this.data.player2.username
    });

    emitter.emit(this.data.id, {
      event: 'over',
      data: winner
    });
  }

  surrender(user) {
    let winner = (this.data.player1.id === user.id) ? 'player2' : 'player1';
    this.over(winner);
  }
};