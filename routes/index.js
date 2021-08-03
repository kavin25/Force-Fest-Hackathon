const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");

User.find({ person: "Teacher" })
  .then((data1) => {
    router.get("/dashboard", ensureAuthenticated, (req, res) => {
      User.find({ person: "student" })
        .then((data2) => {
          res.render("dashboard", {
            data: req,
            teacher: data1,
            student: data2,
          });
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));

module.exports = router;
