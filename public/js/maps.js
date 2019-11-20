var map;
var bounds = new google.maps.LatLngBounds();
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10
  });
}

initMap();

var service = new google.maps.places.PlacesService(map);

const oneStep = document.querySelectorAll(".step");
oneStep.forEach(element => {
  const cityName = element.textContent.trim();
  console.log(cityName);
  service.findPlaceFromQuery(
    {
      query: cityName,
      fields: ["name", "geometry"]
    },
    function(results, status) {
      console.log("premier");
      // console.log("ici", results[0].geometry.location.lng());
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: cityName
      });
      bounds.extend(marker.position);
      map.fitBounds(bounds);
    }
  );
});
