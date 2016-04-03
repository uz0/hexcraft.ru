'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('News', {
        title: Sequelize.STRING,
        content: Sequelize.STRING
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('News');
  }
};
