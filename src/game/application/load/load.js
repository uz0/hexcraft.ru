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

    // Load loader scene
    var loader = new PIXI.loaders.Loader();
    loader.add('loading', '/game/resources/loading_scene/skeleton.json')
          .load(this.initLoading.bind(this));
  }

  initLoading(loader, resources){
    this.loading = new PIXI.spine.Spine(resources.loading.spineData);

    this.loading.update(0);
    this.loading.skeleton.setToSetupPose();
    this.loading.autoUpdate = false;

    this.loading.scale.set(0.06);
    this.loading.alpha = 0.9;
    this.loading.position.set(400, 320);

    this.loading.current = 0;

    this.loading.state.setAnimationByName(0, 'loading', false);
    this.addChild(this.loading);

    // init loading
    let resourceLoader = new Loader();
    resourceLoader.once('complete', this.loaded.bind(this));
    resourceLoader.on('progress', this.onProgress.bind(this));
    resourceLoader.load();
  }

  onProgress (loader, resource) {
    if(resource.isXml) {
      resource.blobUrl = this.generateBlobUrl(resource.xhr.responseText, 'image/svg+xml;charset=utf-8');
    }

    if(resource.xhrType === 'arraybuffer') {
      resource.blobUrl = this.generateBlobUrl(new window.DataView(resource.data), 'audio/wav');
    }

    // update progress scene
    let progress = loader.progress * this.loading.state.tracks[0].endTime / 100;
    this.loading.update(progress - this.loading.current);
    this.loading.current = progress;
  }

  generateBlobUrl(text, type) {
    let DOMURL = window.self.URL || window.self.webkitURL || window.self;
    let svg = new window.Blob([text], {
      type: type
    });

    return DOMURL.createObjectURL(svg);
  }

  loaded(loader, resources) {
    hexcraft.resources = resources;
    hexcraft.setStage(Auth);
  }

  update(){}
}
