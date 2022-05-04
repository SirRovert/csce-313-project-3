function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getHotelRec() {
    // OR CALL API currently reading from JSON
    readTextFile("../locationSearchTest.json", function(text){
        var data = JSON.parse(text);
        console.log(data);
        displayName(data);
    });
}

// appendList(name, price, rating)
function appendList() {

    const name = "test";
    const price = 200;
    const rating = 7;
    const review = "Good!"

    const div = document.getElementById("panel_four");
    div.style.margin = "auto";
    
    const listContainer = document.createElement("div");
    listContainer.style.width = "70%";
    listContainer.style.height = "auto";
    listContainer.style.padding = "35px 40px;";
    listContainer.style.backgroundColor = "#CBFFBE";
    listContainer.style.color = "#000000";
    listContainer.style.borderRadius = "10px";
    listContainer.style.display = "flex";
    listContainer.style.margin = "20px 20px";


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
    listContainer.appendChild(priceList);
    listContainer.appendChild(ratingList);
    listContainer.appendChild(reviewList);

    div.appendChild(listContainer);
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
      displayName(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayName(data) {
    hotelData = data;
    console.log("in display name");
    // Hotel_group
    console.log("1: " + data.suggestions[1].group);
    // Entities in Hotel_Group
    console.log("2: " + data.suggestions[1].entities[0].name);

    // try counting the number of hotel entites
    let num = Object.keys(data.suggestions[1].entities).length;
    console.log("3: " + num);

    for (let i = 0; i < num; i++) {
        appendList(data.suggestions[1].entities[num].name);
    }

}
