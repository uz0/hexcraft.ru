'use strict';

import hexcraft from '../../application.js';
import Hex from './hex.js';
import random from '../../../_shared/random.js';

export default class Chip extends PIXI.Container {
  constructor(i, j, player){
    super();

    this.chipScale = 0.06;

    const spines = [
      hexcraft.resources.alice.spineData,
      hexcraft.resources.bob.spineData,
      hexcraft.resources.stiven.spineData
    ];

    // spine
    let seed = i+j;
    let index = Math.floor(random(0, spines.length, seed));
    let spine = spines[index];

    this.chipSpine = new PIXI.spine.Spine(spine);
    this.chipSpine.scale.set(this.chipScale);
    this.chipSpine.position.set(35, 40);
    this.chipSpine.state.setAnimationByName(0, 'stand', true);
    this.addChild(this.chipSpine);

    // position
    let position = Hex.indexToCoordinates(i, j);

    this.i = i;
    this.j = j;
    this.position.set(position.x, position.y);
    this.updateOldPosition();

    // other
    this.color = new PIXI.filters.ColorMatrixFilter();
    this.filters = [this.color];
    this.changeOwner(player);

    this.on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)

        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)

        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)

        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove)

        .on('mouseover', this.onMouseOver)
        .on('mouseout', this.onMouseOut);
  }

  onMouseOver() {
    this.chipSpine.state.setAnimationByName(0, 'hover', true);
  }


  onMouseOut() {
    this.chipSpine.state.setAnimationByName(0, 'stand', true);
  }

  chipSound() {
    const sounds = [
      hexcraft.resources.laugh.blobUrl,
      hexcraft.resources.fight.blobUrl,
      hexcraft.resources.fight1.blobUrl,
      hexcraft.resources.victory.blobUrl,
      hexcraft.resources.good.blobUrl,
    ];

    const random = Math.floor(Math.random() * 6) + 0;

    new window.Audio(sounds[random]).play();
  }

  changeOwner(player) {
    let degrees = (player === 'player1')? 0 : -150;
    this.color.hue(degrees);

    let side = (player === 'player1')? 1 : -1;
    this.chipSpine.scale.set(side * this.chipScale, this.chipScale);

    this.player = player;
  }

  changeMode(mode) {
    this.interactive = mode;
    this.buttonMode = mode;
  }

  updateOldPosition() {
    this.oldPosition = {
      x: this.position.x,
      y: this.position.y
    };
  }

  onDragStart(event) {
    this.chipSound();
    this.chipSpine.state.setAnimationByName(0, 'drag', true);

    this.data = event.data;
    this.updateOldPosition();
  }

  onDragMove() {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x - 40;
      this.position.y = newPosition.y - 40;
    }

    if(this.data && this.onMove) {
      this.onMove(this.position, this.oldPosition);
    }
  }

  onDragEnd() {

    this.chipSpine.state.setAnimationByName(0, 'stand', true);
    new window.Audio(hexcraft.resources.endStep.blobUrl).play();

    this.data = null;

    if(this.beforeStep && this.beforeStep(this.position, this.oldPosition)) {
      this.position.x = this.oldPosition.x;
      this.position.y = this.oldPosition.y;

      return;
    }

    let index = Hex.coordinatesToIndex(this.position.x, this.position.y);
    this.i = index.i;
    this.j = index.j;
    this.position = Hex.indexToCoordinates(index.i, index.j);

    if(this.onStep) {
      this.onStep(this.position, this.oldPosition);
    }

    this.updateOldPosition();
  }
}