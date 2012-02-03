require("telegraph");

App = new Telegraph({
    "appname"    :  "Twittermap",
    "websockets" : true
});

var port = process.env.PORT || 3000;

App.start(port);