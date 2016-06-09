var jwt = require('jwt-simple');
var Secret = require('../config/secrets.js').JWT_SECRET;

var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
]

exports.getSchedulingDays = function (req, res) {
    if(!req.headers.authorization) return res.status(401).send({message: 'You are not authorized'});
    
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, Secret);

    if(!payload.sub) res.status(401).send({message: 'Authentication failed'});
    res.json(days);
};