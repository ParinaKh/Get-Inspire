const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  decription: String,
  email: String,
  password: String,
  trips: {
    type: Schema.Types.ObjectId,
    ref: "Trip"
  },
  picture: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
  }
});

const User = mongoose.model("User", userSchema); //"User" name of database which becomes "users" collection in Mongo

module.exports = User;
