/*
// since the api doesn't work, we let the users input the current gas price
function setup() {
    createCanvas(200,200);
    // HERE Api
    let link = "https://fuel-v2.cc.api.here.com/fuel/stations.xml"
    // Prox's Parameter: x-cord, y-cord, range
    let prox = "?prox=52.516667,13.383333,5000"
    let api_key = "&apiKey=jd8v2XkEgHFAXEum_Cg0o9o3_a6DfBOtUiakZE1AN2c"
    loadJSON("api");
}
*/
const fuelCost = document.getElementById("fuelCost");

function getGasPrice() {
    const val = document.getElementById('Distance').value;
    console.log(val);
    return val;
}

function getDistance() {
    const val = document.getElementById('FuelCost').value;
    console.log(val);
    return val;
}

function getMPG() {
    const val = document.getElementById('MPG').value;
    console.log(val);
    return val;
}


function eastimateCost() {
    const dis = getDistance();
    const fp = getGasPrice();
    const mpg = getMPG();
    // const milePerGallon = 25.4;
    // let price = dis/milePerGallon*fp;
    let price = dis*fp/mpg;
    
    price = price.toFixed(2);
    // fuelCost.innerHTML = "DIS: " + dis + " Fuel Cost: " + fp + " Miles/gallon: " + mpg;
    fuelCost.innerHTML = "Estimate Cost: $ " + price;
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

// console.log(eastimateCost());