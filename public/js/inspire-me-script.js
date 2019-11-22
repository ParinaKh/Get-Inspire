const hearts = document.querySelectorAll(".fas.fa-heart");
var favourites = [];

//afficher les voyages sauvegardés (coeur rouge)
axios.get("/get-my-favourites").then(res => {
    //avant d'arriver au then je passe dans le back
    hearts.forEach(heart => {
        let id = heart.getAttribute("data-id")
        if (res.data.includes(id)) { heart.classList.toggle("clicked-heart"), favourites.push(id) }
    })
}).catch(err => console.log(err))


//ajouter ou supprimer des favoris
hearts.forEach(heart => {
    heart.onclick = function (event) {
        heart.classList.toggle("clicked-heart")
        const tripId = event.target.getAttribute("data-id");
        if (heart.classList.contains("clicked-heart")) { //ajout favoris
            favourites.push(tripId)
            axios.post("/add-favourite", { favourites: favourites }).then(myAPIRes => {
                const favouriteHearts = myAPIRes.data;
            }).catch(err => console.log(err))
        }
        else {
            favourites = favourites.filter(id => id !== tripId) // l'id c'est chaque élément des favoris
            axios.post("/add-favourite", { favourites: favourites }).then(myAPIRes => {
                const favouriteHearts = myAPIRes.data;
            }).catch(err => console.log(err))
        }
    }
})


//Filtrer les tags
const checkBoxes = document.querySelectorAll("[name='destination'],[name='period'],[name='budget'],[name='duration']");

checkBoxes.forEach(checkbox => {
    checkbox.onclick = function (event) {
        // écrire function pour code répété:
        const filteredDestinations = [];
        checkBoxes.forEach(input => {
            if (input.checked === true && input.hasAttribute("data-destination")) {
                filteredDestinations.push(input.getAttribute("data-destination"));
            }
        })
        const filteredPeriods = [];
        checkBoxes.forEach(input => {
            if (input.checked === true && input.hasAttribute("data-period")) {
                filteredPeriods.push(input.getAttribute("data-period"));
            }
        })
        const filteredBudgets = [];
        checkBoxes.forEach(input => {
            if (input.checked === true && input.hasAttribute("data-budget")) {
                filteredBudgets.push(input.getAttribute("data-budget"));
            }
        })
        const filteredDurations = [];
        checkBoxes.forEach(input => {
            if (input.checked === true && input.hasAttribute("data-duration")) {
                filteredDurations.push(input.getAttribute("data-duration"));
            }
        })


        console.log(filteredBudgets);
        console.log(filteredDurations);
        axios.post("/filter-trips", {
            destination: filteredDestinations,
            budget: filteredBudgets,
            period: filteredPeriods,
            duration: filteredDurations,
        }) // ajouter les autres tags ici
            .then(res => { // revient ici après avoir été dans le back
                document.querySelector(".container-all-trip-cards").innerHTML = "";
                // console.log(res.data);
                res.data.forEach(trip => {
                    console.log(trip.thematics)
                    document.querySelector(".container-all-trip-cards").innerHTML += `
                <div class="trip-cards">
                    <div id="picture-card">
                        <i data-id="${trip._id}" class="fas fa-heart"></i>
                        <img src="${trip.pictureTrip}" />
                    </div>
                    <div id="container-text-card">
                        <!-- Favorite button HTML copied from generated WP Plugin HTML -->
                        <div class="polaroids">
                            <span></span>
                            <img class="user-picture" src="${trip.user.userpicture}">
                        </div>
                        <h2>${trip.destination}</h2>
                        <h3>Get Inspired by ${trip.user.name}</h3>
                        <div id="tags-card-trip">
                            <em>Trip mood:</em>
                            ${getThematics(trip.thematics)}
                        </div>
                        <div class="travel-infos-card">
                            <span>${trip.duration}</span>
                            <span>${trip.budget}</span>
                            <span>${trip.period}</span>
                        </div>
                        <div class="call-chevron">
                            <i class="fas fa-chevron-right"></i>
                            <a id="cta" href="/trip/${trip._id}">Discover now !</a>
                        </div>
                    </div>
                </div> `;
                })
            })
            .catch(err => console.log(err))
    }
})


// function to display thematics (because it's an array)
function getThematics(thematics) {
    let tpl = ""
    thematics.forEach(theme => { tpl += `<span>${theme}</span>` })
    return tpl;
}
