var lat;
var long;

function getLocation(){
    console.log("worked");
    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    initMap(parseInt(lat), parseInt(long)); 
  });
}
  
  
function initMap(lat=37.0902, lng= -95.7129) {

  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: lat, lng: lng},
    disableDefaultUI: true,
  });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  const control = document.getElementById("floating-panel");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  //functions for finding user locations
  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat.toFixed(2));
      console.log(long.toFixed(2));

    });
  }
  
  function showPosition(position) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
  }


  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function changeDestination(){
  userInput = document.getElementById("dest").value;

  var selectList = document.getElementById("end");
  var newDestOption = document.createElement("option");
  newDestOption.text = userInput;
  newDestOption.id = userInput;
  selectList.add(newDestOption, selectList[0]);

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




window.initMap = initMap;