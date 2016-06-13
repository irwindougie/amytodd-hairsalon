var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var User = require('mongoose').model('User');

var Secret = require('../config/secrets');

exports.send = function (email, url) {
    var app_url = url;
    var payload = {
        sub: email
    }

    var token = jwt.encode(payload, Secret.EMAIL_SECRET);

    var options = {
        auth: {
            api_user: 'irwindougie',
            api_key: Secret.SMPT_PASS
        }
    };

    var transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'irwindougie',
            pass: Secret.SMPT_PASS
        }
    });

    var mailOptions = {
        from: 'Register <support@timefinds.com>',
        to: email,
        subject: "Amy's Hair Salon Account Verification",
        html: getHtml(token, app_url)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) return res.status(500, err);
        console.log('email sent ', info.response);
    })
}
exports.handler = function (url, req, res) {
    var app_url = url;
    var token = req.query.token;

    var payload = jwt.decode(token, Secret.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) return handleError(res);

    User.findOne({ email: email }, function (err, foundUser) {
        if (err) return res.status(500);
        if (!foundUser) return handleError(res);
        if (!foundUser.active) {
            foundUser.active = true;
        }
        foundUser.save(function (err) {
            if (err) return res.status(500);

            return res.redirect();
        })
    })
}

function handleError(res) {
    return res.status(401).send({ message: "Authentication failed: Unable to verify email" });
}

function getHtml(token, url) {
    var verifyUrl = url + '/auth/verifyEmail?token=';
    var model = {
        verifyUrl: verifyUrl,
        title: "Amy Todd's Hair Salon",
        subTitle: 'Thank you for registering!',
        body: 'Please verify your email address by clicking the button below'
    }
    var path = './server/views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}