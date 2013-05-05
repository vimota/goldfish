function getMapDetails(venues){

  var diffRed = 139;
  var diffGreen = 24;
  var diffBlue = 124;

  // Create an object containing LatLng, population.
  var clubmap = {};
  for (var i = 0; i < venues.length; i++ ){
    clubmap[venues[i].name] = {
      center: new google.maps.LatLng(venues[i].lat, venues[i].lng),
      population: venues[i].hereNow + venues[i].male + venues[i].female,
      percentFade: (venues[i].male+venues[i].female === 0) ? 0.5 : (venues[i].male /(venues[i].male+venues[i].female)),
      friend: venues[i].friend,
      tweets: venues[i].tweets
    };
  }
  var clubCircle;
  //need to pass in object from victor
  function initialize() {
    console.log(clubmap);
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
      diffRed = (diffRed * clubmap[club].percentFade) + 255;
      diffGreen = (diffGreen * clubmap[club].percentFade) + 116;
      diffBlue = (diffBlue * clubmap[club].percentFade) + 140;
      var ratioColour = "#" + diffRed.toString(16) + diffGreen.toString(16) + diffBlue.toString(16);
        // Construct the circle for each value in clubmap.
        var populationOptions = {
          //if friend set to green
          strokeColor: (clubmap[club].friend) ? '#006600' : ratioColour,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: ratioColour,
          fillOpacity: 0.35,
          map: map,
          center: clubmap[club].center,
          radius: clubmap[club].population / maxPop * 200,
          clickable: true
        };
        clubCircle = new google.maps.Circle(populationOptions);
        console.log(clubCircle);
        google.maps.event.addDomListener(clubCircle, 'click', details);
    }
  }
  initialize();
  $('#map-canvas').show();

  function embedTweet(index, tweet) {
    console.log("TWEETS");
    console.log(tweet);
    $(".hidden").removeClass(".hidden");
    $('#loader').addClass("hidden");
    $("#tweets").append(tweet.text);
  }

  function details(mouseEvent){
    console.log(mouseEvent.latLng.lat());
    var small, minRadius = 1000000;
    for(var i in clubmap){
      var distance = Math.pow(Math.pow(mouseEvent.latLng.lat() - clubmap[i].center.lat(),2) + Math.pow(mouseEvent.latLng.lng() - clubmap[i].center.lng(), 2), 0.5);
      var radius = clubmap[i].population / maxPop * 0.0100;
      // console.log(i);
      if (distance <= (radius) && (radius !== 0)){
        console.log(i);
        console.log(distance);
        console.log(radius);
        if (minRadius > distance) {
          minRadius = distance;
          small = i;
        }
      }
    }
    $("#clubTitle").text(small);
    console.log(clubmap[small]);
    $("#tweets").html("");
    $.each(clubmap[small].tweets, embedTweet)
  }
}