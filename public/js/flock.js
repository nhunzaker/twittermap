// Flock
// 
// Requires leaflet.js
// -------------------------------------------------- //

function Flock(map, o) {
    this.map      = map;
    this.location = new L.LatLng(o.coordinates[0], o.coordinates[1]);

    this.options  = o;
    this.children = [];
    this.color    = this.getColor();

    this.initialize();
}

Flock.prototype.getColor = function() {

    var pos     = this.options.sentiment.positive.score,
        neg     = this.options.sentiment.negative.score,
        color   = "rgb(50,50,100)";

    if (pos - neg !== 0){
        color = "rgb(" + (50 + (neg * 70)) + "," + (50 + (pos * 50)) + ", 50)";
    }

    return color;
};

Flock.prototype.initialize = function() {
    
    var o    = this.options,
        self = this;

    // Add the tweet
    var circleOptions = { 
        color       : this.color,
        weight      : 1,
        fillOpacity : 0.4
    };

    var circle = this.root = new L.CircleMarker(this.location, circleOptions);
    circle.setRadius(6);
    
    circle.on('click', function(e) {

        var popupContent = "<p>" + o.tweet + "</p>"
                + "<em>-" + o.username + " | " + o.location + "</em>",
            popup = new L.Popup();

        popup.setLatLng(self.location);
        popup.setContent(popupContent);
        self.map.openPopup(popup);
    });

    circle.on("mouseover", function(e) {
        circle.setStyle({
            fillOpacity: 0.7
        });
    });

    circle.on("mouseout", function(e) {
        circle.setStyle({
            fillOpacity: 0.4
        });
    });

    // Add Tweet Marker
   this.map.addLayer(circle);

    // Add the network
    $.each(o.network, function() {
        self.addNode(this, o, self.color);
    });
};


Flock.prototype.addNode = function(o, base) {

    if (!o.location) return false;

    // User Marker
    // -------------------------------------------------- //

    var self           = this,
        map            = this.map,
        color          = this.color,
        circleLocation = new L.LatLng(o.location[0], o.location[1]),
        nodeMarker     = new L.CircleMarker(circleLocation, { 
            color       : "rgb(255,255,255)", 
            weight      : 1,
            fillOpacity : 0.6
        });

    nodeMarker.setRadius(3);
    
    nodeMarker.on('click', function(e) {

        var popupContent = "<p>" + o.screen_name + " | " + o.location.join(", ") + "</p>",
            popup = new L.Popup();

        popup.setLatLng(circleLocation);
        popup.setContent(popupContent);
        map.openPopup(popup);
    });
    
    map.addLayer(nodeMarker);


    // Add connector
    // -------------------------------------------------- //
    
    var connector = new L.Polyline([circleLocation, this.location], {
        color: this.color,
        weight: 2,
        opacity: 0.2
    });
    
    connector.on('click', function(e) {
        map.panTo(self.location);
        self.root.fire("click");
    });

    connector.on("mouseover", function(e) {
        connector.setStyle({
            opacity: 0.7,
            weight: 3
        });
    });

    connector.on("mouseout", function(e) {
        connector.setStyle({
            opacity: 0.2,
            weight: 2
        });
    });

    map.addLayer(connector);

};