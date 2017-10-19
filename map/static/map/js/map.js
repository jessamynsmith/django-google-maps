"use strict";


// Default to downtown Toronto
var defaultPosition = {
  latitude: 43.6722780,
  longitude: -79.3745125
};

var initMap = function (position) {

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
    url: 'https://angular-google-maps-example.herokuapp.com/api/v1/yelp/search',
    data: {
      limit: 10,
      radius_filter: 500,
      sort: 1,
      ll: [position.coords.latitude, position.coords.longitude].join()
    }
  }).done(function (data) {
    for (var i = 0; i < data.businesses.length; i++) {
      var business = data.businesses[i];
      var marker = new google.maps.Marker({
        id: i,
        title: business.name,
        url: business.url,
        position: {
          lat: business.location.coordinate.latitude,
          lng: business.location.coordinate.longitude
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

      $.ajax({
        method: "post",
        url: '/api/v1/businesses/',
        contentType: 'application/json',
        data: JSON.stringify({
          title: business.name,
          url: business.url,
          position: {
            "type": "Point",
            "coordinates": [
                business.location.coordinate.latitude,
                business.location.coordinate.longitude
            ]
          }
        }),
        beforeSend: function(jqXHR, settings) {
            jqXHR.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
        }
      });
    }
  }).fail(function (error) {
    console.log("Unable to access yelp");
    console.log(error);
  });

};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  }
}

getLocation();
