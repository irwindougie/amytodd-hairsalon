var passport = require('passport');
var createSendToken = require('../utilities/jwt.js')

var user = require('../controllers/users');
var scheduler = require('../controllers/scheduler');
var googleAuth = require('../controllers/googleAuth');
var facebookAuth = require('../controllers/facebookAuth');
var emailVerification = require('../controllers/emailVerification');

module.exports = function (app, config) {
  //Endpoints
  app.post('/api/auth/facebook', facebookAuth);
  app.post('/api/auth/google', googleAuth);

  app.post('/api/auth/register', passport.authenticate('local-register'), function (req, res){
    emailVerification.send(req.user.email, config.app_url());
    createSendToken(req.user, res);
  });
  app.get('/auth/verifyEmail', function(req, res){
    emailVerification.handler(config.app_url(), req, res)
  });
  app.post('/api/auth/login', passport.authenticate('local-login'), function (req, res){
    createSendToken(req.user, res);
  });
  app.post('/api/auth/logout', function (req, res) {
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