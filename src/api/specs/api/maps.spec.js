'use strict';

const expect = require('expect.js');
const request = require('supertest');
const app = require('../');

const url = '/api/maps';
var id;
var iCord = 22;

describe('Maps', () => {
  before(app.init);
  before(app.auth);

  it('create', done => {
    request(app.server)
      .post(url)
      .send({
        token: app.adminToken,
        description: 'test',
        MapData: [{
                i: `${iCord}`,
                j: 3,
                cellstate: "empty"
        }]
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
        expect(res.body.MapData[0].i).to.be.equal(iCord);
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
