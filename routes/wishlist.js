const express = require("express");
const router = new express.Router();

router.get("/:id", (req, res) => {
    res.render("wishlist");
});


module.exports = router;
