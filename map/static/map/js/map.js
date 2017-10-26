"use strict";


// Default to downtown Toronto
var defaultPosition = {
  latitude: 43.6722780,
  longitude: -79.3745125
};

var populateMap = function (position) {

  $('#geolocation').hide();

  var infowindow = new google.maps.InfoWindow({
    content: "hello"
  });

  if (!position) {

    position = {
      coords: defaultPosition
    };
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    zoom: 16
  });

  // Make info window for marker show up above marker
  var windowOptions = {
    pixelOffset: {
      height: -32,
      width: 0
    }
  };

  $.ajax({
    method: "get",
    url: '/api/v1/yelp/search/',
    data: {
      limit: 10,
      radius: 200,
      sort: 'distance',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  }).done(function (data) {
    for (var i = 0; i < data.businesses.length; i++) {
      var business = data.businesses[i];
      var marker = new google.maps.Marker({
        id: i,
        title: business.name,
        url: business.url,
        position: {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude
        },
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, key) {
        return function () {
          var content = '<div><a target="_blank" href="' + marker.url + '">' + marker.title + '</a></div>';
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, i));
    }
  }).fail(function (error) {
    console.log("Unable to access yelp");
    console.log(error);
  });

};


var geolocationFail = function() {
  populateMap(defaultPosition);
};


var initMap = function() {
  if (navigator.geolocation) {
    var location_timeout = setTimeout(geolocationFail, 5000);

    navigator.geolocation.getCurrentPosition(function(position) {
      clearTimeout(location_timeout);
      populateMap(position);
    }, function (error) {
        clearTimeout(location_timeout);
        geolocationFail();
    });
  } else {
    // Fallback for no geolocation
    geolocationFail();
  }
};
