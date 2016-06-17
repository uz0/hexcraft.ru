'use strict';

const Hex = require('./hex');

module.exports = function(MapData, player) {
  let step;
  let setStep = (old, current) => {
    step = {
      old: {
        i: old.i,
        j: old.j
      },
      current: {
        i: current.i,
        j: current.j
      }
    }
  }

  MapData.forEach(cell => {
    if (cell.cellstate === player) {
      Hex.findNeighborsByIndex(MapData, cell.i, cell.j).forEach(hex => {
        if (hex.cellstate === 'empty') {
          setStep(cell, hex);
        }
      });
      Hex.findNeighborsNeighborsByIndex(MapData, cell.i, cell.j).forEach(hex => {
        if (hex.cellstate === 'empty') {
          setStep(cell, hex);
        }
      });
    }
  });

  return step;
}