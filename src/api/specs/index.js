'use strict';

const server = require('../../../');
const models = require('../models');
const request = require('supertest');

var app = module.exports;
app.server = server;
app.adminToken = false;
app.inited = false;

app.init = done => {
  if(app.inited) {
    done();
    return;
  }

  models.sequelize.sync().then(() => {
    models.User.findAll().then(users => {

      // if db empty insert users test:test and admin:admin
      // TODO: call method for user creation instead bulkCreate
      if(!users.length) {
        return models.User.bulkCreate([{
          username: 'test',
          password: '$2a$10$3.YGiknAFfM0FvzdPz2OYO08sCLBXKtTr71i9EXD2b5SvOy5WM/py',
        }, {
          username: 'admin',
          password: '$2a$10$3.YGiknAFfM0FvzdPz2OYOdm9nfv4bl6SPGzWg0lwJpxT3jRDa.xO',
          admin: true
        }]).then(() => {
          done();
          app.inited = true;
        });
      }

      done();
      app.inited = true;
    });
  });
};

app.auth = done => {
  if(app.adminToken) {
    done();
    return;
  }

  request(app.server)
    .post('/api/auth/login')
    .send({
      username: 'admin',
      password:  'admin'
    })
    .expect(res => {
      app.adminToken = res.body.token;
    })
    .expect(200, done);
};