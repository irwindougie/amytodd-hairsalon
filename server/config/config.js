var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

  module.exports = {
    development: {
      rootPath: rootPath,
      db: 'mongodb://localhost/booking',
      port: process.env.PORT || 8001,
      app_url: function(){return 'http://localhost:' + this.port;}
    },
    production: {
      rootPath: rootPath,
      db: '',
      port: process.env.PORT || 80,
      app_url: function(){return 'http://amytodd.timefinds.com'}
    }
  };