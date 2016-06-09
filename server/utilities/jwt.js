var jwt = require('jwt-simple');
var moment = require('moment');
var Secret = require('../config/secrets.js').JWT_SECRET;

module.exports = function(user, res){
    if(user.user) user=user.user;
    var payload = {
		sub: user.id,
		exp: moment().add(10, 'days').unix()
	}

    var token = jwt.encode(payload, Secret);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}