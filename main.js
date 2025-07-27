const map = L.map('map').setView([50.8467, 4.3499], 11); //starting position
      var Stadia_StamenTonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	      minZoom: 7,
	      maxZoom: 20,
	      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	      ext: 'png'
      }).addTo(map);
      var Icon = L.icon({
        iconUrl: "10473293.png",
        iconSize:     [30, 30],
        iconAnchor:   [15, 30],
        popupAnchor: [0, -32]
      })

let marker, circle; 

navigator.geolocation.watchPosition(success, error, {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: Infinity
});

function success(position) {
    const fnlat = position.coords.latitude;
    const fnlong = position.coords.longitude;
    const accuracy = position.coords.accuracy; // Accuracy in metres
    marker = L.circleMarker([fnlat, fnlong], {
        radius: 2,             // size of the point in px
        fillColor: '#3388ff',  // fill color
        color: '#3388ff',      // stroke color
        weight: 1,
        opacity: 0.3,
        fillOpacity: 0.9,
        pane: 'markerPane'     // keep it on marker pane to control layering
    }).addTo(map);
    marker = L.circle([fnlat, fnlong], {
        radius: 10,             // size of the point in px
        fillColor: '#3388ff',  // fill color
        color: '#3388ff',      // stroke color
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9,
        pane: 'markerPane'     // keep it on marker pane to control layering
    }).addTo(map);
}

function error(err) {

    if (err.code === 1) {
        alert("Please allow geolocation access");
        // Runs if user refuses access
    } else {
        alert("Cannot get current location");
        // Runs if there was a technical problem.
    }

}

var points = Papa.parse("Data_points.csv", {
        download: true,
        header: true,
        complete: function(points) {
		   points.data.forEach(function(row) {
            const lat = parseFloat(row.lat)
            const lon = parseFloat(row.lon)
            const popupContent = `
              <div style="color:darkred;">
                <a href="${row.URL}" target="_blank" 
                style="color:crimson; 
                font-family: 'UnifrakturCook';
                font-size: 20px;">View on Google Maps</a>
                <p style="font-style: italic; margin-top: 2px; font-size: 15px;">Note: ${row.Note}</p>
              </div>`;
            //console.log(lat,lon);
            L.marker([lat, lon], {icon: Icon}).addTo(map).bindPopup(popupContent);
           });;
	    }   
      })