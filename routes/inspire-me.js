const express = require("express");
const router = new express.Router();
const tripModel = require("./../models/Trip");

router.get("/inspire-me", (req, res) => {
    tripModel.find()
        .populate({
            path: "user",
        })
        .then(dbRes => {
            res.render("inspire-me", { css: ["inspire-me", "layout"], script: ["inspire-me-script"], trip: dbRes }); // à quoi sert trip: dbRes ici ??
        })
        .catch(dbErr => console.error(dbErr))
});

router.post("/filter-trips", (req, res) => {
    // console.log(req.body)
    let period = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
    let budget = ["0-500€", "500-1000€", ">1000€"];
    let duration = ["week-end", "1 week", "2 weeks", ">2 weeks"];
    if (req.body.period.length) period = req.body.period
    if (req.body.budget.length) budget = req.body.budget
    console.log(req.body.budget);
    console.log(req.body.duration);
    if (req.body.duration.length) duration = req.body.duration
    let query = {
        $and: [
            { destination: { $in: req.body.destination } },
            { period: { $in: period } },
            { budget: { $in: budget } },
            { duration: { $in: duration } },
            // ici si les cases Canada + Jan-Mar + 0-500€ cochées --> alors tripCard voyage Canada apparait avec toutes ces infos..
            // MAIS il devrait apparaître aussi quand juste Canada + Jan-Mar  cochés....(marchent très bien indépendamment avec $or...)
        ]
    }
    // console.log(req.body.destination)
    if (!req.body.destination.length) {
        query = {
            $and: [
                { period: { $in: period } },
                { budget: { $in: budget } },
                { duration: { $in: duration } },
                // ici si les cases Canada + Jan-Mar + 0-500€ cochées --> alors tripCard voyage Canada apparait avec toutes ces infos..
                // MAIS il devrait apparaître aussi quand juste Canada + Jan-Mar  cochés....(marchent très bien indépendamment avec $or...)
            ]
        }
    }
    if (req.body !== {}) {
        tripModel
            .find(
                query
            )
            .populate("user")
            .then(dbRes => res.send(dbRes))
            .catch(err => console.log(err))
    }
    else {
        tripModel
            .find().populate("user")
            .then(dbRes => {
                // console.log("tout", dbRes);
                res.send(dbRes)
            })
            .catch(err => console.log(err))
    }
    
})



module.exports = router;

// filter that was working: { $or: [{ destination: { $in: req.body.destinations } }] }
// {$and: [{ destination: { $in: ["France", "Canada"] } }, { budget: { $in: ["0-500€"] } },{ duration: { $in: ["week-end"] } },{ period: { $in: ["Jul-Sep"] } }, { thematics: { $in: ["luxury", "nature"] } } ]}