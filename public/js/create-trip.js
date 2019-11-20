const btn = document.getElementById("btn_add_step");
const list = document.getElementById("list_other_step");

const destTemplate = `<li><input id="onestep" name="otherStep" placeholder="add other step here" value="#step" /></li>`;

function addStep(evt) {
  evt.preventDefault();
  console.log("clicked", list);
  list.innerHTML += destTemplate;
  activatePlacesSearch();
}

function activatePlacesSearch() {
  var inputs = document.querySelectorAll("[name='otherStep']");
  inputs.forEach(input => {
    var autoComplete = new google.maps.places.Autocomplete(input);
    //   console.log(autoComplete.getPlace());
    google.maps.event.addListener(autoComplete, "place_changed", function() {
      console.log(autoComplete.getPlace().geometry.location.lat());
      console.log(autoComplete.getPlace().geometry.location.lng());
    });
  });
}

btn.onclick = addStep;
