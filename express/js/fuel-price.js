// const { response } = require("express");

const fuelCost = document.getElementById("fuelCost");
const fuelPriceDisplay = document.getElementById("fuelPriceDisplay");
const distBox = document.getElementById("Distance");
const fuelBox = document.getElementById("FuelPrice");

function getGasPrice() {
    const val = document.getElementById('Distance').value;
    console.log(val);
    return val;
}

function getDistance() {
    const val = document.getElementById('FuelPrice').value;
    console.log(val);
    return val;
}

function getMPG() {
    const val = document.getElementById('MPG').value;
    console.log(val);
    return val;
}
 
function toggleDist() {
    // var x = document.getElementById("Distance");
    var x = distBox;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      x.style.margin = "auto";
    }
}

function toggleFuel() {
    var x = fuelBox;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      x.style.margin = "auto";
    }
}

function getGasType() {
  var x = document.getElementById("gasType")
  var usrValue = x.value;
  return usrValue;
}

function estimateCost() {
  var gasType = getGasType();
  console.log("type: " + gasType);
  var dis = getDistance();
  var fp = getGasPrice();
  var mpg = getMPG();

  // if manual distance inbox is unckecked, get distance from Josh's map api
  if (distBox.style.display === "none") {
    // TODO: get distance calculated form point A to B from Josh
    dis = 200;
  }
  
  if (fuelBox.style.display === "none") {
    // check for gasType 
    if (gasType) {

    }
  }

  // check if input is empty
  if (dis == null || dis == "" || fp == null || fp == "" || mpg == null || mpg == "") {
    fuelCost.innerHTML = "Invalid Inputs"
    return;
  }

  let price = dis*fp/mpg;
  price = price.toFixed(2);
  // fuelCost.innerHTML = "DIS: " + dis + " Fuel Cost: " + fp + " Miles/gallon: " + mpg;
  // var x = document.getElementById("fuelCost");
  // loadFuelPrice();
  fuelCost.innerHTML = "Estimate Cost: $ " + price;
  // fuelPriceDisplay.innerHTML = "test";
}

function getDieselPrice(){

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fuel-prices2.p.rapidapi.com',
      'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
    }
  };

  fetch('https://fuel-prices2.p.rapidapi.com/diesel/USA', options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      var type = "diesel";
      displayFuelPrice(data, type);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function getGasolinePrice(){
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fuel-prices2.p.rapidapi.com',
      'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
    }
  };

  fetch('https://fuel-prices2.p.rapidapi.com/gasoline/USA', options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      var type = "gasoline";
      displayFuelPrice(data, type);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayFuelPrice(data, type) {
  const litrePerGallon = 3.78541;
  console.log(data[0]);
  const country = data[0].country;
  
  if (type == "diesel") {
    console.log("Weekly avg Diesel: $" + data[0].diesel_price);
    
    let weeklyFuelPrice = data[0].diesel_price * litrePerGallon;
    weeklyFuelPrice = weeklyFuelPrice.toFixed(2);
    
    fuelPriceDisplay.innerHTML = "Weekly AVG Diesel Price in " + country + ": $" + weeklyFuelPrice;
    return weeklyFuelPrice;
  } 
  else if (type == "gasoline") {
    console.log("Weekly avg Gasoline: $" + data[0].gasoline_price);

    let weeklyFuelPrice = data[0].gasoline_price * litrePerGallon;
    weeklyFuelPrice = weeklyFuelPrice.toFixed(2);

    fuelPriceDisplay.innerHTML = "Weekly AVG Gasoline Price in " + country + ": $" + weeklyFuelPrice;
    return weeklyFuelPrice;
  }
  else {
    return NaN;
  }
}