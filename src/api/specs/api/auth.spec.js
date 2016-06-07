'use strict';

const expect = require('expect.js');
const request = require('supertest');
const app = require('../');

const url = '/api/auth';
const testUsername = 'test';
const testPassword = 'test';

let token;
let id;

describe('Users', () => {
  before(app.init);
  before(app.auth);

  it('login', done => {
    request(app.server)
      .post(`${url}/login`)
      .send({
        username: testUsername,
        password: testPassword
      })
      .expect(res => {
        token = res.body.token;
        expect(res.body.User.username).to.be(testUsername);
      })
      .expect(200, done);
  });

  it('verify token', done => {
    request(app.server)
      .post(`${url}/verify`)
      .send({
        token: token
      })
      .expect(200, done);
  });

  it('logout', done => {
    request(app.server)
      .post(`${url}/logout`)
      .send({
        token: token
      })
      .end(() => {
        request(app.server)
          .post(`${url}/verify`)
          .send({
            token: token
          })
          .expect(400, done);
      })
  });

});
