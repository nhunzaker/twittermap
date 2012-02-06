// Twitter events
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    geocoder  = require("geocoder"),
    sentiment = require("speakeasy-nlp").sentiment,
    twitter   = new ntwitter(App.twitter_key)
;


// Stream!
// 
// Remember : sample === 1% of all tweets
//            filter === 1% of a specific filter
// 
// filter ex:    
//  locations  : '-150,0, -60,90'
//  track      : "superbowl"
// -------------------------------------------------- //

twitter.stream('statuses/sample', function(stream) {

    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);
        tweet.type = "tweet";
        
        // Okay cool, return an event emitter that says we have
        // A new Tweet!
        
        if (tweet.geo) {
            return App.volley("tweet", tweet);
        } else if (tweet.user.location) {
            
            tweet.geo = {};
            
            // Use the google maps geocoder API to get the 
            // user's location
            geocoder.geocode(tweet.user.location, function ( err, data ) {

                if (err || data.status !== "OK") return false;
                
                var geo = data.results[0].geometry.location;
                
                tweet.geo.coordinates = [geo.lat, geo.lng];
                
                App.volley("tweet", tweet);
            });
        }

    }); 

});