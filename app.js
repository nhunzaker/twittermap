var flatiron    = require('flatiron'),
    telegraph   = require("./plugins/telegraph"),
    connect     = require("connect"),
    fs          = require("fs"),
    path        = require('path'),
    app         = flatiron.app,
    port        = process.env.port || 8080,
    resourceful = require("resourceful");

app.use(flatiron.plugins.log);
app.use(flatiron.plugins.http, {
    before: [connect.static(__dirname + '/public')]
});

resourceful.use('couchdb', require("./config/couch_key.json"));

require("./app/routes");

// Harvester
require("./app/resources/flock");
//require("./app/tools/harvester");

// Start the server, then install socket.io
app.start(port, function() {
    app.log.info("Twittermap is listening on port", port);
    app.use(require("./plugins/telegraph"));
});