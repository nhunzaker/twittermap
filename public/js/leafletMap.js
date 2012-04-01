$(function() {

    var url = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/58238/256/{z}/{x}/{y}.png',
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


    // Web Sockets
    // -------------------------------------------------- //

    var connect = window.location.protocol + "//" + window.location.hostname,  
        socket  = io.connect(connect);    

    $.getJSON("/flocks", function(data) {
        $(".loading").fadeOut(function() {
            $.each(data, function() {
                var v = new Flock(map, this);
            });
        });
    });

    socket.on("tweet", function (data) {
        $.each(data, function() {
            var v = new Flock(map, this);
        });
    });

});