'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'test',
      password: '$2a$10$3.YGiknAFfM0FvzdPz2OYO08sCLBXKtTr71i9EXD2b5SvOy5WM/py',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
};
