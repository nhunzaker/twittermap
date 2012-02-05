// Twitter events
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment,
    twitter = new ntwitter(App.twitter_key);

// Save tweets for later in memory
App.tweets = [];

// Stream!
// -------------------------------------------------- //

twitter.stream('statuses/filter', { 
    //    locations  : '-150,0, -60,90'
    track: "superbowl"

}, function(stream) {

    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);

        App.tweets.push(tweet);
        App.volley("tweet", tweet);

    }); 

});

/*
App.on("websocket:connect", function(socket) {
    App.send("tweet", App.tweets.slice(-500));
});

*/