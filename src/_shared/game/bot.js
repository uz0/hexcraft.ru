'use strict';

const Hex = require('./hex');


module.exports = function(MapData, player) {
  let step;

  MapData.forEach(cell => {
    if (cell.cellstate === player) {
      Hex.findNeighborsByIndex(MapData, cell.i, cell.j).forEach(hex => {
        if (hex.cellstate === 'empty') {
          step = {
            old: {
              i: cell.i,
              j: cell.j
            },
            current: {
              i: hex.i,
              j: hex.j
            }
          }
        }
      });
    }
  });

  return step;
}

/*



























































































































































































































































































































function Bot() {};

Bot.user = {
  "id": -1,
  "username": "Bot",
  "admin": null,
  "createdAt": "1970-01-01T00:00:01.111Z",
  "updatedAt": "1970-01-01T00:00:01.111Z"
}

Bot.step = function(game) {
  let step = Bot.move(game.data);
  game.step(step, Bot.user);
}

Bot.toStep = function(cell) {
  let step = {
    "event": "step",
    "data": {
      "current": {
        "i": cell.bestMove.i,
        "j": cell.bestMove.j
      },
      "old": {
        "i": cell.data.i,
        "j": cell.data.j
      },
      "userId": Bot.user.id
    },
    "user": Bot.user
  };
  return step;
}

Bot.move = function(data) {

  let cells = [];

  data.Map.MapData.forEach(hex => {
    if (hex.cellstate === 'player2') {
      let cell = {
        data: hex
      }
      cells.push(cell);
    }
  });

  // Calculating all valid moves for all bot cells with a count of captured cells for each move
  for (var i = 0, i < cells.length, i++) {
    let cells[i].validSteps = [];
    Hex.findNeighborsNeighbors(data.Map.MapData, cells[i].data.i, cells[i].data.j).forEach(field => {
      if (field.cellstate === 'empty') {
        let count = 0;
        Hex.findNeighbors(data.Map.MapData, field.i, field.j).forEach(cell => {
          if (cell.cellstate === 'player1') {
            count++;
          }
        });
        field.count = count;
        cells[i].validSteps.push(field);
      }
    });
  }

  for (var i = 0, i < cells.length, i++) {
    let cells[i].bestMove = cells[i].validSteps[0];

    for (var j = 0, j < cells[i].validSteps.length, j++) {
      if (cells[i].validSteps[j].count > cells[i].bestMove.count) {
        cells[i].bestMove = cells[i].validSteps[j];
      }
    }
  }

  let bestMove = cells[0];

  for (var i = 0, i < cells.length, i++) {
    if (cells[i].bestMove.count > bestMove.count) {
      bestMove = cells[i];
    }
  }

  return Bot.toStep(bestMove);
}

module.exports = Bot;
*/