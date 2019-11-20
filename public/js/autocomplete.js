function activatePlacesSearch() {
  var input = document.getElementById("name");
  console.log(input);
  var autoComplete = new google.maps.places.Autocomplete(input);
  //   console.log(autoComplete.getPlace());

  google.maps.event.addListener(autoComplete, "place_changed", function() {
    console.log(autoComplete.getPlace().geometry.location.lat());
    console.log(autoComplete.getPlace().geometry.location.lng());
  });
}
activatePlacesSearch();

console.log(new google.maps.places.search("Paris"));
