'use strict';

export default class Loader extends PIXI.loaders.Loader {
  constructor() {
    super();
    
    this.add('logo', '/images/logo.png');
    this.on('progress', this.onProgress.bind(this));
  }

  onProgress (loader, resources) {
    console.log(loader.progress, resources);
  }
}