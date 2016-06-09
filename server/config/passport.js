var passport = require('passport');
var localStrategy = require('./strategy.js');


module.exports = function () {

    passport.use('local-register', localStrategy.register);
    passport.use('local-login', localStrategy.login);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
}