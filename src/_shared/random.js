'use strict';

export default function(min, max, seed) {
  seed = Math.abs(Math.sin(seed));

  return seed * (max - min) + min;
}