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

(function stream() {

    twitter.stream('statuses/filter', {
        locations  : ['-180,0', '180,90']
    }, function(stream) {

        stream.on("end", function() {
            setTimeout(function() {
                stream();
            }, 10000);
        });
        
        stream.on('data', function (tweet) {

            tweet.sentiment = sentiment.analyze(tweet.text);
            tweet.type = "tweet";
            
            // Okay cool, return an event emitter that says we have
            // A new Tweet!
            
            if (tweet.geo) {
                App.volley("tweet", tweet);
            } 
        }); 

    });

}).call(null);