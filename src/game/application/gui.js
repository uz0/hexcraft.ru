'use strict';

import hexcraft from '../application.js';

export default class GUI extends PIXI.Container {
  constructor(options) {
    super();

    let constructors = {
      Input: PIXI.Input,
      Sprite: PIXI.Sprite.fromImage,
      Text: PIXI.Text,
      Button: PIXI.Button,
      Container: PIXI.Container
    };

    // let t = new PIXI.Text(123);
    // t.width = 1;
    // t.height = 1;
    // t.position = {
    //   x: 1000 -1,
    //   y: 622 -1
    // }
    // this.width = 800;
    // this.height = 600;
    // console.log(t);
    // console.log(this);
    // this.addChild(t);

    options.forEach(options => {
      if(options.component === 'Sprite') {
        options.configuration = hexcraft.resources[options.textureName].blobUrl;
      }

      let element = new constructors[options.component](options.configuration || '');
      this.extend(element, options);

      this[options.id] = element;
      this.addChild(element);
    });

    // this.width = 800;
    // this.height = 600;
  }

  extend(original, options){
    for (let option in options) {
      original[option] = options[option];
    }
  }
}