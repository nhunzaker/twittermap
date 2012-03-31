var _      = require("async"),
    locate = require("./placefinder");

function stitch(flocks, users) {

    if (!users.length) return false;

    flocks.forEach(function(flock, ii) { 

        flock.network.forEach(function(n, i) {
            
            var find = users.filter(function(u) {
                return u.screen_name === n.screen_name;
            });

            if (!find.length) return false;

            var location = find[0].location;

            console.log("Searching %s...", location);
            
            locate(location, function(err, data) {
                
                if (err || data.Found === 0) return false;
                if (!data.ResultSet.Results) return false;

                flock.network[i].location = [
                    data.ResultSet.Results[0].latitude,
                    data.ResultSet.Results[0].longitude
                ];
                
                if (i == flock.network.length - 1) {
                    console.log("Saving user at %s", location);
                    
                    flock.save(function(err) {
                        if (err) return console.log(err);
                        return console.log("Saved flock data");
                    });
                }

            });

            
        });
        
    });

};

module.exports = stitch;