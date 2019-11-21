const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const userModel = require("../models/User");


//display la page des favoris
router.get("/my-favourites", (req, res) => {

    userModel.findById(req.session.currentUser._id).populate({
        path: 'favourite',
        model: 'Trip',
        populate: {
            path: 'user',
            model: 'User'
        }
    })
        .then(dbRes => {
            res.render("favourites", { css: ["layout", "wishlist"], script: ["inspire-me-script"], user: dbRes });
        })
        .catch(dbErr => console.error(dbErr))
});


router.get("/get-my-favourites", (req, res) => {
    userModel.findById(req.session.currentUser._id).then(response => res.send(response.favourite)).catch(err => console.log(err))
})


router.post("/add-favourite", (req, res) => {
    const favourites = req.body.favourites;
    userModel.findOneAndUpdate({ _id: req.session.currentUser._id }, { favourite: favourites }) // update ses favoris // addToSet = avoid push multiple times of the same trip 
        .then(dbRes => {
            res.send({ user: dbRes });
        })
        .catch(dbErr => console.error(dbErr));
});



module.exports = router;
