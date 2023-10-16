// 1. Get Datatset

data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
console.log(data);


function createMap(earthquakeLocations) {

    // Adding the Tile Layer
    streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };

    let overlayMaps = {
        "Earthquake Locations": earthquakeLocations
    };

    //Creating initial map object
    let myMap = L.map("map", {
        center: [39.45, -111.28],
        zoom: 5,
        layers: [streetmap, earthquakeLocations]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}

//Define Earthquake function earthquakeData
function createMarkers(response) {
    let features = response.features;
    let earthquakeMarkers = [];

    //loop through "features" property 

    for (let i = 0; i < features.length; i++) {
        let coordinates = features[i].geometry.coordinates;
        let place = features[i].properties.place
  

        let earthquakeMarker = L.marker([coordinates[1], coordinates[0]])
            .bindPopup("<h3>" + place + "<h3>");
        earthquakeMarkers.push(earthquakeMarker);

        let 
    }

    createMap(L.layerGroup(earthquakeMarkers));

}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);