var lat;
var long;

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



function initMap() {
  console.log("printing from initMap: " + lat + " " +  long);
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 37.0902, lng: -95.7129},
    disableDefaultUI: true,
  });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  const control = document.getElementById("floating-panel");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
  console.log("printing from initMap: " + lat + " " +  long);
}

function changeOrigin(){
  userInput = document.getElementById("origin").value;

  var selectList = document.getElementById("start");
  var newOriginOption = document.createElement("option");
  newOriginOption.text = userInput;
  newOriginOption.id = userInput;
  selectList.add(newOriginOption);

}

function changeDestination(){
  userInput = document.getElementById("dest").value;

  var selectList = document.getElementById("end");
  var newDestOption = document.createElement("option");
  newDestOption.text = userInput;
  newDestOption.id = userInput;
  selectList.add(newDestOption);
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  directionsService
    .route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}


function routeTest(directionsService, directionsRenderer) {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  var haight = new google.maps.LatLng(37.7699298, -122.4469157);
  var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
  directionsService
    .route({
      origin: haight,
      destination: oceanBeach,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

routeTest(directionsService, directionsRenderer);

window.initMap = initMap;