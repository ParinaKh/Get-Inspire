const express = require("express");
const router = new express.Router();
console.log("cool")
router.get("/home", (req, res) => {
    res.render("index")
});


router.get("/about", (req, res) => {
    res.render("about")
});


module.exports = router;
