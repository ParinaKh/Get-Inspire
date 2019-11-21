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
const checkBoxes = document.querySelectorAll("[name='destination']")

function getThematics(thematics) {
    const tpl = ""
    thematics.forEach(theme => { tpl += `<span>${theme}</span>` })
    return tpl
}


checkBoxes.forEach(checkbox => {
    checkbox.onclick = function (event) {
        const checkedDestination = [];
        checkBoxes.forEach(input => {
            if (input.checked === true) {
                // console.log(c.getAttribute("data-color"))
                checkedDestination.push(input.getAttribute("data-destination"));
            }
        })
        console.log(checkedDestination)
        axios.post("/filter-trips", { destinations: checkedDestination })
            .then(res => {
                document.querySelector(".container-all-trip-cards").innerHTML = ""
                res.data.forEach(trip => {
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
    </div> `
                })
            }) // revient ici après avoir été dans le back
            .catch(err => console.log(err))
    }
})





// <div id="tags-card-trip">
// <em>Trip mood:</em>
// ${getThematics(trip.thematics)}
// </div>
