'use strict';

const models = require('../models');

module.exports = function(req, res, next) {
  const token = req.body.token;
  if (!token) {
    let error = new Error('token not set');
    error.status = 400;
    return next(error);
  }
  models.Token.findOne({
    where: {
      token: token
    },
    include: [ models.User ]
  }).then(result => {
    if (!result) {
      let error = new Error('invalid token');
      error.status = 400;
      return next(error);
    }
    req.user = result.User;
    next();
  });
};
