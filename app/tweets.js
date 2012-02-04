// Tweets wiretap
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment;

// The Twitter API
// -------------------------------------------------- //

var twitter = new ntwitter(require("../config/twitter"));

twitter.stream('statuses/filter', { 

    locations  : '-150,0, -60,90'
    //track: "superbowl"

}, function(stream) {
    
    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);

        ( tweet.sentiment.score !== 0 ) && App.volley("tweet", tweet);

    }); 

});
