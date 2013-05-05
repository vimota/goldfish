function getMapDetails(venues){

  var diffRed = 139;
  var diffGreen = 24;
  var diffBlue = 124;

  // Create an object containing LatLng, population.
  var clubmap = {};
  for (var i = 0; i < venues.length; i++ ){
    clubmap[venues.name] = {
      center: new google.maps.LatLng(venues[i].lat, venues[i].lng),
      population: venues[i].hereNow + venues[i].male + venues[i].female,
      percentFade: (venues[i].male+venues[i].female === 0) ? 0.5 : (venues[i].male /(venues[i].male+venues[i].female)),
      friend: venues[i].friend
    };
  }
  var clubCircle;
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
    for(var club in clubmap){
      if (clubmap[club].population > maxPop){
        maxPop = clubmap[club].population;
      }
    }
    for (var club in clubmap) {
    diffRed = (diffRed * percentFade) + 255;
    diffGreen = (diffGreen * percentFade) + 116;
    diffBlue = (diffBlue * percentFade) + 140;
    var ratioColour = "#" + diffRed.toString(16) + diffGreen.toString(16) + diffBlue.toString(16);
      // Construct the circle for each value in clubmap.
      var populationOptions = {
        //if friend set to green
        strokeColor: (club.friend) ? '#006600' : ratioColour,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: ratioColour,
        fillOpacity: 0.35,
        map: map,
        center: clubmap[club].center,
        radius: clubmap[club].population / maxPop * 100,
        clickable: true
      };
      clubCircle = new google.maps.Circle(populationOptions);
      google.maps.event.addDomListener(clubCircle, 'click', details);
    }
  }
  initialize();

  function embedTweet(tweet) {
    $(".hidden").removeClass(".hidden");
    $('#loader').addClass("hidden");
    $("#tweets").append(tweet);
  }

  function details(MouseEvent){
    for(var i in clubmap){
      if (clubmap[i].center == MouseEvent.latLng){
        $("#clubTitle").text(clubmap[i].name);
        $.each(clubmap[i].tweets, function(i, tweet){
          cb.__call(
          'statuses/oembed',
            {id:tweet.id},
            embedTweet);
          });
      }
    }
  }
}