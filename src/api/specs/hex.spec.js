'use strict';

const expect = require('expect.js');
const Hex = require('../game/hex.js');

const array = [{
  i: 4,
  j: 0
},{
  i: 3,
  j: 0
},{
  i: 3,
  j: 1
},{
  i: 2,
  j: 1
},{
  i: 3,
  j: 2
},{
  i: 5,
  j: 2
},{
  i: 4,
  j: 1
},{
  i: 4,
  j: 2
},{
  i: 5,
  j: 0
},{
  i: 5,
  j: 1
},{
  i: 3,
  j: 3
}];

describe('Hex', () => {
  describe('findByIndex', () => {
    it('equal', () => {
      let present = Hex.findByIndex(array, array[0].i, array[0].j);

      expect(present).to.equal(array[0]);
    });

    it('not_equal', () => {
      let notPresent = Hex.findByIndex(array, 99, 99);

      expect(notPresent).to.not.be.ok();
    });

  });

  it('findNeighbors', () => {
    let neighbors = Hex.findNeighbors(array, array[0].i, array[0].j);

    // I GUARANTEE IT!!!
    expect(neighbors.length).to.be(4);
  });

  it('findNeighborsNeighbors', () => {
    let neighborsNeighbors = Hex.findNeighborsNeighbors(array, array[0].i, array[0].j);

    expect(neighborsNeighbors.length).to.be.above(array.length-1);
  });
});