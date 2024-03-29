//return console.log("node says : waxOn/waxOff !");

require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./utils/helpers-hbs"); // utils for hbs templates

// base dependencies
const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path");

// initial config
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      expires: new Date(Date.now() + (30 * 86400 * 1000))
    }, // in millisec = 1h
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());
app.use(function exposeFlashMessage(req, res, next) {
  // res.locals.success_msg = req.flash("success");
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in...
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))
function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}

function eraseSessionMessage() {
  var count = 0; // initialize counter in parent scope and use it in inner function
  return function (req, res, next) {
    if (req.session.msg) {
      // only increment if session contains msg
      if (count) {
        // if count greater than 0
        count = 0; // reset counter
        req.session.msg = null; // reset message
      }
      ++count; // increment counter
    }
    next(); // continue to the requested route
  };
}

app.use(checkloginStatus);
app.use(eraseSessionMessage());

// Getting/Using router(s)

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const createTripRouter = require("./routes/create-trip"); //nom du fichier js dans dossier routes
app.use("/manage", createTripRouter); // URL

// const indexRouter = require("./routes/index");
// app.use("/", indexRouter);

// const aboutRouter = require("./routes/index");
// app.use("/", aboutRouter);

const inspireRouter = require("./routes/inspire-me");
app.use("/", inspireRouter);

const tripRouter = require("./routes/trip");
app.use("/trip", tripRouter);

const favouritesRouter = require("./routes/favourites");
app.use("/", favouritesRouter);

const itinerary = require("./routes/Itinerary-temporary");
app.use(itinerary);

// const listener = app.listen(process.env.PORT, () => {
//   console.log(
//     `app started at ${process.env.SITE_URL}:${process.env.PORT}`
//   );
// });

app.listen(process.env.PORT, () => {
  console.log(`server runs @ : http://localhost:${process.env.PORT}`);
});
