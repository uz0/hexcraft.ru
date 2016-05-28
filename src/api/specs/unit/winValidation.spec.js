'use strict';

const expect = require('expect.js');
const winValidation = require('../../game/winValidation.js');

// no empty cellstate (p1 win)
// all cellstates equal p1
// mapData without free empty cellstate for p1 chip

describe('winValidation', () => {
  it('check player1 win', () => {
    winValidation({
      data: {
        player1: 'player1',
        player2: 'player2',
        Map: {
          MapData: [{
            cellstate: 'player1'
          },{
            cellstate: 'player1'
          },{
            cellstate: 'player2'
          }]
        }
      },
      over: looser => {
        expect(looser).not.to.equal('player1');
      }
    });
  });
});