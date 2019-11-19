const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const uploader = require("./../config/cloudinary");

router.get("/signup", (req, res) => {
  res.render("auth/signup", { css: ["signup-signin", "layout"] });
});

router.post("/signup", uploader.single("userpicture"), (req, res, next) => {
  const newUser = req.body;
  //   const newUser = {
  //     name: req.body.name,
  //     age: req.body.age,
  //     description: req.body.description,
  //     email: req.body.email,
  //     password: req.body.password
  //   };

  if (req.file) {
    newUser.userpicture = req.file.secure_url;
  }

  userModel
    .findOne({
      email: newUser.email
    })
    .then(user => {
      if (user !== null) {
        res.redirect("/inspire-me", {
          css: ["signup-signin", "layout"],
          msg: "The email already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashed = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashed;

      //console.log(req.body);
      userModel
        .create(newUser)
        .then(userRes => {
          req.session.currentUser = userRes;
          res.redirect("/home");
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
  res.render("auth/signin", { css: ["signup-signin", "layout"] });
});

router.post("/signin", (req, res) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("signin", {
      msg: "Please enter both, email and password to sign in."
    });
    return;
  }

  userModel
    .findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        res.render("signin", {
          msg: "The email doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/home");
      } else {
        res.redirect("/home", {
          msg: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = false;
    res.redirect("/auth/signin");
  });
});

module.exports = router;
