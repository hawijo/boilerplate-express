let map;
let marker;

// Initialize the map with a default location
function initMap() {
    map = L.map('map').setView([-1.292, 36.821], 8); // Default location

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

// Fetch and display the latest location data from Google Sheets
async function showLatestData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwB3USPUMVqh6JR7SJ7orwOgd1XjY1IHyv-xuNM5Za3BmpT_ywrYFkxOKjFiwGMBCHP/exec');
        const locationData = await response.json();

        if (locationData.latitude && locationData.longitude) {
            const location = [locationData.latitude, locationData.longitude];

            // Center the map and place a marker
            map.setView(location, 8);
            if (marker) {
                map.removeLayer(marker); // Remove the existing marker
            }
            marker = L.marker(location).addTo(map)
                .bindPopup(`Latitude: ${locationData.latitude}<br>Longitude: ${locationData.longitude}`)
                .openPopup();

            console.log("Latest data location:", locationData);
        } else {
            console.error("No location data found.");
            mapLoadError();
        }
    } catch (error) {
        mapLoadError();
        console.error("Error fetching latest data:", error);
    }
}

// Fetch and display current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            { timeout: 10000 } // Optional: Set timeout for geolocation request
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Update the map to center on the current location
function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const location = [lat, lng];

    if (!map) {
        // Initialize the map if it hasn't been initialized yet
        initMap();
    } else {
        map.setView(location, 8);
        if (marker) {
            map.removeLayer(marker); // Remove the existing marker
        }
        marker = L.marker(location).addTo(map)
            .bindPopup(`Latitude: ${lat}<br>Longitude: ${lng}`)
            .openPopup();

        console.log("Updated location:", location);
    }
}

// Handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Handle map loading errors
function mapLoadError() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('map-error').style.display = 'block';
    console.error("Error loading map. Displaying error message.");
}

// Set up event listeners for buttons
document.getElementById('get-location-btn').addEventListener('click', getCurrentLocation);
document.getElementById('show-latest-data-btn').addEventListener('click', showLatestData);

// Initialize the map on page load
window.onload = initMap;