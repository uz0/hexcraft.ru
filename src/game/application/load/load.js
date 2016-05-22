'use strict';

import resources from '../../resources.json';
import hexcraft from '../../application.js';
import Auth from '../auth/auth.js';
import GUI from '../gui.js';

// load all from resources.json
class Loader extends PIXI.loaders.Loader {
  constructor() {
    super();
    let Resource = PIXI.loaders.Resource;
    Resource.setExtensionLoadType('wav', Resource.LOAD_TYPE.XHR);
    Resource.setExtensionXhrType('wav', Resource.XHR_RESPONSE_TYPE.BUFFER);

    resources.forEach((element) => {
      this.add(element.id, element.path);
    });
  }
}

// load stage init
export default class Load extends PIXI.Container {
  constructor() {
    super();

    // Create empty GUI layout for fit scene game to width and height
    this.GUI = new GUI([]);
    this.addChild(this.GUI);

    // init load
    var loader = new Loader();
    loader.once('complete', this.loaded.bind(this));
    loader.on('progress', this.onProgress.bind(this));
    loader.load();

    // Scene draw
    var logo = PIXI.Texture.fromImage('/game/resources/logo.svg');
    this.logo = new PIXI.Sprite(logo);

    this.logo.position.x = 400;
    this.logo.position.y = 320;
    this.logo.anchor.set(0.5);
    this.logo.scale.set(0.5);
    // this.logo.alpha = 0;

    this.addChild(this.logo);
  }

  loaded (loader, resources) {
    hexcraft.resources = resources;
    hexcraft.setStage(Auth);
  }

  onProgress (loader, resource) {
    if(resource.isXml) {
      resource.blobUrl = this.generateBlobUrl(resource.xhr.responseText, 'image/svg+xml;charset=utf-8');
    }

    if(resource.xhrType === 'arraybuffer') {
      resource.blobUrl = this.generateBlobUrl(new window.DataView(resource.data), 'audio/wav');
    }

    // this.logo.rotation = loader.progress / 100;
  }

  generateBlobUrl(text, type) {
    let DOMURL = window.self.URL || window.self.webkitURL || window.self;
    let svg = new window.Blob([text], {
      type: type
    });

    return DOMURL.createObjectURL(svg);
  }

  update(){}
}
