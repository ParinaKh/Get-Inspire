const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/Trip");
const userModel = require("./../models/User");

router.get("/all-favourites", (req, res) => {
    userModel.findById(req.session.currentUser._id).populate("favourite")
        .then(dbRes => {
            console.log(dbRes)
            res.render("wishlist", { css: ["inspire-me", "layout"], script: ["inspire-me-script"], trip: dbRes });
        })
        .catch(dbErr => console.error(dbErr))
});


router.post("/add-favourite", (req, res) => {
    const tripId = req.body.tripId;
    userModel.findOneAndUpdate({ _id: req.session.currentUser._id }, { $addToSet: { favourite: tripId } }) // addToSet = avoid push multiple times of the same trip 
        .then(dbRes => {
            res.send({ user: dbRes });
        })
        .catch(dbErr => console.error(dbErr));
});

router.get("/all-favorites", (req, res) => {
    userModel.findById(req.session.currentUser._id).then(response => res.send(response.favourite)).catch(err => console.log(err))
})


// { $addToSet: { favourite: tripId } }
// router.post("/delete-favourite", (req, res) => {
//     const tripId = req.body.tripId;
//     userModel.findOneAndRemove({ _id: req.session.currentUser._id }, { favourite: tripId }) // addToSet = avoid push multiple times of the same trip 
//         .then(dbRes => {
//             res.send({ user: dbRes });
//         })
//         .catch(dbErr => console.error(dbErr));
// });



module.exports = router;
