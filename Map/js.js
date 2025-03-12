var map = L.map('map', {
    center: [20, 0],
    zoom: 1,
    minZoom: 1,
    maxZoom: 2,
    zoomControl: true,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    touchZoom: false,
    worldCopyJump: true,
    maxBounds: [[-90, -180], [90, 180]]
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
  }).addTo(map);
  

L.marker([13.0843, 80.2705]).addTo(map).bindPopup("<b> Chennai </b>").openPopup();

function updateMap() {
    var lat = parseFloat(document.getElementById("latitude").value);
    var lng = parseFloat(document.getElementById("longitude").value);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Please enter valid coordinates.");
        return;
    }

    fetch('Map/locations.json')
        .then(response => response.json())
        .then(data => {
            let locationFound = false;

            if (Array.isArray(data)) {

                data.forEach(location => {
                    if (lat === location.Latitude && lng === location.Longitude) {
                        locationFound = true;
                        alert("Correct Answer");
                        L.marker([lat, lng], 2).addTo(map)
                            .bindPopup("<b>" + location.Location + "</b>")
                            .openPopup();
                        document.getElementById("download-link").href = location.Download;
                        document.getElementById("question-image").src = "Map/assets/" + location.Image;
                    }
                });
            } else {
                alert("The JSON data is not in the expected format.");
            }

            if (!locationFound) {
                alert("Wrong coordinates entered.");
            }
        })
        .catch(error => {
            alert("Error loading the JSON file.");
        });
}