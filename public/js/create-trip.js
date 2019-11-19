const btn = document.getElementById("btn_add_step");
const list = document.getElementById("list_other_step");


const destTemplate = `<li><input name="otherStep" placeholder="add other step here" value="#step" /></li>`;


function addStep(evt) {
    evt.preventDefault();
    console.log("clicked", list)
    list.innerHTML += destTemplate;
}


btn.onclick = addStep;