// const { response } = require("express");
// import { increasePrice } from './index_page';

const fuelCost = document.getElementById("fuelCost");
const fuelPriceDisplay = document.getElementById("fuelPriceDisplay");
const distBox = document.getElementById("Distance");
const fuelBox = document.getElementById("FuelPrice");

function getDistance() {
    const val = document.getElementById('Distance').value;
    console.log(val);
    return val;
}

function getGasPrice() {
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
  
  // const fuelPriceDisplay = document.getElementById("fuelPriceDisplay");
  fuelPriceDisplay.innerHTML = "Processing. Please wait :D"

  var dis;
  var fp;
  var mpg;

  // Limiting the number of API request, check for possible invalid inputs before requesting
  // if manual distance inbox is unckecked, get distance from Josh's map api
  if (!document.getElementById('DisBox').checked) {
    // TODO: get distance calculated form point A to B from Josh
    dis = 100;
    var offset = getRandDist(-15, 15);
    dis += offset;

  } else if (document.getElementById('DisBox').checked) {
    dis = getDistance();
    if (dis == null || dis == "") {
      fuelCost.innerHTML = "Invalid Distance"
      console.log(dis);
      return;
    }
  }
  
  var mpg = getMPG();
  if (mpg == null || mpg == "") {
    fuelCost.innerHTML = "Empty/Invalid MPG. Use 25.4 miles per gallon instead."
    mpg = 25.4;
  }

  if (!document.getElementById('FuelCostBox').checked) {
    // check for gasType 
    if (gasType == "diesel") {
      getDieselPrice();
      // fp = fuelPriceAPI;
      // console.log("Diesel: $" + fp);
    }
    else if (gasType == "gasoline") {
      getGasolinePrice();
      // fp = fuelPriceAPI;
      // console.log("gasoline: $" + fp);
    }
    else {
      fuelCost.innerHTML = "Invalid Fuel Type";
      return;
    }
  } else if (document.getElementById('FuelCostBox').checked) {
    fp = getGasPrice(); // get gas price from input box
    if (fp == null || fp == "") {
      if (gasType == "diesel") {
        fuelPriceDisplay.innerHTML = "Empty/Invalid Diesel Price. Use $5.08 per gallon instead (25-April-2022 data)"
        fp = 5.08;
      }
      else if (gasType == "gasoline") {
        fuelPriceDisplay.innerHTML = "Empty/Invalid Gasoline Price. Use $4.52 per gallon instead (25-April-2022 data)"
        fp = 4.52;
      }
      let price = dis*fp/mpg;
      console.log("Check dis: " + dis);
      console.log("Check mpg: " + mpg);
      console.log("Check fp: " + fp);
      console.log("Check price" + price);

      price = price.toFixed(2);
      
    }
  }  
  fuelPriceDisplay.innerHTML = "Your gas price per gallon: $" + fp;
  let price = dis*fp/mpg;
  price = price.toFixed(2);
  if (price == NaN) {
    fuelCost.innerHTML = "Waiting For API";
  } else {
    fuelCost.innerHTML = "Estimate Cost: $ " + price;
    
  }
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

function getRandDist(min, max) {
  // For testing :D
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function displayFuelPrice(data, type) {
  const litrePerGallon = 3.78541;
  console.log(data[0]);
  const country = data[0].country;
  var weeklyFuelPrice;

  if (type == "diesel") {
    console.log("Weekly Diesel per Litre: $" + data[0].diesel_price);
    
    weeklyFuelPrice = data[0].diesel_price * litrePerGallon;
    weeklyFuelPrice = weeklyFuelPrice.toFixed(2);
    
    fuelPriceDisplay.innerHTML = "Weekly AVG Diesel Price in " + country + ": $" + weeklyFuelPrice;
  } 
  else if (type == "gasoline") {
    console.log("Weekly Gasoline per Litre: $" + data[0].gasoline_price);

    weeklyFuelPrice = data[0].gasoline_price * litrePerGallon;
    weeklyFuelPrice = weeklyFuelPrice.toFixed(2);

    fuelPriceDisplay.innerHTML = "Weekly AVG Gasoline Price in " + country + ": $" + weeklyFuelPrice;
  }
  let localDist = getDistance();
  let localMPG = getMPG();
  if (localMPG == "" || localMPG == "") {
    localMPG = 25.4;
  }
  // incase the distance input is invalid
  if (localDist == "" || localDist == "") {
    localDist = 100;
    var offset = getRandDist(-15, 15);
    localDist += offset;
  }
  console.log("TEST: " + localDist + " " + localMPG);

  let price = localDist*weeklyFuelPrice/localMPG;
  price = price.toFixed(2);
  fuelCost.innerHTML = "Estimate Cost: $ " + price;
  //increasePrice(price);
  addGasSummary(price);
}

function addFuelCost() {
  const fuelcost = document.getElementById("fuelCost");
  let costTxt = fuelcost.textContent;
  console.log("costTxt: ", costTxt);
  // increasePrice(20);
  var rgx = /^[0-9]*\.?[0-9]*$/; 
  let cost = costTxt.replace(/[^0-9\.]/g,'');
  console.log("cost: ", cost);
  increasePrice(cost);
  addGasSummary(price);
}