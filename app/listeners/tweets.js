// Twitter events
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment,
    twitter = new ntwitter(App.twitter_key);

// Stream!
// -------------------------------------------------- //

twitter.stream('statuses/filter', { 
    //    locations  : '-150,0, -60,90'
    track: "superbowl"

}, function(stream) {

    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);
        tweet.type = "tweet";

        App.volley("tweet", tweet);
//        Tweet.save(tweet, function(err, doc) {});

    }); 

});