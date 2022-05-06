 //Fade In function on window Onload

var intervalID = 0;
weight = 10;

window.onload = scrollTo(0, 50);
window.onload = fadeIn("body");
var b_interval = 0;



function fadeIn(element) {
    setInterval(show, 40, element);
    
}

function show(element) {
    var object = document.getElementById(element);
    opacity = Number(window.getComputedStyle(object).getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + (0.01)*weight;
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

function SlideDown(wrapper_element) {
    sleep(50);
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

bsleep = 2;

async function bounceUp() {
    b_interval = 0;
    while (b_interval < 299) {
        if (b_interval < 90) {
            window.scrollBy(0, -150);
            await sleep(bsleep);
            b_interval = b_interval + 150;
        }
        if (b_interval >= 90 && b_interval < 150) {
            window.scrollBy(0, -50);
            await sleep(bsleep);
            b_interval = b_interval + 50;
        }
        if (b_interval >= 150) {
            window.scrollBy(0, -3);
            await sleep(bsleep);
            b_interval = b_interval + 3;
        }
        
       
    }
    
}


async function DelaytoScroll(element) {
    
    //bounceUp();
    window.scrollBy(0,-30);
    await sleep(300); //sleep 500ms, same as .slide-wrapper transition time, 0.5 sec
    element.scrollIntoView();

}

//PANEL INPUT ACTION LISTENERS

var panel1input = 0;
var panel2input = 0;
/*
var textBox1 = document.getElementById("origin-input");
    textBox1.addEventListener("keyup", function (event) {
 if (event.key === "Enter") {
    if (panel1input == 0) {
        panel1input = 1;
        s = "panel_two_wrapper"
        document.getElementById(s).style.height = "10in";
        var temp=document.getElementById(s)
        DelaytoScroll(temp);
    }
 }
});

var textBox2 = document.getElementById("input_current_location");
    textBox2.addEventListener("keyup", function (event) {
 
 if (event.key === "Enter") {
     if (panel2input == 0) {
        panel2input = 1;
        s = "panel_three_wrapper"
        document.getElementById(s).style.height = "10in";
        var temp=document.getElementById(s)
        DelaytoScroll(temp);
    }
 }
});
*/

var price = 0.00;
var gas_price = 0.00;
var hotel_price = 0.00;
var tax_price = 0.00;


function increasePrice(num) { //increases price counter, and for total price
    const numFormat = Number(num);
    price = price + numFormat;
    const result = Number(price).toFixed(2);
    var str = "$" + result;
    s = "final_price_text"
    document.getElementById(s).innerHTML =  str;
}

function addGasSummary(num) { //add gas price to summary table
    gas_price = num;
    const numFormat = Number(num);
    const result = Number(numFormat).toFixed(2);
    var str = "Gas: $" + result;
    var gasID = "summary_gas";
    document.getElementById(gasID).innerHTML = str;
}

function addHotelSummary(num) { //add hotel price to summary table
    hotel_price = num;
    const numFormat = Number(num);
    const result = Number(numFormat).toFixed(2);
    var str1 = "Hotel: $" + result;
    var hotelID = "summary_hotel";
    document.getElementById(hotelID).innerHTML = str1;

    //now calculate occupancy tax ~ 11% tax and update
 
}


function addTaxSummary() {
    tax_price = hotel_price/11; //assuming ~ 11% tax
    const numFormat = Number(tax_price);
    const result = Number(numFormat).toFixed(2);
    var str = "Est. Tax: $" + result;
    var taxID = "summary_tax";
    document.getElementById(taxID).innerHTML = str; //update html field with new information
    
    
}