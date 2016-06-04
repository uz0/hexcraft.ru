'use strict';

const expect = require('expect.js');
const request = require('supertest');
const app = require('../');

const url = '/api/user';
const map = {
  description: 'test',
  i: 1,
  j: 3,
  cellstate: 'empty'
};
let id;
describe('Users', () => {
  before(app.init);
  before(app.auth);

  it('create', done => {
    request(app.server)
      .post(url)
      .send({
        username: 'testUsername',
        password: 'testPassword',        
      })
      .expect(res => {
        id = res.body.id;
      })
      .expect(200, done);
  });

  it('get all', done => {
    request(app.server)
      .get(url)
      .expect(res => {
        let item = res.body.filter(item => {
          return item.id === id;
        })[0];

        expect(item).to.be.ok();
      })
      .expect(200, done);
  });

  it('get one', done => {
    request(app.server)
      .get(`${url}/${id}`)
      .expect(res => {
        expect(res.body.username).to.be.equal('testUsername');
        expect(res.body.password).to.be.ok();
      })
      .expect(200, done);
  });

  it('delete', done => {
    request(app.server)
      .delete(`${url}/${id}`)
      .send({
        token: app.adminToken
      })
      .expect(200, done);
  });
});
