const map = L.map('map').setView([50.8467, 4.3499], 11); //starting position
      var Stadia_StamenTonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	      minZoom: 7,
	      maxZoom: 20,
	      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	      ext: 'png'
      }).addTo(map);
      var Icon = L.icon({
        iconUrl: "images/10473293.png",
        iconSize:     [30, 30],
        iconAnchor:   [15, 30],
        popupAnchor: [0, -32]
      })

let marker, aroundmarker; 

navigator.geolocation.watchPosition(success, undefined, {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: Infinity
});

function success(position) {
    const fnlat = position.coords.latitude;
    const fnlong = position.coords.longitude;
    const accuracy = position.coords.accuracy; // Accuracy in metres

    if (marker) map.removeLayer(marker);
    if (aroundmarker) map.removeLayer(aroundmarker);

    marker = L.circleMarker([fnlat, fnlong], {
        radius: 10,             // size of the point in px
        fillColor: '#3388ff',  
        color: '#3388ff',      
        opacity: 0.3,
        fillOpacity: 0.9,
        pane: 'markerPane'     // keep it on marker pane to control layering
    }).addTo(map);
    aroundmarker = L.circle([fnlat, fnlong], {
        radius: 50,             
        fillColor: '#629ef1ff',
        color: '#3388ff',      
        opacity: 1,
        fillOpacity: 0.3,
        pane: 'markerPane'     
    }).addTo(map);
    console.log("Added GPS")
}

L.easyButton('<img src="images/icon_location.png" class="locate-icon">', 
  function(btn, map) {
  if (marker) {
    map.setView(marker.getLatLng(), 14); 
  }
}).addTo(map);

var points = Papa.parse("Data_points.csv", {
        download: true,
        header: true,
        complete: function(points) {
		   points.data.forEach(function(row) {
            const lat = parseFloat(row.lat)
            const lon = parseFloat(row.lon)
            // console.log(lat,lon);
            const popupContent = `
              <div style="color:darkred;">
                <a href="${row.URL}" target="_blank" 
                style="color:crimson; 
                font-family: 'UnifrakturCook';
                font-size: 20px;">View on Google Maps</a>
                <p style="font-style: italic; margin-top: 2px; font-size: 15px;">Note: ${row.Note}</p>
              </div>`;
            L.marker([lat, lon], {icon: Icon}).addTo(map).bindPopup(popupContent);
           });;
	    }   
      })
