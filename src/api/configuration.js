'use strict';

const env = process.env.NODE_ENV || 'development';

const configuration = {
  development: {
    salt: '$2a$10$3.YGiknAFfM0FvzdPz2OYO',
    validTime: 86400,
    dialect: 'sqlite',
    storage: './db.development.sqlite'
  },
  production:{
    salt: process.env.SALT,
    validTime: 86400,
    dialect: 'mysql',
    protocol: 'mysql',
    uri: process.env.CLEARDB_DATABASE_URL
  }
};

module.exports = configuration[env];