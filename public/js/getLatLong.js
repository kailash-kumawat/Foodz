// it will used with frontend and backend don't have access of geolocation so lat lng = null.

const socket = io();

// Initialize map
const map = L.map("map").setView([0, 0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Foodz",
}).addTo(map);

let myMarker = null;

// async function getLatLng(lat, lng) {
//   return { lat, lng };
// }

async function getLatLng() {
  let latitude;
  let longitude;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;

        // Center map only first time
        map.setView([latitude, longitude], 16);

        if (!myMarker) {
          // Create marker ONCE
          myMarker = L.marker([latitude, longitude], { draggable: true }).addTo(
            map,
          );

          // return initial coord
          // getLatLng(lat, lng);

          // On drag, update address
          myMarker.on("dragend", (e) => {
            const { lat, lng } = e.target.getLatLng();
            latitude = lat;
            longitude = lng;
            // getLatLng(lat, lng);
          });
        } else {
          // Update marker position instead of creating new markers
          myMarker.setLatLng([latitude, longitude]);
        }
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 },
    );
  }
  return { latitude, longitude };
}
export { getLatLng };
