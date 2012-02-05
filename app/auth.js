// Authentication
// -------------------------------------------------- //

var twitter_key = App.twitter_key;

App.on("get:auth/twitter", function(req, res) {

    everyauth.twitter
        .consumerKey(twitter_key.consumer_key)
        .consumerSecret(twitter_key.consumer_secret)
        .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
            App.emit("twitterauth", twitUser.id);
        })
        .redirectPath('/');

});


// The event registration for when we can start tracking
// -------------------------------------------------- //
App.on("twitterauth", function(user) {
    console.log(user);
});