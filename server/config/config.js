var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

  module.exports = {
    development: {
      rootPath: rootPath,
      db: 'mongodb://localhost/booking',
      port: process.env.PORT || 8001
    },
    production: {
      rootPath: rootPath,
      port: process.env.PORT || 80
    }
  };