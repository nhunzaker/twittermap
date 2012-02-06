// Twitter events
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment,
    twitter = new ntwitter(App.twitter_key);

// Stream!
// -------------------------------------------------- //

var tweets = [];

twitter.stream('statuses/filter', { 
    //locations  : '-150,0, -60,90'
    track: "superbowl"

}, function(stream) {

    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);
        tweet.type = "tweet";
        tweets.push(tweet);
        
        // For performance sake, let's only write to the database
        // on every 100 tweets
        // -------------------------------------------------- //

        if (tweets.length >= 100) {
            //App.db.save(tweets, function() {
                // do nothing
            //});

            tweets = [];
        }
        
        // Okay cool, return an event emitter that says we have
        // A new Tweet!
        return App.volley("tweet", tweet);

    }); 

});