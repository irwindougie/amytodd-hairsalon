var express = require('express');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var passport = require('passport');

module.exports = function (app, config) {

    app.set('views', config.rootPath + 'public');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use('/css', sass({
        src: config.rootPath + '/scss',
        dest: config.rootPath + '/public/css',
        outputStyle: 'compressed',
    }));
    app.use(express.static(config.rootPath + '/public'));
};