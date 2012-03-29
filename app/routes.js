// Routes

var app   = require("flatiron").app,
    fs    = require("fs"),
    index = fs.readFileSync(__dirname + "/index.html");

app.router.get("/", function() {
    this.res.writeHead(200);
		this.res.end(index);
});