'use strict';

import options from './panel.json';
// import http from '../http';
import GUI from '../gui';
// import Splash from './splash/splash';

export default class Panel extends PIXI.Container {
  constructor() {
    super();

    this.GUI = new GUI(options);
    this.addChild(this.GUI);
  }

  addButton(name, callback) {
    let container = new GUI([{
      id: 'button',
      component: 'Button',
      position: {
        x: 606,
        y: 11
      },
      configuration: {
        value: name,
        padding: 12,
        borderWidth: 0,
        borderRadius: 0,
        boxShadow: null,
        innerShadow: null,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        text: {
          font: 'bold 24px Arial',
          fill: '#fff',
        }
      }
    }]);

    this.GUI.addChild(container);
    container.button.on('click', callback);
    container.button.on('touchstart', callback);
  }

  log(text) {
    this.GUI.status.text = text;
  }

}