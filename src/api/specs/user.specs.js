'use strict';

const expect = require('expect.js');
const models = require('../src/api/models');
const User = models.User;

const testName = 'johndoe';
const testPassword = 'test';

describe('User', () => {
  // WORKAROUND wait db connection established
  before((done) => {
    models.sequelize.sync().then(() => {
      done();
    });
  });

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
