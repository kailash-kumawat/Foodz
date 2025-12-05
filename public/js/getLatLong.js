const socket = io();

// Initialize map
const map = L.map("map").setView([0, 0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Foodz",
}).addTo(map);

let myMarker = null;

async function getLatLng(lat, lng) {
    
  return { lat, lng };
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Center map only first time
      map.setView([lat, lng], 16);

      if (!myMarker) {
        // Create marker ONCE
        myMarker = L.marker([lat, lng], { draggable: true }).addTo(map);

        // return initial coord
        getLatLng(lat, lng);

        // On drag, update address
        myMarker.on("dragend", (e) => {
          const { lat, lng } = e.target.getLatLng();
          getLatLng(lat, lng);
        });
      } else {
        // Update marker position instead of creating new markers
        myMarker.setLatLng([lat, lng]);
      }
    },
    (err) => console.log(err),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 },
  );
}

export { getLatLng };
