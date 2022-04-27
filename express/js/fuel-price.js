const fuelCost = document.getElementById("fuelCost");

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
    var x = document.getElementById("Distance");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

function toggleFuel() {
    var x = document.getElementById("FuelPrice");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

function estimateCost() {
  fuelCost.innerHTML = "test1"
  const dis = getDistance();
  const fp = getGasPrice();
  const mpg = getMPG();
  // const milePerGallon = 25.4;
  // let price = dis/milePerGallon*fp;
  let price = dis*fp/mpg;
  
  price = price.toFixed(2);
  // fuelCost.innerHTML = "DIS: " + dis + " Fuel Cost: " + fp + " Miles/gallon: " + mpg;
  // var x = document.getElementById("fuelCost");
  fuelCost.innerHTML = "Estimate Cost: $ " + price;
  loadFuelPrice();
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
  
}