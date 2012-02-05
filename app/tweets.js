// Twitter events
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment;

// The Twitter API
// -------------------------------------------------- //

var twitter = new ntwitter(App.twitter_key);

twitter.stream('statuses/filter', { 

    //locations  : '-150,0, -60,90'
    track: "superbowl"

}, function(stream) {

    stream.on('data', function (tweet) {
        tweet.sentiment = sentiment.analyze(tweet.text);
        if(tweet.sentiment.score !== 0 ) App.volley("tweet", tweet);
    }); 

});


App.on("authenticated", function(creds) {

    var t = new ntwitter({
        "consumer_key"        : creds.token,
        "consumer_secret"     : creds.token_secret,
        "access_token_key"    : creds.access_token,
        "access_token_secret" : creds.access_token_secret,

        "callback_url"        : App.twitter_key.callback_url
    });

    t.verifyCredentials(function (err, data) {
        console.log(data);
    });

});