
      'use strict';module.exports = {up: function (q, s, d) {q.bulkInsert('Maps', [{
        description: 'myFirstMap',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(id => {q.bulkInsert('MapData',[{
        MapId: id,
        i: 1,
        j: 0,
        cellstate: 'empty',
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
        j: 2,
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
        i: 2,
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
        i: 18,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 2,
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
        i: 3,
        j: 3,
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
        i: 4,
        j: 4,
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
        i: 4,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 5,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 6,
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
        i: 5,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
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
        i: 3,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 14,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 5,
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
        i: 7,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 6,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 1,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 2,
        cellstate: 'player1',
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
        i: 9,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 13,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 1,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 2,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
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
        i: 8,
        j: 1,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 1,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 9,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 19,
        j: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 19,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 11,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 11,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 10,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 10,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 19,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 9,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 19,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 8,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 18,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 19,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 4,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 5,
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
        i: 0,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 8,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 9,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 10,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 10,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 11,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 11,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 1,
        j: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 2,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 3,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 7,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 10,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 15,
        j: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 7,
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
        i: 3,
        j: 6,
        cellstate: 'empty',
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
        i: 9,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 8,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 11,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 12,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 16,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 17,
        j: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        i: 0,
        j: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(()=>{d();});});}};
