'use strict';

export default class GUI extends PIXI.Container {
  constructor(options) {
    super();

    let constructors = {
      Input: PIXI.Input,
      Sprite: PIXI.Sprite.fromImage,
      Text: PIXI.Text,
      Button: PIXI.Button,
      Container: PIXI.Container
    }

    options.forEach(options => {
      let element = new constructors[options.component](options.configuration);
      this.extend(element, options);

      this[options.id] = element;
      this.addChild(element);
    })
  }

  extend(original, options){
    for (let option in options) {
      original[option] = options[option];
    }
  }
}