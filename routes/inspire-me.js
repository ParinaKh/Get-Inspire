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

// 4) reçois les infos de la requête AJAX :
router.post("/filter-trips", (req, res) => {

    // déclare des variables avec toutes les valeurs possibles dans le tableau des chexboxs cochées (filteredBudget par ex)
    // permet de m'afficher TOUS mes voyages par défaut si c'est pas coché
    // console.log(req.body)
    let period = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
    let budget = ["0-500€", "500-1000€", ">1000€"];
    let duration = ["week-end", "1 week", "2 weeks", ">2 weeks"];
    let thematics = [
        "bagpacker",
        "luxury",
        "nature",
        "all-inclusive",
        "foodlover",
        "sportive",
        "culture"
    ];

    //tu les stockes dans une variable qui deviendra une valeur dans ma requete
    if (req.body.period.length) period = req.body.period
    if (req.body.budget.length) budget = req.body.budget
    if (req.body.duration.length) duration = req.body.duration
    if (req.body.thematics.length) thematics = req.body.thematics
    console.log(req.body.thematics);

    // déclare ma requête pour pouvoir l'utiliser après dans ma promesse
    let query = {
        // ici dans la requete à la BDD on ne peut pas changer les keys car ce sont celles du TripModel
        // par contre la value des keys = celle reçue du serveur ci-dessus
        $and: [
            { destination: { $in: req.body.destination } },
            { period: { $in: period } },
            { budget: { $in: budget } },
            { duration: { $in: duration } },
            { thematics: { $in: thematics } },
        ]
    }
    if (!req.body.destination.length) {
        query = {
            $and: [
                { period: { $in: period } },
                { budget: { $in: budget } },
                { duration: { $in: duration } },
                { thematics: { $in: thematics } }, // requete à modifier pour avoir plusieurs
            ]
        }
    }

    //
    if (req.body !== {}) {
        // si les data dans la réponse du serveur ne sont pas vides (donc qu'il y a qq de chocher)
        // alors tu executes ma query
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