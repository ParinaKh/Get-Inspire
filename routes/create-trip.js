const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");

// add protected route ?
router.get("/create-trip", (req, res) => { // ! don't forget to add manage/create before create-trip
    res.render("forms/create-trip", { css: ["layout"] });
});

router.post("/create-trip", (req, res) => {
    console.log("req.body");
    console.log(req.body);
    // ne pas oublier en middleware le uploader.single("image") pour l'image..
    const description = req.body.description;
    const destination = req.body.destination;
    const budget = req.body.budget;
    const duration = req.body.duration;
    const period = req.body.period;
    // const imageTrip = req.body.imageTrip;
    const thematics = req.body.thematics;

    tripModel
        .create({
            description,
            destination,
            budget,
            duration,
            period,
            // imageTrip,
            thematics
        })
        .then(tripRes => {
            console.log("yo yeey new trip created !");
            console.log(req.body);
            res.redirect("/home");
        })
        .catch(error => {
            console.log(error, ": trip not created :( ");
        });
});


console.log("entered in create-trip.js routes file !");

module.exports = router;
