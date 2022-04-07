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
    const val = document.querySelector('input').value;
    console.log(val);
    return val;
}

function getDistance() {
    const val = document.querySelector('input').value;
    console.log(val);
    return val;
}

function eastimateCost() {
    let dis = getDistance();
    let fp = getGasPrice();
    
    const milePerGallon = 25.4;
    let price = dis/milePerGallon*fp;
    price = price.toFixed(2);
    fuelCost.innerHTML = "Estimate Cost: $ " + price;
} 

console.log(GetFuelPrice(20));