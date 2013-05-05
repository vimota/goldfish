$(document).ready(function() {
  var TWITTER_USERNAME = document.getElementById("usrName").value,
      TWITTER_USERID   = 14197193,
      TWITTER_CONSUMER_KEY = "rdyanWJSlClGZyUOZFsbrg",
      TWITTER_CONSUMER_SECRET = "j5eBd36HKo96GkFF9NX7qUa34cERVTwYLuAR40lhRI",
  	  LOC = document.getElementById("usrLoc").value,
  	  VENUES;

  cb = new Codebird;
  cb.setConsumerKey(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);
  cb.setToken('14197193-vx7NLH8zJRSksrotn3k2ZnOYkDUEeplMxH14pz9rE', 'FhRv0OwSCWotHg4HW50FPPJGU5o3Yhn6WWjbT15HXOw');
  console.log(cb);

  // Foursquare call used to grab venues in location
  $.get("https://api.foursquare.com/v2/venues/search?near=Toronto, ON&intent=browse&radius=1500&categoryId= 4d4b7105d754a06376d81259&oauth_token=JUPFSHFSPFGFUDZF4PWAWXFDRNK4FYSWYXU5GHQYVAAXHID1&v=20130504")

  function btnConnectClick(){
	VENUES = getVenueNames(LOC);
  }

  function getRelatedTweets(username, venues, isPublic) {
    var users = getTwitterUsers(username, isPublic);
    return [{}];
  }

  function getTwitterUsers(username, isPublic) {
    var users = [];
  }
});
