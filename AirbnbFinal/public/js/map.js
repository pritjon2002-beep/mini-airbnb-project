// map render script

const map = L.map("map").setView([27.71, 85.32], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([27.71, 85.32]).addTo(map);
