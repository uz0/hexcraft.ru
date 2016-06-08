'use strict';

const expect = require('expect.js');
const request = require('supertest');
const app = require('../');

const url = '/api/maps';
const map = {
  description: 'test',
  i: 1,
  j: 3,
  cellstate: 'empty'
};
let id;

describe('Maps', () => {
  before(app.init);
  before(app.auth);

  it('create', done => {
    request(app.server)
      .post(url)
      .send({
        token: app.adminToken,
        description: map.description,
        MapData: [{
          i: map.i,
          j: map.j,
          cellstate: map.cellstate
        }]
      })
      .expect(res => {
        id = res.body.id;
        expect(res.body.description).to.be.equal(map.description);
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
        expect(res.body.description).to.be.equal(map.description);
        expect(res.body.MapData[0].i).to.be.equal(map.i);
        expect(res.body.MapData[0].j).to.be.equal(map.j);
        expect(res.body.MapData[0].cellstate).to.be.equal(map.cellstate);
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
          .get(`${url}/${id}`)
          .expect(404, done);
      })   
  });
});
