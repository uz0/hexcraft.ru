'use strict';

export default class LOADER extends PIXI.loaders.Loader {
  constructor() {
    super();

    this.add('rabbit', '/game/resources/rabbit.png');
    this.on('progress', this.onProgress.bind(this));
  }

  onProgress (loader, resources) {
    console.log(loader, resources);
  }
}