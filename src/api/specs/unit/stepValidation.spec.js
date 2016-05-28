'use strict';

const expect = require('expect.js');
const stepValidation = require('../../game/stepValidation.js');


describe('stepValidation', () => {
  it('check wrong user', () => {
    stepValidation( {
      player1: {
        id: 1
      },
      player2: {
        id: 2
      }
    }, {
      userId: 3
    }, (error, code) => {
      expect(code).to.be(1);
    });
  });



  it('step order', () => {
    stepValidation( {
      player1: {
        id: 1
      },
      player2: {
        id: 2
      },
      gameSteps:[{
        current:{
          i: 2,
          j: 0
        },
        old:{
          i: 1,
          j: 0
        },
        userId: 2
      }]
    }, {
      userId: 1
    }, (error, code) => {
      expect(code).to.be(2);
    });
  });



  it('check owner', () => {
    stepValidation( {
      player1: {
        id: 1
      },
      player2: {
        id: 2
      },
      gameSteps:[{
        current:{
          i: 2,
          j: 0
        },
        old:{
          i: 1,
          j: 0
        },
        userId: 2
      }, {
        current:{
          i: 5,
          j: 0
        },
        old:{
          i: 3,
          j: 0
        },
        userId: 2
      }],
      Map: {
        MapData: [{
          i: 1,
          j: 0,
          cellstate: 'player2'
        }]
      }
    }, {
      old: {
        i: 1,
        j: 0
      },
      userId: 1
    }, (error, code) => {
      expect(code).to.be(3);
    });
  });



  it('check for collisions', () => {
    stepValidation( {
      player1: {
        id: 1
      },
      player2: {
        id: 2
      },
      gameSteps:[{
        current:{
          i: 2,
          j: 0
        },
        old:{
          i: 1,
          j: 0
        },
        userId: 2
      }, {
        current:{
          i: 5,
          j: 0
        },
        old:{
          i: 3,
          j: 0
        },
        userId: 2
      }],
      Map: {
        MapData: [{
          i: 1,
          j: 0,
          cellstate: 'player2'
        }, {
          i: 5,
          j: 0,
          cellstate: 'player2'
        }]
      }
    }, {
      old: {
        i: 1,
        j: 0
      },
      current: {
        i: 5,
        j: 0
      },
      userId: 2
    }, (error, code) => {
      expect(code).to.be(4);
    });
  });



  it('check for distance', () => {
    stepValidation( {
      player1: {
        id: 1
      },
      player2: {
        id: 2
      },
      gameSteps:[{
        current:{
          i: 2,
          j: 0
        },
        old:{
          i: 1,
          j: 0
        },
        userId: 2
      }, {
        current:{
          i: 5,
          j: 0
        },
        old:{
          i: 3,
          j: 0
        },
        userId: 2
      }],
      Map: {
        MapData: [{
          i: 1,
          j: 0,
          cellstate: 'player2'
        }, {
          i: 5,
          j: 0,
          cellstate: 'empty'
        }, {
          i: 10,
          j: 0,
          cellstate: 'empty'
        }]
      }
    }, {
      old: {
        i: 1,
        j: 0
      },
      current: {
        i: 10,
        j: 0
      },
      userId: 2
    }, (error, code) => {
      expect(code).to.be(5);
    });
  });
});