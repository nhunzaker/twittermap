var net    = require("./networker"),
    stitch = require("./stitch");

function builder(flocks, size) {

    var users = [];

    size = size? -size : 0;
    
    flocks.slice(size).forEach(function(f) { 
        f.network.forEach(function(n) {
            users.push(n.screen_name);
        });
    });

    var count = 0,
        total = users.length,
        clump = Math.ceil(total / 30);

    console.log("Processing %s clumps. %s users total.", clump, total);

    for (var i = 0; i < clump; i++) {
        
        net(users.slice(i * 30, (i + 1) * 30), function(err, data) {
            if (err) return console.log(err, data, "on network attempt");
            console.log("Found data for %s users.", data.length);
            stitch(flocks, data);
        });

    }

};

module.exports = builder;