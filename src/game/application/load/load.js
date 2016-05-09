'use strict';

import resources from '../../resources.json';
import hexcraft from '../../application.js';
import Auth from '../auth/auth.js';

// load all from resources.json
class Loader extends PIXI.loaders.Loader {
  constructor() {
    super();

    resources.forEach((element) => {
      this.add(element.id, element.path);
    });
  }
}

// load stage init
export default class Load extends PIXI.Stage {
  constructor() {
    super();

    // init load
    var loader = new Loader();
    loader.once('complete', this.loaded.bind(this));
    loader.on('progress', this.onProgress.bind(this));

    EZGUI.Theme.load(['./resources/theme/kenney-theme.json'], () => {
      loader.load();
    });

    // Scene draw
    var logo = PIXI.Texture.fromImage('/game/resources/logo.svg');
    this.logo = new PIXI.Sprite(logo);

    this.logo.position.x = window.innerWidth/2;
    this.logo.position.y = window.innerHeight/2;
    this.logo.anchor.set(0.5);
    this.logo.scale.set(0.5);
    this.logo.alpha = 0;

    this.addChild(this.logo);
  }

  loaded (loader, resources) {
    hexcraft.resources = resources;
    hexcraft.setStage(Auth);
  }

  onProgress (loader) {
    this.logo.alpha = loader.progress / 100;
  }

  update(){}
}
