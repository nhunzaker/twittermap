var resourceful = require("resourceful");

Flock = resourceful.define("flock", function() {
    
    this.string("username");
    this.string("location");
    this.string("tweet");
    this.array("coordinates");
    this.array("network");
    this.object("sentiment");

    this.timestamps();

});