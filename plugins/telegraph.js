var flatiron = require('flatiron'),
    app      = flatiron.app;

module.exports = {
    
    name: 'telegraph',

    attach: function (options) {
        //
        // Extend the application
        //
        app.io = require('socket.io').listen(app.server);
        
        
        // Syntax sugar for socket.io events
        app.on = function(name, action) {
            app.io.sockets.on(name, action);
        };

        app.emit = function(name, data) {
            app.io.sockets.emit(name, data);
        };

        app.volley = function(name, data) {
            app.io.sockets.volatile.emit(name, data);
        };

    },

    init: function (done) {

        // Initialize anything your plugin needs,
        // asynchronously if necessary, then call done().
        //

        done();

    }
};
