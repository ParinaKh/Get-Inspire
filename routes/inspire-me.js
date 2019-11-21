const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/Trip");
const userModel = require("./../models/User");

router.get("/inspire-me", (req, res) => {
    tripModel.find()
        .populate({
            path: "user",
        })
        .then(dbRes => {
            res.render("inspire-me", { css: ["inspire-me", "layout"], script: ["inspire-me-script"], trip: dbRes });
        })
        .catch(dbErr => console.error(dbErr))
});

router.post("/filter-trips", (req, res) => {
    if (req.body.destinations.length) {
        console.log(req.body.destinations)
        tripModel.find({ $or: [{ destination: { $in: req.body.destinations } }] }).populate("user").then(dbRes => res.send(dbRes)).catch(err => console.log(err))
    }
    else {
        tripModel.find().populate("user").then(dbRes => { console.log("tout", dbRes); res.send(dbRes) }).catch(err => console.log(err))
    }
})



module.exports = router;
