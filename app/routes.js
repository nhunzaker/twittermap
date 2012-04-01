// Routes

var app   = require("flatiron").app,
    fs    = require("fs"),
    index = fs.readFileSync(__dirname + "/index.html");

app.router.get("/", function() {
    this.res.writeHead(200);
		this.res.end(index);
});

app.router.get("/flocks", function() {

    var self = this;
    
    Flock.all(function(err, flocks) {
        self.res.writeHead(200, { 
            "Content-Type" : "application/json" 
        });
        self.res.end(JSON.stringify(flocks.slice(0, 1000)));
    });

});