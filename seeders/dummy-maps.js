'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.bulkInsert('Maps', [{
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]).then(id => {
      queryInterface.bulkInsert('MapData', [{
        MapId: id,
        x: 1,
        y: 1,
        cellstate:"empty",
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(()=>{
        done();
      });
    });
  }
};
