var flatiron  = require('flatiron'),
    telegraph = require("./plugins/telegraph"),
    connect   = require("connect"),
    fs        = require("fs"),
    path      = require('path'),
    app       = flatiron.app,
    port      = process.env.port || 8080;

app.use(flatiron.plugins.log);
app.use(flatiron.plugins.http, {
    before: [connect.static(__dirname + '/public')]
});

require("./app/routes");

// Start the server, then install socket.io
app.start(port, function() {

    app.log.info("Twittermap is listening on port", port);

    app.use(telegraph);

    require("./app/tweets");

});