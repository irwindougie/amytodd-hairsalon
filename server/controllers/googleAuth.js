var request = require('request');
var User = require('mongoose').model('User');
var createSendToken = require('../utilities/jwt');
var Secret = require('../config/secrets.js').GOOGLE_SECRET;

module.exports = function(req, res){

    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: Secret
    };
    request.post(url, { json: true, form: params}, function(err, response, token){
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        }

        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile){
            User.findOne({
                googleId: profile.sub
            }, function(err, existingUser){
                if(existingUser) return createSendToken(existingUser, res);

                var newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;
                newUser.save(function(err){
                    if(err) return next(err);
                    createSendToken(newUser, res);
                })
            })
        })
    });
}