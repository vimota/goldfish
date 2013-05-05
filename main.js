$(document).ready(function() {
  var TWITTER_USERNAME = document.getElementById("usrName").value,
      TWITTER_USERID   = 14197193,
      TWITTER_CONSUMER_KEY = "rdyanWJSlClGZyUOZFsbrg",
      TWITTER_CONSUMER_SECRET = "j5eBd36HKo96GkFF9NX7qUa34cERVTwYLuAR40lhRI",
  	  CITY = document.getElementById("usrLoc").value,
  	  VENUES;

  cb = new Codebird;
  cb.setConsumerKey(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);
  cb.setToken('14197193-vx7NLH8zJRSksrotn3k2ZnOYkDUEeplMxH14pz9rE', 'FhRv0OwSCWotHg4HW50FPPJGU5o3Yhn6WWjbT15HXOw');
  console.log(cb);

  function btnConnectClick(){
	VENUES = getVenueNames(CITY);
  }

  function getRelatedTweets(username, venues, isPublic) {
    var users = getTwitterUsers(username, isPublic);
    return [{}];
  }

  function getTwitterUsers(username, isPublic) {
    var users = [];
  }

  function getVenueNames(city){
		$.get("https://api.foursquare.com/v2/venues/search?near=" + city + ", ON&intent=browse&radius=500&categoryId=4bf58dd8d48988d11f941735&oauth_token=JUPFSHFSPFGFUDZF4PWAWXFDRNK4FYSWYXU5GHQYVAAXHID1&v=20130504",
		function(data){
			var places = new Array();
			$.each(data.response.venues, function(i, venues){
				places.push({name: venues.name, lat: venues.location.lat, lng:venues.location.lng, hereNow: venues.hereNow.count});
			});
		});
	}
	function getMap(){
		getMapDetails();
	}
});