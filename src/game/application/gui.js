'use strict';

import hexcraft from '../application';
import Rectangle from './rectangle';

export default class GUI extends PIXI.Container {
  constructor(options) {
    super();

    // WORKAROUND: holders
    // need fixed height and width
    // for rescale and contain game renderer
    let lt = new PIXI.Text(' ');
    lt.position.x = 800 - 9;
    lt.position.y = 640 - 30;
    this.addChild(lt);

    let rb = new PIXI.Text(' ');
    rb.position.x = 0;
    rb.position.y = 0;
    this.addChild(rb);
    // WORKAROUND END

    options.forEach(options => {
      this.spawn(options, this);
    });
  }

  spawn(options, parent){
    let constructors = {
      Input: PIXI.Input,
      Sprite: PIXI.Sprite.fromImage,
      Text: PIXI.Text,
      Button: PIXI.Button,
      Container: PIXI.Container,
      Rectangle: Rectangle
    };

    if(options.component === 'Sprite') {
      options.configuration = hexcraft.resources[options.textureName].blobUrl;
    }

    let element = new constructors[options.component](options.configuration || '');
    this.extend(element, options);

    if(options.childs) {
      options.childs.forEach(options => {
        this.spawn(options, element);
      });
    }

    this[options.id] = element;
    parent.addChild(element);
  }

  extend(original, options){
    for (let option in options) {
      original[option] = options[option];
    }
  }
}