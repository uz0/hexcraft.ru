'use strict';

const expect = require('expect.js');
const winValidation = require('../../../_shared/game/winValidation');

// no empty cellstate (p1 win)
// all cellstates equal p1
// mapData without free empty cellstate for p1 chip

describe('winValidation', () => {
  it('no empty cellstates', () => {
    winValidation([{
      cellstate: 'player1'
    },{
      cellstate: 'player2'
    },{
      cellstate: 'player2'
    }], winner => {
      expect(winner).to.be.equal('player2');
    });
  });

  it('no moves', () => {
    winValidation([{
      i: 5,
      j: 0,
      cellstate: 'player1'
    },{
      i: 6,
      j: 0,
      cellstate: 'player1'
    },{
      i: 7,
      j: 0,
      cellstate: 'empty'
    }], winner => {
      expect(winner).to.be.equal('player1');
    });
  });
});