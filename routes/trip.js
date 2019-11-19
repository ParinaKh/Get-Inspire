const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const uploader = require("./../config/cloudinary");
const userModel = require("../models/User");


// PUBLIC ROUTES
router.get("/trip/:id", (req, res) => {
    tripModel
        .findOne({ _id: { $eq: req.params.id } })
        .populate("user")
        .then(dbRes => {
            res.render("trip", {
                trip: dbRes, // will be use in our trip.hbs view
                css: ["trip"]
            });
        })
        .catch(dbErr => console.log("err", dbErr));
});

console.log("entered in trip.js routes file !");


module.exports = router;
