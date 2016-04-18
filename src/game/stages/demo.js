'use strict';

import hexcraft from '../app.js';

export default class Demo extends PIXI.Stage {
  constructor() {
    super();
    this.logo = new PIXI.Sprite(hexcraft.resources.logo.texture);

    this.logo.position.x = window.innerWidth/2;
    this.logo.position.y = window.innerHeight/2;

    this.logo.scale.set(0.1);
    this.logo.anchor.set(0.5);
    this.logo.interactive = true;
    this.logo.buttonMode = true;

    this.logo
        .on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);

    this.addChild(this.logo);
  }

  onDragStart(event){
    this.alpha = 0.5;
    this.scale.set(0.11);
    this.dragging = true;
    this.data = event.data;
  }

  onDragEnd(){
    this.alpha = 1;
    this.scale.set(0.1);
    this.dragging = false;
    this.data = null;
  }

  onDragMove(){
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }

  update() {
    this.logo.rotation += 0.005;
  }
}