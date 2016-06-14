var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

  module.exports = {
    development: {
      rootPath: rootPath,
      db: 'mongodb://localhost/booking',
      port: process.env.PORT || 8001,
      app_url: function(){return 'http://localhost:' + this.port;}
    },
    test: {
      rootPath: rootPath,
      db: process.env.Mongo_DB,
      port: process.env.PORT || 80,
      app_url: function(){return 'http://dev.amytodd.timefinds.com'}
    },
    production: {
      rootPath: rootPath,
      db: process.env.Mongo_DB,
      port: process.env.PORT || 80,
      app_url: function(){return 'http://amytodd.timefinds.com'}
    }
  };