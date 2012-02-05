// Authentication
// -------------------------------------------------- //
/*
var twitter_key = App.twitter_key,
    OAuth = require('oauth').OAuth;

var oa = new OAuth(
	  "https://api.twitter.com/oauth/request_token",
	  "https://api.twitter.com/oauth/access_token",
	  twitter_key.consumer_key,
	  twitter_key.consumer_secret,
	  "1.0",
	  twitter_key.callback_url,
	  "HMAC-SHA1"
);

App.get("/auth/twitter", function(req, res) {

    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){

		    if (error) return res.redirect("/");
        
			  req.session.oauth = {};
			  req.session.oauth.token = oauth_token;
			  req.session.oauth.token_secret = oauth_token_secret;
			  res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);

	  });

});

App.get('/auth/twitter/callback', function(req, res, next) {

	  if (!req.session.oauth) next(new Error("you're not supposed to be here."));

		req.session.oauth.verifier = req.query.oauth_verifier;

		var oauth = req.session.oauth;
    
		oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function(error, token, secret, results){
			  if (error)  return res.send("yeah something broke.");
				
        req.session.oauth.access_token = token;
				req.session.oauth.access_token_secret = secret;

        req.session.user = results;

				res.redirect("/");
        
        App.emit("authenticated", req.session.oauth);

		});
    
});
*/