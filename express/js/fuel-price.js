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

function estimateCost() {
  const dis = getDistance();
  const fp = getGasPrice();
  const mpg = getMPG();

  // check if input is empty
  if (dis == null || dis == "", fp == null || fp == "", mpg == null || mpg == "") {
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

function loadFuelPrice(){

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fuel-prices2.p.rapidapi.com',
      'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
    }
  };
  
  /*
  fetch('https://fuel-prices2.p.rapidapi.com/diesel/Portugal', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  */
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
      displayFuelPrice(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayFuelPrice(data) {
  console.log(data[0]);
  console.log("Weekly avg Fuel Price: " + data[0].diesel_price);

  const litrePerGallon = 3.78541;
  let weeklyFuelPrice = data[0].diesel_price * litrePerGallon;
  weeklyFuelPrice = weeklyFuelPrice.toFixed(2);
  
  const country = data[0].country;
  fuelPriceDisplay.innerHTML = "Weekly AVG Diesel Price in " + country + ": " + weeklyFuelPrice;
}