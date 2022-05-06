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


function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });
  service = new google.maps.places.PlacesService(map);


  new AutocompleteDirectionsHandler(map);
}

function translatePlace_ID(placeID){
  var placeIDString = String(placeID);

  const request = {
      placeId: placeIDString,
      fields: ['geometry']
  }

  console.log("translate function ran");
  service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
          destLat = place.geometry.location.lat();
          destLng = place.geometry.location.lng();

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
  console.log("query ran")
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].name + " " + results[i].vicinity + " " + 
      results[i].price_level + " " + results[i].rating);
    }
  }
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
        console.log(place.place_id);
      } else {
        this.destinationPlaceId = place.place_id;
        translatePlace_ID(place.place_id);
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

function appendList(n) {

  const name = n;

  const div = document.getElementById("panel_hotel");

  const container = document.getElementById("container-hotel");
  // console.log("container: " + container);
  //deleteChild(container);

  const listContainer = document.createElement("div");
  listContainer.setAttribute('id', n);
  listStyle(listContainer);

  const heading = document.createElement("h1");
  heading.innerHTML = name;
  heading.style.marginLeft = "5px";
  heading.style.marginRight = "5px";
  heading.style.width = "40%";

  listContainer.appendChild(heading);
  container.appendChild(listContainer);
  div.appendChild(container);
  
  // div.style.height = "100%";
}

function appendButton(n) {
  const listContainer = document.getElementById(n);

  const button = document.createElement("button");
  const buttonID = n + "Button";
  button.setAttribute("id", buttonID);
  let parameter = "getPriceFromList('" + n + "')";
  button.setAttribute("onclick", parameter);
  
  // button.style.position = "absolute";
  button.style.width = "40px";
  button.style.height = "40px";
  button.style.backgroundColor = "#7ed30f";
  button.style.cursor = "pointer";
  button.style.border = "2px solid white";
  button.style.margin = "auto 20px";
  button.style.borderRadius = "50%";
  button.style.right = "5px";
  // button.style.paddingRight = "10px";

  button.style.top = "50%";
  button.style.left = "50%";
  button.innerHTML = "+";
  button.style.fontWeight = "bold";


  listContainer.appendChild(button);
  /*
  const div = document.getElementById("panel_hotel");
  div.style.height = "100%";
  */
}

window.initMap = initMap;