$(function() {

    var url = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/58242/256/{z}/{x}/{y}.png',
        attribution = '',
        cloudmade = new L.TileLayer( url, { maxZoom : 14, attribution : attribution }),
        connect = window.location.protocol + "//" + window.location.hostname,
        socket  = io.connect(connect);


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
    
    window.plotTweet = function(o) {

        var pos   = o.sentiment.positive.score,
            neg   = o.sentiment.negative.score,
            color;

        if (pos - neg !== 0){
            color = "rgb(" + (50 + (neg * 70)) + "," + (50 + (pos * 50)) + ", 50)";
        } else {
            color = "rgb(50,50,100)";
        }

        var circleLocation = new L.LatLng(o.geo.coordinates[0], o.geo.coordinates[1]),
            circleOptions = { 
                color        : color, 
                weight       : 2
            };

        var circle = new L.Circle(circleLocation, 12000, circleOptions);

        circle.on('click', function(e) {

            var popupContent = "<img class='profile' src='" + o.user.profile_image_url + "'/>"
                    + "<p>" + o.text + "</p>"
                    + "<em>-" + o.user.name + " | " + o.user.location + "</em>",
                popup = new L.Popup();
            popup.setLatLng(e.latlng);
            popup.setContent(popupContent);
            map.openPopup(popup);

        });

        map.addLayer(circle);
        
    };


    // Web Sockets
    // -------------------------------------------------- //

    socket.on("tweet", function (data) {
        data = $.isArray(data) ? data : [data];
        $.each(data, function() {
            plotTweet(this);
        });
    });

});