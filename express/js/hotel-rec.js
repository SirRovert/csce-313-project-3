function getHotelRec() {
    const container = document.getElementById("container-hotel");
    // console.log("container: " + container);
    deleteChild(container);

    
    // OR CALL API currently reading from JSON
    // readTextFile("../locationSearchTest.json", function (text) {
    //     var data = JSON.parse(text);
    //     console.log(data);
    //     displayHotel(data);
    // });
    
    // destination-input
    // let destination = "houston";
    const inputDestination = document.getElementById("destination-input");
    if (inputDestination) {
        let destination = inputDestination.value;
        if (destination) {
            console.log(destination);
            destination = destination.substring(0, destination.indexOf(", "));
            console.log(destination);
            locationsSearch(destination)
        } else {
            console.log("Empty Input");
        }
    }
    //locationsSearch(destination);
}

// get list of hotels in a cities, districts, places
function locationsSearch(destination) {
    var query = destination;
    // console.log("Test old http: " + query);
    // Formatting string to http acceptable 
    query = query.replace(",", "%2C");
    query = query.replace(" ", "%20");
    // console.log("Test new http: " + query);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
        }
    }

    var fetchHttp = 'https://hotels4.p.rapidapi.com/locations/v2/search?query=';
    fetchHttp += query + '&locale=en_US&currency=USD';
    // console.log("check fetchHttp: " + fetchHttp);
    
    fetch(fetchHttp, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESONSE ERROR");
            }
        })
        .then(data => {
            // console.log(data);
            displayHotel(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}

async function displayHotel(data) {
    // try counting the number of hotel entites
    let num = Object.keys(data.suggestions[1].entities).length;
    // console.log("hotel num: " + num);

    // For testing!
    // num = 1;

    if (num > 0) {
        for (let i = 0; i < num; i++) {
            // var hotelName = data.suggestions[1].entities[i].name;
            let hotelName = data.suggestions[1].entities[i].name;
            let hotelID = data.suggestions[1].entities[i].destinationId;
            appendList(hotelName);
           
            // readTextFile("../hotelDetailedTest.json", function (text) {
            //     var dataDetailed = JSON.parse(text);
            //     console.log(dataDetailed);
            //     displayHotelDetail(dataDetailed);
            // });
            await sleepHotel(200);
            getDetailSearch(hotelID);
        }
    }
    else {
        appendList("NO HOTEL FOUND FROM API");
        console.log("No hotel found in a given location");
    }
}

const sleepHotel = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// locationName, locationID
function getDetailSearch(locationID) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
        }
    };
    
    var fetchHttp = 'https://hotels4.p.rapidapi.com/properties/get-details?id='
    fetchHttp += locationID;
    fetchHttp += '&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US';
	
    // console.log("fetchHttp: " + fetchHttp);

    fetch(fetchHttp, options)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESONSE ERROR");
        }
    })
    .then(data2 => {
        // console.log(data2);
        displayHotelDetail(data2);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayHotelDetail(rawData) {
    let hotelName = rawData.data.body.propertyDescription.name;
    console.log("Name: " + hotelName);
    
    let textReview;
    let rating;
    let starRating;
    let currentPrice;

    if (rawData.data.body.guestReviews.brands.badgeText != undefined) {
        textReview = rawData.data.body.guestReviews.brands.badgeText;
        textReview = "Overall Review: " + textReview;
        appendDetail(hotelName, textReview);
    }
    if (rawData.data.body.guestReviews.brands.rating != undefined) {
        rating = rawData.data.body.guestReviews.brands.rating;
        rating = "Review Rating: " + rating;
        appendDetail(hotelName, rating);
    }
    if (rawData.data.body.propertyDescription.starRatingTitle != undefined ) {
        starRating = rawData.data.body.propertyDescription.starRatingTitle;
        starRating = "Star Rating: " + starRating;
        appendDetail(hotelName, starRating);
    }
    if (rawData.data.body.propertyDescription.featuredPrice != undefined) {
        currentPrice = rawData.data.body.propertyDescription.featuredPrice.currentPrice.formatted;
        currentPrice = "Current Price: " + currentPrice;
        appendPrice(hotelName, currentPrice);
    }
     
    
    console.log(
        textReview + "\n" +
        rating + "\n" +
        starRating + "\n" +
        currentPrice + "\n"
    );
    
    appendButton(hotelName);
}

function testDisplay() {
    readTextFile("../hotelDetailedTest.json", function (text) {
        var data2 = JSON.parse(text);
        console.log(data2);
        displayHotelDetail(data2);
    });
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

    const div = document.getElementById("panel_hotel");

    const container = document.getElementById("container-hotel");
    // console.log("container: " + container);
    //deleteChild(container);

    const listContainer = document.createElement("div");
    listContainer.setAttribute('id', n);
    listStyle(listContainer);

    const heading = document.createElement("h1");
    heading.innerHTML = name;
    heading.style.marginLeft = "5px";
    heading.style.marginRight = "5px";
    heading.style.width = "40%";

    listContainer.appendChild(heading);
    container.appendChild(listContainer);
    div.appendChild(container);
}

function appendButton(n) {
    const listContainer = document.getElementById(n);

    const button = document.createElement("button");
    const buttonID = n + "Button";
    button.setAttribute("id", buttonID);
    let parameter = "getPriceFromList('" + n + "')";
    button.setAttribute("onclick", parameter);
    
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

function getPriceFromList(n) {
    // console.log("clickTest");
    // console.log({n});
    var guestNum = document.getElementById("guestNum").value;
    if (guestNum < 1) {
        guestNum = 1;
    } 
    
    const hotelCostEstimation = document.getElementById("hotelCostEstimation");
    const hotelElement = n + "Price";
    const hotelPrice = document.getElementById(hotelElement);
    if (hotelPrice != null) {
       //  console.log(hotelPrice);
        // hotelCostEstimation.innerHTML = hotelPrice.textContent;
        let text = hotelPrice.textContent;
        let price = text.replace( /^\D+/g, '');
        hotelCostEstimation.innerHTML = "Estimation: $" + price*guestNum;
        hotelCostEstimation.style.fontSize = "30px";
    }
    else {
        hotelCostEstimation.innerHTML = "We currently don't have price for this hotel";
    }
}

function appendPrice(n, price) {
    const listContainer = document.getElementById(n);
    const priceLi = document.createElement("li");
    let liName = n + "Price";
    priceLi.setAttribute("id", liName);
    priceLi.innerHTML = price;
    priceLi.style.margin = "auto";
    listContainer.appendChild(priceLi);
}


function appendHotelID(n, id) {
    const listContainer = document.getElementById(n);
    const hotelID = document.createElement("li");
    hotelID.innerHTML = id;
    hotelID.style.margin = "auto";
    listContainer.appendChild(hotelID);
} 

function appendDetail(n, element) {
    const listContainer = document.getElementById(n);
    const elementLi = document.createElement("li");
    elementLi.innerHTML = element;
    elementLi.style.margin = "auto";
    listContainer.appendChild(elementLi);
}


function appendError(n) {
    const listContainer = document.getElementById(n);
    const errorMessage = document.createElement("li");
    errorMessage.innerHTML = "ERROR no data found";
    errorMessage.style.margin = "auto";
    listContainer.appendChild(errorMessage);
}

function hold() {
    const priceList = document.createElement("li");
    priceList.innerHTML = "Current Price: $" + price;
    priceList.style.margin = "10px 10px";

    const ratingList = document.createElement("li");
    ratingList.innerHTML = "Rating: " + rating + "/10";
    ratingList.style.margin = "10px 10px";

    const reviewList = document.createElement("li");
    reviewList.innerHTML = "Review Summary: " + review;
    reviewList.style.margin = "10px 10px";

    listContainer.appendChild(priceList);
    listContainer.appendChild(ratingList);
    listContainer.appendChild(reviewList);
}