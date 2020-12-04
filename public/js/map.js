var mymap = L.map('mapid').setView([51.038, 2.3982], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJpY2VuZHJlIiwiYSI6ImNraTk4ZDRybjBkZGEydGxjd2txOG83d3YifQ.ACX7sbOaoEfjiC1N4Y8kQg'
}).addTo(mymap);





//////////////////////// ICON TIME //////////////////////////////
var icon_zoom = 0.3;
var ride = L.icon({
    
    iconUrl: 'assets/img/mapicon/surf_icon.png',
    iconSize:     [200*icon_zoom, 247*icon_zoom], // size of the icon
    iconAnchor:   [109*icon_zoom, 243*icon_zoom], // point of the icon which will correspond to marker's location
    popupAnchor:  [0*icon_zoom, -240*icon_zoom] // point from which the popup should open relative to the iconAnchor
});

function add_markers(entry){
    console.log(entry);
    entry.forEach(function(item){
        console.log(item["latitude"]);
        var marker = L.marker([item["latitude"], item["longitude"]], {icon: ride}).addTo(mymap);
        marker.bindPopup(`<b>${item["nom_lieu"]}</b><br><div class="map_popup"><a href="https://www.google.fr/maps/dir/${item["latitude"]},${item["longitude"]}"><img src="/assets/img/mapicon/map.png"></a><a href="/stats/${item["num_lieu"]}"><img src="/assets/img/mapicon/stats.png"></a></div> `).closePopup();
      });
        
}

function request_lieux(){
    fetch('http://localhost:20000/bdd/lieux')
      .then(response => response.json())
      .then(lieux => add_markers(lieux))
  }
request_lieux()

//var marker = L.marker([51.05, 2.3812], {icon: ride}).addTo(mymap);
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").closePopup();