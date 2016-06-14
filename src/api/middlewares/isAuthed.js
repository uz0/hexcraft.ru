'use strict';

const models = require('../models');

module.exports = function(req, res, next) {
  const token = req.body.token || req.query.token;

  if (!token) {
    let error = new Error('token not set');
    error.status = 400;
    return next(error);
  }

  models.Token.findOne({
    where: {
      token: token,
      validThrough: {
        $gt: new Date().getTime() / 1000
      }
    },
    include: [models.User]
  }).then(result => {
    if (!result) {
      let error = new Error('invalid token');
      error.status = 400;
      return next(error);
    }

    if(result.User) {
      req.user = result.User.objectize();
    }

    if(result.dataValues.guestName) {
      req.user = {
        id: result.dataValues.id,
        username: result.dataValues.guestName
      };
    }

    next();
  });
};
