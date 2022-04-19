
function mapUpdate(){
    
    var input = document.getElementById("locationName").value;
    Longitude = input;

    //removes map div element
    const removeElem = document.getElementById("map");
    removeElem.remove();

    //create new div and p element
    const mapDiv = document.createElement("div");
    //const paraElem = document.createElement("p");
    mapDiv.setAttribute("id", "map");

    //create text node and put textnode into the new paraElem
    //const textNode = document.createTextNode("Map Div Texts!");
    //paraElem.appendChild(textNode);

    //add paraElem to map div element
    //mapDiv.appendChild(paraElem);

    //find paraDiv and tag body
    //const paraDiv = document.getElementById("para");
    const bodyDiv = document.getElementsByTagName("body");
    const mainBody = document.getElementById("body1");

    mainBody.appendChild(mapDiv);
    //paraDiv.appendChild(mapDiv);
    //paraDiv.appendChild(mapDiv);
    
    initMap(48.8566, 2.3522);

}


function changeName() {
    var input = document.getElementById("dest").value;
    document.getElementById("start").innerHTML = input;
    console.log(input);
    alert(input);
}


let map;

function initMap(Latitude = 35.676, Longitude = 139.650) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: Latitude, lng: Longitude },
    zoom: 8,
    mapTypeID: google.maps.MapTypeId.ROADMAP
  });
}


window.initMap = initMap;

