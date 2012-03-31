var resourceful = require("resourceful");

User = resourceful.define("user", function() {
    this.object("info");
    this.timestamps();
});