'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MapData', [{
      MapId: 1,
      x: 1,
      y: 1,
      cellstate: 'empty',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MapId: 1,
      x: 1,
      y: 2,
      cellstate: 'empty',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MapId: 1,
      x: 1,
      y: 3,
      cellstate: 'empty',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
};
