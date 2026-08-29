// map render script

const coordinates = listingGeometry.coordinates; // [lng,lat] - GeoJSON order
const map = L.map("map").setView([coordinates[1], coordinates[0]], 15); //leaflet want [lat , lng]

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const marker = L.marker([coordinates[1], coordinates[0]], {
  icon: redIcon,
}).addTo(map);

marker.bindPopup(
  `Welcome to <b>${listingTitle}</b><br>Exact Location is provided after booking!`,
);

marker.on("mouseover", function () {
  marker.openPopup();
});

marker.on("mouseout", function () {
  marker.closePopup();
});
