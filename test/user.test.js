'use strict';

var expect = require('expect.js');
var User = require('../src/api/models').User;
var testName = 'johndoe';

describe('User', () => {
  it('create', () => {
    return User.create({ username: testName }).then((user) => {
      expect(user.username).to.equal(testName);
    });
  });

  it('delete', () => {
    return User.destroy({ where: {username: testName} }).then((num) => {
      expect(num).to.equal(1);
    });
  });
});
