//uses Browser's Geolocation API in conjuction with
//OpenWeather's API for example purposes for two
//API's in conjuction

const test1 = document.getElementById("test1");

function weatherAt(){
    longAndLat();
}

    function longAndLat() { //get the lat and long of the user's position
        try {
            navigator.geolocation.getCurrentPosition(longAndLatPosition);

        }
        catch {
            test1.innerHTML = err;
        }
    }
    function longAndLatPosition(position) {
        //receives a large string of the current weather, temperature is in kelvin.
    const latitude = position.coords.latitude; 
    const longitude = position.coords.longitude;
    const api_key = "a94c87c400672a317497ef1c938db6b4";
    //this sends a requeste to openweather using the API key, which is listed afte
    var Http = new XMLHttpRequest();
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" +
    longitude + "&appid=" + api_key;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        test1.innerHTML = Http.responseText;
    }
}


    



   //38.8894 latitude, -77.0352
   //weather api key a94c87c400672a317497ef1c938db6b4
  // https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=a94c87c400672a317497ef1c938db6b4
