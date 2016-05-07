
      'use strict';module.exports = {up: function (q, s, d) {q.bulkInsert('Maps', [{
        description: 'myFirstMap',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(id => {q.bulkInsert('MapData',[{
        MapId: id,
        x: 1,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 5,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 14,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 6,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 1,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 2,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 13,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 1,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 2,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 3,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 2,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 1,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 1,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 1,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 0,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 0,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 0,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 19,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 19,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 12,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 11,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 11,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 10,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 10,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 19,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 9,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 19,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 8,
        cellstate: 'player2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 18,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 19,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 4,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 5,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 4,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 8,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 9,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 9,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 10,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 10,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 11,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 11,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 11,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 10,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 12,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 1,
        y: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 12,
        cellstate: 'player1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 10,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 15,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 7,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 2,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 3,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 7,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 9,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 8,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 11,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 12,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 16,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 17,
        y: 6,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        MapId: id,
        x: 0,
        y: 8,
        cellstate: 'empty',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(()=>{d();});});}};
