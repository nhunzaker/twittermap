$(function() {

    var url = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/58458/256/{z}/{x}/{y}.png',
        attribution = '',
        cloudmade = new L.TileLayer( url, { maxZoom : 17, attribution : attribution });


    // Adjust height
    // -------------------------------------------------- //

    function fullscreen() {
        $("#map").height($(window).height() - $("header").height());
    }
    
    $(window).resize(fullscreen).trigger("resize");
    

    // Map
    // -------------------------------------------------- //

    var map = new L.Map('map');

    map.on('click', function(e) {
        console.log(e.latlng);
    });

    map.setView(new L.LatLng(34.10725639663118, -86.4404296875), 5).addLayer(cloudmade);


    // Tweet Management
    // -------------------------------------------------- //

    window.plotUser = function(o, root, color) {

        if (!o.location) return false;

        // User Marker
        // -------------------------------------------------- //

        var circleLocation = new L.LatLng(o.location[0], o.location[1]),
            locationMarker = new L.CircleMarker(circleLocation, { 
            color       : "rgb(255,255,255)", 
            weight      : 1,
            fillOpacity : 0.6
        });

        locationMarker.setRadius(3);
        
        locationMarker.on('click', function(e) {

            var popupContent = "<p>" + o.screen_name + " | " + o.location.join(", ") + "</p>",
                popup = new L.Popup();

            popup.setLatLng(circleLocation);
            popup.setContent(popupContent);
            map.openPopup(popup);
        });
        
        map.addLayer(locationMarker);

        // Add connector
        // -------------------------------------------------- //
        
        map.addLayer(new L.Polyline([circleLocation, root], {
            color: color || '#aaf',
            weight: 2,
            opacity: 0.2
        }));

    };

    window.plotTweet = function(o) {

        var pos   = o.sentiment.positive.score,
            neg   = o.sentiment.negative.score,
            opacity = 0.9,
            color;

        if (pos - neg !== 0){
            color = "rgb(" + (50 + (neg * 70)) + "," + (50 + (pos * 50)) + ", 50)";
        } else {
            color = "rgb(50,50,100)";
            opacity = 0.3;
        }

        // Add the tweet
        var circleLocation = new L.LatLng(o.coordinates[0], o.coordinates[1]),
            circleOptions = { 
                color       : color, 
                weight      : 1,
                fillOpacity : opacity
            };

        var circle = new L.CircleMarker(circleLocation, circleOptions);
        circle.setRadius(6);
        
        circle.on('click', function(e) {

            var popupContent = "<p>" + o.tweet + "</p>"
                    + "<em>-" + o.username + " | " + o.location + "</em>",
                popup = new L.Popup();

            popup.setLatLng(circleLocation);
            popup.setContent(popupContent);
            map.openPopup(popup);

        });

        // Add Tweet Marker
        map.addLayer(circle);

        // Add the network
        $.each(o.network, function() {
            plotUser(this, circleLocation, color);
        });
        
    };


    // Web Sockets
    // -------------------------------------------------- //

    var connect = window.location.protocol + "//" + window.location.hostname,  
        socket  = io.connect(connect);    

    $.getJSON("/flocks", function(data) {
        $.each(data, function() {
            plotTweet(this);
        });
    });

    socket.on("tweet", function (data) {
        $.each(data, function() {
            plotTweet(this);
        });
    });

});