
      'use strict';module.exports = {up: function (q, s, d) {q.bulkInsert('Maps', [{
        description: 'secondMap',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(id => {q.bulkInsert('MapData',[{
        MapId: id,
        i: 0,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 1,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 1,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 6,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 6,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 5,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 5,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 6,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 6,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(()=>{d();});});}};
    