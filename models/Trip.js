const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;


// Tags : [bagpacker, luxe, nature, all-in, foodlover, sportif, culture]enum
// Itinéraire (demander aux TA comment le créer)


const tripSchema = new Schema({
    id_user: { // à lier avec table user
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: String, // max length on attribute (>30 letters)
    destination: {
        type: [String],
        enum: ["Mexique", "Laos", "Norvège", "France", "Italie", "Canada", "Afrique du Sud"],
    },
    budget: {
        type: [String],
        enum: ["0-500€", "500-1000€", "> 1000€"],
    },
    duration: {
        type: [String],
        enum: ["week-end", "1 semaine", "2 semaines", "> 2 semaines"],
    },
    period: {
        type: [String],
        enum: ["janv-mars", "avril-juin", "juillet-septembre", "octobre-decembre"],
    },
    // imageTrip: { // il faudra pouvoir l'uploader après, en mettant dans ma route en middleware : uploader.single("image") cf .dashboard sneakers
    //     type: String,
    //     default: "https://i1.adis.ws/i/jpl/jd_333960_a?qlt=80&w=600&h=425&v=1&fmt=webp"
    // },
    tags: {
        type: [String],
        enum: ["bagpacker", "luxe", "nature", "all-in", "foodlover", "sportif", "culture"],// on pourra en selectionner plusieurs dans le form
    }
});

const tripModel = mongoose.model("Trip", tripSchema); // le nom de notre collection ds Mongoose sera défini ici Trip --> trips

module.exports = tripModel;
