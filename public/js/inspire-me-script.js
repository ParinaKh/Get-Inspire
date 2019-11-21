const hearts = document.querySelectorAll(".fas.fa-heart");
var favorites = []

//ajouter ou supprimer des favoris
console.log(hearts);
hearts.forEach(heart => {
    heart.onclick = function (event) {
        heart.classList.toggle("clicked-heart")
        const tripId = event.target.getAttribute("data-id");
        if (heart.classList.contains("clicked-heart")) {
            axios.post("/add-favourite", { tripId: tripId }).then(myAPIRes => {
                const favouriteHearts = myAPIRes.data;
            }).catch(err => console.log(err))
        }
        else {
            axios.post("/add-favourite", { tripId: tripId }).then(myAPIRes => {
                const favouriteHearts = myAPIRes.data;
            }).catch(err => console.log(err))
        }
    }
})

//mémoriser les voyages sauvegardés pour afficher un coeur rouge
axios.get("/my-favourites").then(res => {
    console.log("hello", favorites)
    hearts.forEach(heart => {
        let id = heart.getAttribute("data-id")
        if (res.data.includes(id)) { heart.classList.toggle("clicked-heart"), favorites.push(id) }
    })
}).catch(err => console.log(err))




