// Google maps 
const map = document.getElementById('map'); 
const start = {lat: 59.300727, lng: 17.995181}; 
const googleMaps = new google.maps.Map(map, {
    zoom: 17,
    center: start
}); 

// User
const user = {
    coords: {
        lat: null,
        lng: null,
    }, 
    marker: null,
    id: 1
}; 

// Fires when position is updated 
// and renders and clears player marker
function onGetCoords(pos){
    console.log(pos.coords); 
    user.coords.lat = pos.coords.latitude; 
    user.coords.lng = pos.coords.longitude; 
    
    // Clears player marker
    if(user.marker) {
        user.marker.setMap(null); 
        console.log('marker cleared'); 
    }

    // Renders player marker
    const marker = newPlayerMarker(); 
    user.marker = marker; 

}

// Gets client pos
navigator.geolocation.watchPosition(onGetCoords, err => {
    console.log(err); 
})

// Returns marker for player pos
function newPlayerMarker(){
    return new google.maps.Marker({
        position: user.coords,
        map: googleMaps
    }); 
}

// Quest markes 
const questMarkers = []; 
function renderQuestMarkers(markers){
    markers.forEach(marker => {
        const questMarker = new google.maps.Marker({position: marker, map: googleMaps}); 
        questMarkers.push(questMarker); 
    })
}

// Fetches quest coords and renders markers 
function fetchMarkers() {
    fetch('coords.json').then(res => {
        res.json().then(json => {
            renderQuestMarkers(json);  
        }); 
    })
}

fetchMarkers(); 
