// Twitter events
// -------------------------------------------------- //

var app         = require('flatiron').app,
    ntwitter    = require("ntwitter"),
    key         = require("../../config/twitter_key.json"),
    twitter     = new ntwitter(key),
    sentiment   = require("speakeasy-nlp").sentiment,
    classify    = require("speakeasy-nlp").classify,
    builder     = require("./builder");


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

var count  = 0,
    flocks = [];

function stream() {

    twitter.stream('statuses/filter',{
        locations  : ['-180,0', '180,90']
    }, function(stream) {

        // On disconnect, reconnect the stream after 31 seconds
        stream.on("end", function() {
            console.log("Stream ended");
            setTimeout(function() {
                stream();
            }, 31000);
        });
        
        stream.on("destroy", function() {
            console.log("Connection destroyed");
        });
        
        stream.on('data', function (tweet) {

            var affiliations = tweet.entities.user_mentions.length,
                tags         = classify(tweet.text);

            // Skip low quality tweets
            if (!tags.verbs.length || !tags.nouns.length ) return false;
            
            // Only use tweets with 2 to 3 user mentions
            if (tweet.geo && affiliations > 1 && affiliations < 4) {

                tweet.sentiment = sentiment.analyze(tweet.text);

                Flock.create({

                    username    : tweet.user.screen_name,
                    location    : tweet.user.location,
                    tweet       : tweet.text,
                    coordinates : tweet.geo.coordinates,
                    network     : tweet.entities.user_mentions,
                    sentiment   : tweet.sentiment

                }, function(err, flock) {

                    if (err) return console.log("Ooops", err);

                    flock.save(function (err) {
                        
                        if (err) return console.log("Ooops", err);

                        flocks.push(flock);

                        if (flocks.length === 50) {
                            console.log("Sending batch");
                            builder(flocks);
                            flocks = [];
                        } else {         
                            console.log("Saved a candidate, %s", flocks.length);
                        }

                    });

                });

               
            }

        }); 

    });

}

stream();