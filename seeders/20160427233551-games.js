'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Games', [{
      player1: 1,
      player2: null,
      stage: 'Not started',
      createdAt: new Date(),
      updatedAt: new Date(),
      MapId: 1
    }]);
  }
};
