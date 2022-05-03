var intervalID = 0;
var weight = 1;
window.onload = fadeIn("body");
var interval = 250;


function fadeIn(element) {
    setInterval(show2, interval, element);
    
}



function show2(element) {
    var object = document.getElementById(element);
    opacity = Number(window.getComputedStyle(object).getPropertyValue("opacity"));
    if (opacity < 1.0) {
        if (opacity < 0.7) {
            weight = 2;
            opacity = opacity + 1/interval * weight;
        }
        if (opacity >= 0.7) {
            weight = weight + weight;
            opacity = opacity + (1/interval);
        }
        object.style.opacity = opacity;
    }
    else {
        clearInterval(intervalID);
    }
   
}