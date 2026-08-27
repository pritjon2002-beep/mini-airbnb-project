// map render script

const map = L.map("map").setView([15.5449, 73.7517], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([15.5449, 73.7517]).addTo(map);
