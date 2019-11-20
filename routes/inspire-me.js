const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/Trip");

router.get("/inspire-me", (req, res) => {
    tripModel.find()
        .populate({
            path: "user",
        })
        .then(dbRes => {
            res.render("inspire-me", { css: ["inspire-me", "layout"], js: ["inspire-me"], trip: dbRes });
        })
        .catch(dbErr => console.error(dbErr))
});


module.exports = router;
