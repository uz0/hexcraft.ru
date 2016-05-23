'use strict';

import hexcraft from '../../application.js';
import Hex from './hex.js';

export default class Chip extends PIXI.Container {
  constructor(i, j, player){
    super();

    // constants
    const spines = [
      hexcraft.resources.newChip1.spineData,
      hexcraft.resources.newChip2.spineData,
      hexcraft.resources.newChip3.spineData
    ];

    const random = Math.floor(Math.random() * 3) + 0; // TODO: seed this

    // spine
    this.chipSpine = new PIXI.spine.Spine(spines[random]);
    this.chipSpine.scale.set(0.06);
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
        .on('touchmove', this.onDragMove);
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