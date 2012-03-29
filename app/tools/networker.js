var request = require('request'),
    qs      = require('querystring');

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function networker(users, callback) {
    
    users = isArray(users)? users : [users];

    var base = "http://api.twitter.com/1/users/lookup.json?",
        data = qs.stringify({ 
            screen_name : users.join(",")
        });

    request.get(base + data, function(err, res, body) {
        try {
            var data = JSON.parse(body);
            callback(undefined, data);
        } catch(x) {
            callback(true);
        }
    });
    
};

module.exports = networker;
