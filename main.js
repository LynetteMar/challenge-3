function getAPIdata(map) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=florida&units=metric&APPID=3ba9a8f6192793a53d5d55261a1ac15c')
    
    .then(function(response){
          return response.json();
          })
    
    .then(function(response){
        console.log(response.main.temp);
        //alert('test')
        //document.getElementById('weather').innerHTML = response.main.temp;
        var contentString = 
            'Kennedy Space Center ' + '<b>Cape Canaveral, Florida</b>';
        
        var infowindow = new google.maps.InfoWindow({
           content: contentString + ' temp: ' + response.main.temp + 'ºC' 
        });
       
        var image = {
          url: 'img/cape-rocket.jpg',
          scaledSize: new google.maps.Size(75, 50),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        
        var marker = new google.maps.Marker({
            position: {lat: 28.474009, lng: -80.577174},
            map: map,
            title: 'Basisstation',
            icon: image,
        });
        
        marker.addListener('click', function() {
        infowindow.open(map, marker);
        });

    })
    
    .catch(function(error){
    })
}

function initMap() {
    var cape = {lat: 28.474009, lng: -80.577174};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: cape,
        styles: [
            //aarde
            {elementType: 'geometry', stylers: [{color: '#000000'}]},
            //alle outlines van woorden
            {elementType: 'labels.text.stroke', stylers: [{color: '#000000'}]},
            //fill van alle titels van landen
            {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
            //titel stad
            {featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#EFB2EC'}]
            },
            {
            //titel belangrijke dingen
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#EFD35F'}]
            },
            {
            //bossen
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#031C0B'}]
            },
            {
            //bossen tekst
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
            },
            {
            //wegen
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#333333'}]
            },
            {
            //outline wegen alsingezoomd
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#333333'}]
            },
            {
            //text wegen
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ADADAD'}]
            },
            {
            //snelwegen
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
            },
            {
            //outline snelwegen
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#000000'}]
            },
            {
            //text snelwegen
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#D67675'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#636363'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#D8EFC0'}]
            },
            {

            //de zee
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#B6DCEF'}]
            },
            {
            //text water
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#ffffff'}]
            }
          ]
    });
    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    
    var locations = [
        {lat: 30.314097, lng: -81.648341, info:"Jacksonville"}, //jacksonville
        {lat: 26.051848, lng: -81.079102, info:"National Reserve"}, //reserve
        {lat: 31.435415, lng: -83.504184, info:"Tifton"}, //tifton
    ];

    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    var infoWin = new google.maps.InfoWindow();
    var markers = locations.map(function(location, i) {
    var marker = new google.maps.Marker({
        position: location
      });

      google.maps.event.addListener(marker, 'click', function(evt) {
        infoWin.setContent(location.info);
        infoWin.open(map, marker);
      })
      return marker;
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
    );

    
    getAPIdata(map);
}

