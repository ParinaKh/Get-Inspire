const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/trip");

router.get("/inspire-me", (req, res) => {
    res.render("inspire-me");
});



module.exports = router;
