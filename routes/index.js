const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/Trip");

router.get(["/", "/home"], (req, res, next) => {
    tripModel.find()
        .then(dbRes => {
            res.render("index", { css: ["home", "layout", "inspire-me"], trip: dbRes });
        })
        .catch(err => console.log(err))
});


router.get("/about", (req, res, next) => {

    res.render("about", { css: ["about", "layout"] });
})




module.exports = router;
