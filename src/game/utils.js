'use strict';

var utils = {};

utils.handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

utils.parseJson = (response) => {
  return response.json();
};

export default utils;