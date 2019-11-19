const express = require("express");
const router = new express.Router();
router.get(["/", "/home"], (req, res, next) => {

    res.render("index", { css: ["home", "layout"] });
});


router.get("/about", (req, res, next) => {
    console.log('in index.js');
    res.render("about", { css: ["about", "layout"] });
});


module.exports = router;
