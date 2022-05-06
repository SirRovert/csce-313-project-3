// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let destPlaceID;
let service;
let destLng;
let destLat;
let originLat;
let originLng;

let geocoder;
let MatrixService;
let distance;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });
  service = new google.maps.places.PlacesService(map);
  geocoder = new google.maps.Geocoder();
  MatrixService = new google.maps.DistanceMatrixService();

  new AutocompleteDirectionsHandler(map);
}

function translatePlace_ID(placeID, type_){
  var placeIDString = String(placeID);

  const request = {
      placeId: placeIDString,
      fields: ['geometry']
  }

  service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        if(type_ == 'dest'){
          destLat = place.geometry.location.lat();
          destLng = place.geometry.location.lng();
        } else if(type_ == 'origin'){
          originLat = place.geometry.location.lat();
          originLng = place.geometry.location.lng();
        }

      }
  });
}

function findNearbySearch(search_type, lat, lng){
  var request = {
    location: { lat: lat, lng: lng},
    radius: '8000',
    type: [search_type]
  };

  service.nearbySearch(request, callback);
  console.log(lat, lng);
}

  function callback(results, status) {
    var barCount = 1;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].name + " " + results[i].vicinity + " " + 
        results[i].price_level + " " + results[i].rating);
        
        //if result is not null
        if(!(results[i].name == null) || !(results[i].name == "")){
            var barName = document.getElementById(barCount + "R-name");
            var barAddr = document.getElementById(barCount + "R-address");
            var barPrice = document.getElementById(barCount + "R-price");
            var barRate = document.getElementById(barCount + "R-rating");

            barName.innerText = results[i].name;
            barAddr.innerText = results[i].vicinity;
            barPrice.innerText = "Price: " + results[i].price_level;
            barRate.innerText = "Rating: " + results[i].rating;

            barCount++;
          }
        }
      }
    }

  function distanceOfTrip(){
    const request = {
      origins: [{ lat: originLat, lng: originLng}],
      destinations: [{ lat: destLat, lng: destLng}],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    MatrixService.getDistanceMatrix(request).then((response) => {
      // put response
      /*
      document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2
      );*/
      var distanceElem = document.getElementById("distance-map");
      var durationElem = document.getElementById("duration-map");
      distance = 0.621 * parseInt(response.rows[0].elements[0].distance.text);

      distanceElem.innerText = "Distance: " + distance + " miles";
      durationElem.innerText = "Duration: " + response.rows[0].elements[0].duration.text;

      console.log(response.rows[0].elements[0].distance.text);
      console.log(response.rows[0].elements[0].duration.text);
        
      // show on map
    });

  }

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  places;
  service;
  infoWindow;

  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    const searchButton = document.getElementById("find");

    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }  
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );

    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );

    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);


    
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }


  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
        translatePlace_ID(place.place_id, 'origin');
      } else {
        this.destinationPlaceId = place.place_id;
        translatePlace_ID(place.place_id, 'dest');
      }



      this.route();

    });
  }



  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        } 
      }
    );
  }
}



window.initMap = initMap;