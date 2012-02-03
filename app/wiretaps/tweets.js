// Tweets wiretap
// -------------------------------------------------- //

var ntwitter  = require("ntwitter"),
    sentiment = require("speakeasy-nlp").sentiment;

// The Twitter API
// -------------------------------------------------- //

var twitter = new ntwitter({
    consumer_key: 'rPkzBTS2tnvUaxV8h5pMVA',
    consumer_secret: '5B16t4voJKZ0WcU1dS1fr8fT6cRnzWoxHMnWDZp6cc',
    access_token_key: '48188274-PsxLGhh7SJVzz3catdgmfNGLGa6qHYsq7464koFrJ',
    access_token_secret: 'pR7CpeEtC3yBIof1c8lmVCoGDKMjLy1bTboIOIXVCKM'
});


twitter.stream('statuses/filter', { 

    tracking  : "obama",
    locations :'-130.75,20.8, -60,50'

}, function(stream) {
    
    stream.on('data', function (tweet) {

        var tone = sentiment.analyze(tweet.text);
        
        // Prevent non-sentiment from showing through
        if (tone.score === 0) return false;

        // Add constraints for negativity
        if (tone.score > 3) {
            tweet.sentiment = 3;
        } else if (tone.score < -3) {
            tweet.sentiment = -3;
        } else {
            tweet.sentiment = tone.score;
        }

        App.volley("tweet", tweet);

    }); 

});