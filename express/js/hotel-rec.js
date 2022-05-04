function getHotelRec() {
    const container = document.getElementById("container-hotel");
    console.log("container: " + container);
    deleteChild(container);
    
    // OR CALL API currently reading from JSON
    readTextFile("../locationSearchTest.json", function (text) {
        var data = JSON.parse(text);
        console.log(data);
        displayHotel(data);
    });

    // let destination = "houston";
    // locationsSearch(destination);
}

// get list of hotels in a cities, districts, places
function locationsSearch(destination) {
    var query = destination;
    console.log("Test old http: " + query);

    // Formatting string to http acceptable 
    query = query.replace(",", "%2C");
    query = query.replace(" ", "%20");
    console.log("Test new http: " + query);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
        }
    }

    var fetchHttp = 'https://hotels4.p.rapidapi.com/locations/v2/search?query=';
    fetchHttp += query + '&locale=en_US&currency=USD';
    console.log("check fetchHttp: " + fetchHttp);


    fetch(fetchHttp, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESONSE ERROR");
            }
        })
        .then(data => {
            console.log(data);
            displayHotel(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}

function displayHotel(data) {
    // console.log("in display name");
    // Hotel_group
    // console.log("1: " + data.suggestions[1].group);
    // Entities in Hotel_Group
    // console.log("2: " + data.suggestions[1].entities[0].name);

    // try counting the number of hotel entites
    let num = Object.keys(data.suggestions[1].entities).length;
    console.log("hotel num: " + num);

    if (num > 0) {
        for (let i = 0; i < num; i++) {
            // var hotelName = data.suggestions[1].entities[i].name;
            let hotelName = data.suggestions[1].entities[i].name;
            let hotelID = data.suggestions[1].entities[i].destinationId;
            appendList(hotelName);
            appendDetail(hotelName);
            appendButton(hotelName);
        }
    }
    else {
        appendList("NO HOTEL FOUND FROM API");
        console.log("No hotel found in a given location");
    }
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function listStyle(div) {
    div.style.width = "70%";
    div.style.height = "auto";
    div.style.padding = "35px 40px;";
    div.style.backgroundColor = "#CBFFBE";
    div.style.color = "#000000";
    div.style.borderRadius = "10px";
    div.style.display = "flex";
    div.style.margin = "20px 20px";
}

function deleteChild(div) {
    if (div == null) {
        return;
    }
    var child = div.lastElementChild;
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }
}

// appendList(name, price, rating)
function appendList(n) {

    const name = n;
    const price = 200;
    const rating = 7;
    const review = "Good!"

    const div = document.getElementById("panel_hotel");

    const container = document.getElementById("container-hotel");
    console.log("container: " + container);
    //deleteChild(container);

    const listContainer = document.createElement("div");
    listContainer.setAttribute('id', n);
    listStyle(listContainer);

    const heading = document.createElement("h1");
    heading.innerHTML = name;
    heading.style.marginLeft = "5px";
    heading.style.marginRight = "20px";

    const priceList = document.createElement("li");
    priceList.innerHTML = "Current Price: $" + price;
    priceList.style.margin = "10px 10px";

    const ratingList = document.createElement("li");
    ratingList.innerHTML = "Rating: " + rating + "/10";
    ratingList.style.margin = "10px 10px";

    const reviewList = document.createElement("li");
    reviewList.innerHTML = "Review Summary: " + review;
    reviewList.style.margin = "10px 10px";

    listContainer.appendChild(heading);
    // listContainer.appendChild(priceList);
    // listContainer.appendChild(ratingList);
    // listContainer.appendChild(reviewList);

    container.appendChild(listContainer);
    div.appendChild(container);
}

function appendDetail(n) {
    const listContainer = document.getElementById(n);

    const test = document.createElement("p");
    test.innerHTML = "HAHAHAAH it kinna works";

    listContainer.appendChild(test);
}

function appendButton(n) {
    const listContainer = document.getElementById(n);

    const button = document.createElement("button");
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
}

function appendHotelID(n, id) {
    const listContainer = document.getElementById(n);
    const hotelID = document.createElement("li");
    hotelID.innerHTML = id;

    listContainer.appendChild(test);
} 