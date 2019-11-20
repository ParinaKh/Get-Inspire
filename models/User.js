const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  description: String,
  favourite: [String],
  trips: {
    type: Schema.Types.ObjectId,
    ref: "Trip"
  },
  userpicture: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
  }
});

const User = mongoose.model("User", userSchema); //"User" name of database which becomes "users" collection in Mongo

module.exports = User;
