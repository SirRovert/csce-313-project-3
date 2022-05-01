var lat;
var long;

function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    console.log("printing from yelp: " + lat + " " +  long);
  });
}

//getLocation();