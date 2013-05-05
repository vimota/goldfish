

// Foursquare call used to grab venues in location
var places = $.get("https://api.foursquare.com/v2/venues/search?near=Toronto, ON&intent=browse&radius=500&categoryId=4bf58dd8d48988d11f941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11b941735,4bf58dd8d48988d11d941735,4bf58dd8d48988d120941735&oauth_token=JUPFSHFSPFGFUDZF4PWAWXFDRNK4FYSWYXU5GHQYVAAXHID1&v=20130504")
var placeNames = place.responseText