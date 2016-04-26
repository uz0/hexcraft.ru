'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Maps', [{
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
};
