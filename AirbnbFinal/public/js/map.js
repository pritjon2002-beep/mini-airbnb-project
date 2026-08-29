// map render script

const coordinates = listingGeometry.coordinates; // [lng,lat] - GeoJSON order
const map = L.map("map").setView([coordinates[1], coordinates[0]], 15); //leaflet want [lat , lng]

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([coordinates[1], coordinates[0]]).addTo(map);
