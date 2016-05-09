'use strict';

export default class utils {
  static handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  };

  static parseJson(response) {
    return response.json();
  };
}