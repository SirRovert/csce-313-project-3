function setup() {
    createCanvas(200,200);
    // HERE Api
    let link = "https://fuel-v2.cc.api.here.com/fuel/stations.xml"
    // Prox's Parameter: x-cord, y-cord, range
    let prox = "?prox=52.516667,13.383333,5000"
    let api_key = "&apiKey=jd8v2XkEgHFAXEum_Cg0o9o3_a6DfBOtUiakZE1AN2c"
    loadJSON("api");
}

function GetFuelPrice(distance, type) {
    let price = distance * 20;
    return price;
} 

console.log(GetFuelPrice(20));