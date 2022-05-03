var lat = 1;
var long = 2;
const origin1 = { lat: 37.77, lng: -122.447 };
const origin2 = { lat: 37.768, lng: -122.511 };
var coord1 = "austin, tx";
var coord2 = "houston, tx";
var currentPosition;

function getLocation(){
    navigator.geolocation.getCurrentPosition(parsePosition);
   // lat = position.coords.latitude;
    //long = position.coords.longitude;
    //initMap(parseInt(lat), parseInt(long));
    
    /*
    var selectList = document.getElementById("origin");
    var newOriginOption = document.createElement("option");
    newOriginOption.text = userInput;
    newOriginOption.id = userInput;
    selectList.add(newOriginOption);
    */
   // currentPosition = { lat: lat, lng: long};
   // coord1 = currentPosition;
    //console.log("printing from getLocation: " + currentPosition.lat + " " + currentPosition.lng);
  //});
}

function parsePosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  currentPosition = { lat: lat, lng: long};
  coord1 = currentPosition;
  console.log("printing from getLocation: " + currentPosition.lat + " " + currentPosition.lng);
}

function changeDestination(){
    coord2 = document.getElementById("dest").value;
}


function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 37.77, lng: -122.447 },
    });
    
    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    
    };

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);


    document.getElementById("mode").addEventListener("change", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });


    const request = {
        origins: [origin1],
        destinations: [origin2],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };

    
    document.getElementById("request").innerText = JSON.stringify(
        request,
        null,
        2
    );
    
    
    service.getDistanceMatrix(request).then((response) => {
        // put response
        document.getElementById("response").innerText = JSON.stringify(
          response,
          null,
          2
        );

        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
    });

    document.getElementById("updateButton").addEventListener("click", onChangeHandler);

}
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, dest) {
    const selectedMode = document.getElementById("mode").value;
  
    directionsService
      .route({
        origin: coord1,
        destination: coord2,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }
  
  //window.initMap = initMap;
  window.onload = initMap();

  
  
  /*
    const origin1 = { lat: 55.93, lng: -3.118 };
    const origin2 = "Greenwich, England";
    const destinationA = "Stockholm, Sweden";
    const destinationB = { lat: 50.087, lng: 14.421 };

    const request = {
      origins: origin1,
      destinations: destinationA,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // put request on page
    document.getElementById("request").innerText = JSON.stringify(
      request,
      null,
      2
    );
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2
    );
  
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
        
      calculateAndDisplayRoute(directionsService, directionsRenderer);

    });*/