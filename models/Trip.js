const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

// Tags : [bagpacker, luxe, nature, all-in, foodlover, sportif, culture]enum
// Itinéraire (demander aux TA comment le créer)

const tripSchema = new Schema({
    // id_user: { // à lier avec table user
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    description: String, // max length on attribute (>30 letters)
    iLiked: {
        type: String,
    },
    iDidntLike: {
        type: String,
    },
    destination: {
        type: String,
        enum: ["Canada", "Denmark", "England", "France", "Italy", "Japan", "Laos", "Mexico", "Morocco", "Norway", "Peru", "Russia", "Senegal", "South Africa", "Sri Lanka", "Thailand", "Tunisia", "United states"],
    },
    budget: {
        type: String,
        enum: ["0-500€", "500-1000€", ">1000€"],
    },
    duration: {
        type: String,
        enum: ["week-end", "1 week", "2 weeks", ">2 weeks"],
    },
    period: {
        type: String,
        enum: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
    },
    pictureTrip: {
        type: String,
        default: "https://i1.adis.ws/i/jpl/jd_333960_a?qlt=80&w=600&h=425&v=1&fmt=webp"
    },
    thematics: {
        type: [String],
        enum: ["bagpacker", "luxe", "nature", "all-inclusive", "foodlover", "sportif", "culture"],// on pourra en selectionner plusieurs dans le form
    },
    otherStep: {
        type: [String],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const tripModel = mongoose.model("Trip", tripSchema); // le nom de notre collection ds Mongoose sera défini ici Trip --> trips

module.exports = tripModel;
