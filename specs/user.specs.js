'use strict';

var expect = require('expect.js');
var models = require('../src/api/models');
var User = models.User;

var testName = 'johndoe';
var testPassword = 'test';

describe('User', () => {
  // WORKAROUND wait db connection established
  before((done) => {
    models.sequelize.sync().then(() => {
      done();
    });
  })

  it('create', () => {
    return User.create({
      username: testName,
      password: testPassword
    }).then(user => {
      expect(user.username).to.equal(testName);
    });
  });

  it('delete', () => {
    return User.destroy({
      where: {
        username: testName
      }
    }).then(num => {
      expect(num).to.equal(1);
    });
  });
});
