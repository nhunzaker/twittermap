// Tweets wiretap
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment;

// The Twitter API
// -------------------------------------------------- //

var twitter = new ntwitter({
    consumer_key        : 'rPkzBTS2tnvUaxV8h5pMVA',
    consumer_secret     : '5B16t4voJKZ0WcU1dS1fr8fT6cRnzWoxHMnWDZp6cc',
    access_token_key    : '48188274-PsxLGhh7SJVzz3catdgmfNGLGa6qHYsq7464koFrJ',
    access_token_secret : 'pR7CpeEtC3yBIof1c8lmVCoGDKMjLy1bTboIOIXVCKM'
});

twitter.stream('statuses/filter', { 

    locations  : '-150,0, -60,90'
    //track: "superbowl"

}, function(stream) {
    
    stream.on('data', function (tweet) {

        tweet.sentiment = sentiment.analyze(tweet.text);

        ( tweet.sentiment.score !== 0 ) && App.volley("tweet", tweet);

    }); 

});
