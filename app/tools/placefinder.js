var request = require('request'),
    yahoo   = require("../config/yahoo_key.json"),
    qs      = require('querystring');

function placefinder(string, callback) {
    
    var base = "http://where.yahooapis.com/geocode?",
        data = qs.stringify({ 
            q      : escape(string), 
            appid  : yahoo.appid, 
            flags  : "J"
        });

    request.get(base + data, function(err, res, body) {
        try {
            var data = JSON.parse(body);
            callback(undefined, data.ResultSet);
        } catch(x) {
            callback(true);
        }
    });
    
};

module.exports = placefinder;
