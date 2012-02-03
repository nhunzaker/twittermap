// Twitter Map

$(function() {
    

    //-- Map styles ----------------------------------------------------------------//

    var styles = [{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",stylers:[{hue:"#0000ff"},{lightness:-84},{visibility:"off"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:-61},{lightness:-63}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",stylers:[{visibility:"off"}]},{featureType:"administrative",stylers:[{visibility:"off"}]},{},{}];


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
        });

    //-- Initialize ---------------------------------------------------------------//

    var socket = io.connect('http://localhost');

    function addTweet(tweet) {
        
        //Stores the tweet's location
        var position = new google.maps.LatLng( tweet.geo.coordinates[0], tweet.geo.coordinates[1]);

        //Creates the marker
        var marker = new google.maps.Marker({													
            position: position,
            map: map,
            title: tweet.from_user,
            icon: '/images/' + (tweet.sentiment.toString()) + '.png',
            description: tweet.text
        });

        // Open the infowindow on click
        google.maps.event.addListener(marker, 'click', function() {

            infowindow.content = "<img class='profile' src='" + tweet.user.profile_image_url + "'/>"
                + "<p>" + tweet.text + "</p>"
                + "<em>-" + tweet.user.name + "</em>";
            
            infowindow.open(map, marker);

        });

    }

    socket.on("tweet", addTweet);

});