 //Fade In function on window Onload

var intervalID = 0;
weight = 10;
window.onload = fadeIn("body");



function fadeIn(element) {
    setInterval(show, 40, element);
    
}

function show(element) {
    var object = document.getElementById(element);
    opacity = Number(window.getComputedStyle(object).getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + (0.02)*weight;
        object.style.opacity = opacity;
       if (opacity > 0.8) {
           if (weight > 1){
               weight = weight/2;
           }
       }
    } 
    else {
        clearInterval(intervalID);
    }
}



function PopIn(element) {
    //var T = document.getElementById(element);
   // T.style.opacity = 0;
    weight = 1;
    element.style.transition = "all 2s ease-in-out";
    element.style.opacity = 1;
    element.style.display = "block";  // <-- Set it to block

}

function SlideDown6in(wrapper_element) {
    wrapper_element.style.height =  "6in";
    DelaytoScroll(wrapper_element);
    
}

function SlideDown8in(wrapper_element) {
    wrapper_element.style.height =  "8in";
    DelaytoScroll(wrapper_element);

}

function SlideDown15in(wrapper_element) {
    wrapper_element.style.height =  "20in";
     DelaytoScroll(wrapper_element);
    

}

function SlideDown(wrapper_element, panel) {
    wrapper_element.style.height = "10in";
    DelaytoScroll(wrapper_element);

}
function SlideUp(element) {
    element.style.display = "block";
    element.style.height = "0in";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function DelaytoScroll(element) {
    await sleep(500); //sleep 500ms, same as .slide-wrapper transition time, 0.5 sec
    element.scrollIntoView();

}

