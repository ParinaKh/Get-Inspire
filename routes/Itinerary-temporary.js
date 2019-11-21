const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const uploader = require("./../config/cloudinary");
const userModel = require("../models/User");

// // PUBLIC ROUTES
// router.get("/itinerary/:id", (req, res) => {
//   tripModel
//     .findOne({ _id: { $eq: req.params.id } })
//     .populate("user")
//     .then(dbRes => {
//       res.render("itinerary", {
//         trip: dbRes, // will be use in our trip.hbs view
//         css: ["trip", "layout"],
//         script: ["maps"]
//       });
//     })
//     .catch(dbErr => console.log("err", dbErr));
// });

router.get("/trip/:id", (req, res) => {
  tripModel
    .findOne({ _id: { $eq: req.params.id } })
    .populate("user")
    .then(dbRes => {
      res.render("/itinerary", {
        trip: dbRes, // will be use in our trip.hbs view
        css: ["trip", "layout"],
        script: ["maps"]
      });
    })
    .catch(dbErr => console.log("err", dbErr));
});

console.log("entered in trip.js routes file !");

module.exports = router;
