'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Games', [{
      player1: 1,
      stage: 'Not started',
      MapId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
};
