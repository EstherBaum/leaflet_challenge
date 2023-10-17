// Load in URL and makes sure it loads correctly
data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
console.log(data);

// Creating function to create map and add layers
function createMap(earthquakeLocations) {

    // Adding Tile Layer
    streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };

    let overlayMaps = {
        "Earthquake Locations": earthquakeLocations
    };

    //Creating map object
    let myMap = L.map("map", {
        center: [39.45, -111.28],
        zoom: 5,
        layers: [streetmap, earthquakeLocations]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}

//Creating function to hold earthquake data
function createMarkers(response) {
    let features = response.features;
    let earthquakeMarkers = [];

    //loop through "features" property 
    for (let i = 0; i < features.length; i++) {
        let coordinates = features[i].geometry.coordinates;
        let place = features[i].properties.place
        magnitude = features[i].properties.mag

        if (coordinates[2] < 20) {
            color = "green"
        }
        else if (coordinates[2] < 50) {
            color = "yellow"
        }
        else if (coordinates[2] < 150) {
            color = "orange"
        }
        else {
            color = "red"
        }

        let earthquakeMarker = L.circle([coordinates[1], coordinates[0]], {
            color: color,
            radius: Math.pow(magnitude, 2)*10000,
            fillOpacity: .9
        }).bindTooltip("<strong>" + "Magnitude: " + magnitude + "<br/>Location: " + place + "<br/>Depth: " + coordinates[2]).openTooltip();
  
        //For .bindPopup
        //let earthquakeMarker = L.marker([coordinates[1], coordinates[0]])
        //    .bindPopup("<h3>" + place + "<h3>");

        earthquakeMarkers.push(earthquakeMarker);
    }

    createMap(L.layerGroup(earthquakeMarkers));

};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
