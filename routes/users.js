const express = require("express");
const router = express.Router();
// User model
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", function (req, res) {
  res.render("Login");
});

router.get("/register", function (req, res) {
  res.render("Register");
});

// Register Handle

router.post("/register", (req, res) => {
  const { name, email, password, password2, person, teacherSub } = req.body;
  User.findOne({ name: name }).then((op) => {
    let errors = [];
    //   Check required fields
    if (!name || !email || !password || !password2 || !person) {
      errors.push({ msg: "Please fill in all the fields" });
    }

    //   Check Passwords Match
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    //   Check Passwords Length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters long" });
    }

    if (person === "Teacher" && !teacherSub === true) {
      errors.push({ msg: "Teachers have to choose a subject field" });
    } else if (person === "student" && !teacherSub === false) {
      errors.push({
        msg: "The Subject field is not to be filled by the Students",
      });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
        person,
        teacherSub,
      });
    } else if (!op === false) {
      errors.push({ msg: "Username is already in use" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
        person,
        teacherSub,
      });
      console.log(`${!op} k`);
      console.log(op);
      console.log(errors.length);
    } else {
      // Validation Passed

      User.findOne({ email: email }).then((user) => {
        if (user) {
          // User exists
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
            person,
            teacherSub,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            person,
            teacherSub,
          });
          // Hash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can login"
                  );
                  res.redirect("/users/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  });
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
