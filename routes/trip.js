const express = require("express");
const router = new express.Router();
const tripModel = require("../models/Trip");
const uploader = require("./../config/cloudinary");
const userModel = require("../models/User");

// PUBLIC ROUTES
router.get("/:id", (req, res) => {
  // no need to get "/trip/:id" because /trip is already defined in our app.js route!
  // console.log(`Yeyy on the trip page : ${req.params.id}`);
  // yeey ! when i write in the url browser : "http://localhost:2000/trip/5dd5186bc0ec66f318e8ae09" ==> render the page ok !
  tripModel
    .findOne({ _id: { $eq: req.params.id } })
    .populate("user")
    .then(dbRes => {
      console.log(dbRes);
      res.render("trip", {
        trip: dbRes, // will be use in our trip.hbs view
        css: ["layout", "trip"],
        script: ["maps"]
      });
    })
    .catch(dbErr => console.log("err", dbErr));
});

console.log("entered in trip.js routes file !");

module.exports = router;
