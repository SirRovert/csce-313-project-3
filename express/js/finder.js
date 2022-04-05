//uses the User's own browser API to request physical location
//displays User's Latitude and Longigude

const test = document.getElementById("test");
//const is needed to display in html, by using the innerHTML function at the bottom
    function getLocation() {
        try {
            navigator.geolocation.getCurrentPosition(showPosition);

        }
        catch {
            test.innerHTML = err;
        }
    }
    function showPosition(position) {
  test.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}


