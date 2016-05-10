'use strict';

import utils from './utils.js';

export default class http {
  static post(url, data) {

    return window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(utils.handleErrors)
    .then(utils.parseJson)
    .catch(err => {
      console.error(err);
    });
  }

  static get() {
    return window.fetch('/api/games/')
    .then(utils.handleErrors)
    .then(utils.parseJson)
    .catch(err => {
      console.error(err);
    });
  }
}