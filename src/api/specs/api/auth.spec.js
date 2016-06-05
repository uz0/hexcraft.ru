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
        expect(res.body.id).to.be.ok();
        expect(token).to.be.ok();
        expect(res.body.UserId).to.be.ok();  
        expect(res.body.User).to.be.ok();               
      })
      .expect(200, done);
  });

  it('verify token', done => {
    request(app.server)
      .post(`${url}/verify`)
      .send({
        token: token
      })
      .expect(res => {
        token = res.body.token;
        expect(res.body.id).to.be.ok();
        expect(token).to.be.ok();
        expect(res.body.UserId).to.be.ok();        
        expect(res.body.User).to.be.ok();               
      })
      .expect(200, done);
  });

  it('logout', done => {
    request(app.server)
      .post(`${url}/logout`)
      .send({
        token: token
      })      
      .expect(200, done);
  });
});
