'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'test',
      password: '$2a$10$3.YGiknAFfM0FvzdPz2OYO08sCLBXKtTr71i9EXD2b5SvOy5WM/py',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'admin',
      password: '$2a$10$3.YGiknAFfM0FvzdPz2OYOdm9nfv4bl6SPGzWg0lwJpxT3jRDa.xO',
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: true
    }]);
  }
};
