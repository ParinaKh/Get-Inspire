const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const description = req.body.description;
  const email = req.body.email;
  const password = req.body.password;

  if (
    name === "" ||
    age === "" ||
    description === "" ||
    email === "" ||
    password === ""
  ) {
    res.render("signup", {
      msg: "Indicate a username and a password to sign up",
      css: ["signup-signin", "layout"]
    });
    return;
  }
  userModel
    .findOne({
      email: email
    })
    .then(user => {
      if (user !== null) {
        res.render("signup", {
          msg: "The email already exists!",
          css: ["signup-signin", "layout"]
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      //user.password = hashed;

      //console.log(req.body);
      userModel
        .create({
          name,
          age,
          description,
          email,
          password: hashPass
        })
        .then(userRes => {
          res.render("auth/signin", { user: userRes, css: ["signup-signin", "layout"] });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/signin", (req, res) => {
  res.render("auth/signin", { css: ["layout"] });
});

router.post("/signin", (req, res) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("signin", {
      msg: "Please enter both, email and password to sign in.",
      css: ["signup-signin", "layout"]
    });
    return;
  }

  userModel
    .findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        res.render("signin", {
          msg: "The email doesn't exist.",
          css: ["signup-signin", "layout"]
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/inspire-me");
      } else {
        res.render("signin", {
          msg: "Incorrect password",
          css: ["signup-signin", "layout"]
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // cannot access session here
    res.redirect("/auth/signin");
  });
});

module.exports = router;
