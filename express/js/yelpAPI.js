


function yelpGet(){
    const yelp_text = document.getElementById("yelp_text");
    yelp_text.innerHTML = "term: bubble Tea, location: College Station, result: Bon Appetite"
}

  
'use strict';
    const yelp = require('yelp-fusion');
    // Place holder for Yelp Fusion's API Key. Grab them
    // from https://www.yelp.com/developers/v3/manage_app
    const apiKey = 'keHMpJzIUAI5Ro43dvlN2CcJcUZOk1iXWz-vD2IaIv0SsupyngJEC5a4BbxRMAQGA4IZsi0QqlOFBx8MRKhHKvnTKlyfor0G8f7j76T_W5QCHTB_WLH9d15v3XpMYnYx';
    const searchRequest = {
        term: 'Bubble Tea',
        latitude: '30.6075',
        longitude: '-96.3428',
        limit: 5,
        sort_by: 'rating',
    };
    const client = yelp.client(apiKey);
    client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
    
    yelp_text.innerHTML = text;
    }).catch(e => {
    console.log(e);
    });