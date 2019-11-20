const hearts = document.querySelectorAll(".fas.fa-heart");

console.log(hearts);
hearts.forEach(heart => {
    heart.onclick = function (event) {
        console.log("click")
        heart.classList.toggle("clicked-heart")
        const tripId = event.target.getAttribute("data-id");
        axios.post("/add-favourite", { tripId: tripId }).then(myAPIRes => {
            const favouriteHearts = myAPIRes.data;
        }).catch(err => console.log(err))

    }
})


axios.get("/all-favorites").then(res => {
    hearts.forEach(heart => {
        if (res.data.includes(heart.getAttribute("data-id"))) heart.classList.toggle("clicked-heart")
    })
}).catch(err => console.log(err))





