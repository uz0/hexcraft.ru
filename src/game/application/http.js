'use strict';

export default class http {
  static post(url, data) {
    return window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    }).then(response => {
      return response.json();
    });
  }

  static get(url) {
    return window.fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    }).then(response => {
      return response.json();
    });
  }
}