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
            res.render("inspire-me", { css: ["inspire-me", "layout"], js: ["inspire-me-script"], trip: dbRes });
        })
        .catch(dbErr => console.error(dbErr))
});

router.post("add-favourite", (req, res) => {
    userModel.findOneAndUpdate(req.session.currentUser.id)
        .populate("trip")
        .then(dbRes => {
            res.send({ user: dbRes });
        })
        .catch(dbErr => console.error(dbErr));
});



module.exports = router;
