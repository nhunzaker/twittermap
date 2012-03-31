var request = require('request'),
    yahoo   = require(__dirname + "/../../config/yahoo_key.json"),
    qs      = require('querystring');

function placefinder(string, callback) {
    
    var base = "http://where.yahooapis.com/geocode?",
        data = qs.stringify({ 
            q      : escape(string), 
            appid  : yahoo.appid, 
            flags  : "J"
        });

    request.get(base + data, function(err, res, body) {
        
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

module.exports = placefinder;
