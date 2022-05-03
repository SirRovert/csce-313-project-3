const testList = [
    {
        "id": 1,
        "name": "NYone",
        "price": 300
    },
    {
        "id": 2,
        "name": "NYtwo",
        "price": 221
    },
    {
        "id": 3,
        "name": "CCTV",
        "price": 420
    }
];

function testAppend() {
    const div = document.getElementById("panel_four");
    
    const listContainer = document.createElement("div");
    listContainer.style.width = "70%";
    listContainer.style.height = "auto";
    listContainer.style.padding = "35px 40px;";
    listContainer.style.color = "#fff";
    listContainer.style.borderRadius = "10px";
    listContainer.style.display = "flex";

    const heading = document.createElement("h1");
    heading.innerHTML = "TEST HEADER!";
    const test = document.createElement("p");

    test.innerHTML = testList[0].name;
    console.log(test);
    // const price = document.createElement("li");
    // price.innerHTML = testList.value;

    div.appendChild(heading);
    // listContainer.appendChild(price);
    // div.appendChild(listContainer);
    locationsSearch("Dallas, Tx");
}

// get list of hotels in a cities, districts, places
function locationsSearch(destination) {
    var query = destination;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'f37fed8ef3msh6a79e97fbbd2b8dp18538fjsn25b950495a57'
        }
    }

    var fetchHttp = 'https://hotels4.p.rapidapi.com/locations/v2/search?query=';
    fetchHttp += query + '&locale=en_US&currency=USD';

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
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}