var lat = 1;
var long = 2;

function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    //initMap(parseInt(lat), parseInt(long));
    
    /*
    var selectList = document.getElementById("origin");
    var newOriginOption = document.createElement("option");
    newOriginOption.text = userInput;
    newOriginOption.id = userInput;
    selectList.add(newOriginOption);
    */
    console.log("printing from getLocation: " + lat + " " +  long);
  });
}


