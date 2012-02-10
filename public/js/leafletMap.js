$(function() {

    window.plotTweet = function(o) {
      var pos   = o.sentiment.positive.score,
          neg   = o.sentiment.negative.score,
          color;

      if (pos - neg !== 0){
        color = "rgb(" + (50 + (neg * 70)) + "," + (50 + (pos * 50)) + ", 50)";
      }else{
        color = "rgb(50,50,100)";
      }

      var circleLocation = new L.LatLng(o.geo.coordinates[0], o.geo.coordinates[1]),
          circleOptions = { color: color, fillColor: color, fillOpacity: 0.1};

      var circle = new L.Circle(circleLocation, 500, circleOptions);

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


    }

    // Adjust height
    $("#map").height($(window).height() - $("header").height());

   var map = new L.Map('map');


   var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/43782/256/{z}/{x}/{y}.png'
    ,  cloudmadeAttribution = ''
    ,  cloudmade = new L.TileLayer( cloudmadeUrl, { maxZoom : 18, attribution : cloudmadeAttribution })
    ,  connect = window.location.protocol + "//" + window.location.hostname
    ,  socket  = io.connect(connect);

    map.setView(new L.LatLng(51.454, 5.801), 4).addLayer(cloudmade);


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