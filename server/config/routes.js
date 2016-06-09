var mongoose = require('mongoose');
var passport = require('passport');
var createSendToken = require('../utilities/jwt.js')
var user = require('../controllers/users');
var scheduler = require('../controllers/scheduler');
var googleAuth = require('../controllers/googleAuth');
var facebookAuth = require('../controllers/facebookAuth');

module.exports = function (app) {
  //Endpoints
  app.post('/api/auth/facebook', facebookAuth);
  app.post('/api/auth/google', googleAuth);

  app.post('/api/register', passport.authenticate('local-register'), createSendToken);
  app.post('/api/login', passport.authenticate('local-login'), createSendToken);
  app.post('/api/logout', function (req, res) {
    req.logout();
    delete req.session;
    res.end();
  });

  app.get('/api/scheduler', scheduler.getSchedulingDays);
  //Catch-all api errors
  app.all('/api/*', function (req, res) {
    res.send(404);
  });
  //Catch-all route errors (Re-route to index page)
  app.get('/*', function (req, res) {
    res.render('index.html', {});
  });
};