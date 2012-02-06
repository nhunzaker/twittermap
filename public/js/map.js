// Twitter Map

$(function() {
    

    //-- Map styles ----------------------------------------------------------------//

    var styles = [{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",stylers:[{hue:"#0000ff"},{lightness:-84},{visibility:"off"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:-61},{lightness:-63}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",stylers:[{visibility:"off"}]},{featureType:"administrative",stylers:[{visibility:"off"}]},{},{}];

    function grow (max) {
        this.radius += 1000;
        if (this.radius > max) grow.apply(this, [max]);
    }


    //-- Views --------------------------------------------------------------------//

    // Adjust height
    $("#map_canvas").height($(window).height() - $("header").height());
    
    var myOptions = {
        zoom: 5,
        center: new google.maps.LatLng(35.5, -100),
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.ANDROID
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        styles: styles
    };
    
    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions),
        infowindow = new google.maps.InfoWindow({
            content: ""
        }),
        circles = [];
    

    //-- Initialize ---------------------------------------------------------------//
   
    var connect = window.location.protocol + "//" + window.location.hostname,
        socket  = io.connect(connect),
        geocoder = new google.maps.Geocoder();

    function plotTweet (tweet) {

        var pos   = tweet.sentiment.positive.score,
            neg   = tweet.sentiment.negative.score,
            color = "rgb(" + (50 + (neg * 70)) + "," + (50 + (pos * 50)) + ", 50)";

        var position = new google.maps.LatLng( tweet.geo.coordinates[0], tweet.geo.coordinates[1]);
        
        var options = {
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.55,
            map: map,
            center: position,
            radius: 30000
        };

        //Stores the tweet's location
        var circle = new google.maps.Circle(options);

        circles.push(circle);

        // Open the infowindow on click
        google.maps.event.addListener(circle, 'click', function() {

            infowindow.content = "<img class='profile' src='" + tweet.user.profile_image_url + "'/>"
                + "<p>" + tweet.text + "</p>"
                + "<em>-" + tweet.user.name + " | " + tweet.user.location + "</em>";
            
            
            infowindow.open(map);
            infowindow.setPosition(position);

        });
    }

    function clearingHouse(tweet) {
        
        if (tweet.geo) {
            plotTweet(tweet);
        } else if (tweet.user.location) {

            geocoder.geocode({'address': tweet.user.location}, function(results, status) {
                
                if (status === "OK") {
                    tweet.geo = {};
                    tweet.geo.coordinates = [results[0].geometry.location.Oa, results[0].geometry.location.Pa];
                    plotTweet(tweet);
                }
            });

        }
    }

    socket.on("tweet", function (data) {
        
        if ($.isArray(data)) {
            console.log("got data");
            $.each(data, function() {
                clearingHouse(this);
            });
        } else {
            clearingHouse(data);
        }

    });

});