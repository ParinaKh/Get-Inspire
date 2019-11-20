var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

initMap();

var request = {
  query: "Muang Khong",
  fields: ["name", "geometry"]
};

var service = new google.maps.places.PlacesService(map);

service.findPlaceFromQuery(request, function(results, status) {
  console.log(results.geometry);
  //creer marqueur
});

//     map.setCenter(results[0].geometry.location);
