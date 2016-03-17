exports.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.523452, lng: -122.676207},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.

      markers.push(new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      // var contentString = infowindow.setContent('<span style="padding: 0px; text-align:left" align="left"><h5>' + place.name + '&nbsp; &nbsp; ' + place.rating + '</h5><p>' + place.formatted_address + '<br />' + place.formatted_phone_number + '<br />' + '<a  target="_blank" href=' + place.website + '>' + place.website + '</a></p>');

      // var infowindow = new google.maps.InfoWindow({
      //   content: contentString
      // });

      markers.forEach(function(marker) {
        var infowindow = new google.maps.InfoWindow({
          content: place.formatted_address
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
    });
    map.fitBounds(bounds);
  });

  // var contentString = infowindow.setContent('<span style="padding: 0px; text-align:left" align="left"><h5>' + place.name + '&nbsp; &nbsp; ' + place.rating + '</h5><p>' + place.formatted_address + '<br />' + place.formatted_phone_number + '<br />' + '<a  target="_blank" href=' + place.website + '>' + place.website + '</a></p>');
  //
  //
  // // var infowindow = new google.maps.InfoWindow({
  // //   content: contentString
  // // });
  //
  // function addInfoWindow(marker, content) {
  //   var infowindow = new google.maps.InfoWindow({
  //       content: contentString
  //   });
  // };
  //
  //
  // foreach(marker in markers){
  //   marker.addInfoWindow();
  //   marker.addListener('click', function() {
  //     infowindow.open(map, marker);
  //   });
  // }
};
