require("telegraph");

App = new Telegraph({
    "appname"    :  "Twittermap",
    "websockets" : true
});

// Configure server
// -------------------------------------------------- //

App.use("bodyParser")
    .use("cookieParser")
    .use("session", { secret: 'mr ripley' });

// Initialize
// -------------------------------------------------- //

var port = process.env.PORT || 3000;

App.start(port);