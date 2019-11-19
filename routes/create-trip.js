const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const uploader = require("./../config/cloudinary");

// add protected route ?
router.get("/create-trip", (req, res) => { // ! don't forget to add manage/create before create-trip
    res.render("forms/create-trip", { css: ["layout", "create-trip"], script: ["create-trip"] });
});

router.post("/create-trip", uploader.single("pictureTrip"), (req, res, next) => {
    const newTrip = req.body
    console.log(req.body);

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
