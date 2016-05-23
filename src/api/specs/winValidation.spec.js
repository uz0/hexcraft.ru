'use strict';

const expect = require('expect.js');
const winValidation = require('../game/winValidation.js');

const data = {
  player1: 'player1',
  player2: 'player2',
  Map: {
    MapData: [{
      cellstate: 'player1'
    }]
  }
};

describe('winValidation', () => {
  it('check player1 win', () => {
    winValidation({
      data: data,
      over: looser => {
        expect(looser).not.to.equal(data.player1);
      }
    });
  });
});