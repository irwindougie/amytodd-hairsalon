var mongoose = require('mongoose');
var userModel = require('../models/User');

module.exports = function (config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error with database'));
    db.once('open', function callback(){
        console.log('Now connected to the database');
    })
}