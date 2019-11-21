const mongoose = require("mongoose");
// const User = require("../models/User");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log("connected to mongoose :  ))")
);
