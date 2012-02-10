$(function() {
    // globals
    console.debug(window.L);

    window.onMapClick = function(e) {
      var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
      popup.setLatLng(e.latlng);
      popup.setContent("You clicked the map at " + latlngStr);
      map.openPopup(popup);
    }



    window.plotTweet = function(o) {
      //console.log(o);
    }

    // Adjust height
    $("#map").height($(window).height() - $("header").height());

   var map = new L.Map('map');


   var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/43782/256/{z}/{x}/{y}.png'
    ,  cloudmadeAttribution = '2012 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade'
    ,  cloudmade = new L.TileLayer( cloudmadeUrl, { maxZoom : 18, attribution : cloudmadeAttribution })
    ,  socket  = io.connect(L.ROOT_URL);

    map.setView(new L.LatLng(31.354, 11.953), 2).addLayer(cloudmade);

    map.on('click', onMapClick);

    socket.on("tweet", function (data) {
        if ($.isArray(data)) {
            $.each(data, function() {
                plotTweet(this);
            });
        } else {
            plotTweet(data);
        }
    });
});