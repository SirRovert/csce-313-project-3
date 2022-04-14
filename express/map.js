
function mapUpdate(){
    console.log("What is this output?")
}


function changeName() {
    var input = document.getElementById("dest").value;
    document.getElementById("start").innerHTML = input;
    console.log(input);
    alert(input);

}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}