'use strict';

export default class DEMO extends PIXI.Stage {
  constructor(resources) {
    super();
    this.rabbit = new PIXI.Sprite(resources.rabbit.texture);

    this.rabbit.position.x = window.innerWidth/2;
    this.rabbit.position.y = window.innerHeight/2;

    this.rabbit.scale.set(0.1);
    this.rabbit.anchor.set(0.5);
    this.rabbit.interactive = true;
    this.rabbit.buttonMode = true;

    this.rabbit
        .on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);

    this.addChild(this.rabbit);
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
    this.rabbit.rotation += 0.001;
  }
}