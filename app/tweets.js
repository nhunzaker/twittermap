// Twitter events
// -------------------------------------------------- //

var app         = require('flatiron').app,
    ntwitter    = require("ntwitter"),
    key         = require("../config/twitter_key.json"),
    twitter     = new ntwitter(key),
    sentiment   = require("speakeasy-nlp").sentiment;


// Stream!
// 
// Remember : sample === all tweets
//            filter === a specific filter
// 
// filter ex:    
//  locations  : ['-150,0, -60,90']
//  track      : "superbowl"
// 
//   
// -------------------------------------------------- //

function stream() {

    twitter.stream('statuses/filter',{
        locations  : ['-180,0', '180,90']
    }, function(stream) {

        // On disconnect, reconnect the stream after 31 seconds
        stream.on("end", function() {
            setTimeout(function() {
                stream();
            }, 31000);
        });
        
        stream.on('data', function (tweet) {
            
            if (tweet.geo) {
                tweet.sentiment = sentiment.analyze(tweet.text);
                app.volley("tweet", tweet);
            }

        }); 

    });

}

stream();