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





