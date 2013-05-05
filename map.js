  function getMapDetails(){

    var diffRed = 139;
    var diffGreen = 24;
    var diffBlue = 124;

    // Create an object containing LatLng, population.
    var citymap = {};
    citymap['fox'] = {
      center: new google.maps.LatLng(43.649181,-79.390254),
      population: 15
    };
    citymap['phils'] = {
      center: new google.maps.LatLng(43.651479,-79.380383),
      population: 10
    };
    citymap['beta'] = {
      center: new google.maps.LatLng(43.646759,-79.389954),
      population: 20
    }
    var cityCircle;
    //need to pass in object from victor
    function initialize() {
      var myLatlng = new google.maps.LatLng(43.6481, -79.3800);
      var mapOptions = {
        center: myLatlng,
        zoom: 15  ,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);

      maxPop = 1;
      for(var city in citymap){
        if (citymap[city].population > maxPop){
          maxPop = citymap[city].population;
        }
      }
      // percentFade = 
      diffRed = (diffRed * percentFade) + 255;
      diffGreen = (diffGreen * percentFade) + 116;
      diffBlue = (diffBlue * percentFade) + 140;
      for (var city in citymap) {
        // Construct the circle for each value in citymap.
        var populationOptions = {
          //if friend set to green
          strokeColor: '#ffc0cb',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#" + diffRed.toString(16) + diffGreen.toString(16) + diffBlue.toString(16),
          fillOpacity: 0.35,
          map: map,
          center: citymap[city].center,
          radius: citymap[city].population / maxPop * 100
        };
        cityCircle = new google.maps.Circle(populationOptions);
      }
    }
  google.maps.event.addDomListener(window, 'load', initialize);
  }