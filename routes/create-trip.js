const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const uploader = require("./../config/cloudinary");
const userModel = require("../models/User");


// BACKEND ROUTES
router.get("/create-trip", (req, res) => { // ! don't forget to add manage/create before create-trip
    res.render("forms/create-trip", { css: ["layout", "create-trip"], script: ["create-trip"] });
});

router.post("/create-trip", uploader.single("pictureTrip"), (req, res, next) => {
    const newTrip = req.body;
    const userLoggedIn = req.session.currentUser;
    console.log(req.session.currentUser); // when logged in : have access to the currentUser session
    if (req.file) newTrip.pictureTrip = req.file.secure_url; // for cloudinary upload
    if (userLoggedIn) newTrip.user = userLoggedIn._id; // need a error if not loggedIn ? or no need because will be a protected route...
    console.log(`userLoggedIn._id : ${userLoggedIn._id} or userLoggedIn.id : ${userLoggedIn.id}`);
    tripModel
        .create(newTrip)
        .then(tripRes => {
            // console.log("yo yeey new trip created !");
            // console.log(req.body);
            req.flash("success", "Trip created !")
            res.redirect("/manage/create-trip");
        })
        .catch(error => {
            console.log(error, ": trip not created :( ");
        });
});


console.log("entered in create-trip.js routes file !");

module.exports = router;
