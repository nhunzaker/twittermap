require("telegraph");

App = new Telegraph({
    "appname"    : "Twittermap",
    "websockets" : true,
    "session"    : "twittermap"
});

var port = process.env.PORT || 3000;

App.start(port);