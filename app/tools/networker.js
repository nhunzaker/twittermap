var request = require('request'),
    qs      = require('querystring'),
    async   = require("async");

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function networker(users, callback) {
    
    users = isArray(users)? users : [users];

    var base = "http://api.twitter.com/1/users/lookup.json?",
        data = "screen_name=" + users.join(",");
    
    request.post(base + data, function(err, res, body) {
        
        if (err) return callback(err);

        var data, error;
        
        try {
            data = JSON.parse(body);
        } catch(x) {
            error = x;
        }
        
        if (error) {
            callback(error);
        } else {
            callback(false, data);
        }

    });
    
};

module.exports = networker;