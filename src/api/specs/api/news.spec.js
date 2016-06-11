'use strict';

const expect = require('expect.js');
const request = require('supertest');
const app = require('../');

const url = '/api/news';
var id;

describe('News', () => {
  before(app.init);
  before(app.auth);

  it('create', done => {
    request(app.server)
      .post(url)
      .send({
        token: app.adminToken,
        title: 'test',
        content:  'test content'
      })
      .expect(res => {
        id = res.body.id;
        expect(res.body.content).to.be.equal('test content');
      })
      .expect(200, done);

  });

  it('get', done => {
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

  it('delete', done => {
    request(app.server)
      .delete(`${url}/${id}`)
      .send({
        token: app.adminToken
      })
      .end(() => {
        request(app.server)
          .get(url)
          .expect(res => {
            let item = res.body.filter(item => {
              return item.id === id;
            })[0];

            expect(item).not.to.be.ok();
          })
          .expect(200, done);
      });
  });
});
